/* ============================================================================
   💛 THE ONLY FILE YOU NEED TO EDIT 💛
   ----------------------------------------------------------------------------
   All the words, photo filenames and the video live here. You should never have
   to open a component to change content.

   PHOTOS/VIDEO: files go in  public/images/  — write the FILENAME ONLY below.
   (Spaces and parentheses in filenames are fine — they get encoded for you.)

   Every slot you can drop a file into is marked with:  📸 PHOTO  /  🎬 VIDEO
   ========================================================================== */

/** Turns a bare filename into a safe URL. Don't edit this. */
export const img = (filename) => `/images/${encodeURIComponent(filename)}`

/* ---------------------------------------------------------------------------
   1. HER  — the hero section
   NOTE: the hero is deliberately photo-free now. The big shimmering greeting,
   the rotating badge and the falling petals carry it. Her photos live in the
   About, Us, Magazine and Gallery sections instead.
   ------------------------------------------------------------------------ */
export const her = {
  name: "Someone",
  nickname: "Someone",
  heroTitle: "Happy Birthday, Someone 💛",
  heroSubtitle: "A little corner of the internet, just for you.",

  // The text that spins around the circular badge. Keep it short and repeat it
  // twice so it fills the whole circle neatly.
  heroBadge: "HAPPY BIRTHDAY · SOMEONE · HAPPY BIRTHDAY · SOMEONE · ",

  // 📸 PHOTO — the round photo in the middle of the spinning badge.
  // A close-up of her face works best in a circle.
  heroPhoto: "WhatsApp Image 2026-07-25 at 15.08.09.jpeg",
  heroPhotoFocus: "center 11%", // nudge if her face sits off-centre

  // 📸 PHOTOS — the little polaroids floating around the hero.
  // 4 is the sweet spot. The last two are hidden on small phones.
  heroPhotos: [
    { src: "WhatsApp Image 2026-07-25 at 15.08.07 (1).jpeg", focus: "center 30%" },
    { src: "WhatsApp Image 2026-07-25 at 13.23.29.jpeg", focus: "center 45%" },
    { src: "WhatsApp Image 2026-07-25 at 15.08.08 (1).jpeg", focus: "center 40%" },
    { src: "WhatsApp Image 2026-07-25 at 13.23.31.jpeg", focus: "center 35%" },
  ],
}

/* ---------------------------------------------------------------------------
   2. ABOUT HER
   ------------------------------------------------------------------------ */
export const about = {
  intro:
    "Some people you meet and forget. Not you — I've known you since before I even knew what the word 'friend' really meant. We grew up in the same society, and somehow across all these years, all the moves, all the chapters — we're still here. Still each other's backbone.",
  traits: [
    "The girl who was always in the top 3 — usually first.",
    "Sang the stuti after aarti like it was made for her voice.",
    "My debate partner, my open-mic partner, my Garba partner.",
    "Now: a medical student — more beautiful, more confident, more her than ever.",
  ],

  // 📸 PHOTO — shown beside the intro. Set to null to hide it.
  photo: "abouther.jpeg",
  // Which part of the photo to keep when it's cropped to fit the frame.
  // Lower the % to show more of the top, raise it for more of the bottom.
  photoFocus: "center 45%",
}

/* ---------------------------------------------------------------------------
   3. FRIENDSHIP TIMELINE
   Each entry takes an optional `photo` AND an optional `video`.
   ------------------------------------------------------------------------ */
