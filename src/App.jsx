import { useState, useEffect } from 'react'
import Login from './components/Login'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Reasons from './components/Reasons'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Magazine from './components/Magazine'
import Us from './components/Us'
import useScrollReveal from './hooks/useScrollReveal'
import { her } from './data'
import s from './App.module.css'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [confetti, setConfetti] = useState(false)

  // wire up all the scroll-reveal animations once the site is visible
  useScrollReveal([unlocked])

  // little confetti burst right after the login transition
  useEffect(() => {
    if (!unlocked) return
    setConfetti(true)
    const id = setTimeout(() => setConfetti(false), 4200)
    return () => clearTimeout(id)
  }, [unlocked])

  if (!unlocked) {
    return <Login onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div className={s.site}>
      {confetti && <Confetti />}

      <Nav />

      <main className={s.enterInner}>
        <Hero />
        <About />
        <Reasons />
        <Timeline />
        <Gallery />
        <Magazine />
        <Us />
      </main>

      <footer className={s.footer}>
        {/* 🎀 CHANGE ME — footer line */}
        <p>made with far too much love, for {her.nickname} 💛</p>
        <p className={s.small}>
          © {new Date().getFullYear()} · the {her.name} appreciation society
        </p>
      </footer>
    </div>
  )
}

/** Confetti that rains down once, right after unlocking. */
function Confetti() {
  const pieces = Array.from({ length: 44 })
  return (
    <div className={s.confetti} aria-hidden="true">
      {pieces.map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 2.27) % 100}%`,
            animationDelay: `${(i % 11) * 0.18}s`,
            animationDuration: `${3 + (i % 5) * 0.55}s`,
            background: ['#f2b8c6', '#cdbdec', '#e8c99b', '#ffffff', '#e79aae'][i % 5],
          }}
        />
      ))}
    </div>
  )
}
