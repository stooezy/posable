import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import MobileAppShell from '../components/MobileAppShell'
import ThemeToggle from '../components/ThemeToggle'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/profile')({
  beforeLoad: async () => {
    const session = await authClient.getSession()

    if (!session.data?.user) {
      throw redirect({ to: '/' })
    }
  },
  component: Profile,
})

function Profile() {
  const session = authClient.useSession()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentUser = session.data?.user

  async function handleSignOut() {
    setIsSubmitting(true)
    const { error } = await authClient.signOut()

    setIsSubmitting(false)

    if (!error) {
      navigate({ to: '/' })
    }
  }

  return (
    <MobileAppShell
      title="Profile"
      subtitle="Account and session details for the current signed-in staff member."
    >
      <div className="grid gap-4">
        <section className="app-panel rounded-[1.6rem] p-5">
          <p className="island-kicker mb-3">Account</p>
          <p className="m-0 text-base font-semibold text-[var(--sea-ink)]">
            {currentUser?.name ?? 'Staff User'}
          </p>
          <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
            @{currentUser?.username ?? 'user'}
          </p>
          <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
            {currentUser?.email ?? '-'}
          </p>
        </section>

        <section className="app-panel rounded-[1.6rem] p-5">
          <p className="m-0 text-base font-semibold text-[var(--sea-ink)]">
            Store role
          </p>
          <p className="mt-2 mb-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
            Manager access with mobile dashboard navigation.
          </p>
        </section>

        <section className="app-panel rounded-[1.6rem] p-5">
          <p className="m-0 text-base font-semibold text-[var(--sea-ink)]">
            Theme
          </p>
          <p className="mt-2 mb-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
            Switch between light and dark mode for this browser.
          </p>
          <ThemeToggle />
        </section>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSubmitting}
          className="login-button inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </MobileAppShell>
  )
}
