interface StatusMessageProps {
  children: string
  tone?: 'error' | 'success' | 'muted'
}

export default function StatusMessage({ children, tone = 'muted' }: StatusMessageProps) {
  return (
    <p className={`status-message status-message--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  )
}
