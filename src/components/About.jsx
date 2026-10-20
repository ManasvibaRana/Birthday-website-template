import { about, pendingParty, her, img } from '../data'
import s from './About.module.css'

export default function About() {
  return (
    <section className="section" id="about">
      <p className="sectionLabel reveal">chapter one</p>
      <h2 className="sectionTitle reveal">a little about her</h2>
      <div className="divider reveal">✦</div>

      <div className={s.layout}>
        {/* --- the intro paragraph + the list of traits --- */}
        <div className={`${s.intro} reveal`}>
          <p className={s.introText}>{about.intro}</p>

          <ul className={s.traits}>
            {about.traits.map((t, i) => (
              <li key={i} style={{ '--reveal-delay': `${i * 90}ms` }}>
                <span className={s.tick} aria-hidden="true">✦</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* --- 📸 optional photo beside the intro (set `about.photo` in data.js) --- */}
        {about.photo && (
          <figure className={`${s.photoWrap} reveal`}>
            <img
              src={img(about.photo)}
              alt={her.name}
              loading="lazy"
              style={about.photoFocus ? { objectPosition: about.photoFocus } : undefined}
            />
            <figcaption>{her.nickname} 💛</figcaption>
          </figure>
        )}
      </div>

      {/* ═══ THE RUNNING JOKE — stamped like an unpaid receipt ═══
           The wrapper carries the tilt + drop-shadow; the inner element carries
           the torn-paper mask (a mask would clip a normal box-shadow away). */}
      <div className={`${s.receiptWrap} reveal`}>
        <span className={s.pin} aria-hidden="true">📌</span>

        <div className={s.receipt}>
          <div className={s.receiptTop}>
            <span>PATANG HOTEL · TABLE FOR 2</span>
            <span>STATUS: UNPAID</span>
          </div>

          <p className={s.receiptText}>{pendingParty.text}</p>

          <div className={s.receiptRule} aria-hidden="true" />

          <div className={s.receiptBottom}>
            <span className={s.receiptDue}>
              AMOUNT DUE · <strong>1 (one) party</strong>
            </span>
            <span className={s.stamp} aria-hidden="true">PENDING</span>
          </div>
        </div>
      </div>
    </section>
  )
}
