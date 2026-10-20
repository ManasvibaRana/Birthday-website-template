import { her, img } from '../data'
import s from './Hero.module.css'

/* Where each floating polaroid sits: [top%, left%, rotation(deg), width(rem)].
   Below 900px only the 1st and 4th survive — top-left and bottom-right — so the
   two that remain still balance each other diagonally. */
const PHOTO_SPOTS = [
  ['14%', '6%', -8, 9],
  ['58%', '4%', 6, 8],
  ['16%', '78%', 9, 8.5],
  ['62%', '80%', -6, 9.5],
]

/* 🎀 CHANGE ME — the petals & sparkles that drift down the hero.
   [emoji, left%, size(rem), duration(s), delay(s)] */
const PETALS = [
  ['🌸', 6, 1.5, 17, 0],
  ['💛', 15, 1.2, 21, 3.5],
  ['🌷', 24, 1.4, 19, 7],
  ['✨', 33, 1.1, 15, 1.5],
  ['🌸', 44, 1.7, 23, 9],
  ['🎀', 55, 1.3, 18, 5],
  ['💛', 66, 1.1, 20, 12],
  ['🌷', 74, 1.5, 16, 2.5],
  ['✨', 83, 1.2, 22, 8],
  ['🌸', 92, 1.35, 19, 4],
]

/* twinkling dots scattered behind the text: [left%, top%, size(px), delay(s)] */
const SPARKS = [
  [10, 24, 5, 0], [22, 62, 3, 1.2], [31, 15, 4, 2.4], [40, 78, 3, 0.6],
  [52, 30, 5, 3.1], [61, 68, 3, 1.8], [70, 20, 4, 0.3], [78, 55, 5, 2.7],
  [88, 34, 3, 1.5], [94, 72, 4, 3.6], [5, 48, 3, 2.1], [46, 88, 4, 4.2],
]

/* The big title is painted with a gradient (background-clip: text), which would
   also flatten any emoji into that gradient. This pulls emoji out into their own
   spans so they keep their real colours. */
const EMOJI_SPLIT = /(\p{Extended_Pictographic}️?)/gu
const EMOJI_TEST = /\p{Extended_Pictographic}/u

function withColourfulEmoji(text) {
  return text
    .split(EMOJI_SPLIT)
    .filter(Boolean)
    .map((part, i) =>
      EMOJI_TEST.test(part) ? (
        <span key={i} className={s.plainEmoji}>
          {part}
        </span>
      ) : (
        part
      )
    )
}

export default function Hero() {
  return (
    <section className={s.hero} id="hero">
      {/* soft aurora blobs drifting behind everything */}
      <div className={s.blobs} aria-hidden="true">
        <span className={s.blob1} />
        <span className={s.blob2} />
        <span className={s.blob3} />
        <span className={s.blob4} />
      </div>

      {/* twinkling stars */}
      <div className={s.sparks} aria-hidden="true">
        {SPARKS.map(([l, t, size, delay], i) => (
          <span
            key={i}
            style={{
              left: `${l}%`,
              top: `${t}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      {/* petals falling gently down the screen */}
      <div className={s.petals} aria-hidden="true">
        {PETALS.map(([e, l, size, dur, delay], i) => (
          <span
            key={i}
            style={{
              left: `${l}%`,
              fontSize: `${size}rem`,
              animationDuration: `${dur}s`,
              animationDelay: `-${delay}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      {/* 📸 her photos, floating around the greeting like pinned polaroids */}
      <div className={s.photoField} aria-hidden="true">
        {her.heroPhotos?.slice(0, 4).map((p, i) => {
          const [top, left, rot, w] = PHOTO_SPOTS[i]
          return (
            <figure
              key={i}
              className={`${s.polaroid} ${i === 1 || i === 2 ? s.polaroidExtra : ''}`}
              style={{
                top,
                left,
                width: `${w}rem`,
                '--rot': `${rot}deg`,
                animationDelay: `${i * 0.9}s`,
              }}
            >
              <img
                src={img(p.src)}
                alt=""
                loading="lazy"
                style={p.focus ? { objectPosition: p.focus } : undefined}
              />
            </figure>
          )
        })}
      </div>

      <div className={s.inner}>
        {/* the spinning badge, with her photo in the middle */}
        <div className={s.badge}>
          <svg className={s.badgeRing} viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path
                id="heroBadgeCircle"
                d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
              />
            </defs>
            <text className={s.badgeText}>
              {/* textLength = the circle's circumference (2π × 74), so whatever
                  text you write is spaced to fill the ring exactly once —
                  no overlap, no gap. */}
              <textPath
                href="#heroBadgeCircle"
                startOffset="0"
                textLength="464"
                lengthAdjust="spacing"
              >
                {her.heroBadge}
              </textPath>
            </text>
          </svg>

          {/* 📸 her photo in the centre — set `heroPhoto` in data.js */}
          <span className={s.badgeGlow} aria-hidden="true" />
          {her.heroPhoto && (
            <img
              className={s.badgePhoto}
              src={img(her.heroPhoto)}
              alt={her.name}
              loading="eager"
              style={her.heroPhotoFocus ? { objectPosition: her.heroPhotoFocus } : undefined}
            />
          )}
          <span className={s.badgeSticker} aria-hidden="true">🎂</span>
        </div>

        <p className={s.kicker}>{her.name}</p>

        <h1 className={s.name}>
          <span className={s.shine}>{withColourfulEmoji(her.heroTitle)}</span>
        </h1>

        <p className={s.subtitle}>{her.heroSubtitle}</p>

        <a
          className={s.cta}
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span>start scrolling</span>
          <span className={s.ctaIcon} aria-hidden="true">💌</span>
        </a>
      </div>

      <div className={s.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
