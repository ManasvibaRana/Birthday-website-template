import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { img } from '../data'
import s from './Lightbox.module.css'

/**
 * Full-screen photo viewer. Controlled by the parent:
 *   items  – the array of {src, caption}
 *   index  – which one is open (null = closed)
 *   onClose / onPrev / onNext
 */
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0

  const onKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  // keyboard controls + lock body scroll while open
  useEffect(() => {
    if (!open) return
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onKey])

  if (!open) return null
  const item = items[index]

  // rendered straight into <body> so no ancestor transform/filter can trap it
  return createPortal(
    <div className={s.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <button className={s.close} onClick={onClose} aria-label="close">
        ✕
      </button>

      <button
        className={`${s.arrow} ${s.prev}`}
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="previous photo"
      >
        ‹
      </button>

      <figure className={s.figure} onClick={(e) => e.stopPropagation()}>
        <img
          className={s.image}
          src={img(item.src)}
          alt={item.caption || ''}
          key={item.src} /* re-triggers the fade animation on change */
        />
        <figcaption className={s.caption}>
          {item.caption}
          <span className={s.counter}>
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>

      <button
        className={`${s.arrow} ${s.next}`}
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="next photo"
      >
        ›
      </button>
    </div>,
    document.body
  )
}
