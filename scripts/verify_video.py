#!/usr/bin/env python3
"""
Verify a rendered pitch MP4 against the PechaKucha requirements.

Usage: python3 scripts/verify_video.py out/tiki-tiki-pitch.mp4
Checks: 1920×1080, 30 fps, exactly 12,000 frames, 400.0 s, H.264 MP4, an audio stream,
and that audio is present (not silent) in all 20 scene windows.
"""
import json
import subprocess
import sys

path = sys.argv[1] if len(sys.argv) > 1 else "out/tiki-tiki-pitch.mp4"
SCENES, SCENE_S, FPS = 20, 20, 30


def probe(args):
    return json.loads(subprocess.run(["ffprobe", "-v", "error", "-of", "json", *args, path], capture_output=True, text=True, check=True).stdout)


info = probe(["-count_frames", "-show_streams", "-show_format"])
video = next(s for s in info["streams"] if s["codec_type"] == "video")
audio = [s for s in info["streams"] if s["codec_type"] == "audio"]
frames = int(video["nb_read_frames"])
num, den = map(int, video["r_frame_rate"].split("/"))
duration = frames / (num / den)

results = [
    ("Container", info["format"]["format_name"].startswith("mov,mp4"), info["format"]["format_name"]),
    ("Video codec", video["codec_name"] == "h264", video["codec_name"]),
    ("Resolution 1920×1080", (video["width"], video["height"]) == (1920, 1080), f'{video["width"]}×{video["height"]}'),
    ("Frame rate 30 fps", num / den == FPS, video["r_frame_rate"]),
    ("Total frames 12,000", frames == SCENES * SCENE_S * FPS, f"{frames:,}"),
    ("Duration 400 s (6:40)", abs(duration - 400) < 1e-6, f"{duration:.3f} s (container {float(info['format']['duration']):.3f} s)"),
    ("Scenes × frames", frames == SCENES * SCENE_S * FPS, f"{SCENES} scenes × {SCENE_S * FPS} frames"),
    ("Audio stream present", bool(audio), audio[0]["codec_name"] if audio else "none"),
]

if audio:
    silent = []
    for k in range(SCENES):
        out = subprocess.run(
            ["ffmpeg", "-hide_banner", "-ss", str(k * SCENE_S + 1), "-t", "17", "-i", path, "-vn", "-af", "volumedetect", "-f", "null", "-"],
            capture_output=True, text=True).stderr
        mean = float(out.split("mean_volume:")[1].split("dB")[0])
        if mean < -45:
            silent.append(k + 1)
    results.append(("Audio in every scene", not silent, "silent scenes: " + (", ".join(map(str, silent)) or "none")))

ok = True
for name, passed, detail in results:
    ok &= passed
    print(f"[{'PASS' if passed else 'FAIL'}] {name:24s} {detail}")
sys.exit(0 if ok else 1)
