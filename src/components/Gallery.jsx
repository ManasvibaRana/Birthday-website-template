import { useState } from 'react'
import { gallery, img } from '../data'
import Lightbox from './Lightbox'
import s from './Gallery.module.css'

export default function Gallery() {
  const [open, setOpen] = useState(null) // index of the open photo, or null

  const prev = () => setOpen((i) => (i - 1 + gallery.length) % gallery.length)
  const next = () => setOpen((i) => (i + 1) % gallery.length)

  return (
    <section className="section" id="gallery">
      <p className="sectionLabel reveal">chapter four</p>
      <h2 className="sectionTitle reveal">the photo dump</h2>
      <div className="divider reveal">✦</div>
      <p className="sectionIntro reveal">
        {/* 🎀 CHANGE ME */}
        click any photo to make it big — yes, even that one
      </p>

      {/* every photo is a polaroid pegged to a washing line */}
      <div className={s.grid}>
        {gallery.map((photo, i) => (
          <button
            key={photo.src + i}
            className={`${s.tile} ${photo.wide ? s.wide : ''} reveal`}
            style={{ '--reveal-delay': `${(i % 4) * 80}ms`, '--i': i }}
            onClick={() => setOpen(i)}
            aria-label={photo.caption || `photo ${i + 1}`}
          >
            {/* the string it hangs from, and the peg holding it up */}
            <span className={s.string} aria-hidden="true" />
            <span className={s.peg} aria-hidden="true" />

            <span className={s.polaroid}>
              <span className={s.frame}>
                <img src={img(photo.src)} alt={photo.caption || ''} loading="lazy" />
              </span>
              <span className={s.caption}>{photo.caption}</span>
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        items={gallery}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}
