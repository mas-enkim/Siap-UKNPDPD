import React from 'react'

function MasteryBar({ known, learning, total }) {
  const kPct = total ? (known / total) * 100 : 0
  const lPct = total ? (learning / total) * 100 : 0
  return (
    <div className="bar">
      <i className="known" style={{ width: `${kPct}%` }} />
      <i className="learning" style={{ width: `${lPct}%` }} />
    </div>
  )
}

export default function Home({ manifest, flashcards, progress, onOpen, totalSections }) {
  const cardStatus = progress.cards || {}
  let totalKnown = 0
  let totalLearning = 0

  const enriched = manifest.map((m) => {
    const cards = flashcards[m.key] || []
    let known = 0
    let learning = 0
    cards.forEach((c) => {
      const st = cardStatus[c.id]
      if (st === 'known') known++
      else if (st === 'learning') learning++
    })
    totalKnown += known
    totalLearning += learning
    return { ...m, cards: cards.length, known, learning }
  })

  const totalCards = enriched.reduce((a, m) => a + m.cards, 0)
  const masteredPct = totalCards ? Math.round((totalKnown / totalCards) * 100) : 0

  return (
    <div>
      <section className="hero">
        <div className="eyebrow">Persiapan UKMPPD · Catatan Pribadi</div>
        <h1>
          Belajar terarah, <span className="accent">satu sistem</span> setiap kali.
        </h1>
        <p>
          Ruang belajar pribadi Anda untuk persiapan uji kompetensi. Telusuri materi per
          bidang, kuatkan ingatan dengan flashcard, dan uji diri lewat kuis bertimer.
        </p>
        <div className="stat-row">
          <div className="stat">
            <div className="num teal">{manifest.length}</div>
            <div className="lbl">Bidang materi</div>
          </div>
          <div className="stat">
            <div className="num">{totalSections.toLocaleString('id-ID')}</div>
            <div className="lbl">Bagian materi</div>
          </div>
          <div className="stat">
            <div className="num coral">{masteredPct}%</div>
            <div className="lbl">Sudah dikuasai</div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <h2>Pilih bidang</h2>
        <span className="hint">
          <span className="dot known" /> dikuasai &nbsp;
          <span className="dot learning" /> dipelajari &nbsp;
          <span className="dot new" /> baru
        </span>
      </div>

      <div className="grid">
        {enriched.map((m) => (
          <button key={m.key} className="card" onClick={() => onOpen(m.key)}>
            <div className="card-top">
              <h3>{m.name}</h3>
              <span className="tag">{m.cards} kartu</span>
            </div>
            <MasteryBar known={m.known} learning={m.learning} total={m.cards} />
            <div className="meta">
              {m.known} dikuasai · {m.learning} dipelajari · {m.cards - m.known - m.learning} baru
            </div>
          </button>
        ))}
      </div>

      <div className="note" style={{ marginTop: 34 }}>
        <b>Catatan:</b> Oftalmologi, Obgin 1, dan Infeksi Tropis belum tersedia karena file
        sumbernya rusak saat dikompresi. Unduh ulang versi aslinya dari akun Anda untuk
        menambahkannya.
      </div>
    </div>
  )
}
