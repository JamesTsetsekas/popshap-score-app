import type { Submission } from '../types/submission'
import { formatDisplayName } from '../utils/scores'

interface ScoreRowsProps {
  submissions: Submission[]
}

export default function ScoreRows({ submissions }: ScoreRowsProps) {
  return (
    <ol className="score-list" aria-label="Top scores">
      {submissions.map((submission, index) => (
        <li className="score-row" key={submission.id}>
          <span className="score-row__rank">{index + 1}.</span>
          <span className="score-row__name">{formatDisplayName(submission)}</span>
          <span className="score-row__score">{submission.score}</span>
        </li>
      ))}
    </ol>
  )
}
