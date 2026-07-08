import { useEffect, useState } from 'react'
import ScoresPage from './pages/ScoresPage'
import SubmitScorePage from './pages/SubmitScorePage'
import { createSubmission, listSubmissions } from './services/submissions'

type Route = 'scores' | 'submit'

function routeFromHash(hash: string): Route {
  return hash === '#/submit' ? 'submit' : 'scores'
}

function setRoute(route: Route) {
  window.location.hash = route === 'submit' ? '/submit' : '/scores'
}

export default function App() {
  const [route, setCurrentRoute] = useState<Route>(() => routeFromHash(window.location.hash))

  useEffect(() => {
    const syncRoute = () => setCurrentRoute(routeFromHash(window.location.hash))
    window.addEventListener('hashchange', syncRoute)

    if (!window.location.hash) {
      window.location.hash = '/scores'
    }

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  return (
    <main className="kiosk-frame">
      {route === 'submit' ? (
        <SubmitScorePage
          onCreateSubmission={createSubmission}
          onNavigateToScores={() => setRoute('scores')}
        />
      ) : (
        <ScoresPage
          loadSubmissions={listSubmissions}
          onNavigateToSubmit={() => setRoute('submit')}
        />
      )}
    </main>
  )
}
