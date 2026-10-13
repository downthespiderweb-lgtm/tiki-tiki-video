# tiki-tiki-video
Tiki Tiki Lounge hospitality presentation video

Built with [Remotion](https://www.remotion.dev/docs) 4.0.535: videos are written as React
components, previewed in Remotion Studio and rendered to MP4.

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