export const timeline = [
  {
    year: "The Beginning",
    title: "One Society, Two Kids",
    text: "Same society, same streets. We played together, did Garba together, and became a team without ever announcing it.",
    photo: "WhatsApp Image 2026-07-25 at 15.08.08.jpeg", // 📸 PHOTO
    photoFocus: "center 40%", // tune the crop if a face gets cut off
  },
  {
    year: "The Stage",
    title: "Winners, Always",
    text: "Debates, open-mics, society competitions — one of us always came first, the other close behind. And our dance to 'Why This Kolaveri Di'? Legendary. Still the funniest thing we ever did.",
    photo: "WhatsApp Image 2026-07-25 at 13.23.26 (1).jpeg", // 📸 PHOTO
    photoFocus: "center 35%",
  },
  {
    year: "A Small Storm",
    title: "The Little Fight",
    text: "Around 6th–8th std we fought over something silly and drifted a bit. Even the best pairs get a rough patch. But some bonds are just built to find their way back.",
    photo: null,
  },
  {
    year: "The Comeback",
    title: "Bio for English",
    text: "My 10th, your 11th. You taught me biology, I taught you English and maths. Trading notes and answers, we found our way back to each other. You took 11th science, B group — the medical path.",
    photo: null, // 📸 PHOTO — add a school-era filename here if you find one
  },
  {
    year: "The Hard Chapter",
    title: "The Year That Tested You",
    text: "There was a stretch that tested you like nothing before. People came and went — some who never deserved a place in your story. You went through things that would've broken most people. I had to move houses around then — just 7km, but it felt like a world away when you needed someone. Still, distance never changed whose corner I was in. And I'll always be a little proud of the part I played in clearing the path back to your peace — even if it took you a while to find out it was me. 😉",
    photo: null,
  },
  {
    year: "13 June 2023",
    title: "The Result",
    text: "The drop year after 12th was brutal. You fought through it. And then the result day came — NEET, cleared. Admission to SAL Medical College. I don't think I've ever seen you that happy.",
    // 🎬 VIDEO — the clip from result day. Swap the filename to change it.
    video: "13june.mp4",
    videoCaption: "13 June 2023 — press play 💛",
    photo: null,
  },
  {
    year: "Now",
    title: "Still Here",
    text: "Little fights? Sure. We're normal again in 20 days, every time. Backbone of each other, still. (And yes — you STILL listen to my advice only after ignoring it first and then doing exactly what I said. 🙄❤️)",
    photo: "still here.jpeg", // 📸 PHOTO
    photoFocus: "center 12%", // keeps both faces in the 4:3 window
  },
]

/* ---------------------------------------------------------------------------
   4. REASONS I LOVE YOU  — these become flip cards
   ------------------------------------------------------------------------ */
export const reasons = [
  "You've been in my life longer than almost anyone.",
  "You fight for the people you love — including me.",
  "You never gave up, not even in your hardest year.",
  "You make winning look easy and losing look graceful.",
  "You're the only person I'd do a Kolaveri Di dance with. Twice.",
  "You became everything you fought to become.",
]

/* ---------------------------------------------------------------------------
   5. PENDING PARTY  — the running joke, stamped like a receipt in About
   ------------------------------------------------------------------------ */
export const pendingParty = {
  text: "REMINDER: You promised me a party at PATANG HOTEL after your NEET result. It is still pending. This website is now legal evidence. 🧾",
}

/* ---------------------------------------------------------------------------
   6. THE MAGAZINE  — a flippable, multi-page spread, all about her.
   Each object in `pages` is one full page. Supported `type` values:
     "cover"     → coverStar, tagline, issueLine        (+ photo)
     "contents"  → heading, items[]                     (+ photo)
     "feature"   → headline, subhead, body, pullQuote   (+ photo)
     "portraits" → heading, blurb, shots[{src,label,caption}]
     "facts"     → heading, blurb, facts[{label,value}] (+ photo)
     "letter"    → heading, body, signoff
   Add, remove or reorder pages freely — the counter and dots follow along.
   ------------------------------------------------------------------------ */
