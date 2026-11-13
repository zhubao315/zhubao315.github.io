#!/usr/bin/env python3
"""Generate ZHUBAO brand field images with the local Qwen-Image-2.1 endpoint.

These are abstract editorial textures (no text, no fake product screenshots).
They are imported by `src/data/brand.ts`, so Astro optimises them at build time
and they never ship as raw 1024px PNGs.

Usage: python3 scripts/generate-brand-images.py
"""
import base64
import json
import os
import urllib.request

API = os.environ.get("IMAGE_API_URL", "http://192.168.1.3:18189/v1/images/generations")
MODEL = os.environ.get("IMAGE_MODEL", "qwen-image-2.1")
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "assets", "brand")

PROMPTS = {
    "field-build": (
        "Minimal abstract architectural blueprint, deep navy background #0B1D33, "
        "thin light sky-blue #38BDF8 modular grid lines, interconnected rectangular modules, "
        "small square nodes, one signal gold #FBBF24 accent dot, Swiss editorial technical drawing, "
        "flat vector aesthetic, precise geometry, generous negative space, no text, no letters, no watermark"
    ),
    "field-think": (
        "Minimal abstract knowledge network on warm paper background #F7F3EA, "
        "deep navy #0B1D33 thin concentric circles and connected nodes, signal gold #FBBF24 accent, "
        "editorial research journal cover, flat vector aesthetic, precise geometry, "
        "generous negative space, no text, no letters, no watermark"
    ),
    "field-measure": (
        "Minimal abstract topographic contour and long-term data trace, warm paper background #F7F3EA, "
        "deep navy #0B1D33 contour lines, mint green #63D6A3 accent, fine measurement ticks and a rising line, "
        "editorial data art, flat vector aesthetic, generous negative space, "
        "no text, no letters, no numbers, no watermark"
    ),
    "field-create": (
        "Minimal abstract geometric composition on warm paper background #F7F3EA, "
        "deep navy #0B1D33 and coral #F97362 overlapping shapes, modular grid, one signal gold #FBBF24 accent, "
        "editorial art poster, flat vector aesthetic, precise geometry, generous negative space, "
        "no text, no letters, no watermark"
    ),
}


def generate(name: str, prompt: str) -> None:
    payload = {"model": MODEL, "prompt": prompt, "size": "1024x1024", "n": 1, "steps": 25}
    request = urllib.request.Request(
        API,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=600) as response:
        body = json.loads(response.read())
    raw = base64.b64decode(body["data"][0]["b64_json"])
    path = os.path.join(OUT, f"{name}.png")
    with open(path, "wb") as handle:
        handle.write(raw)
    print(f"{name}: {len(raw)} bytes -> {path}", flush=True)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for key, value in PROMPTS.items():
        generate(key, value)
