#!/usr/bin/env python3
"""
Export the scene-by-scene narration script with real timestamps to
docs/NARRATION_SCRIPT.md, using narration/script.json and the phrase timings
measured by audio-src/generate_narration.py (cues.generated.json).

Usage: python3 scripts/export_script.py
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
script = json.loads((ROOT / "narration" / "script.json").read_text())
cues = json.loads((ROOT / "src" / "compositions" / "TikiPitch" / "data" / "cues.generated.json").read_text())

SCENE = 20.0


def ts(seconds: float) -> str:
    m, s = divmod(seconds, 60)
    return f"{int(m)}:{s:05.2f}"


lines = [
    "# Tiki Tiki Lounge & Bar — Narration Script",
    "",
    "PechaKucha format: **20 scenes × 20 seconds = 6:40** (400 s, 12,000 frames at 30 fps).",
    "Timestamps are measured from the generated narration audio (Kokoro TTS, voice `"
    + script["voice"]
    + "`). Each phrase start is shown as *video time* (scene-relative time in brackets).",
    "",
]
total_words = 0
for i, scene in enumerate(script["scenes"]):
    start = i * SCENE
    c = cues[scene["id"]]
    words = sum(len(p["text"].split()) for p in scene["phrases"])
    total_words += words
    lines += [
        f"## Scene {i + 1} — {scene['title']}",
        "",
        f"**{ts(start)} – {ts(start + SCENE)}** · Topic: {scene['section']} · {words} words · narration ends at +{c['_end']:.1f} s",
        "",
    ]
    for p in scene["phrases"]:
        cue = p.get("cue")
        t = c.get(cue) if cue else None
        stamp = f"`{ts(start + t)}` [+{t:.1f}s]" if t is not None else ""
        lines.append(f"- {stamp} {p['text']}")
    lines.append("")
lines += [f"---", f"Total narration: {total_words} words across 20 scenes.", ""]
out = ROOT / "docs" / "NARRATION_SCRIPT.md"
out.parent.mkdir(exist_ok=True)
out.write_text("\n".join(lines))
print("wrote", out, "-", total_words, "words")
