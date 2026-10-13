# Final Render Verification

Generated 2026-10-13 with `python3 scripts/verify_video.py`.

## deliverables/tiki-tiki-pitch.mp4 (committed, 74 MB)

```
[PASS] Container                mov,mp4,m4a,3gp,3g2,mj2
[PASS] Video codec              h264
[PASS] Resolution 1920×1080     1920×1080
[PASS] Frame rate 30 fps        30/1
[PASS] Total frames 12,000      12,000
[PASS] Duration 400 s (6:40)    400.000 s (container 400.000 s)
[PASS] Scenes × frames          20 scenes × 600 frames
[PASS] Audio stream present     aac
[PASS] Audio in every scene     silent scenes: none
```

Re-encoded from the Remotion master (`out/tiki-tiki-pitch.mp4`, 243 MB, H.264 CRF 18 — too large for GitHub's 100 MB limit) with x264 preset slow, CRF 21; audio stream copied unchanged. SSIM vs master (100–140 s sample): 0.992.

## Audio

- Integrated loudness −16.4 LUFS, true peak −1.6 dBFS (EBU R128 measured on the rendered MP4).
- Narration in all 20 scenes; each scene's narration starts at +0.75 s and ends by +19.35 s.
- Music ducked ≈ 8 dB under speech (≈ 13–14 dB below narration level); 3.5 s fade-out ending at 6:40.
