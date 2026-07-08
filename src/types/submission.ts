export interface NewSubmission {
  firstName: string
  lastName: string
  score: number
}

export interface Submission extends NewSubmission {
  id: string
  createdAt?: Date | null
}
