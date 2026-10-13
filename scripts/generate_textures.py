#!/usr/bin/env python3
"""
Procedurally generate the original background textures used by the pitch video.
No photographs or third-party images are used.

Output (public/textures/):
  wood.jpg   warm teak tabletop planks (food "photography" surface)
  paper.jpg  warm cream paper with soft fibres (editorial panels)
  slate.jpg  dark green-charcoal slate (cocktail / bar surface)
  grain.jpg  film-grain plate overlaid (blend: overlay) on every scene

Usage: python scripts/generate_textures.py   (needs numpy, scipy, pillow)
"""
import pathlib

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, zoom

OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "textures"
rng = np.random.default_rng(42)


def value_noise(h, w, cell, octaves=4):
    out = np.zeros((h, w))
    amp, total = 1.0, 0.0
    for o in range(octaves):
        c = max(2, int(cell / 2 ** o))
        small = rng.random((h // c + 3, w // c + 3))
        big = zoom(small, c, order=3)[:h, :w]
        out += big * amp
        total += amp
        amp *= 0.5
    return out / total


def save(arr, name, quality=88):
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    img.save(OUT / name, quality=quality)


def wood(h=1080, w=1920):
    plank_w = 240
    img = np.zeros((h, w, 3))
    base = np.array([138, 88, 54], dtype=float)
    y = np.arange(h)[:, None]
    for i, x0 in enumerate(range(0, w, plank_w)):
        x = np.arange(x0, min(w, x0 + plank_w))[None, :]
        warp = value_noise(h, len(x[0]), 420, 2) * 14
        rings = np.sin((x - x0 + warp + rng.uniform(0, 100)) / rng.uniform(3.5, 6)) * 0.5 + 0.5
        fine = gaussian_filter(rng.standard_normal((h, len(x[0]))), (45, 0.7))
        fine = (fine - fine.min()) / (fine.max() - fine.min())
        tone = rng.uniform(0.82, 1.12)
        shade = (0.76 + 0.1 * rings + 0.24 * fine) * tone
        plank = base[None, None, :] * shade[..., None]
        plank[:, :2] *= 0.55          # seams between planks
        img[:, x0:x0 + plank.shape[1]] = plank
    img *= (0.9 + 0.1 * value_noise(h, w, 400, 2))[..., None]
    save(gaussian_filter(img, (0.6, 0.6, 0)), "wood.jpg")


def paper(h=1080, w=1920):
    base = np.array([244, 236, 221], dtype=float)
    blot = value_noise(h, w, 300, 3)
    fibres = gaussian_filter(rng.standard_normal((h, w)), (0.6, 3.0))
    shade = 0.965 + 0.035 * blot + 0.008 * fibres
    save(base[None, None, :] * shade[..., None], "paper.jpg", 90)


def slate(h=1080, w=1920):
    base = np.array([28, 38, 34], dtype=float)
    cloud = value_noise(h, w, 260, 4)
    streak = gaussian_filter(rng.standard_normal((h, w)), (1.0, 14))
    shade = 0.8 + 0.35 * cloud + 0.05 * streak
    save(base[None, None, :] * shade[..., None], "slate.jpg")


def grain(w=2112, h=1272):
    """Oversized so it can be shifted a few pixels each frame without showing edges."""
    noise = gaussian_filter(rng.standard_normal((h, w)), 0.55)
    noise = (noise - noise.min()) / (noise.max() - noise.min())
    Image.fromarray((noise * 255).astype(np.uint8), mode="L").save(OUT / "grain.jpg", quality=80)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    wood(); paper(); slate(); grain()
    print("textures written to", OUT)
