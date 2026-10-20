import { timeline, img } from '../data'
import s from './Timeline.module.css'

export default function Timeline() {
  return (
    <section className="section" id="timeline">
      <p className="sectionLabel reveal">chapter three</p>
      <h2 className="sectionTitle reveal">our story so far</h2>
      <div className="divider reveal">✦</div>
      <p className="sectionIntro reveal">
        {/* 🎀 CHANGE ME */}
        every good thing that has happened since you showed up
      </p>

      <div className={s.line}>
        <span className={s.rail} aria-hidden="true" />

        {timeline.map((item, i) => (
          <article
            key={i}
            className={`${s.item} ${i % 2 ? s.right : s.left} reveal`}
          >
            <span className={s.dot} aria-hidden="true" />

            <div className={s.card}>
              <span className={s.date}>{item.year}</span>
              <h3 className={s.title}>{item.title}</h3>
              <p className={s.text}>{item.text}</p>

              {/* 📸 optional photo — `photo` + optional `photoFocus` in data.js */}
              {item.photo && (
                <img
                  className={s.photo}
                  src={img(item.photo)}
                  alt={item.title}
                  loading="lazy"
                  style={item.photoFocus ? { objectPosition: item.photoFocus } : undefined}
                />
              )}

              {/* 🎬 optional video — set `video` on this entry in data.js */}
              {item.video && (
                <figure className={s.videoWrap}>
                  <video
                    className={s.video}
                    src={img(item.video)}
                    controls
                    playsInline
                    preload="metadata"
                  />
                  {item.videoCaption && <figcaption>{item.videoCaption}</figcaption>}
                </figure>
              )}
            </div>
          </article>
        ))}

        <div className={`${s.end} reveal`}>
          <span>💗</span>
          {/* 🎀 CHANGE ME */}
          <p>…and everything still to come</p>
        </div>
      </div>
    </section>
  )
}
