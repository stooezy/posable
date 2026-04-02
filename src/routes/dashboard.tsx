import { createFileRoute, redirect } from '@tanstack/react-router'
import MobileAppShell from '../components/MobileAppShell'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await authClient.getSession()

    if (!session.data?.user) {
      throw redirect({ to: '/' })
    }
  },
  component: Dashboard,
})

function Dashboard() {
  return (
    <MobileAppShell
      title="Dashboard"
      subtitle="Track today’s store activity from one focused mobile screen."
    >
      <div className="grid gap-4">
        <section className="app-hero-card rounded-[1.6rem] p-5">
          <p className="island-kicker mb-3">Today</p>
          <h2 className="app-hero-value m-0 text-2xl font-bold">Rp 8.420.000</h2>
          <p className="app-hero-meta mt-2 mb-0 text-sm leading-6">
            Total sales from 47 completed transactions.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <article className="app-stat-card rounded-[1.4rem] p-4">
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">Open Orders</p>
            <p className="mt-2 mb-0 text-2xl font-bold text-[var(--sea-ink)]">12</p>
          </article>
          <article className="app-stat-card rounded-[1.4rem] p-4">
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">Low Stock</p>
            <p className="mt-2 mb-0 text-2xl font-bold text-[var(--sea-ink)]">4</p>
          </article>
        </section>

        <section className="app-panel rounded-[1.6rem] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="m-0 text-base font-semibold text-[var(--sea-ink)]">
                Recent activity
              </p>
              <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
                Dummy data for the mobile dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ['Table 03 paid', 'Cashier A • 2 min ago'],
              ['Stock alert: Sugar', 'Remaining 5 packs'],
              ['Refund approved', 'Manager • 18 min ago'],
            ].map(([title, meta]) => (
              <article
                key={title}
                className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] px-4 py-3"
              >
                <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
                  {title}
                </p>
                <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
                  {meta}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MobileAppShell>
  )
}
