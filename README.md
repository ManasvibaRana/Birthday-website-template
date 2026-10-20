# 💛 Someone's Birthday Site

A soft, pastel, interactive birthday site — React + Vite, plain CSS Modules, builds to static files.

---

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually **http://localhost:5173**).

To check the real production build before deploying:

```bash
npm run build
npm run preview
```

---

## The password

Open [src/components/Login.jsx](src/components/Login.jsx) and change one line:

```js
const MAGIC_WORD = '123456'
```

- Numbers or a word both work. Words are **case-insensitive** and
  space-forgiving — `rose`, `ROSE` and ` Rose ` would all unlock it.
- The **row of boxes** on the page matches the length of whatever you put
  here — 6 characters, 6 boxes — and they light up gold as she types.
- The **hint** on the page is the `HINT` constant just below it.

This is client-side only and purely decorative — anyone who views the page source
can read it. Fine for a birthday surprise; don't put anything private behind it.

---

## Changing the content

**Everything lives in [src/data.js](src/data.js).** You should not need to open a
single component. It's split into 7 labelled sections:

| Section in `data.js` | Controls |
| --- | --- |
| `her` | name, nickname, hero title/subtitle, badge text, hero photos |
| `about` | the intro paragraph, the list of traits, the photo beside it |
| `timeline` | the friendship timeline (`year` / `title` / `text` / `photo` / `video`) |
| `reasons` | the flip cards — one string per card |
| `pendingParty` | the Patang Hotel receipt joke in the About section |
| `magazine` | the flippable multi-page magazine (see below) |
| `us` | the closing "i love you" section — photo, letter, sticky notes |
| `gallery` | the photo grid + lightbox |

The hero uses `her.heroPhoto` (the round photo inside the spinning badge) and
`her.heroPhotos` (the polaroids floating around it — 4 on desktop, 2 on a phone).

Anywhere a component has hardcoded copy (section subtitles, nav labels, footer),
it's marked with a `🎀 CHANGE ME` comment.

### The magazine

`magazine.pages` is an array — **each entry is one full page**, and the page
counter, the dots and the arrows all follow it automatically. Add, remove or
reorder pages freely. Four page types are supported:

| `type` | Fields it uses | Looks like |
| --- | --- | --- |
| `"cover"` | `coverStar`, `tagline`, `issueLine`, `photo` | full-bleed cover with masthead + sticker |
| `"contents"` | `heading`, `items[]`, `photo` | table of contents with dotted leaders |
| `"feature"` | `headline`, `subhead`, `body`, `pullQuote`, `photo` | two-column article, drop cap, pull quote |
| `"portraits"` | `heading`, `blurb`, `shots[{src,label,caption}]` | tilted polaroid photo spread |
| `"facts"` | `heading`, `blurb`, `facts[{label,value}]`, `photo` | fact-file with dashed rules |
| `"letter"` | `heading`, `body`, `signoff` | handwritten note on ruled paper |

`contents` items are written as `"01 — Cover Star: Someone"` — the part before the
dash becomes the big gold page number. Plain strings without a dash work too.

Readers turn pages with the arrows, the dots, a **swipe** on mobile, or the
**← / →** keys while the magazine is on screen.

**Every page is exactly the same size**, like a real magazine — the height is
fixed in `.stage` in [Magazine.module.css](src/components/Magazine.module.css).
On desktop all eight pages fit inside it. If you add a lot of copy to a page it
scrolls inside its own page rather than stretching the book out of shape; a slim
pink scrollbar appears on that page when that happens. To give every page more
room, raise the `height` on `.stage`.

### Adding photos

1. Drop the image files into [public/images/](public/images/)
2. Add the **filename only** wherever `data.js` says `📸 PHOTO`. Search the file
   for `📸` to find every slot.

```js
{ src: 'beach-day.jpg', caption: 'the sunburn trip' },
{ src: 'birthday-2023.jpg', caption: 'cake incident', wide: true },  // wide = spans 2 columns
```

Spaces and parentheses in filenames are handled automatically — no renaming needed.
Any `photo: null` just hides that photo, so you can fill them in one at a time.

**If a photo looks badly cropped**, add a `photoFocus` next to it — it's just a
CSS `object-position`. `"center 50%"` is the middle; lower the number to show
more of the top of the photo, raise it to show more of the bottom:

```js
photo: "her-in-the-red-saree.jpg",
photoFocus: "center 35%",   // her face was getting cut off at the top
```

Supported on the hero photos, the About photo, every timeline entry, the
magazine cover and any `feature` page. Several of the WhatsApp photos have black
letterbox bars baked in, and `photoFocus` is what crops them out.

### Adding a video

Timeline entries take a `video` (and an optional `videoCaption`) as well as a
`photo`. The 13 June 2023 entry uses `13june.mp4`; it renders in a portrait,
phone-shaped frame with normal playback controls. Any web-playable file works —
`.mp4` is safest.

**Tip:** a few of the photos in `public/images/` are 2–3 MB. If the site feels slow
on mobile data, resize them to ~1600px wide before uploading.

---

## Deploy to Vercel

### Option A — CLI (fastest)

```bash
npm i -g vercel
vercel login
vercel          # preview deploy, answer the prompts with the defaults
vercel --prod   # then push it live
```

When it asks: **framework = Vite**, **build command = `npm run build`**,
**output directory = `dist`**. Those are already set in [vercel.json](vercel.json),
so just press Enter through them.

### Option B — GitHub (auto-deploys on every push)

```bash
git init
git add .
git commit -m "birthday site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then go to **vercel.com → Add New → Project → import the repo → Deploy**.
Vercel detects Vite automatically. Every future `git push` redeploys it.

> Heads up: photos and videos are **not** in this repo — `public/images/` is
> gitignored. Add your own there (and point `data.js` at them) before you
> deploy, or the site will show empty frames.

---

## Structure

```
public/images/          all photos live here
src/
  data.js               ← the only file you need to edit
  App.jsx               composes the sections, handles the unlock + confetti
  styles/global.css     colours, fonts, shared section styles, scroll-reveal
  hooks/
    useScrollReveal.js  adds .isVisible to .reveal elements on scroll
  components/
    Login.jsx           the password gate (MAGIC_WORD lives here)
    Nav.jsx             floating nav with scroll-spy
    Hero.jsx            shimmering greeting, rotating badge, petals, sparkles
    About.jsx           intro + traits + the Patang Hotel receipt
    Reasons.jsx         3D flip cards
    Timeline.jsx        vertical timeline (photos + the 13 June video)
    Gallery.jsx         photo grid
    Lightbox.jsx        full-screen viewer (arrow keys + Esc work)
    Magazine.jsx        the multi-page magazine + all six page layouts
    Us.jsx              the closing "i love you" section
```

To change the colour scheme, edit the variables at the top of
[src/styles/global.css](src/styles/global.css) — the whole site follows them.
