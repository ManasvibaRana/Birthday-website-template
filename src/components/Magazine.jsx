import { useState, useRef, useEffect, useCallback } from 'react'
import { magazine, her, img } from '../data'
import s from './Magazine.module.css'

const TURN_MS = 900 // must match --turn in Magazine.module.css

export default function Magazine() {
  const pages = magazine.pages
  const [index, setIndex] = useState(0)
  // while a turn plays: { dir, from, to }
  const [turn, setTurn] = useState(null)
  const turning = useRef(false)
  const stageRef = useRef(null)
  const inView = useRef(false)
  const timer = useRef(null)

  /* --- turning pages ------------------------------------------------------ */
  const goTo = useCallback(
    (target, wayHint) => {
      if (turning.current) return // ignore clicks mid-turn, like a real page
      const t = ((target % pages.length) + pages.length) % pages.length
      if (t === index) return
      // wayHint keeps the animation going the right way when we wrap around
      const way = wayHint ?? (t > index ? 'next' : 'prev')
      turning.current = true
      setTurn({ dir: way, from: index, to: t })
      setIndex(t)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setTurn(null)
        turning.current = false
      }, TURN_MS)
    },
    [index, pages]
  )

  const prev = useCallback(() => goTo(index - 1, 'prev'), [goTo, index])
  const next = useCallback(() => goTo(index + 1, 'next'), [goTo, index])

  useEffect(() => () => clearTimeout(timer.current), [])

  /* --- arrow keys, but only while the magazine is actually on screen ------- */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    const onKey = (e) => {
      if (!inView.current) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      io.disconnect()
      window.removeEventListener('keydown', onKey)
    }
  }, [prev, next])

  /* --- swipe on touch devices --------------------------------------------- */
  const touch = useRef({ x: 0, y: 0 })
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    // horizontal swipes only, so vertical scrolling still feels normal
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dx < 0 ? next() : prev()
    }
  }

  /* The book is open at a spread, with the spine down the middle. Each entry in
     data.js is one full spread, so its layout runs across both halves.

     A turning leaf is ONE physical sheet: its front is the right half of the
     page you're leaving, its back is the left half of the page you're going to.
     That's literally how paper works, and it's what makes the turn read right.

       nearPage — the sheet being turned. Its left half stays on the left of the
                  book; its right half rides away on the leaf.
       farPage  — the sheet being revealed. Its right half is already sitting on
                  the right of the book; its left half arrives on the leaf's back.

     At rest both are the same page, so the spread shows one complete layout. */
  const nearPage = turn ? (turn.dir === 'next' ? pages[turn.from] : pages[turn.to]) : pages[index]
  const farPage = turn ? (turn.dir === 'next' ? pages[turn.to] : pages[turn.from]) : pages[index]

  return (
    <section className={s.wrap} id="magazine">
      <div className="section">
        <p className="sectionLabel reveal">chapter five</p>
        <h2 className="sectionTitle reveal">the birthday issue</h2>
        <div className="divider reveal">✦</div>
        <p className="sectionIntro reveal">
          {/* 🎀 CHANGE ME */}
          {pages.length} pages, all about you — flip through them
        </p>

        <div className={`${s.book} reveal`}>
          <div
            className={s.stage}
            ref={stageRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* the two halves of the open book, lying flat */}
            <div className={s.spread}>
              <div className={`${s.half} ${s.halfL}`}>
                <div className={s.sheet}>
                  <Page page={nearPage} />
                </div>
              </div>

              <div className={`${s.half} ${s.halfR}`}>
                <div className={`${s.sheet} ${s.sheetR}`}>
                  <Page page={farPage} />
                </div>
              </div>
            </div>

            {/* the permanent gutter shading where the pages meet the binding */}
            <span className={s.gutter} aria-hidden="true" />

            {/* the shadow the lifting sheet throws across the page beneath it */}
            {turn && (
              <span
                className={`${s.cast} ${turn.dir === 'next' ? s.castNext : s.castPrev}`}
                aria-hidden="true"
              />
            )}

            {/* The turning leaf: one sheet, hinged on the spine in the middle.
                Front = right half of nearPage. Back = left half of farPage. */}
            {turn && (
              <div
                className={`${s.leaf} ${turn.dir === 'next' ? s.leafNext : s.leafPrev}`}
                aria-hidden="true"
              >
                <div className={s.leafFront}>
                  <div className={`${s.sheet} ${s.sheetR}`}>
                    <Page page={nearPage} />
                  </div>
                  <span
                    className={`${s.shade} ${turn.dir === 'next' ? s.shadeNext : s.shadePrev}`}
                  />
                </div>

                <div className={s.leafBack}>
                  <div className={s.leafBackInner}>
                    <div className={s.sheet}>
                      <Page page={farPage} />
                    </div>
                  </div>
                  <span
                    className={`${s.backShade} ${
                      turn.dir === 'next' ? s.backShadeNext : s.backShadePrev
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* --- controls --- */}
          <div className={s.controls}>
            <button className={s.arrow} onClick={prev} aria-label="previous page">
              ‹
            </button>

            <div className={s.counter}>
              <span className={s.counterNum}>{index + 1}</span>
              <span className={s.counterSlash}>/</span>
              <span className={s.counterTotal}>{pages.length}</span>
            </div>

            <button className={s.arrow} onClick={next} aria-label="next page">
              ›
            </button>
          </div>

          {/* jump straight to a page */}
          <div className={s.dots}>
            {pages.map((p, i) => (
              <button
                key={i}
                className={`${s.dot} ${i === index ? s.dotOn : ''}`}
                onClick={() => goTo(i)}
                aria-label={`go to page ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>

          <p className={s.hint}>swipe, or use ← → to turn the page</p>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE ROUTER — picks a layout based on `type` in data.js
   ════════════════════════════════════════════════════════════════════════ */
function Page({ page }) {
  switch (page.type) {
    case 'cover':
      return <CoverPage page={page} />
    case 'contents':
      return <ContentsPage page={page} />
    case 'feature':
      return <FeaturePage page={page} />
    case 'portraits':
      return <PortraitsPage page={page} />
    case 'facts':
      return <FactsPage page={page} />
    case 'letter':
      return <LetterPage page={page} />
    default:
      return null
  }
}

/* ---------------------------------------------------------- COVER --------- */
function CoverPage({ page }) {
  return (
    <article className={s.cover}>
      {/* 📸 the cover photo — set `photo` (and optionally `photoFocus`) in data.js */}
      {page.photo && (
        <img
          className={s.coverImg}
          src={img(page.photo)}
          alt={page.coverStar}
          loading="lazy"
          style={page.photoFocus ? { objectPosition: page.photoFocus } : undefined}
        />
      )}
      <span className={s.coverScrim} aria-hidden="true" />

      <header className={s.coverTop}>
        <h3 className={s.masthead}>{magazine.title}</h3>
        <div className={s.coverMeta}>
          <span>{page.issueLine}</span>
          <span>{magazine.issue}</span>
        </div>
      </header>

      <div className={s.coverBody}>
        <span className={s.coverKicker}>the cover star</span>
        <h4 className={s.coverStar}>{page.coverStar}</h4>
        <p className={s.coverTagline}>{page.tagline}</p>
      </div>

      <span className={s.coverSticker} aria-hidden="true">
        <em>birthday</em>
        <strong>issue</strong>
      </span>
    </article>
  )
}

/* ------------------------------------------------------- CONTENTS --------- */
function ContentsPage({ page }) {
  return (
    <article className={s.contents}>
      <div className={s.contentsMain}>
        <p className={s.pageKicker}>{magazine.issue}</p>
        <h3 className={s.contentsHeading}>{page.heading}</h3>
        <div className={s.rule} aria-hidden="true" />

        <ol className={s.contentsList}>
          {page.items.map((raw, i) => {
            // items look like "01 — Cover Star: Someone"
            const at = raw.indexOf('—')
            const num = at === -1 ? String(i + 1).padStart(2, '0') : raw.slice(0, at).trim()
            const label = at === -1 ? raw : raw.slice(at + 1).trim()
            return (
              <li key={i}>
                <span className={s.contentsNum}>{num}</span>
                <span className={s.contentsLeader} aria-hidden="true" />
                <span className={s.contentsLabel}>{label}</span>
              </li>
            )
          })}
        </ol>
      </div>

      {/* 📸 optional photo on the contents page (`photoFocus` tunes the crop) */}
      {page.photo && (
        <figure className={s.contentsPhoto}>
          <img
            src={img(page.photo)}
            alt={her.name}
            loading="lazy"
            style={page.photoFocus ? { objectPosition: page.photoFocus } : undefined}
          />
          <figcaption>{her.nickname}</figcaption>
        </figure>
      )}
    </article>
  )
}

/* -------------------------------------------------------- FEATURE --------- */
function FeaturePage({ page }) {
  return (
    <article className={s.feature}>
      <p className={s.pageKicker}>{magazine.issue}</p>
      <h3 className={s.headline}>{page.headline}</h3>
      <p className={s.subhead}>{page.subhead}</p>
      <div className={s.rule} aria-hidden="true" />

      <div className={s.featureBody}>
        <div className={s.columns}>
          <p className={s.dropcap}>{page.body}</p>
        </div>

        {/* 📸 optional photo for this feature (`photoFocus` tunes the crop) */}
        {page.photo && (
          <figure className={s.featurePhoto}>
            <img
              src={img(page.photo)}
              alt={page.headline}
              loading="lazy"
              style={page.photoFocus ? { objectPosition: page.photoFocus } : undefined}
            />
          </figure>
        )}
      </div>

      {page.pullQuote && (
        <blockquote className={s.pullQuote}>
          <span aria-hidden="true">❝</span>
          {page.pullQuote}
        </blockquote>
      )}
    </article>
  )
}

/* ------------------------------------------------------- PORTRAITS -------- */
function PortraitsPage({ page }) {
  return (
    <article className={s.portraits}>
      <div className={s.portraitsHead}>
        <p className={s.pageKicker}>{magazine.issue}</p>
        <h3 className={s.portraitsHeading}>{page.heading}</h3>
        {page.blurb && <p className={s.portraitsBlurb}>{page.blurb}</p>}
      </div>

      {/* 📸 PHOTOS — the `shots` array on this page in data.js */}
      <div className={s.shots}>
        {page.shots.map((shot, i) => (
          <figure key={i} className={s.shot} style={{ '--i': i }}>
            <img
              src={img(shot.src)}
              alt={shot.caption || her.name}
              loading="lazy"
              style={shot.focus ? { objectPosition: shot.focus } : undefined}
            />
            <figcaption>
              {shot.label && <span className={s.shotLabel}>{shot.label}</span>}
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  )
}

/* ----------------------------------------------------------- FACTS -------- */
function FactsPage({ page }) {
  return (
    <article className={s.facts}>
      <div className={s.factsMain}>
        <p className={s.pageKicker}>{magazine.issue}</p>
        <h3 className={s.factsHeading}>{page.heading}</h3>
        {page.blurb && <p className={s.factsBlurb}>{page.blurb}</p>}
        <div className={s.rule} aria-hidden="true" />

        <dl className={s.factsList}>
          {page.facts.map((f, i) => (
            <div key={i}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 📸 optional photo on the fact file */}
      {page.photo && (
        <figure className={s.factsPhoto}>
          <img
            src={img(page.photo)}
            alt={her.name}
            loading="lazy"
            style={page.photoFocus ? { objectPosition: page.photoFocus } : undefined}
          />
          <figcaption>exhibit A</figcaption>
        </figure>
      )}
    </article>
  )
}

/* --------------------------------------------------------- LETTER --------- */
function LetterPage({ page }) {
  return (
    <article className={s.letter}>
      <span className={s.tape} aria-hidden="true" />
      <h3 className={s.letterHeading}>{page.heading}</h3>
      <p className={s.letterBody}>{page.body}</p>
      <p className={s.signoff}>{page.signoff}</p>

      <div className={s.hearts} aria-hidden="true">
        {['💛', '🎀', '✨', '🩷', '💫'].map((e, i) => (
          <span key={i} style={{ '--i': i }}>
            {e}
          </span>
        ))}
      </div>
    </article>
  )
}