export const magazine = {
  title: "THE SOMEONE EDITION",
  issue: "Birthday Special · Vol. 1",
  pages: [
    /* ---- 1. THE COVER ---- */
    {
      type: "cover",
      coverStar: "Someone",
      tagline: "Beauty, brains, and the nerve to go after both",
      issueLine: "Birthday Special Issue",
      // 📸 PHOTO — the cover shot. A full-length or portrait photo works best.
      photo: "WhatsApp Image 2026-07-25 at 15.08.07 (1).jpeg",
      // Which part of the photo to keep when it gets cropped to fit.
      // "center 50%" = middle. Lower the % to show more of the top of the photo,
      // raise it to show more of the bottom. Only tweak this if a swapped-in
      // photo ends up badly cropped.
      photoFocus: "center 38%",
    },

    /* ---- 2. CONTENTS ---- */
    {
      type: "contents",
      heading: "Inside This Issue",
      items: [
        "01 — Cover Star: Someone",
        "02 — Beauty With Brains",
        "03 — Off Duty: The Style File",
        "04 — Garba Nights to Med School",
        "05 — Someone, At A Glance",
        "06 — The Comeback Story",
        "07 — Letter To The Birthday Girl",
      ],
      photo: "WhatsApp Image 2026-07-25 at 15.08.07.jpeg", // 📸 PHOTO
    },

    /* ---- 3. THE HEADLINE FEATURE ---- */
    {
      type: "feature",
      headline: "Beauty With Brains",
      subhead: "An unfair combination, and she wears it like it's nothing",
      body: "Let's start with the obvious, because she never will. She is stunning — the kind of pretty that makes strangers look twice and friends give up on taking a bad photo of her. She will roll her eyes at that sentence. She will also reread it. But the part she actually earned is the part she never mentions: the ranks, the top 3s, the NEET score, the white coat waiting at the end of it. Pretty is the first thing you notice about her. It is nowhere near the most impressive.",
      pullQuote: "Pretty enough to stop the conversation. Sharp enough to end it.",
      photo: "WhatsApp Image 2026-07-25 at 15.08.09.jpeg", // 📸 PHOTO
      photoFocus: "center 40%",
    },

    /* ---- 4. PHOTO SPREAD ---- */
    {
      type: "portraits",
      heading: "Off Duty",
      blurb: "A completely unbiased review of her greatest looks.",
      // 📸 PHOTOS — 3 works best. Add a 4th and the row still fits.
      shots: [
        {
          src: "WhatsApp Image 2026-07-25 at 13.23.29.jpeg",
          label: "Look 01",
          caption: "Red saree, zero effort, total devastation.",
        },
        {
          src: "WhatsApp Image 2026-07-25 at 15.08.08 (1).jpeg",
          label: "Look 02",
          caption: "Cake, bouquet, main character energy. No notes.",
        },
        {
          src: "WhatsApp Image 2026-07-25 at 13.31.16.jpeg",
          label: "Look 03",
          caption: "Says she looks weird in this one. She is wrong, as usual.",
        },
      ],
    },

    /* ---- 5. THE ORIGIN STORY ---- */
    {
      type: "feature",
      headline: "Garba Nights to Med School",
      subhead: "The origin story of a girl who has been winning since she was this tall",
      body: "Long before the white coat, there were Navratri nights and a stage. Garba till her feet hurt, the aarti and the stuti after, fancy-dress competitions won with a plastic sword and total conviction, debate trophies, and a dance to Kolaveri Di that nobody who saw it has ever managed to forget. She was the kid who was always in the top 3 — usually first — and somehow still the one everyone wanted on their team. Nothing about the girl in these photos has actually changed. She just got taller, louder, and considerably harder to argue with.",
      pullQuote: "Always in the top 3. Usually first.",
      photo: "WhatsApp Image 2026-07-25 at 15.08.08.jpeg", // 📸 PHOTO
    },

    /* ---- 6. THE FACT FILE ---- */
    {
      type: "facts",
      heading: "Someone, At A Glance",
      blurb: "The official file. Compiled entirely without her permission.",
      facts: [
        { label: "Full name", value: "Someone — 'Nickname' to the people who matter" },
        { label: "Currently", value: "Medical student, SAL Medical College" },
        { label: "Known for", value: "Being the prettiest person in the room and the smartest one in it" },
        { label: "Academic record", value: "Top 3. Usually first. Never once mentions it." },
        { label: "Signature move", value: "Ignoring my advice, then doing exactly what I said" },
        { label: "Range", value: "Aarti and stuti at Navratri, Kolaveri Di on stage" },
        { label: "Superpower", value: "Surviving a year that should have broken her" },
        { label: "Outstanding dues", value: "One (1) party. Patang Hotel. Still pending." },
      ],
      photo: "WhatsApp Image 2026-07-25 at 15.08.09 (2).jpeg", // 📸 PHOTO
    },

    /* ---- 7. THE COMEBACK ---- */
    {
      type: "feature",
      headline: "The Comeback Story",
      subhead: "13 June 2023 — the day it all paid off",
      body: "A drop year is a lonely, brutal thing. It tests everything you're made of, quietly, for months, with nobody watching. She fought through it and came out the other side with a NEET result that opened the doors to SAL Medical College. Some people talk about resilience. She went and did it, then acted like it was no big deal. It was a very big deal. The white coat in this photo is the receipt.",
      pullQuote: "She didn't just bounce back. She levelled up.",
      photo: "WhatsApp Image 2026-07-25 at 13.27.02.jpeg", // 📸 PHOTO — the SAL lab coat
      photoFocus: "center 22%",
    },

    /* ---- 8. THE LETTER ---- */
    {
      type: "letter",
      heading: "A Letter To The Birthday Girl",
      body: "Birthday girl — through every chapter, every fight, every 7km, every silly 20-day cold war, you've stayed my person and I've stayed yours. You're more beautiful, more confident, and happier than ever — and I pray it stays that way forever. Happy birthday. Now about that Patang Hotel party…",
      signoff: "— Your backbone, always",
    },
  ],
}

