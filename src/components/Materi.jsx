import React, { useState, useRef, useEffect } from 'react'

export default function Materi({ subject, onBack }) {
  const [idx, setIdx] = useState(0)
  const readerRef = useRef(null)
  const sections = subject.sections
  const sec = sections[idx]

  useEffect(() => {
    if (readerRef.current) readerRef.current.scrollTop = 0
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [idx])

  // body minus duplicated title first line
  let body = sec.body
  const lines = body.split('\n')
  if (lines[0]?.trim() === sec.title.trim()) body = lines.slice(1).join('\n').trim()

  return (
    <div>
      <div className="crumb">
        <button onClick={onBack}>← {subject.name}</button>
        <span>/</span>
        <span>Materi</span>
      </div>

      <div className="reader-layout">
        <nav className="toc">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={i === idx ? 'active' : ''}
              onClick={() => setIdx(i)}
              title={s.title}
            >
              {i + 1}. {s.title}
            </button>
          ))}
        </nav>

        <article className="reader" ref={readerRef}>
          <h2>{sec.title}</h2>
          <div className="sub-meta">
            {subject.name} · Bagian {idx + 1} dari {sections.length}
          </div>
          <div className="content">{body}</div>

          <div className="reader-nav">
            <button
              className="btn ghost"
              disabled={idx === 0}
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
            >
              ← Sebelumnya
            </button>
            <button
              className="btn primary"
              disabled={idx === sections.length - 1}
              onClick={() => setIdx((i) => Math.min(sections.length - 1, i + 1))}
            >
              Selanjutnya →
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
