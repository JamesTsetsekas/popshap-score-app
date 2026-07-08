import type { NewSubmission, Submission } from '../types/submission'

export interface ScoreFormValues {
  firstName: string
  lastName: string
  score: string
}

export type ScoreFormErrors = Partial<Record<keyof ScoreFormValues, string>>

export function normalizeSubmission(values: ScoreFormValues): NewSubmission {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    score: Number(values.score),
  }
}

export function validateSubmission(values: ScoreFormValues): ScoreFormErrors {
  const errors: ScoreFormErrors = {}
  const score = Number(values.score)

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.'
  }

  if (!values.score.trim()) {
    errors.score = 'Score is required.'
  } else if (!Number.isFinite(score) || !Number.isInteger(score)) {
    errors.score = 'Score must be a whole number.'
  } else if (score < 0) {
    errors.score = 'Score cannot be negative.'
  }

  return errors
}

export function hasErrors(errors: ScoreFormErrors) {
  return Object.keys(errors).length > 0
}

export function getTopScores(submissions: Submission[], limit = 5) {
  return submissions
    .map((submission, originalIndex) => ({ submission, originalIndex }))
    .sort((a, b) => {
      if (b.submission.score !== a.submission.score) {
        return b.submission.score - a.submission.score
      }

      return a.originalIndex - b.originalIndex
    })
    .slice(0, limit)
    .map(({ submission }) => submission)
}

export function formatDisplayName(submission: Pick<Submission, 'firstName' | 'lastName'>) {
  const initial = submission.lastName.trim().charAt(0).toUpperCase()
  return initial ? `${submission.firstName.trim()} ${initial}.` : submission.firstName.trim()
}
