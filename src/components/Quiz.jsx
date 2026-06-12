import React, { useState, useEffect, useMemo, useRef } from 'react'

const LETTERS = ['A', 'B', 'C', 'D', 'E']
const SECONDS_PER_Q = 75

export default function Quiz({ subject, questions, recordQuiz, onBack }) {
  const deck = useMemo(() => {
    const arr = [...questions]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [questions])

  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(deck.length * SECONDS_PER_Q)
  const recorded = useRef(false)

  useEffect(() => {
    if (finished) return
    if (timeLeft <= 0) {
      setFinished(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, finished])

  const scorePct = deck.length ? Math.round((correct / deck.length) * 100) : 0

  useEffect(() => {
    if (finished && !recorded.current) {
      recorded.current = true
      recordQuiz(subject.key, scorePct)
    }
  }, [finished, scorePct, subject.key, recordQuiz])

  if (deck.length === 0) {
    return (
      <Wrap subject={subject} onBack={onBack}>
        <div className="empty-state">
          <h3>Belum ada soal</h3>
          <p>Tambahkan soal untuk bidang ini di file src/data/questions.js</p>
        </div>
      </Wrap>
    )
  }

  if (finished) {
    const msg =
      scorePct >= 80 ? 'Luar biasa, pertahankan!' : scorePct >= 60 ? 'Sudah lumayan — ulangi yang masih salah.' : 'Tetap semangat, ulangi materinya ya.'
    return (
      <Wrap subject={subject} onBack={onBack}>
        <div className="quiz-stage">
          <div className="result-card">
            <div className="score">
              {scorePct}
              <small>%</small>
            </div>
            <p>
              {correct} dari {deck.length} benar · {msg}
            </p>
            <div className="action-row" style={{ justifyContent: 'center' }}>
              <button className="btn ghost" onClick={onBack}>
                Kembali
              </button>
            </div>
          </div>
        </div>
      </Wrap>
    )
  }

  const q = deck[pos]
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  function choose(i) {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.answer) setCorrect((c) => c + 1)
  }

  function nextQ() {
    if (pos + 1 >= deck.length) {
      setFinished(true)
    } else {
      setPos((p) => p + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  return (
    <Wrap subject={subject} onBack={onBack}>
      <div className="quiz-stage">
        <div className="quiz-head">
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>
            Soal {pos + 1} / {deck.length}
          </span>
          <span className={`timer ${timeLeft < 30 ? 'low' : ''}`}>
            ⏱ {mm}:{ss}
          </span>
        </div>
        <div className="fc-track" style={{ marginBottom: 20 }}>
          <i style={{ width: `${((pos + 1) / deck.length) * 100}%` }} />
        </div>

        <div className="quiz-q">
          <div className="vignette">{q.vignette}</div>
          {q.options.map((opt, i) => {
            let cls = 'opt'
            if (answered) {
              if (i === q.answer) cls += ' correct'
              else if (i === selected) cls += ' wrong'
            } else if (i === selected) cls += ' selected'
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
                <span className="key">{LETTERS[i]}</span>
                {opt}
              </button>
            )
          })}

          {answered && (
            <div className="explain">
              <b>{selected === q.answer ? '✓ Benar. ' : '✗ Kurang tepat. '}</b>
              {q.explanation}
            </div>
          )}
        </div>

        {answered && (
          <div className="action-row" style={{ justifyContent: 'flex-end' }}>
            <button className="btn primary" onClick={nextQ}>
              {pos + 1 >= deck.length ? 'Lihat hasil' : 'Soal berikutnya →'}
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
        <span>Kuis</span>
      </div>
      {children}
    </div>
  )
}
