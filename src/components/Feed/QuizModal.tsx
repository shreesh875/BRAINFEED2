import React, { useState } from 'react'
import { X, CheckCircle, XCircle } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === question.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    onAnswer(correct)
  }

  const handleClose = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Quiz</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {!showResult ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <span className="text-gray-900 dark:text-white">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Submit Answer
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                {isCorrect ? (
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                )}
                <h3 className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {question.explanation}
                </p>
                {isCorrect && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      +10 points earned!
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Continue Reading
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizModal