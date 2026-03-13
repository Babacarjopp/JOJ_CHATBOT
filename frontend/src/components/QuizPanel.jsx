// frontend/src/components/QuizPanel.jsx
import { useState, useEffect } from 'react'

const QUESTIONS = [
  {
    id: 1,
    question: "Dans quelle ville se déroulent les JOJ 2026 ?",
    question_en: "In which city are the 2026 YOG held?",
    question_wo: "Dëkk bou lan la JOJ 2026 def ci ?",
    options: ["Abidjan", "Dakar", "Lagos", "Accra"],
    correct: 1,
    explanation: "🇸🇳 Dakar, capitale du Sénégal, accueille les JOJ 2026 — première édition africaine !",
    emoji: "🌍"
  },
  {
    id: 2,
    question: "Quand commencent les JOJ Dakar 2026 ?",
    question_en: "When do the Dakar 2026 YOG start?",
    question_wo: "Kañ lañu tambali JOJ Dakar 2026 ?",
    options: ["15 octobre 2026", "31 octobre 2026", "1 novembre 2026", "20 octobre 2026"],
    correct: 1,
    explanation: "🗓️ Les JOJ débutent le 31 octobre 2026 avec la cérémonie d'ouverture au Dakar Arena !",
    emoji: "🗓️"
  },
  {
    id: 3,
    question: "Combien de disciplines sportives aux JOJ 2026 ?",
    question_en: "How many sports disciplines at the 2026 YOG?",
    question_wo: "Sports yam bari na ci JOJ 2026 ?",
    options: ["18", "24", "28", "32"],
    correct: 2,
    explanation: "🏅 28 disciplines sportives sont au programme des JOJ Dakar 2026 !",
    emoji: "🏅"
  },
  {
    id: 4,
    question: "Quel sport traditionnel sénégalais est au programme ?",
    question_en: "Which traditional Senegalese sport is in the program?",
    question_wo: "Sport bu Sénégal bu dëkk bi lan la ci programme bi ?",
    options: ["Sabar", "Laamb 🥊", "Simb", "Mbapatt"],
    correct: 1,
    explanation: "🥊 La lutte Laamb, sport traditionnel sénégalais, est intégrée au programme officiel des JOJ 2026 !",
    emoji: "🥊"
  },
  {
    id: 5,
    question: "Quelle est la capacité du Dakar Arena ?",
    question_en: "What is the capacity of Dakar Arena?",
    question_wo: "Dakar Arena dafa am jëkk nit yam ?",
    options: ["8 000", "10 000", "15 000", "20 000"],
    correct: 2,
    explanation: "🏟️ Le Dakar Arena à Diamniadio peut accueillir 15 000 spectateurs !",
    emoji: "🏟️"
  },
  {
    id: 6,
    question: "Quel train relie Dakar à Diamniadio ?",
    question_en: "Which train connects Dakar to Diamniadio?",
    question_wo: "Train bou lan la jëf Dakar ak Diamniadio ?",
    options: ["TGV", "TER", "RER", "Métro"],
    correct: 1,
    explanation: "🚆 Le TER (Train Express Régional) relie Dakar à Diamniadio en seulement 45 minutes !",
    emoji: "🚆"
  },
  {
    id: 7,
    question: "Quel est le slogan des JOJ Dakar 2026 ?",
    question_en: "What is the slogan of Dakar 2026 YOG?",
    question_wo: "Slogan bi ci JOJ Dakar 2026 lan la ?",
    options: ["Ensemble pour l'Afrique", "Ouvrons un monde meilleur", "L'Afrique au sommet", "Dakar brille"],
    correct: 1,
    explanation: "✨ \"Ouvrons un monde meilleur\" — le slogan qui reflète l'esprit d'inclusion et d'espoir des JOJ 2026 !",
    emoji: "✨"
  },
  {
    id: 8,
    question: "Combien de jeunes athlètes participent aux JOJ 2026 ?",
    question_en: "How many young athletes participate in the 2026 YOG?",
    question_wo: "Athlètes yam bari na ci JOJ 2026 ?",
    options: ["2 000", "3 000", "4 000", "5 000"],
    correct: 2,
    explanation: "👟 Environ 4 000 jeunes athlètes âgés de 14 à 18 ans représentent plus de 200 pays !",
    emoji: "👟"
  },
  {
    id: 9,
    question: "Où se déroulent les épreuves de natation ?",
    question_en: "Where do the swimming events take place?",
    question_wo: "Fan lañu def épreuves yi ci natation ?",
    options: ["Dakar Arena", "Lac Rose", "Piscine Olympique de Diamniadio", "Stade LSS"],
    correct: 2,
    explanation: "🏊 La Piscine Olympique de Diamniadio accueille natation, plongeon et water-polo !",
    emoji: "🏊"
  },
  {
    id: 10,
    question: "Quelle est la première édition des JOJ organisée en Afrique ?",
    question_en: "Which YOG edition is the first organized in Africa?",
    question_wo: "JOJ Dakar 2026 mooy édition am yam ci Afrique ?",
    options: ["3ème", "4ème", "5ème", "6ème"],
    correct: 2,
    explanation: "🌍 Dakar 2026 est la 5ème édition des JOJ d'été et la toute première organisée sur le continent africain !",
    emoji: "🌍"
  },
]

