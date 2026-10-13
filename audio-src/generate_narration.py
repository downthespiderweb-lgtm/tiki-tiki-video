#!/usr/bin/env python3
"""
Generate the scene-by-scene narration with Kokoro TTS (Apache-2.0, runs offline).

Input : narration/script.json
Output: audio-src/build/narration/sNN.wav           (one 20-second track per scene)
        src/compositions/TikiPitch/data/cues.generated.json  (phrase start times, seconds
                                                              from the start of each scene)

Each phrase is synthesized separately and placed on the timeline, so the visual
reveals in Remotion are driven by the real narration timing, not estimates.

Model files (download once into audio-src/models/):
  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin

Usage: python audio-src/generate_narration.py
"""
import json
import pathlib
import re
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = pathlib.Path(__file__).resolve().parent.parent
MODELS = ROOT / "audio-src" / "models"
OUT_DIR = ROOT / "audio-src" / "build" / "narration"
CUES_FILE = ROOT / "src" / "compositions" / "TikiPitch" / "data" / "cues.generated.json"

SR = 24000
SCENE_SECONDS = 20.0
LEAD_IN = 0.75          # silence before the first phrase of each scene
PHRASE_GAP = 0.24       # pause between phrases
LATEST_END = 19.35      # narration must finish before this point in the scene
BASE_SPEED = 1.0
MAX_SPEED = 1.12


# Phonetic respellings so the speech model pronounces names correctly.
# Applied only to the text sent to TTS; the script keeps the real spelling.
PRONUNCIATIONS = {
    r"\bTiki\b": "Teekee",
    r"\b[Pp]oke\b": "pohkay",
    r"\bTajín\b": "tahheen",
    r"\bcuraçao\b": "kyurasow",
    r"\bMahalo\b": "Mahahlo",
    r"\bPacifico\b": "Pahseefeeko",
    r"\bCazadores\b": "Cahsadoress",
    r"\bEspolòn\b": "Espohlone",
    r"\borgeat\b": "orzhah",
    r"\bPOS\b": "P.O.S.",
    r"\b[Cc]reme brulee\b": "krem broo-lay",
}


def respell(text: str) -> str:
    for pattern, replacement in PRONUNCIATIONS.items():
        text = re.sub(pattern, replacement, text)
    return text


def trim_silence(audio: np.ndarray, threshold: float = 0.004) -> np.ndarray:
    idx = np.where(np.abs(audio) > threshold)[0]
    if len(idx) == 0:
        return audio
    start = max(0, idx[0] - int(0.02 * SR))
    end = min(len(audio), idx[-1] + int(0.06 * SR))
    return audio[start:end]


def synth(kokoro: Kokoro, text: str, voice: str, speed: float) -> np.ndarray:
    audio, sr = kokoro.create(text, voice=voice, speed=speed, lang="en-us")
    assert sr == SR, sr
    return trim_silence(audio.astype(np.float32))


def main() -> None:
    script = json.loads((ROOT / "narration" / "script.json").read_text())
    voice = script["voice"]
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    cues: dict = {}
    report = []
    for scene in script["scenes"]:
        speed = BASE_SPEED
        while True:
            clips = [synth(kokoro, respell(p.get("tts", p["text"])), voice, speed) for p in scene["phrases"]]
            total = LEAD_IN + sum(len(c) / SR for c in clips) + PHRASE_GAP * (len(clips) - 1)
            if total <= LATEST_END or speed >= MAX_SPEED:
                break
            speed = min(MAX_SPEED, round(speed * (total / LATEST_END) * 1.01, 3))

        track = np.zeros(int(SCENE_SECONDS * SR), dtype=np.float32)
        t = LEAD_IN
        scene_cues = {}
        for phrase, clip in zip(scene["phrases"], clips):
            start = int(round(t * SR))
            track[start:start + len(clip)] += clip[: len(track) - start]
            if "cue" in phrase:
                scene_cues[phrase["cue"]] = round(t, 3)
            t += len(clip) / SR + PHRASE_GAP
        end = t - PHRASE_GAP
        scene_cues["_end"] = round(end, 3)
        cues[scene["id"]] = scene_cues

        sf.write(OUT_DIR / f"{scene['id']}.wav", track, SR, subtype="PCM_16")
        words = sum(len(p["text"].split()) for p in scene["phrases"])
        report.append((scene["id"], words, speed, end))
        status = "OK" if end <= LATEST_END else "TOO LONG"
        print(f"{scene['id']}: {words:2d} words  speed {speed:.3f}  ends {end:5.2f}s  {status}")

    CUES_FILE.parent.mkdir(parents=True, exist_ok=True)
    CUES_FILE.write_text(json.dumps(cues, indent=2) + "\n")
    if any(r[3] > LATEST_END for r in report):
        sys.exit("Some scenes are too long — shorten their text in narration/script.json.")


if __name__ == "__main__":
    main()
