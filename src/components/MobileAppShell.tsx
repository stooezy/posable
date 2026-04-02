import { Link } from '@tanstack/react-router'
import { Home, Package2, UserRound } from 'lucide-react'

export default function MobileAppShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <main className="app-screen">
      <section className="app-frame flex min-h-0 w-full flex-1 flex-col">
        <header className="app-topbar px-4 py-4 sm:px-6">
          <div className="app-container">
            <p className="island-kicker mb-2">POS App</p>
            <h1 className="display-title m-0 text-[1.9rem] leading-[1.02] font-bold text-[var(--sea-ink)]">
              {title}
            </h1>
            <p className="mt-2 mb-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
              {subtitle}
            </p>
          </div>
        </header>

        <div className="app-content min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="app-container">{children}</div>
        </div>

        <nav className="bottom-nav px-4 py-3 sm:px-6">
          <div className="app-container grid grid-cols-3 gap-2">
            <Link
              to="/dashboard"
              className="bottom-nav-link"
              activeProps={{ className: 'bottom-nav-link is-active' }}
            >
              <Home size={18} strokeWidth={2.2} />
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className="bottom-nav-link"
              activeProps={{ className: 'bottom-nav-link is-active' }}
            >
              <Package2 size={18} strokeWidth={2.2} />
              <span>Product</span>
            </Link>
            <Link
              to="/profile"
              className="bottom-nav-link"
              activeProps={{ className: 'bottom-nav-link is-active' }}
            >
              <UserRound size={18} strokeWidth={2.2} />
              <span>Profile</span>
            </Link>
          </div>
        </nav>
      </section>
    </main>
  )
}
