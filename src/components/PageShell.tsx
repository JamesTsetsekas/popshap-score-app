import type { ReactNode } from 'react'
import Header from './Header'

interface PageShellProps {
  children: ReactNode
  title: ReactNode
}

export default function PageShell({ children, title }: PageShellProps) {
  return (
    <section className="page-shell">
      <Header />
      <div className="page-shell__body">
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
