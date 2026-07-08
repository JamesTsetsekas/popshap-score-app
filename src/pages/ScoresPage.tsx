import { useEffect, useState } from 'react'
import PageShell from '../components/PageShell'
import ScoreRows from '../components/ScoreRows'
import StatusMessage from '../components/StatusMessage'
import type { Submission } from '../types/submission'
import { getTopScores } from '../utils/scores'

interface ScoresPageProps {
  loadSubmissions: () => Promise<Submission[]>
  onNavigateToSubmit: () => void
}

export default function ScoresPage({ loadSubmissions, onNavigateToSubmit }: ScoresPageProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadScores() {
      try {
        setIsLoading(true)
        setError('')
        const nextSubmissions = await loadSubmissions()

        if (isMounted) {
          setSubmissions(getTopScores(nextSubmissions))
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load scores.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadScores()

    return () => {
      isMounted = false
    }
  }, [loadSubmissions])

  return (
    <PageShell title={<>Current<br />Scores.</>}>
      <div className="scores-panel">
        {isLoading ? <StatusMessage>Loading scores...</StatusMessage> : null}
        {error ? <StatusMessage tone="error">{error}</StatusMessage> : null}
        {!isLoading && !error && submissions.length === 0 ? (
          <StatusMessage>No scores submitted yet.</StatusMessage>
        ) : null}
        {!isLoading && !error && submissions.length > 0 ? (
          <ScoreRows submissions={submissions} />
        ) : null}
      </div>

      <button className="primary-button scores-panel__button" type="button" onClick={onNavigateToSubmit}>
        Add a Score
      </button>
    </PageShell>
  )
}
