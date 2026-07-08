import popshapLogo from '../assets/popshap-logo-figma.png'

export default function Header() {
  return (
    <header className="brand-header" aria-label="Popshap">
      <img src={popshapLogo} alt="Popshap - Beyond Interactive" />
    </header>
  )
}
