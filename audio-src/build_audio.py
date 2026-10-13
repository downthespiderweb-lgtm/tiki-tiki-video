#!/usr/bin/env python3
"""
Build the complete 400-second soundtrack for the Tiki Tiki pitch video.

  1. Synthesizes ORIGINAL background music (no samples, no third-party audio):
     a mellow 96 BPM tropical-lounge groove whose sections follow the six
     presentation topics (pads, electric piano, plucked "ukulele" arpeggios,
     bass, shaker, hand percussion, a steel-drum motif for the open/close).
  2. Synthesizes subtle sound design: soft whooshes centred on every scene
     boundary, bell accents at each new topic, ocean ambience for the
     opening and closing.
  3. Mixes narration (from generate_narration.py) on top, ducking the music
     under speech, then loudness-normalizes with ffmpeg (-16 LUFS, -1.5 dBTP)
     and fades the ending.

Output: public/audio/tiki-pitch-mix.mp3  (+ stems in audio-src/build/)
Usage : python audio-src/build_audio.py      (run generate_narration.py first)
"""
import json
import pathlib
import subprocess

import numpy as np
import soundfile as sf
from scipy.signal import butter, fftconvolve, resample_poly, sosfilt, sosfiltfilt

ROOT = pathlib.Path(__file__).resolve().parent.parent
BUILD = ROOT / "audio-src" / "build"
OUT = ROOT / "public" / "audio" / "tiki-pitch-mix.mp3"

SR = 44100
SCENES = 20
SCENE_S = 20.0
TOTAL_S = SCENES * SCENE_S
N = int(TOTAL_S * SR)
BPM = 96
BEAT = 60 / BPM            # 0.625 s
BAR = 4 * BEAT             # 2.5 s  -> exactly 8 bars per 20-second scene
rng = np.random.default_rng(7)


# ---------------------------------------------------------------- helpers
def midi(n: float) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


NOTE = {"C": 0, "Db": 1, "D": 2, "Eb": 3, "E": 4, "F": 5, "Gb": 6, "G": 7, "Ab": 8, "A": 9, "Bb": 10, "B": 11}
QUALITY = {
    "maj7": [0, 4, 7, 11], "maj9": [0, 4, 7, 11, 14], "m7": [0, 3, 7, 10], "m9": [0, 3, 7, 10, 14],
    "7": [0, 4, 7, 10], "9": [0, 4, 7, 10, 14], "11": [0, 5, 7, 10, 14], "6": [0, 4, 7, 9], "": [0, 4, 7],
}


def chord(name: str):
    root = name[:2] if len(name) > 1 and name[1] == "b" else name[:1]
    return NOTE[root], QUALITY[name[len(root):]]


def env_adsr(n, a, d, s, r, sr=SR):
    a, d, r = int(a * sr), int(d * sr), int(r * sr)
    e = np.full(n, s, dtype=np.float32)
    a = min(a, n); e[:a] = np.linspace(0, 1, a, endpoint=False)
    dd = min(d, max(0, n - a)); e[a:a + dd] = np.linspace(1, s, dd, endpoint=False)
    rr = min(r, n); e[n - rr:] *= np.linspace(1, 0, rr)
    return e


def add(buf, sig, t, pan=0.0, gain=1.0):
    """Add mono `sig` at time t (s) into stereo buf with constant-power pan."""
    i = int(round(t * SR))
    if i >= buf.shape[0]:
        return
    sig = sig[: buf.shape[0] - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[i:i + len(sig), 0] += sig * l
    buf[i:i + len(sig), 1] += sig * r


def tvec(dur):
    return np.arange(int(dur * SR)) / SR


def lowpass(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x, axis=0)


def highpass(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x, axis=0)


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x, axis=0)


# ---------------------------------------------------------------- instruments
def pad_note(f, dur):
    t = tvec(dur)
    sig = np.zeros_like(t, dtype=np.float32)
    for det in (-0.12, 0.12):
        ff = f * 2 ** (det / 12)
        for h in range(1, 7):
            sig += np.sin(2 * np.pi * ff * h * t + rng.uniform(0, 6.28)) / h ** 1.6
    sig *= 1 + 0.08 * np.sin(2 * np.pi * 0.23 * t)
    return (lowpass(sig, 1800) * env_adsr(len(t), 0.9, 0.5, 0.8, 1.2)).astype(np.float32)


