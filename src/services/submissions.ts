import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore/lite'
import type { NewSubmission, Submission } from '../types/submission'
import { getDb } from './firebase'

const SUBMISSIONS_COLLECTION = 'submissions'

export async function createSubmission(submission: NewSubmission) {
  await addDoc(collection(getDb(), SUBMISSIONS_COLLECTION), {
    ...submission,
    createdAt: serverTimestamp(),
  })
}

export async function listSubmissions(): Promise<Submission[]> {
  const snapshot = await getDocs(collection(getDb(), SUBMISSIONS_COLLECTION))

  return snapshot.docs.map((doc) => {
    const data = doc.data()

    return {
      id: doc.id,
      firstName: String(data.firstName ?? ''),
      lastName: String(data.lastName ?? ''),
      score: Number(data.score ?? 0),
      createdAt: typeof data.createdAt?.toDate === 'function' ? data.createdAt.toDate() : null,
    }
  })
}