/* ---------------------------------------------------------------------------
   7. US  — the closing section, just about the two of you
   ------------------------------------------------------------------------ */
export const us = {
  label: "and finally",
  title: "us",
  heading: "i love you, someone",

  // 📸 PHOTO — the big collage of the two of you
  photo: "us.jpeg",
  photoCaption: "every version of us 💛",

  body: [
    "I am not good at saying this out loud, so I built a whole website instead, which is arguably worse.",
    "We were two kids in the same society who never actually decided to be best friends — it just happened, and then it never stopped happening. Through the fights, the drift, the 7km, the years where life got heavy for both of us in different ways. You have been the one constant thing.",
    "Thank you for every late night, every terrible idea we went through with, and every single time you made me feel less alone. You are the best part of a lot of my favourite memories.",
    "So: I love you. Obnoxiously, permanently, annoyingly. I hope this year is soft on you. I hope you get everything you've been quietly hoping for. And I hope you never forget how loved you are.",
  ],

  signoff: "happy birthday, someone 💛",
  from: "— your backbone, always",

  // little sticky notes scattered around the section
  notes: [
    "still your person",
    "20 days, every time",
    "backbone of each other",
    "patang hotel pending 🧾",
  ],
}

/* ---------------------------------------------------------------------------
   8. GALLERY  📸
   Add `wide: true` to any landscape photo so it spans two columns.
   ------------------------------------------------------------------------ */
export const gallery = [
  { src: "us.jpeg", caption: "us, always", wide: true },

  // --- the newest set ---
  { src: "still here.jpeg", caption: "still here, still us 🫂" },
  { src: "abouther.jpeg", caption: "the one that says it all 💛" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.07 (1).jpeg", caption: "cover star behaviour" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.09.jpeg", caption: "flowers, but make it her" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.07.jpeg", caption: "the face she makes" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.08 (1).jpeg", caption: "cake and main character energy" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.09 (1).jpeg", caption: "black and white, still unfair" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.08.jpeg", caption: "the original icon" },
  { src: "WhatsApp Image 2026-07-25 at 15.08.09 (2).jpeg", caption: "warrior since day one ⚔️" },

  // --- the saree edit ---
  { src: "WhatsApp Image 2026-07-25 at 13.23.29.jpeg", caption: "the red saree. that's the whole caption. ❤️" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.30 (1).jpeg", caption: "the over-the-shoulder look" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.29 (1).jpeg", caption: "shy smile, absolutely zero shyness" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.28 (1).jpeg", caption: "sunlight was invented for this face" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.30.jpeg", caption: "blue saree supremacy 💙" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.29 (2).jpeg", caption: "pink, with a whole flower wall to match 🌸" },

  // --- doctor era ---
  { src: "WhatsApp Image 2026-07-25 at 13.27.02.jpeg", caption: "the white coat she earned 🩺" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.27.jpeg", caption: "blazer on, unbothered" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.31.jpeg", caption: "her car, her McDonald's, her rules 🚗" },

  // --- the everyday ones ---
  { src: "WhatsApp Image 2026-07-25 at 13.31.16.jpeg", caption: "just a girl and her favourite tree 🌿" },
  { src: "WhatsApp Image 2026-07-25 at 13.27.03.jpeg", caption: "golden hour and a very good wall" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.30 (2).jpeg", caption: "rocks, river, mehendi hands" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.26.jpeg", caption: "caught mid-bite, zero regrets 🍔" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.27 (1).jpeg", caption: "the pink hoodie era 😎" },
  { src: "WhatsApp Image 2026-07-25 at 13.31.30.jpeg", caption: "Holi. unintentionally recreated. 😭" },

  // --- the throwbacks ---
  { src: "WhatsApp Image 2026-07-25 at 13.23.26 (1).jpeg", caption: "another prize, obviously 🏅" },
  { src: "WhatsApp Image 2026-07-25 at 13.23.27 (2).jpeg", caption: "exhibit A: always been this cute 🍼" },
]