def epiano(f, dur, vel=1.0):
    t = tvec(dur)
    idx = 2.2 * np.exp(-t * 5)
    sig = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    sig += 0.25 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 3)
    return (sig * np.exp(-t * 1.6) * env_adsr(len(t), 0.004, 0.1, 1, 0.12) * vel).astype(np.float32)


def pluck(f, dur=1.4, vel=1.0):
    t = tvec(dur)
    sig = np.zeros_like(t, dtype=np.float32)
    for h in range(1, 9):
        sig += np.sin(2 * np.pi * f * h * t) * np.exp(-t * (2.5 + h * 1.7)) / h ** 0.9
    attack = rng.standard_normal(len(t)) * np.exp(-t * 90) * 0.15
    return ((sig + attack) * env_adsr(len(t), 0.002, 0.05, 1, 0.1) * vel).astype(np.float32)


def bass(f, dur, vel=1.0):
    t = tvec(dur)
    sig = np.sin(2 * np.pi * f * t) + 0.18 * np.sin(2 * np.pi * 2 * f * t)
    return (sig * np.exp(-t * 1.1) * env_adsr(len(t), 0.008, 0.2, 0.85, 0.08) * vel).astype(np.float32)


def steel(f, dur=1.6, vel=1.0):
    t = tvec(dur)
    partials = [(1, 1.0), (2.0, 0.45), (3.0, 0.18), (4.2, 0.12), (5.4, 0.05)]
    sig = sum(a * np.sin(2 * np.pi * f * p * t) * np.exp(-t * (2.2 + p)) for p, a in partials)
    return (sig * env_adsr(len(t), 0.003, 0.05, 1, 0.2) * vel).astype(np.float32)


def shaker(vel=1.0):
    t = tvec(0.09)
    noise = rng.standard_normal(len(t)).astype(np.float32)
    noise = highpass(noise, 6000)
    return (noise * np.exp(-t * 55) * env_adsr(len(t), 0.006, 0.01, 1, 0.02) * vel).astype(np.float32)


def bongo(f, vel=1.0):
    t = tvec(0.28)
    ff = f * (1 + 0.5 * np.exp(-t * 60))
    sig = np.sin(2 * np.pi * np.cumsum(ff) / SR) * np.exp(-t * 18)
    sig += 0.2 * highpass(rng.standard_normal(len(t)), 2000) * np.exp(-t * 120)
    return (sig * vel).astype(np.float32)


def bell(f, dur=2.5, vel=1.0):
    t = tvec(dur)
    idx = 3 * np.exp(-t * 2)
    sig = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * 3.5 * t))
    return (sig * np.exp(-t * 1.8) * env_adsr(len(t), 0.002, 0.05, 1, 0.3) * vel).astype(np.float32)


# ---------------------------------------------------------------- arrangement
# Each section covers whole scenes (8 bars per scene). `bars_per_chord` sets harmonic rhythm.
SECTIONS = [
    # scenes,   progression,                               bars/chord, groove intensity (0-3), steel motif
    ((0, 3),   ["Fmaj7", "Dm7", "Gm7", "C9"],              2, 1, True),   # concept & atmosphere
    ((3, 5),   ["Bbmaj7", "Am7", "Gm7", "C9"],             2, 2, False),  # guests
    ((5, 10),  ["Fmaj7", "Am7", "Bbmaj7", "C7"],           1, 3, False),  # food
    ((10, 14), ["Dm9", "Bbmaj7", "Gm9", "C11"],            2, 2, False),  # beverages
    ((14, 17), ["Gm7", "C9", "Fmaj7", "Dm7"],              2, 0, False),  # financials (sparse)
    ((17, 19), ["Bbmaj7", "C9", "Am7", "Dm7"],             2, 2, False),  # talent
    ((19, 20), ["Fmaj7", "Dm7", "Gm7", "C9"],              2, 1, True),   # closing
]
STEEL_MOTIF = [(0, 12), (0.75, 9), (1.5, 7), (2.5, 9), (3.0, 12), (3.5, 14), (5.0, 12), (6.0, 7)]  # (beat, semis above F4)


