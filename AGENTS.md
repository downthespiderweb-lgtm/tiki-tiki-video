# AGENTS.md — Remotion motion-graphics project

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot…) working in this repo.
Videos here are **React components rendered frame-by-frame by [Remotion](https://www.remotion.dev/docs)**
(v4.0.535, pinned). Package manager: **npm** (`package-lock.json`).

## Agent skills (read first)

Remotion's official Agent Skills are installed in `.agents/skills/remotion-best-practices/`
(`.claude/skills` symlinks there). Load `SKILL.md` and the relevant sub-skill before writing code:

| Task | Skill file |
| --- | --- |
| Animation, layout, typography, timing, transitions, audio, fonts | `remotion-markup/REFERENCE.md` (+ topic files: `timing.md`, `transitions.md`, `audio.md`, `sequencing.md`, `measuring-text.md`, `text-highlights.md`…) |
| New video / composition | `remotion-create/REFERENCE.md` |
| Preview in Studio | `remotion-studio/REFERENCE.md` |
| Render MP4 / stills | `remotion-render/REFERENCE.md` |
| Captions / subtitles | `remotion-captions/REFERENCE.md` |
| Look up an API | `remotion-docs/REFERENCE.md` |

Reinstall / update skills with `npx skills add remotion-dev/skills` (or the `remotion-upgrade` skill).

## Main project: TikiPitch (graded PechaKucha video)

`src/compositions/TikiPitch/` — 20 scenes × 20 s, 1920×1080, 30 fps (12,000 frames). Rules:

- **Never change scene count or scene length** (`config.ts`: 20 × 20 s). Transitions are centred on
  each boundary (`sequenceFrames()` / `sceneLeadFrames()`), so scene time `t` from `useSceneTime()`
  is 0 exactly at the 20 s boundary. Every scene must render for its full 600 frames.
- **Facts live in `data/`** (`menu.ts`, `beverages.ts`, `financials.ts`, `staffing.ts`). Names and
  prices are exact from the brief — never retype them in scenes. `financials.ts` throws if the
  brief's percentages stop adding up. Never invent figures; label anything derived/hypothetical.
- **Narration drives timing.** `narration/script.json` → `audio-src/generate_narration.py`
  writes per-phrase cue times to `data/cues.generated.json`; scenes reveal elements with
  `useCues()(cueName)`. After editing narration: regenerate narration, `build_audio.py`, and
  `scripts/export_script.py`.
- **Visuals**: original SVG illustrations (`illustrations/`) behind photo slots (`photos.ts`,
  `<Visual slot>`). Brand tokens in `brand.ts` (cream / charcoal / forest / restrained gold);
  chart colours `CH` are palette-validated — reuse them.
- **Layout gotcha:** `AbsoluteFill` is `width/height: 100%` — when you offset it with `left`, also
  set an explicit `width` (and `height` if you align to the bottom), otherwise content overflows.
- QA: render key frames with
  `npx remotion render TikiPitch out/frames --sequence --frames=480,1080 --image-format=jpeg --props='{"audioSrc":""}'`
  and look at them; then `npm run render:pitch && npm run verify:pitch`.

## Project layout

```
src/
  index.ts                 Entry point (registerRoot) — don't add logic here
  Root.tsx                 ALL <Composition> registrations live here
  fonts.ts                 Loads bundled fonts from public/fonts (no network needed)
  config/video.ts          Global width / height / fps + presets (4K, vertical, square)
  config/theme.ts          Brand colors + font families — use these, not inline hex codes
  utils/animation.ts       sec(), progress(), springIn(), fadeUp(), wave(), countUp(), easings
  utils/layout.ts          useLayout() → u(px) resolution-independent sizing, isPortrait
  utils/audio.ts           beatToFrame(), beatPulse(), cueFrames() for audio sync
  components/              Reusable building blocks (AnimatedText, Background,
                           FloatingShapes, AccentLine) — exported from components/index.ts
  compositions/<Name>/     One folder per video: <Name>.tsx, scenes/, schema.ts, timeline.ts, index.ts
public/                    Static assets → reference with staticFile("fonts/…", "audio/…", "images/…")
scripts/new-composition.mjs  Scaffolder used by `npm run new`
out/                       Render output (git-ignored)
```

## Commands

```bash
npm run dev                         # Remotion Studio (http://localhost:3000)
npx remotion studio --no-open       # Studio without opening a browser (prints URL)
npm run new -- PromoTeaser --seconds 8 [--width 1080 --height 1920 --fps 60]
npm run render                      # Showcase → out/showcase.mp4 (H.264, CRF 18)
npm run render:draft                # half-resolution quick check
npx remotion render <CompId> out/<name>.mp4 [--props='{"title":"Hi"}'] [--frames=0-89]
npx remotion still <CompId> out/frame.png --frame=60   # verify a single frame visually
npm run compositions                # list composition IDs + durations
npm run lint                        # eslint (Remotion rules) + tsc — run before finishing
```

If rendering fails with `ENOTFOUND remotion.media` (sandbox without internet), point Remotion to a
local Chrome/Chromium: `REMOTION_BROWSER_EXECUTABLE=/path/to/chrome npm run render`.

## Workflow for a new video / scene

1. `npm run new -- MyVideo` → creates `src/compositions/MyVideo/` and registers it in `src/Root.tsx`.
2. Split the video into scene components in `src/compositions/MyVideo/scenes/`; define scene
   lengths **in seconds** in a `timeline.ts` (see `compositions/Showcase/timeline.ts`) and derive
   `durationInFrames` from it.
3. Sequence scenes with `<TransitionSeries>` (`@remotion/transitions`) or `<Series>` / `<Sequence>`.
   Give every `<TransitionSeries.Sequence>` `premountFor={fps}`.
4. Expose editable content (text, colors, numbers, asset paths) as props with a zod `schema` so
   they can be edited in Studio's Props panel. Keep `defaultProps` an **inline object literal on the
   `<Composition>` in `Root.tsx`** — otherwise Studio can't save prop edits back to code.
5. Start Studio, check the composition, render a few stills (`npx remotion still … --frame=N`) at
   key moments (mid-transition, end) and look at them, then `npm run lint`.

## Animation rules (non-negotiable)

- Drive **everything** from `useCurrentFrame()` + `useVideoConfig()`. Never use CSS transitions /
  animations, `setTimeout`, `requestAnimationFrame`, or `Math.random()` — they break rendering.
  Use `random("seed")` from `remotion` for deterministic randomness.
- Author timing in **seconds** and convert with `fps` (`sec(1.2, fps)`, `progress(frame, fps, {delay, duration})`),
  so changing fps never changes timing.
- Clamp interpolations (`extrapolateLeft/Right: "clamp"` — `progress()` already does).
- Prefer individual CSS transform properties (`scale`, `translate`, `rotate`) over `transform`
  strings; it keeps values editable in Studio.
- Size with `u(px)` from `useLayout()` (design at 1080p short side) so compositions work at any
  resolution or aspect ratio. Use `isPortrait` to switch rows → columns.
- Use colors / fonts from `config/theme.ts`. Add fonts as `.woff2` in `public/fonts` + an entry in
  `src/fonts.ts` (don't rely on Google Fonts at render time).
- Use `<Img>` from `remotion` for images, `<Video>`/`<Audio>` from `@remotion/media` for media.
- Add Remotion packages with `npx remotion add @remotion/<pkg>` so versions stay aligned
  (all `remotion` / `@remotion/*` packages must be the exact same version).

## Typography & graphics recipes

- Staggered word/char reveal: `<AnimatedText text="…" by="char" delay={0.3} stagger={0.045} />`.
- Entrance: `style={{ ...fadeUp(progress(frame, fps, { delay: 0.5 }), u(30)) }}`.
- Springy pop: `const p = springIn(frame, fps, { delay: 0.6 })` → `scale: String(mix(p, 0.7, 1))`.
- Counters: `countUp(progress(...), 120)`; progress rings: SVG `strokeDashoffset` (see `StatsScene`).
- Shapes: `@remotion/shapes` (`<Circle>`, `<Star>`, `<Triangle>`, `<Rect>`, `<Pie>`, …).
- Ambient motion: `wave(frame, fps, period)`, `<FloatingShapes>`, `<Background>` drifting gradient.
- Transitions: `fade()`, `slide({direction})`, `wipe({direction})` + `linearTiming` / `springTiming`.

## Audio sync

- Put files in `public/audio/` and play with `<Audio src={staticFile("audio/music.mp3")} />`
  (`@remotion/media`). Trim with `trimBefore` / `trimAfter` (frames), `volume` can be a function of frame
  for fades.
- Place an audio clip at a time with `<Sequence from={sec(2.4, fps)}><Audio …/></Sequence>`.
- Sync visuals to music: `beatToFrame(beat, bpm, fps)` for cue frames, `beatPulse(frame, bpm, fps)`
  for per-beat kicks. For voiceover, list cue times in seconds → `cueFrames()`.
- To fit a composition to an audio file's length use `calculateMetadata` (see skill
  `remotion-markup/calculate-metadata.md`).
- The Showcase composition accepts an `audioSrc` prop (path inside `public/`).

## Changing format

- Global: edit `src/config/video.ts` (`width`, `height`, `fps`).
- Per composition: override `width`/`height`/`fps` on its `<Composition>` in `Root.tsx`
  (e.g. `{...PRESETS.vertical1080}`).
- Length: edit the scene seconds in the composition's `timeline.ts`.
- At render time: `--scale=2` renders at 2× resolution; fps is set in code, not on the CLI.

## Done checklist

`npm run lint` passes · composition shows in Studio · stills at key frames look right ·
`npx remotion render <Id> out/<id>.mp4` succeeds. Don't commit `out/`.
