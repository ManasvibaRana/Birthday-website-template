import { us, img } from '../data'
import s from './Us.module.css'

/**
 * The closing section — just about the two of you.
 * All the copy lives in the `us` block in data.js.
 */
export default function Us() {
  return (
    <section className={s.wrap} id="us">
      <div className="section">
        <p className="sectionLabel reveal">{us.label}</p>
        <h2 className="sectionTitle reveal">{us.title}</h2>
        <div className="divider reveal">✦</div>

        <div className={s.layout}>
          {/* --- 📸 the big photo of the two of you --- */}
          {us.photo && (
            <figure className={`${s.photoWrap} reveal`}>
              <span className={s.tape} aria-hidden="true" />
              <img src={img(us.photo)} alt={us.photoCaption || 'us'} loading="lazy" />
              {us.photoCaption && <figcaption>{us.photoCaption}</figcaption>}
            </figure>
          )}

          {/* --- the note --- */}
          <div className={`${s.note} reveal`}>
            <h3 className={s.heading}>{us.heading}</h3>

            {us.body.map((p, i) => (
              <p key={i} className={s.para}>
                {p}
              </p>
            ))}

            <p className={s.signoff}>{us.signoff}</p>
            <p className={s.from}>{us.from}</p>
          </div>
        </div>

        {/* --- little sticky notes --- */}
        {us.notes?.length > 0 && (
          <ul className={`${s.notes} reveal`}>
            {us.notes.map((n, i) => (
              <li key={i} style={{ '--i': i }}>
                {n}
              </li>
            ))}
          </ul>
        )}

        <div className={`${s.hearts} reveal`} aria-hidden="true">
          {['💛', '🎀', '✨', '🩷', '💫'].map((e, i) => (
            <span key={i} style={{ '--i': i }}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
