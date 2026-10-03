# TejaDev Template launch film — source

- `site/` — the film as a web page; `renderAt(t)` in `app.js` is a pure function of time, `cues.js` holds the beat-synced timings.
- `audio/mix.py` — music bed ("Happy Beats / Business Moves" vol. 10 by ende.app, from the /brag skill) + UI foley, mixed to -14 LUFS.
- `render.mjs` → `render/master.mp4` (headless Chromium, 2× supersampling, motion blur); `finish.sh` → grade, poster frame, audio mux, H.264.

```bash
npm install playwright-core sharp @fontsource/jetbrains-mono   # plus numpy scipy pyloudnorm for audio
python3 audio/mix.py && node render.mjs --workers 3 && ./finish.sh
```