const LABELS = {
  fr: { title: "Quiz JOJ 2026", subtitle: "Testez vos connaissances !", start: "Commencer le Quiz", next: "Question suivante", finish: "Voir mes résultats", restart: "Rejouer", correct: "Bonne réponse !", wrong: "Pas tout à fait...", score: "Votre score", questions: "questions", close: "Fermer" },
  en: { title: "JOJ 2026 Quiz", subtitle: "Test your knowledge!", start: "Start Quiz", next: "Next question", finish: "See my results", restart: "Play again", correct: "Correct!", wrong: "Not quite...", score: "Your score", questions: "questions", close: "Close" },
  wo: { title: "Quiz JOJ 2026", subtitle: "Xam na yow ci JOJ !", start: "Tambali Quiz bi", next: "Laaj bu ca below", finish: "Xool score bi", restart: "Dëkkal", correct: "Dëgg nga !", wrong: "Bañ na...", score: "Score bi", questions: "laaj", close: "Jeex" },
}

function getScoreEmoji(score, total) {
  const pct = score / total
  if (pct === 1)   return { emoji: '🏆', label: 'Parfait !', color: '#FFB300' }
  if (pct >= 0.8)  return { emoji: '🥇', label: 'Excellent !', color: '#FFB300' }
  if (pct >= 0.6)  return { emoji: '🥈', label: 'Bien joué !', color: '#9E9E9E' }
  if (pct >= 0.4)  return { emoji: '🥉', label: 'Pas mal !', color: '#CD7F32' }
  return { emoji: '📚', label: 'À réviser !', color: '#00897B' }
}

