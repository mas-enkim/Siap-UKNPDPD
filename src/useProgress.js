import { useState, useEffect, useCallback } from 'react'

const KEY = 'medsiap-progress-v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

// progress shape:
// { cards: { [cardId]: 'known' | 'learning' }, quiz: { [subjectKey]: bestScore } }
export function useProgress() {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const markCard = useCallback((id, status) => {
    setState((s) => ({ ...s, cards: { ...(s.cards || {}), [id]: status } }))
  }, [])

  const recordQuiz = useCallback((subjectKey, score) => {
    setState((s) => {
      const prev = s.quiz?.[subjectKey] ?? 0
      return { ...s, quiz: { ...(s.quiz || {}), [subjectKey]: Math.max(prev, score) } }
    })
  }, [])

  const reset = useCallback(() => {
    if (confirm('Hapus semua progres belajar? Tindakan ini tidak bisa dibatalkan.')) {
      setState({})
    }
  }, [])

  return { progress: state, markCard, recordQuiz, reset }
}
