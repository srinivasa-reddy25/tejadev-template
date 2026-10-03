"""Soundtrack: ende.app 'Business Moves' vol. 10 as the bed, with beat-synced UI foley tucked underneath."""
import json
import re
import subprocess
from pathlib import Path

import numpy as np
import pyloudnorm as pyln
from scipy.io import wavfile
from scipy.ndimage import minimum_filter1d, uniform_filter1d

HERE = Path(__file__).resolve().parent
SFX = Path('/home/user/latent-spaces/brag/skills/brag/assets/sfx')
SR = 48000
C = json.loads(re.search(r"=\s*(\{.*\})\s*;", (HERE.parent / 'site' / 'cues.js').read_text(), re.S).group(1))
DUR = C['duration']
N = int(DUR * SR)
rng = np.random.default_rng(3)


def load(path, dur=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', str(path)] + (['-t', str(dur)] if dur else []) + ['-f', 'f32le', '-ac', '2', '-ar', str(SR), '-']
    a = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).reshape(-1, 2).astype(np.float64)
    return a


def db(x):
    return 10 ** (x / 20)


music = load(HERE / 'track.mp3', DUR)
music = np.vstack([music, np.zeros((max(0, N - len(music)), 2))])[:N]
fx = np.zeros((N, 2))


def place(path, t, gain_db, pan=0.0):
    s = load(path)
    s = s / (np.max(np.abs(s)) + 1e-9) * db(gain_db)
    ang = (pan + 1) * np.pi / 4
    s = s * np.array([np.cos(ang), np.sin(ang)]) * np.sqrt(2)
    i = int(t * SR)
    n = min(len(s), N - i)
    if n > 0:
        fx[i:i + n] += s[:n]


# chores appear, one soft click each, then the strike
for k, t in enumerate(C['chores']):
    place(SFX / 'interface' / f'click_00{1 + k % 5}.ogg', t, -27, pan=-0.2)
for k in range(5):
    place(SFX / 'interface' / 'switch_004.ogg', C['strike'] + k * 0.035, -30 + k, pan=-0.3 + 0.15 * k)
# drop + end hit
place(SFX / 'impact' / 'impactSoft_heavy_000.ogg', C['drop'], -17)
place(SFX / 'impact' / 'impactSoft_heavy_002.ogg', C['endHit'], -16)
# typing (every other character) + enter on each command
CMDS = ['git clone github.com/srinivasa-reddy25/tejadev-template', 'cp .env.example .env', 'bun run dev']
keys = sorted((SFX / 'keyboard').glob('keypress-*.wav'))
for i, cmd in enumerate(CMDS):
    span = 0.62 if i == 0 else 0.3
    n = len(cmd)
    for j in range(0, n, 2):
        place(rng.choice(keys), C['cmds'][i] + span * j / n, -27 + rng.uniform(-2, 1), pan=0.35)
    place(keys[-1], C['cmds'][i] + span + 0.06, -22, pan=0.35)
# servers ready
for t in C['ready']:
    place(SFX / 'interface' / 'select_008.ogg', t, -26, pan=0.3)
# tiles assemble on 16ths, and a soft unison hit
for i in range(12):
    place(SFX / 'interface' / f'click_00{1 + i % 5}.ogg', C['tiles0'] + i * 0.1365, -28 + (i % 4 == 0) * 2, pan=-0.45 + 0.08 * i)
place(SFX / 'impact' / 'impactSoft_medium_001.ogg', 15.82, -27)

mix = music + fx
t = np.arange(N) / SR
fo = np.clip((t - (C['fade'] - 0.5)) / (DUR - C['fade'] + 0.5), 0, 1)
mix *= np.cos(fo * np.pi / 2)[:, None]
mix *= np.clip(t / 0.01, 0, 1)[:, None]
meter = pyln.Meter(SR)
mix *= db(-14.0 - meter.integrated_loudness(mix))
ceil = db(-1.0)
g = np.minimum(1, ceil / (np.max(np.abs(mix), axis=1) + 1e-9))
W = int(0.004 * SR)
g = uniform_filter1d(minimum_filter1d(g, 2 * W + 1), W)
mix *= g[:, None]
print(f'LUFS {meter.integrated_loudness(mix):.1f}  peak {20*np.log10(np.max(np.abs(mix))):.2f} dBFS')
wavfile.write(HERE / 'soundtrack.wav', SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16))