export default function QuizPanel({ onClose, lang = 'fr' }) {
  const [phase, setPhase] = useState('intro') // intro | playing | result
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timer, setTimer] = useState(15)

  const l = LABELS[lang] || LABELS['fr']

  // Mélanger et prendre 7 questions
  const startQuiz = () => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 7)
    setQuestions(shuffled)
    setCurrent(0)
    setScore(0)
    setAnswers([])
    setSelected(null)
    setAnswered(false)
    setTimer(15)
    setPhase('playing')
  }

  // Timer
  useEffect(() => {
    if (phase !== 'playing' || answered) return
    if (timer === 0) {
      handleAnswer(-1) // timeout → mauvaise réponse
      return
    }
    const t = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timer, phase, answered])

  const handleAnswer = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const isCorrect = idx === questions[current].correct
    if (isCorrect) setScore(s => s + 1)
    setAnswers(a => [...a, { correct: isCorrect, selected: idx }])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setPhase('result')
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
      setTimer(15)
    }
  }

  const q = questions[current]
  const qText = q ? (lang === 'en' ? q.question_en : lang === 'wo' ? q.question_wo : q.question) : ''
  const scoreInfo = getScoreEmoji(score, questions.length)

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="quiz-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-header-left">
            <span style={{ fontSize: 22 }}>🏅</span>
            <div>
              <h2 className="quiz-title">{l.title}</h2>
              <p className="quiz-sub">{l.subtitle}</p>
            </div>
          </div>
          <button className="map-close" onClick={onClose}>✕</button>
        </div>

        {/* INTRO */}
        {phase === 'intro' && (
          <div className="quiz-intro">
            <div className="quiz-intro-emoji">🦁</div>
            <h3 className="quiz-intro-title">Prêt à tester tes connaissances sur les JOJ Dakar 2026 ?</h3>
            <div className="quiz-intro-rules">
              <div className="quiz-rule">❓ 7 questions aléatoires</div>
              <div className="quiz-rule">⏱️ 15 secondes par question</div>
              <div className="quiz-rule">🏆 Score final avec médaille</div>
            </div>
            <button className="quiz-start-btn" onClick={startQuiz}>{l.start} →</button>
          </div>
        )}

        {/* PLAYING */}
        {phase === 'playing' && q && (
          <div className="quiz-playing">
            {/* Progress */}
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill"
                style={{ width: `${((current) / questions.length) * 100}%` }} />
            </div>

            <div className="quiz-meta">
              <span className="quiz-counter">{current + 1} / {questions.length}</span>
              <div className={`quiz-timer ${timer <= 5 ? 'quiz-timer-urgent' : ''}`}>
                ⏱️ {timer}s
              </div>
            </div>

            {/* Question */}
            <div className="quiz-question-card">
              <div className="quiz-question-emoji">{q.emoji}</div>
              <p className="quiz-question-text">{qText}</p>
            </div>

            {/* Options */}
            <div className="quiz-options">
              {q.options.map((opt, i) => {
                let cls = 'quiz-option'
                if (answered) {
                  if (i === q.correct) cls += ' quiz-option-correct'
                  else if (i === selected) cls += ' quiz-option-wrong'
                  else cls += ' quiz-option-dimmed'
                }
                return (
                  <button key={i} className={cls}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}>
                    <span className="quiz-option-letter">
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span>{opt}</span>
                    {answered && i === q.correct && <span className="quiz-check">✓</span>}
                    {answered && i === selected && i !== q.correct && <span className="quiz-check">✗</span>}
                  </button>
                )
              })}
            </div>

            {/* Explication */}
            {answered && (
              <div className={`quiz-explanation ${selected === q.correct ? 'quiz-exp-correct' : 'quiz-exp-wrong'}`}>
                <strong>{selected === q.correct ? l.correct : l.wrong}</strong> {q.explanation}
              </div>
            )}

            {answered && (
              <button className="quiz-next-btn" onClick={handleNext}>
                {current + 1 >= questions.length ? l.finish : l.next} →
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="quiz-result">
            <div className="quiz-result-emoji">{scoreInfo.emoji}</div>
            <div className="quiz-result-label" style={{ color: scoreInfo.color }}>
              {scoreInfo.label}
            </div>
            <div className="quiz-score-display">
              <span className="quiz-score-num" style={{ color: scoreInfo.color }}>{score}</span>
              <span className="quiz-score-total">/ {questions.length}</span>
            </div>
            <p className="quiz-score-sub">{l.score} · {questions.length} {l.questions}</p>

            {/* Récapitulatif */}
            <div className="quiz-recap">
              {questions.map((q, i) => (
                <div key={i} className={`quiz-recap-item ${answers[i]?.correct ? 'recap-ok' : 'recap-ko'}`}>
                  <span>{answers[i]?.correct ? '✅' : '❌'}</span>
                  <span className="quiz-recap-q">
                    {lang === 'en' ? q.question_en : lang === 'wo' ? q.question_wo : q.question}
                  </span>
                </div>
              ))}
            </div>

            <div className="quiz-result-actions">
              <button className="quiz-restart-btn" onClick={startQuiz}>🔄 {l.restart}</button>
              <button className="quiz-close-btn" onClick={onClose}>✓ {l.close}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}