# Tasks

Queue of work for Claude. Add new tasks to the bottom. Do not remove or edit an
unchecked task unless you are starting it.

## Rules
- Work on only one task at a time.
- New tasks go at the bottom of the list.
- Do not abandon or interrupt the current task unless the user explicitly says "interrupt".
- Finish, test, and verify the current task before starting the next.
- Before starting another task, re-read this file and select the oldest pending (unchecked) task.
- After completing a task, check it off, briefly tell the user it's done, and state which task is starting next.
- Do not combine unrelated tasks into one implementation.

## Queue

- [x] pull in all blogs from here: https://securelogicusa.com/blogs/
- [x] implement the blog reader (see ###blogreader section below)
- [x] Build out site map and direction (see ###sitemap section below)
- [x] Update homepage hero copy to lead with "Engineering better environments" tagline (see ###homehero section belowcurrently "Disinfection Reimagined.")
- [x] Make a resources page: https://securelogicusa.com/resources/
- [ ] Bring in documentation and brochures as a part of the resources: https://securelogicusa.com/resources/documentation/ https://securelogicusa.com/resources/brochures/
- [ ] Add about us page: https://securelogicusa.com/about-us/
- [ ] Determine where best to recreate this page: https://securelogicusa.com/about-us/technology/
- [ ] Add FAQs page: https://securelogicusa.com/resources/faqs/
- [ ] Create BotaniMax page: https://securelogicusa.com/botanimax/
- [ ] Create Genesis360 page: https://securelogicusa.com/genesis360mistingsystems/
- [ ] Improve blog styles - lets try moving the blog image as the hero image (see ###bloghero) and move get a quote CTA above Keep reading section. Make get a quote CTA more narrow to match the width of the blog text
- [ ] Improve the Get A Quote component - make it looks much nicer
- [ ] Match the font and styling of /Users/joshuariley/Downloads/life2health-main/resources
- [ ] Bring back the home hero typing effect and words

### sitemap
30k foot view 3 different verticals - 3 sites in one. Cant be one or the other
3 categories
- Human: Schools Athletics Military Healthcare
- HVAC: Residential Commercial
- Ag
-- Split into markets within Ag
  -- Hogs & disease - beating over the head about ROI. Very testimonial driven market. A lot of storytelling alongside the data
  -- Chicken
  -- Indoor Growing
Needs to be easy to navigate
News releases will be frequent and important

### homehero
"A pathogen control company" - do it the same way every time
Tagline: "Engineering better environments". Should be main message of the hero

### blogreader
The absolute best **100% free** alternative that gives you ultra-realistic, premium AI voices (matching ElevenLabs) without requiring any paid subscriptions or API keys is **Edge-TTS via a Netlify Edge Function**.

While the native Web Speech API (Option 1 above) is free, its voice quality can sound robotic depending on the user's phone or computer. To get premium, human-like narration completely free, you can leverage Microsoft Edge's translation voices, which are publicly accessible and highly realistic. [1]

By using **Astro Server Islands** or a **Netlify Edge Function**, you can stream this premium audio directly to your website.

Here is how to set up a completely free, premium AI voice reader on your Astro/Netlify stack:

**1. Install the Edge-TTS Package**

Open your terminal and install a lightweight Node/Deno package to interface with Microsoft's neural TTS servers:

**bash**

```
npm install edge-tts-api
```

Use code with caution.

**2. Create a Netlify Serverless/Edge Route in Astro**

Astro makes it incredibly easy to create dynamic endpoints. Create a file at `src/pages/api/tts.ts`. This endpoint takes your blog text, sends it securely to the free neural network, and streams back high-quality MP3 data.

**ts**

```
// src/pages/api/tts.tsimporttype {APIRoute }from'astro';import {MsEdgeTTS }from'edge-tts-api';exportconstGET: APIRoute =async ({request }) => {consturl =new URL(request.url);consttext = url.searchParams.get('text');if (!text) {returnnew Response(JSON.stringify({error:'Missing text parameter' }), {status:400 });
  }try {consttts =new MsEdgeTTS();// Configure voice: "en-US-AvaNeural" or "en-US-AndrewNeural" are exceptionally realisticawait tts.setMetadata('en-US-AvaNeural', MsEdgeTTS.OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);// Fetch the audio stream from the free serverconstaudioStream =await tts.toStream(text.substring(0,5000));// Cap text length for safetyreturnnew Response(audioStream, {headers: {'Content-Type':'audio/mpeg','Cache-Control':'public, max-age=86400',// Cache audio for 1 day to save bandwidth
      },
    });
  }catch (error) {returnnew Response(JSON.stringify({error:'Failed to generate speech' }), {status:500 });
  }
};
```

Use code with caution.

**3. Build the Tailwind & Alpine.js Player**

Now, create a custom audio player UI component at `src/components/FreePremiumPlayer.astro`. This uses Alpine.js to extract your blog text, call your free API route, and play the response via a sleek Tailwind HTML5 audio controller.

**astro**

```
---
// src/components/FreePremiumPlayer.astro
interface Props {
  targetId: string;
}
const { targetId } = Astro.props;
---

<div
  x-data="{
    playing: false,
    audio: null,
    loading: false,
    playAudio() {
      // If audio already generated, just toggle state
      if (this.audio) {
        if (this.playing) {
          this.audio.pause();
          this.playing = false;
        } else {
          this.audio.play();
          this.playing = true;
        }
        return;
      }

      // Extract text from the article element
      const articleEl = document.getElementById('{targetId}');
      if (!articleEl) return;
      const cleanText = encodeURIComponent(articleEl.innerText.trim());

      this.loading = true;

      // Fetch directly from your free serverless API
      this.audio = new Audio(`/api/tts?text=${cleanText}`);

      this.audio.oncanplaythrough = () => {
        this.loading = false;
        this.audio.play();
        this.playing = true;
      };

      this.audio.onended = () => {
        this.playing = false;
      };
    }
  }"
  class="flex items-center gap-4 p-4 my-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm shadow-sm"
>
  <button
    @click="playAudio()"
    disabled="loading"
    class="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
  >
    <!-- Loading Spinner -->
    <template x-if="loading">
      <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </template>

    <!-- Play Icon -->
    <template x-if="!playing && !loading">
      <svg xmlns="http://w3.org" class="h-5 w-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </template>

    <!-- Pause Icon -->
    <template x-if="playing && !loading">
      <svg xmlns="http://w3.org" class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
    </template>
  </button>

  <div class="flex flex-col">
    <span class="text-sm font-semibold text-slate-800 dark:text-slate-200" x-text="loading ? 'Generating AI Voice...' : (playing ? 'Playing Audio' : 'Listen to Article')"></span>
    <span class="text-xs text-slate-400">Free Natural Neural Reader</span>
  </div>
</div>
```

Use code with caution.

**Why this is the best setup for your stack:**

- **Cost:** Completely free with zero tier limitations or token counts. [1, 2]
- **Voice Quality:** It bypasses standard robotic browser speech engines, using Microsoft's highly natural, human-like neural voices (the same engine powering Edge's "Read Aloud" accessibility feature).
- **Netlify-Ready:** Because it runs via standard server requests inside your Astro project, Netlify automatically deploys the API handler as a serverless function with zero manual configurations.


### bloghero
<section id="hero" class="relative overflow-hidden bg-ink px-6 pb-24 pt-40 text-white sm:px-10"><img src="/_astro/beader-header-3.D32162Fc.png" alt="" class="absolute inset-0 h-full w-full object-cover object-center sm:object-center" aria-hidden="true"><div class="absolute inset-0 bg-ink/70" aria-hidden="true"></div><div class="relative mx-auto max-w-[1040px] text-center"><div class="mb-8 flex items-center justify-center gap-4"><div class="h-px w-6 bg-gold"></div><span class="font-label text-[10px] uppercase tracking-[var(--tracking-widest)] text-gold">The Story of Rosario</span><div class="h-px w-6 bg-gold"></div></div><h1 class="mb-7 font-display text-[48px] font-light leading-none tracking-normal md:text-[78px]">Every Name Carries a Story.</h1><p class="mx-auto max-w-[740px] font-sans text-[16px] font-light leading-[1.85] text-white/68">Long before this was a shop, Rosario Leonardi was a man and this is his story.</p></div></section>