import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'] as const

export const isFirebaseConfigured = requiredConfigKeys.every((key) => Boolean(firebaseConfig[key]))

let firebaseApp: FirebaseApp | undefined

export function getFirebaseApp() {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Add your Vite Firebase values to .env.local.')
  }

  firebaseApp ??= initializeApp(firebaseConfig)
  return firebaseApp
}

export function getDb() {
  return getFirestore(getFirebaseApp())
}
