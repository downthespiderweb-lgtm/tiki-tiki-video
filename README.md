# tiki-tiki-video
Tiki Tiki Lounge hospitality presentation video

Built with [Remotion](https://www.remotion.dev/docs) 4.0.535: videos are written as React
components, previewed in Remotion Studio and rendered to MP4.

## The pitch video (hospitality class assignment)

**Composition `TikiPitch`** — a PechaKucha-style food & beverage concept sales pitch:
20 scenes × 20 s = **6:40** (12,000 frames, 1920×1080, 30 fps) with narration, original
background music and subtle sound design.

| Deliverable | Path |
|---|---|
| Final video | `out/tiki-tiki-pitch.mp4` (render with `npm run render:pitch`) |
| Narration script with timestamps | [`docs/NARRATION_SCRIPT.md`](docs/NARRATION_SCRIPT.md) |
| Full menu, financial calculations, staffing plan, unresolved items | [`docs/SUPPORTING_NOTES.md`](docs/SUPPORTING_NOTES.md) |
| Reference-video analysis | [`docs/REFERENCE_ANALYSIS.md`](docs/REFERENCE_ANALYSIS.md) |
| Asset sources & licenses / adding real photos | [`docs/ASSETS_AND_LICENSES.md`](docs/ASSETS_AND_LICENSES.md) |
| Scenes & components | `src/compositions/TikiPitch/` |
| Audio generation (Python) | `audio-src/generate_narration.py`, `audio-src/build_audio.py` |

```bash
npm run dev                 # preview in Remotion Studio → select "TikiPitch"
npm run preview:pitch       # quick half-resolution MP4
npm run render:pitch        # final 1920×1080 MP4 → out/tiki-tiki-pitch.mp4
npm run verify:pitch        # checks 12,000 frames / 400 s / 1080p / 30 fps / audio
```

Regenerating audio (optional; the mixed soundtrack is committed at
`public/audio/tiki-pitch-mix.mp3`):

```bash
python3 -m venv .venv && .venv/bin/pip install -r audio-src/requirements.txt
# download the Kokoro model files into audio-src/models/ (URLs in generate_narration.py)
.venv/bin/python audio-src/generate_narration.py   # narration + cue timings
.venv/bin/python audio-src/build_audio.py          # music, sfx, final mix (-16 LUFS)
python3 scripts/export_script.py                   # refresh docs/NARRATION_SCRIPT.md
```

Edit text/timing: narration in `narration/script.json`; menu, beverage, financial and staffing
data in `src/compositions/TikiPitch/data/`; scene length/fps in `src/compositions/TikiPitch/config.ts`.

## Quick start

```bash
npm install          # install dependencies (Node 18+)
npm run dev          # open Remotion Studio → http://localhost:3000
npm run render       # export the Showcase composition → out/showcase.mp4
```

| Task | Command |
| --- | --- |
| Preview all compositions | `npm run dev` |
| Create a new composition | `npm run new -- MyVideo --seconds 8` |
| Export MP4 | `npx remotion render Showcase out/showcase.mp4` |
| Quick half-res draft | `npm run render:draft` |
| Export one frame as PNG | `npx remotion still Showcase out/frame.png --frame=60` |
| Override props at render | `npx remotion render Showcase out/x.mp4 --props='{"title":"Aloha"}'` |
| Lint + typecheck | `npm run lint` |

Change resolution/fps in `src/config/video.ts`, scene lengths in
`src/compositions/Showcase/timeline.ts`, colors/fonts in `src/config/theme.ts`.
Text, numbers, accent color and an optional audio track are editable live in Studio's Props panel.

See [AGENTS.md](./AGENTS.md) for the project structure and the conventions AI coding agents (and
humans) should follow. Official Remotion Agent Skills are installed in `.agents/skills`.

## Licensing

Remotion is free for individuals and companies with up to 3 employees; larger companies need a
[company license](https://www.remotion.pro/license). Bundled fonts (Inter, Playfair Display) are
under the SIL Open Font License — see `public/fonts/`.
