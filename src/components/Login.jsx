import { useState, useRef, useEffect } from 'react'
import s from './Login.module.css'

/* ════════════════════════════════════════════════════════════════════════════
   🔑 THE PASSWORD — change this one line to change the magic word.

   It can be numbers or a word. Words are CASE-INSENSITIVE and spaces at
   either end are ignored, so "rose", "ROSE" and " Rose " would all work.

   The row of boxes on the page automatically matches the length of
   whatever you type here — 6 characters, 6 boxes.

   (This is client-side only and purely decorative, not real security.)
   ══════════════════════════════════════════════════════════════════════════ */
const MAGIC_WORD = '123456'

// 🎀 CHANGE ME — the hint shown on the page from the very start
const HINT = 'hint: the most famous password in the world 💛'

/* 🎀 CHANGE ME — the cute angry pop-up for a wrong answer.
   They're used in order and then loop, so each wrong try gets grumpier. */
const ANGRY = [
  {
    emoji: '😤',
    title: 'excuse me??',
    line: 'it’s literally the easiest password in the world?!',
    button: 'sorry sorry 🥺',
  },
  {
    emoji: '😠',
    title: 'wrong. again.',
    line: 'i am genuinely offended right now. genuinely.',
    button: 'let me try again',
  },
  {
    emoji: '🙄',
    title: 'wow. okay.',
    line: 'do we even know each other. unbelievable behaviour.',
    button: 'ok ok ok',
  },
  {
    emoji: '💅',
    title: 'fine. a clue.',
    line: 'start at 1. keep counting. stop at 6.',
    button: 'oh. OH. 😭',
  },
]

const ANSWER = MAGIC_WORD.trim()
const LEN = ANSWER.length // 6 boxes for a 6-character password

export default function Login({ onUnlock }) {
  // one letter per box, so the answer's length is impossible to get wrong
  const [chars, setChars] = useState(() => Array(LEN).fill(''))
  const [shake, setShake] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [angry, setAngry] = useState(null) // which ANGRY pop-up is showing
  const boxRefs = useRef([])
  const popTimer = useRef(null)

  const focusBox = (i) => boxRefs.current[Math.max(0, Math.min(LEN - 1, i))]?.focus()

  useEffect(() => {
    focusBox(0)
    return () => clearTimeout(popTimer.current)
  }, [])

  const dismissAngry = () => {
    clearTimeout(popTimer.current)
    setAngry(null)
    // clear the boxes so she can start fresh
    setChars(Array(LEN).fill(''))
    focusBox(0)
  }

  /* --- typing across the boxes -------------------------------------------- */
  const setChar = (i, ch) => {
    setChars((prev) => {
      const next = [...prev]
      next[i] = ch
      return next
    })
  }

  const onBoxChange = (i) => (e) => {
    // take the last character typed, so overtyping a filled box just replaces it
    const ch = e.target.value.slice(-1)
    if (!ch) return setChar(i, '')
    setChar(i, ch)
    if (i < LEN - 1) focusBox(i + 1)
  }

  const onBoxKeyDown = (i) => (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (chars[i]) {
        setChar(i, '') // clear this one
      } else if (i > 0) {
        setChar(i - 1, '') // already empty — step back and clear that one
        focusBox(i - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusBox(i - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusBox(i + 1)
    }
  }

  // pasting the whole word fills every box at once
  const onPaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\s/g, '').slice(0, LEN)
    if (!text) return
    const next = Array(LEN).fill('')
    for (let i = 0; i < text.length; i++) next[i] = text[i]
    setChars(next)
    focusBox(Math.min(text.length, LEN - 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // case-insensitive comparison, in case the password is a word
    const guess = chars.join('').trim().toLowerCase()
    const answer = ANSWER.toLowerCase()

    if (guess === answer) {
      setAngry(null)
      setLeaving(true) // play the fade-out, then hand over to the main site
      window.setTimeout(() => onUnlock(), 900)
      return
    }

    // wrong — get grumpy at her
    setAngry(attempts % ANGRY.length)
    setAttempts((a) => a + 1)
    setShake(true)
    window.setTimeout(() => setShake(false), 620)

    // the pop-up lets itself out after a few seconds
    clearTimeout(popTimer.current)
    popTimer.current = window.setTimeout(() => setAngry(null), 4200)
  }

  return (
    <div className={`${s.screen} ${leaving ? s.leaving : ''}`}>
      {/* floating decorative bits */}
      <div className={s.floaters} aria-hidden="true">
        {['🎀', '✨', '💛', '🌸', '💫', '🤍', '🎂', '🩷'].map((e, i) => (
          <span key={i} className={s.floater} style={{ '--i': i }}>
            {e}
          </span>
        ))}
      </div>

      <div className={`${s.card} ${shake ? s.shake : ''}`}>
        <div className={s.ribbon} aria-hidden="true">🎀</div>

        {/* 🎀 CHANGE ME — the login copy */}
        <p className={s.kicker}>a little something for you</p>
        <h1 className={s.title}>enter the magic word ✨</h1>
        <p className={s.sub}>this page is locked, and only you have the key</p>

        <form className={s.form} onSubmit={handleSubmit}>
          {/* One box per letter. The word is exactly this long — no more, no
              less — so a longer spelling can't be typed in by accident. */}
          <div className={s.boxes} onPaste={onPaste}>
            {chars.map((ch, i) => (
              <span key={i} className={s.boxWrap}>
                <input
                  ref={(el) => (boxRefs.current[i] = el)}
                  className={`${s.box} ${ch ? s.boxFilled : ''}`}
                  value={ch}
                  onChange={onBoxChange(i)}
                  onKeyDown={onBoxKeyDown(i)}
                  onFocus={(e) => e.target.select()}
                  type="text"
                  inputMode="text"
                  maxLength={1}
                  aria-label={`letter ${i + 1} of ${LEN}`}
                  aria-describedby="magic-hint"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck="false"
                />
                {/* the typed letter is hidden and a star shows in its place,
                    so it reads like a password being entered */}
                {ch && (
                  <span className={s.mask} aria-hidden="true">
                    ✦
                  </span>
                )}
              </span>
            ))}
          </div>

          <p id="magic-hint" className={s.hint}>
            {HINT}
          </p>

          <button type="submit" className={s.button}>
            unlock my surprise
          </button>
        </form>
      </div>

      {/* ═══ the cute angry pop-up for a wrong answer ═══ */}
      {angry !== null && (
        <div className={s.popWrap} role="alertdialog" aria-live="assertive">
          <button className={s.popBackdrop} onClick={dismissAngry} aria-label="close" />

          <div className={s.pop}>
            <span className={s.popEmoji} aria-hidden="true">
              {ANGRY[angry].emoji}
            </span>
            <h2 className={s.popTitle}>{ANGRY[angry].title}</h2>
            <p className={s.popLine}>{ANGRY[angry].line}</p>
            <button className={s.popBtn} onClick={dismissAngry}>
              {ANGRY[angry].button}
            </button>

            {/* tiny steam puffs, because she's fuming */}
            <span className={s.puff1} aria-hidden="true">💨</span>
            <span className={s.puff2} aria-hidden="true">💢</span>
          </div>
        </div>
      )}
    </div>
  )
}
