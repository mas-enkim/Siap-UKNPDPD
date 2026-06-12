import React, { useState } from 'react'
import manifest from './data/manifest.json'
import subjects from './data/subjects.json'
import flashcards from './data/flashcards.json'
import { QUESTIONS } from './data/questions.js'
import { useProgress } from './useProgress.js'
import Home from './components/Home.jsx'
import Subject from './components/Subject.jsx'
import Materi from './components/Materi.jsx'
import Flashcards from './components/Flashcards.jsx'
import Quiz from './components/Quiz.jsx'

const totalSections = manifest.reduce((a, m) => a + m.count, 0)

export default function App() {
  // view: { name: 'home' | 'subject' | 'materi' | 'flashcard' | 'quiz', key }
  const [view, setView] = useState({ name: 'home' })
  const { progress, markCard, recordQuiz, reset } = useProgress()

  const subj = view.key ? subjects[view.key] : null
  const cards = view.key ? flashcards[view.key] || [] : []
  const qForSubject = view.key ? QUESTIONS.filter((q) => q.subject === view.key) : []
  const bestScore = view.key ? progress.quiz?.[view.key] || 0 : 0

  const go = (name, key) => setView({ name, key: key ?? view.key })
  const home = () => setView({ name: 'home' })

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={home}>
            <span className="pulse" />
            MedSiap
          </button>
          <nav className="nav">
            <button className={view.name === 'home' ? 'active' : ''} onClick={home}>
              Beranda
            </button>
            <button onClick={reset} title="Hapus progres">
              Reset progres
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {view.name === 'home' && (
          <Home
            manifest={manifest}
            flashcards={flashcards}
            progress={progress}
            totalSections={totalSections}
            onOpen={(key) => go('subject', key)}
          />
        )}

        {view.name === 'subject' && subj && (
          <Subject
            subject={subj}
            cards={cards}
            quizCount={qForSubject.length}
            bestScore={bestScore}
            onBack={home}
            onMode={(mode) => go(mode)}
          />
        )}

        {view.name === 'materi' && subj && (
          <Materi subject={subj} onBack={() => go('subject')} />
        )}

        {view.name === 'flashcard' && subj && (
          <Flashcards
            subject={subj}
            cards={cards}
            progress={progress}
            markCard={markCard}
            onBack={() => go('subject')}
          />
        )}

        {view.name === 'quiz' && subj && (
          <Quiz
            subject={subj}
            questions={qForSubject}
            recordQuiz={recordQuiz}
            onBack={() => go('subject')}
          />
        )}
      </main>

      <footer className="foot">
        MedSiap · Ruang belajar pribadi · Materi milik dan untuk penggunaan pribadi Anda
      </footer>
    </div>
  )
}
