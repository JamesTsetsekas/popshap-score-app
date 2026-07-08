import type { Submission } from '../types/submission'
import { getTopScores, validateSubmission } from './scores'

describe('score utilities', () => {
  test('validates required names and non-negative whole number scores', () => {
    expect(validateSubmission({ firstName: '', lastName: '  ', score: '-4' })).toEqual({
      firstName: 'First name is required.',
      lastName: 'Last name is required.',
      score: 'Score cannot be negative.',
    })

    expect(validateSubmission({ firstName: 'James', lastName: 'Test', score: '12.5' })).toEqual({
      score: 'Score must be a whole number.',
    })
  })

  test('returns the top five scores while preserving tie order', () => {
    const submissions: Submission[] = [
      { id: 'a', firstName: 'Ari', lastName: 'Alpha', score: 10 },
      { id: 'b', firstName: 'Bea', lastName: 'Beta', score: 30 },
      { id: 'c', firstName: 'Cam', lastName: 'Core', score: 30 },
      { id: 'd', firstName: 'Dia', lastName: 'Delta', score: 50 },
      { id: 'e', firstName: 'Eli', lastName: 'Echo', score: 5 },
      { id: 'f', firstName: 'Flo', lastName: 'Flux', score: 20 },
    ]

    expect(getTopScores(submissions).map((submission) => submission.id)).toEqual([
      'd',
      'b',
      'c',
      'f',
      'a',
    ])
  })
})
