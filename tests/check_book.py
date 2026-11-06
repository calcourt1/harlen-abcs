#!/usr/bin/env python3
"""Check the alphabet data and that every letter has a picture."""

import json
import pathlib
import re
import sys

root = pathlib.Path(__file__).resolve().parents[1]
letters = json.loads((root / "letters.json").read_text())
scenes = (root / "js" / "scenes.js").read_text()
html = (root / "index.html").read_text()
css = (root / "css" / "book.css").read_text()

errors = []
expected = [chr(code) for code in range(ord("A"), ord("Z") + 1)]
found = [entry["letter"] for entry in letters]

if found != expected:
    errors.append(f"letters are {found}, expected A through Z in order")

hex_color = re.compile(r"^#[0-9a-fA-F]{6}$")
for entry in letters:
    for field in ("word", "sentence", "wash", "accent", "deep"):
        if not str(entry.get(field, "")).strip():
            errors.append(f"{entry['letter']} is missing {field}")
    if "Harlen" not in entry["sentence"] and entry["word"] != "Harlen":
        errors.append(f"{entry['letter']} sentence never mentions Harlen")
    for field in ("wash", "accent", "deep"):
        if field in entry and not hex_color.match(entry[field]):
            errors.append(f"{entry['letter']} {field} is not a hex color")
    if not re.search(rf"\b{entry['letter']}:", scenes):
        errors.append(f"no picture for {entry['letter']}")

for needle in ("./js/book.js", "./css/book.css", "./letters.json"):
    if needle.endswith("letters.json"):
        continue
    if needle not in html:
        errors.append(f"index.html does not reference {needle}")

if "100dvh" not in css:
    errors.append("css lost the full-height book layout")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print(f"ok: {len(letters)} letters, pictures, and page shell")
