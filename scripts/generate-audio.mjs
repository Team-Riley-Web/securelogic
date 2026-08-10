// One-off generator for the blog reader audio.
// Output MP3s are committed to the repo, so this is NOT part of `npm run build`.
// Re-run manually after editing post copy:
//   node scripts/generate-audio.mjs              # only missing files
//   node scripts/generate-audio.mjs --force      # rebuild everything
//   node scripts/generate-audio.mjs <slug>...    # specific posts
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BODIES = join(ROOT, 'src/data/blog-bodies');
const AUDIO = join(ROOT, 'public/audio');
const VOICE = 'en-US-AvaNeural';

// Microsoft drops the socket on long synthesis requests, so send small chunks.
const MAX_CHUNK = 1600;
const ATTEMPTS = 4;

// blog-posts.ts imports images, so it cannot be require()d here; read the
// slug/title pairs straight out of the source instead of duplicating them.
function readTitles() {
  const src = readFileSync(join(ROOT, 'src/data/blog-posts.ts'), 'utf8');
  const titles = {};
  const entry = /slug:\s*'([^']+)',\s*\n\s*title:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
  let match;
  while ((match = entry.exec(src))) {
    titles[match[1]] = (match[2] ?? match[3]).replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  return titles;
}

// Turn post HTML into something worth listening to: drop markup, keep sentence
// boundaries, and give headings a pause so sections do not run together.
function toSpeech(html) {
  return html
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/<\/(h[1-6]|p|li|ul|ol|div)>/gi, '\n\n')
    .replace(/<li\b[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, 'and')
    .replace(/&(?:ldquo|rdquo|quot);/g, '"')
    .replace(/&(?:lsquo|rsquo|#8217);/g, "'")
    .replace(/&(?:mdash|ndash);/g, ', ')
    .replace(/&[a-z]+;/gi, ' ')
    // Bare URLs, citation parentheses, and emoji all read terribly aloud.
    .replace(/\(?\bhttps?:\/\/\S+\)?/gi, '')
    .replace(/\((?:[a-z0-9-]+\.)+[a-z]{2,}\)/gi, '')
    .replace(/[\p{Extended_Pictographic}️]/gu, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitForSynthesis(text) {
  const units = [];
  for (const para of text.split(/\n\n+/)) {
    if (para.length <= MAX_CHUNK) {
      units.push(para);
      continue;
    }
    let buffer = '';
    for (const sentence of para.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [para]) {
      if (buffer && buffer.length + sentence.length > MAX_CHUNK) {
        units.push(buffer.trim());
        buffer = '';
      }
      buffer += sentence;
    }
    if (buffer.trim()) units.push(buffer.trim());
  }

  // Re-pack neighbouring paragraphs so we make as few requests as possible.
  const chunks = [];
  for (const unit of units) {
    const last = chunks[chunks.length - 1];
    if (last && last.length + unit.length + 2 <= MAX_CHUNK) {
      chunks[chunks.length - 1] = `${last}\n\n${unit}`;
    } else {
      chunks.push(unit);
    }
  }
  return chunks;
}

function synthesize(text) {
  return new Promise((resolve, reject) => {
    const tts = new MsEdgeTTS();
    tts
      .setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
      .then(() => {
        const { audioStream } = tts.toStream(text);
        const parts = [];
        audioStream.on('data', (part) => parts.push(part));
        audioStream.on('end', () => {
          tts.close();
          const buffer = Buffer.concat(parts);
          buffer.length ? resolve(buffer) : reject(new Error('empty audio'));
        });
        audioStream.on('error', (error) => {
          tts.close();
          reject(error);
        });
      })
      .catch(reject);
  });
}

async function synthesizeWithRetry(text, label) {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await synthesize(text);
    } catch (error) {
      if (attempt === ATTEMPTS) throw new Error(`${label} failed after ${ATTEMPTS} attempts: ${error.message}`);
      await new Promise((r) => setTimeout(r, attempt * 1500));
    }
  }
}

const args = process.argv.slice(2);
const force = args.includes('--force');
const requested = args.filter((a) => !a.startsWith('--'));

const all = readdirSync(BODIES)
  .filter((f) => f.endsWith('.html'))
  .map((f) => basename(f, '.html'));

const unknown = requested.filter((r) => !all.includes(r));
if (unknown.length) throw new Error(`Unknown slug(s): ${unknown.join(', ')}`);

const titles = readTitles();
const slugs = requested.length ? requested : all;
mkdirSync(AUDIO, { recursive: true });

for (const slug of slugs) {
  const dest = join(AUDIO, `${slug}.mp3`);
  if (!force && existsSync(dest)) {
    console.log(`${slug}.mp3  (exists, skipped)`);
    continue;
  }

  const title = titles[slug];
  if (!title) throw new Error(`No title found for "${slug}" in src/data/blog-posts.ts`);

  const body = toSpeech(readFileSync(join(BODIES, `${slug}.html`), 'utf8'));
  const chunks = splitForSynthesis(`${title}.\n\nFrom Secure Logic.\n\n${body}`);

  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    buffers.push(await synthesizeWithRetry(chunks[i], `${slug} chunk ${i + 1}/${chunks.length}`));
  }

  const audio = Buffer.concat(buffers);
  writeFileSync(dest, audio);
  console.log(`${slug}.mp3  ${chunks.length} chunks, ${(audio.length / 1024 / 1024).toFixed(1)}MB`);
}

console.log(`\nDone. ${readdirSync(AUDIO).filter((f) => f.endsWith('.mp3')).length} file(s) in public/audio/`);
