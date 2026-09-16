// Usage: node scripts/assert-html.mjs dist/human/index.html "Human Health" "!Kinetic Systems"
// A needle starting with "!" must be ABSENT. Exit code 1 on any failure.
import { readFileSync } from 'node:fs';

const [file, ...needles] = process.argv.slice(2);
if (!file || needles.length === 0) {
  console.error('usage: assert-html.mjs <file> <needle> [needle...]  (prefix ! for must-be-absent)');
  process.exit(2);
}
const html = readFileSync(file, 'utf8');
let failed = 0;
for (const raw of needles) {
  const absent = raw.startsWith('!');
  const needle = absent ? raw.slice(1) : raw;
  const found = html.includes(needle);
  const ok = absent ? !found : found;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${absent ? 'absent ' : 'present'} ${JSON.stringify(needle)}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
