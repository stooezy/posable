import { createFileRoute, redirect } from '@tanstack/react-router'
import MobileAppShell from '../components/MobileAppShell'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/products')({
  beforeLoad: async () => {
    const session = await authClient.getSession()

    if (!session.data?.user) {
      throw redirect({ to: '/' })
    }
  },
  component: Products,
})

function Products() {
  return (
    <MobileAppShell
      title="Product"
      subtitle="Browse a compact catalog view designed for thumb-friendly access."
    >
      <div className="grid gap-3">
        {[
          ['Iced Latte', 'Ready stock', 'Rp 28.000'],
          ['Matcha Milk', 'Low stock', 'Rp 32.000'],
          ['Croissant', 'Ready stock', 'Rp 18.000'],
          ['Mineral Water', 'Ready stock', 'Rp 8.000'],
        ].map(([name, status, price]) => (
          <article key={name} className="app-panel rounded-[1.4rem] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-base font-semibold text-[var(--sea-ink)]">
                  {name}
                </p>
                <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
                  {status}
                </p>
              </div>
              <span className="rounded-full bg-[var(--chip-bg)] px-3 py-1 text-sm font-semibold text-[var(--sea-ink)]">
                {price}
              </span>
            </div>
          </article>
        ))}
      </div>
    </MobileAppShell>
  )
}
