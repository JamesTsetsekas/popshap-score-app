import { type FormEvent, useMemo, useState } from 'react'
import PageShell from '../components/PageShell'
import StatusMessage from '../components/StatusMessage'
import type { NewSubmission } from '../types/submission'
import {
  type ScoreFormErrors,
  type ScoreFormValues,
  hasErrors,
  normalizeSubmission,
  validateSubmission,
} from '../utils/scores'

interface SubmitScorePageProps {
  onCreateSubmission: (submission: NewSubmission) => Promise<void>
  onNavigateToScores: () => void
}

const initialValues: ScoreFormValues = {
  firstName: '',
  lastName: '',
  score: '',
}

export default function SubmitScorePage({
  onCreateSubmission,
  onNavigateToScores,
}: SubmitScorePageProps) {
  const [values, setValues] = useState<ScoreFormValues>(initialValues)
  const [errors, setErrors] = useState<ScoreFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ tone: 'success' | 'error'; message: string } | null>(null)

  const scorePreview = useMemo(() => {
    const score = Number(values.score)
    return Number.isFinite(score) && values.score.trim() ? score : 0
  }, [values.score])

  function updateField(name: keyof ScoreFormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setStatus(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateSubmission(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      return
    }

    try {
      setIsSubmitting(true)
      await onCreateSubmission(normalizeSubmission(values))
      setValues(initialValues)
      setStatus({ tone: 'success', message: 'Score submitted successfully.' })
    } catch (caughtError) {
      setStatus({
        tone: 'error',
        message: caughtError instanceof Error ? caughtError.message : 'Unable to submit score.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageShell title={<>Add a<br />Score.</>}>
      <form className="score-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Type here..."
            value={values.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            aria-invalid={Boolean(errors.firstName)}
            onChange={(event) => updateField('firstName', event.target.value)}
          />
          {errors.firstName ? <span id="firstName-error">{errors.firstName}</span> : null}
        </div>

        <div className="field-group">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Type here..."
            value={values.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            aria-invalid={Boolean(errors.lastName)}
            onChange={(event) => updateField('lastName', event.target.value)}
          />
          {errors.lastName ? <span id="lastName-error">{errors.lastName}</span> : null}
        </div>

        <div className="field-group field-group--score">
          <label htmlFor="score">Score</label>
          <input
            id="score"
            name="score"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="0"
            value={values.score}
            aria-describedby={errors.score ? 'score-error' : undefined}
            aria-invalid={Boolean(errors.score)}
            onChange={(event) => updateField('score', event.target.value)}
          />
          <div className="score-preview" aria-hidden="true">
            {scorePreview}
          </div>
          {errors.score ? <span id="score-error">{errors.score}</span> : null}
        </div>

        {status ? <StatusMessage tone={status.tone}>{status.message}</StatusMessage> : null}

        <div className="score-form__actions">
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {status?.tone === 'success' ? (
            <button className="secondary-button" type="button" onClick={onNavigateToScores}>
              View Scores
            </button>
          ) : null}
        </div>
      </form>
    </PageShell>
  )
}
