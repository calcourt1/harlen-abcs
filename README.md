# Harlen's ABCs

A picture-book alphabet: one page for every letter, a short line about Harlen, and a button that reads the page aloud in the device voice.

Open `index.html` in a browser, or serve the folder so the letter list can load:

```bash
python3 -m http.server 8765
```

Then visit `http://127.0.0.1:8765`.

Arrow keys turn pages. Letter keys jump. Escape goes back to the cover.

## GitHub Pages

After this is on `main`, turn on Pages for the site at `https://calcourt1.github.io/harlen-abcs/`:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Set the branch to `main` and the folder to `/ (root)`, then save.

The `.nojekyll` file keeps GitHub from running the files through Jekyll.
