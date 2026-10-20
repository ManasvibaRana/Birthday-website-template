import { useState } from 'react'
import { reasons } from '../data'
import s from './Reasons.module.css'

// 🎀 CHANGE ME — the emoji on the front of each card (loops if there are more cards)
const FACES = ['💛', '🌸', '✨', '🎀', '💫', '🩷', '🤍', '🌷']

export default function Reasons() {
  // which cards are open (tap on mobile, hover also flips on desktop)
  const [flipped, setFlipped] = useState(() => new Set())
  const allOpen = flipped.size === reasons.length

  const toggle = (i) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  const toggleAll = () =>
    setFlipped(allOpen ? new Set() : new Set(reasons.map((_, i) => i)))

  return (
    <section className="section" id="reasons">
      <p className="sectionLabel reveal">chapter two</p>
      <h2 className="sectionTitle reveal">reasons i love you</h2>
      <div className="divider reveal">✦</div>
      <p className="sectionIntro reveal">
        {/* 🎀 CHANGE ME */}
        tap a card to open it — there are more, i just ran out of space
      </p>

      <div className={s.grid}>
        {reasons.map((reason, i) => {
          const isFlipped = flipped.has(i)
          return (
            <div
              key={i}
              className={`${s.scene} reveal`}
              style={{ '--reveal-delay': `${(i % 3) * 110}ms` }}
            >
              <button
                className={`${s.card} ${isFlipped ? s.flipped : ''}`}
                onClick={() => toggle(i)}
                aria-pressed={isFlipped}
                aria-label={reason}
              >
                {/* FRONT — just a number, so the reason stays a surprise */}
                <span className={s.face}>
                  <span className={s.emoji} aria-hidden="true">{FACES[i % FACES.length]}</span>
                  <span className={s.num}>reason no.</span>
                  <span className={s.bigNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={s.tapHint}>tap me</span>
                </span>

                {/* BACK — the actual reason */}
                <span className={`${s.face} ${s.back}`}>
                  <span className={s.quote} aria-hidden="true">❝</span>
                  <span className={s.backText}>{reason}</span>
                </span>
              </button>
            </div>
          )
        })}
      </div>

      <div className={`${s.allWrap} reveal`}>
        <button className={s.allBtn} onClick={toggleAll}>
          {allOpen ? 'close them all' : 'open them all 💛'}
        </button>
      </div>
    </section>
  )
}
