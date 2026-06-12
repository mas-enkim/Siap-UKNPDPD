import React from 'react'

export default function Subject({ subject, cards, quizCount, bestScore, onBack, onMode }) {
  return (
    <div>
      <div className="crumb">
        <button onClick={onBack}>← Semua bidang</button>
        <span>/</span>
        <span>{subject.name}</span>
      </div>

      <section className="hero" style={{ marginBottom: 28 }}>
        <div className="eyebrow">{subject.sections.length} bagian materi</div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)' }}>{subject.name}</h1>
      </section>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        <button className="card" onClick={() => onMode('materi')}>
          <div className="card-top">
            <h3>📖 Materi</h3>
          </div>
          <div className="meta">Baca {subject.sections.length} bagian materi lengkap, satu per satu.</div>
          <span className="btn primary sm" style={{ alignSelf: 'flex-start' }}>Buka materi</span>
        </button>

        <button className="card" onClick={() => onMode('flashcard')}>
          <div className="card-top">
            <h3>🃏 Flashcard</h3>
          </div>
          <div className="meta">{cards.length} kartu untuk menguatkan ingatan dengan recall aktif.</div>
          <span className="btn primary sm" style={{ alignSelf: 'flex-start' }}>Mulai flashcard</span>
        </button>

        <button className="card" onClick={() => onMode('quiz')} disabled={quizCount === 0}>
          <div className="card-top">
            <h3>📝 Kuis</h3>
            {bestScore > 0 && <span className="tag">Terbaik {bestScore}%</span>}
          </div>
          <div className="meta">
            {quizCount > 0
              ? `${quizCount} soal latihan bertimer dengan pembahasan.`
              : 'Belum ada soal. Tambahkan di file questions.js.'}
          </div>
          <span className="btn coral sm" style={{ alignSelf: 'flex-start' }}>
            {quizCount > 0 ? 'Kerjakan kuis' : 'Belum tersedia'}
          </span>
        </button>
      </div>
    </div>
  )
}