def build_music():
    buf = np.zeros((N, 2), dtype=np.float32)
    for (s0, s1), prog, bpc, groove, use_steel in SECTIONS:
        start_bar, end_bar = s0 * 8, s1 * 8
        for b in range(start_bar, end_bar):
            bar_t = b * BAR
            name = prog[((b - start_bar) // bpc) % len(prog)]
            root, ivs = chord(name)
            new_chord = (b - start_bar) % bpc == 0
            # voicing around F3..F4
            voicing = [48 + ((root + iv) % 12) + (12 if (root + iv) % 12 < 5 else 0) for iv in ivs]
            if new_chord:
                for n in voicing:
                    add(buf, pad_note(midi(n), bpc * BAR + 1.0), bar_t, pan=rng.uniform(-0.5, 0.5), gain=0.05)
            # electric piano comping (beats 2 and the "and" of 3)
            if groove >= 1 or b % 2 == 0:
                for beat in ([1, 2.5] if groove >= 1 else [0]):
                    for n in voicing[1:]:
                        add(buf, epiano(midi(n + 12), 0.9, 0.7), bar_t + beat * BEAT, pan=0.25, gain=0.045)
            # bass
            if groove >= 1:
                broot = 36 + root if root < 7 else 24 + root
                add(buf, bass(midi(broot), BEAT * 1.4), bar_t, gain=0.24)
                add(buf, bass(midi(broot + 7), BEAT * 0.9, 0.8), bar_t + 2 * BEAT, gain=0.2)
                add(buf, bass(midi(broot), BEAT * 0.5, 0.7), bar_t + 3.5 * BEAT, gain=0.18)
            else:
                if new_chord:
                    add(buf, bass(midi(36 + root if root < 7 else 24 + root), BAR * 1.5, 0.7), bar_t, gain=0.18)
            # plucked arpeggio (8th notes)
            if groove >= 2:
                arp = voicing + [voicing[1] + 12, voicing[2] + 12]
                for k in range(8):
                    if k in (3, 7) and groove < 3:
                        continue
                    n = arp[[0, 2, 1, 3, 2, 4, 3, 1][k] % len(arp)] + 12
                    add(buf, pluck(midi(n), 1.2, 0.8 if k % 2 else 1.0), bar_t + k * BEAT / 2,
                        pan=-0.35, gain=0.03)
            # percussion
            if groove >= 2:
                for k in range(16):
                    v = 1.0 if k % 4 == 2 else 0.45
                    add(buf, shaker(v), bar_t + k * BEAT / 4 + 0.006 * rng.standard_normal(), pan=0.4, gain=0.022)
            if groove >= 3 or (groove == 2 and b % 2 == 1):
                for beat, f, v in [(1.5, 330, 0.7), (2.75, 250, 0.6), (3.5, 330, 0.8), (3.75, 250, 0.5)]:
                    add(buf, bongo(f, v), bar_t + beat * BEAT, pan=-0.2, gain=0.05)
            # steel-drum motif for opening and closing (every other bar pair)
            if use_steel and (b - start_bar) % 4 == 0:
                for beat, semi in STEEL_MOTIF:
                    add(buf, steel(midi(65 + semi), 1.4, 0.8), bar_t + beat * BEAT, pan=0.15, gain=0.035)

    # final resolving chord in the last scene
    for n in [41, 53, 57, 60, 64, 67]:
        add(buf, pad_note(midi(n), 5.5), TOTAL_S - 5.6, gain=0.05)
    add(buf, steel(midi(77), 3.0, 0.8), TOTAL_S - 5.0, gain=0.05)

    # simple stereo reverb
    ir_t = tvec(1.8)
    ir = np.stack([rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 3.2) for _ in range(2)], axis=1)
    ir = lowpass(ir, 5000) * 0.02
    wet = np.stack([fftconvolve(buf[:, c], ir[:, c])[:N] for c in range(2)], axis=1)
    out = buf + wet * 0.9
    return (out / (np.abs(out).max() + 1e-9) * 0.8).astype(np.float32)


def build_sfx():
    buf = np.zeros((N, 2), dtype=np.float32)
    # soft whoosh centred on every scene boundary
    for k in range(1, SCENES):
        dur = 1.0
        t = tvec(dur)
        noise = rng.standard_normal((len(t), 2)).astype(np.float32)
        centre = 400 + 2600 * np.sin(np.pi * t / dur) ** 2
        out = np.zeros_like(noise)
        for i in range(0, len(t), 512):  # time-varying band-pass, block-wise
            seg = slice(max(0, i - 2048), min(len(t), i + 2560))
            c = centre[min(i, len(t) - 1)]
            filt = bandpass(noise[seg], c * 0.6, min(c * 1.6, SR / 2 - 100))
            j0 = i - seg.start
            out[i:i + 512] = filt[j0:j0 + 512]
        out *= (np.sin(np.pi * t / dur) ** 2)[:, None]
        start = k * SCENE_S - dur / 2
        i = int(start * SR)
        buf[i:i + len(t)] += out * 0.05
    # bell accents at the start of each assignment topic
    topic_starts = [0, 3, 5, 10, 14, 17, 19]
    for s in topic_starts:
        for dt, n in [(0.35, 77), (0.6, 84)]:
            add(buf, bell(midi(n), 2.5, 0.6), s * SCENE_S + dt, pan=0.1, gain=0.035)
    # ocean ambience for opening and closing scenes
    for s in (0, 19):
        dur = SCENE_S
        t = tvec(dur)
        noise = lowpass(rng.standard_normal((len(t), 2)).astype(np.float32), 900)
        swell = 0.5 + 0.5 * np.sin(2 * np.pi * t / 7.5 - np.pi / 2)
        fade = np.minimum(1, np.minimum(t / 2, (dur - t) / 3))
        add_sig = noise * (swell * fade)[:, None] * 0.05
        i = int(s * SCENE_S * SR)
        buf[i:i + len(t)] += add_sig[: N - i]
    return buf


def load_narration():
    buf = np.zeros((N, 2), dtype=np.float32)
    for k in range(SCENES):
        audio, sr = sf.read(BUILD / "narration" / f"s{k + 1:02d}.wav", dtype="float32")
        audio = resample_poly(audio, SR, sr).astype(np.float32)
        audio = highpass(audio, 80)
        i = int(k * SCENE_S * SR)
        seg = audio[: min(len(audio), N - i)]
        buf[i:i + len(seg), 0] += seg
        buf[i:i + len(seg), 1] += seg
    peak = np.abs(buf).max()
    return buf / peak * 0.7


def speech_envelope(narr):
    mono = np.abs(narr[:, 0])
    win = int(0.05 * SR)
    rms = np.sqrt(np.convolve(mono ** 2, np.ones(win) / win, mode="same"))
    active = (rms > 0.01).astype(np.float32)
    # hold through short pauses, then smooth (attack ~0.15 s, release ~0.6 s)
    hold = int(0.5 * SR)
    active = np.convolve(active, np.ones(hold), mode="same") > 0
    sos = butter(1, 1.2, "low", fs=SR, output="sos")
    return np.clip(sosfiltfilt(sos, active.astype(np.float32)), 0, 1).astype(np.float32)


def main():
    BUILD.mkdir(parents=True, exist_ok=True)
    print("music…"); music = build_music()
    print("sfx…"); sfx = build_sfx()
    print("narration…"); narr = load_narration()
    env = speech_envelope(narr)
    duck = (1 - 0.6 * env)[:, None]             # about -8 dB under speech
    mix = narr + music * 0.22 * duck + sfx
    # fade in / out so nothing starts or ends abruptly
    fade_in = np.minimum(1, np.arange(N) / (0.8 * SR))
    fade_out = np.clip((TOTAL_S * SR - np.arange(N)) / (3.5 * SR), 0, 1)
    mix *= (fade_in * fade_out)[:, None]
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)      # gentle soft-clip safety
    for name, sig in [("music", music), ("sfx", sfx), ("narration", narr), ("premaster", mix)]:
        sf.write(BUILD / f"{name}.wav", sig, SR, subtype="PCM_16")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    # two-pass loudness normalization to -16 LUFS integrated, -1.5 dBTP
    probe = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(BUILD / "premaster.wav"), "-af",
         "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
        capture_output=True, text=True).stderr
    stats = json.loads(probe[probe.rindex("{"):probe.rindex("}") + 1])
    af = ("loudnorm=I=-16:TP=-1.5:LRA=11:linear=true:"
          f"measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:"
          f"measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:"
          f"offset={stats['target_offset']}")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(BUILD / "premaster.wav"), "-af", af,
                    "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "192k", "-t", str(TOTAL_S), str(OUT)],
                   check=True)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
