import React, { useState, useMemo } from 'react'

export default function Flashcards({ subject, cards, progress, markCard, onBack }) {
  // shuffle once per mount
  const deck = useMemo(() => {
    const arr = [...cards]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [cards])

  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)

  if (cards.length === 0) {
    return (
      <Wrap subject={subject} onBack={onBack}>
        <div className="empty-state">
          <h3>Belum ada kartu</h3>
          <p>Materi bidang ini belum bisa diubah jadi flashcard.</p>
        </div>
      </Wrap>
    )
  }

  if (done) {
    const cardStatus = progress.cards || {}
    const known = deck.filter((c) => cardStatus[c.id] === 'known').length
    return (
      <Wrap subject={subject} onBack={onBack}>
        <div className="fc-stage">
          <div className="result-card">
            <div className="score">
              {known}
              <small>/{deck.length}</small>
            </div>
            <p>kartu Anda tandai sudah dikuasai dalam sesi ini.</p>
            <div className="action-row" style={{ justifyContent: 'center' }}>
              <button
                className="btn ghost"
                onClick={() => {
                  setPos(0)
                  setFlipped(false)
                  setDone(false)
                }}
              >
                Ulangi sesi
              </button>
              <button className="btn primary" onClick={onBack}>
                Kembali ke {subject.name}
              </button>
            </div>
          </div>
        </div>
      </Wrap>
    )
  }

  const card = deck[pos]

  function next(status) {
    if (status) markCard(card.id, status)
    setFlipped(false)
    if (pos + 1 >= deck.length) {
      setDone(true)
    } else {
      setTimeout(() => setPos((p) => p + 1), 120)
    }
  }

  return (
    <Wrap subject={subject} onBack={onBack}>
      <div className="fc-stage">
        <div className="fc-progress">
          <span>
            Kartu {pos + 1} dari {deck.length}
          </span>
          <span>{subject.name}</span>
        </div>
        <div className="fc-track">
          <i style={{ width: `${((pos + 1) / deck.length) * 100}%` }} />
        </div>

        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-inner" onClick={() => setFlipped((f) => !f)}>
            <div className="fc-face fc-front">
              <div className="fc-label">Pertanyaan / Topik</div>
              <h3>{card.front}</h3>
              <div className="tap">Klik untuk membalik kartu</div>
            </div>
            <div className="fc-face fc-back">
              <div className="fc-label">Inti materi</div>
              <div className="fc-content">{card.back}</div>
            </div>
          </div>
        </div>

        {flipped ? (
          <div className="fc-controls">
            <button className="btn ghost" onClick={() => next('learning')}>
              Masih belajar
            </button>
            <button className="btn primary" onClick={() => next('known')}>
              Sudah paham
            </button>
          </div>
        ) : (
          <div className="fc-controls">
            <button className="btn ghost" onClick={() => setFlipped(true)}>
              Lihat jawaban
            </button>
            <button className="btn ghost" onClick={() => next(null)}>
              Lewati
            </button>
          </div>
        )}
      </div>
    </Wrap>
  )
}

function Wrap({ subject, onBack, children }) {
  return (
    <div>
      <div className="crumb">
        <button onClick={onBack}>← {subject.name}</button>
        <span>/</span>
        <span>Flashcard</span>
      </div>
      {children}
    </div>
  )
}
