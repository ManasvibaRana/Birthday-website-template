import { useEffect, useState } from 'react'
import s from './Nav.module.css'

// 🎀 CHANGE ME — nav labels (the `id` must match the section ids in App.jsx)
const links = [
  { id: 'hero', label: 'hello 💛' },
  { id: 'about', label: 'about her' },
  { id: 'reasons', label: 'reasons' },
  { id: 'timeline', label: 'our story' },
  { id: 'gallery', label: 'photos' },
  { id: 'magazine', label: 'magazine' },
  { id: 'us', label: 'us' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight whichever section is currently in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`${s.bar} ${scrolled ? s.solid : ''}`}>
      <a href="#hero" className={s.brand} onClick={go('hero')}>
        🎀
      </a>

      <button
        className={s.burger}
        onClick={() => setOpen((o) => !o)}
        aria-label="menu"
        aria-expanded={open}
      >
        <span className={open ? s.barTopOpen : ''} />
        <span className={open ? s.barMidOpen : ''} />
        <span className={open ? s.barBotOpen : ''} />
      </button>

      <nav className={`${s.links} ${open ? s.linksOpen : ''}`}>
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={go(l.id)}
            className={active === l.id ? s.active : ''}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
