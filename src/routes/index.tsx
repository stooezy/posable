import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const session = authClient.useSession()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentUser = session.data?.user

  useEffect(() => {
    if (currentUser) {
      navigate({ to: '/dashboard' })
    }
  }, [currentUser, navigate])

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const { error } = await authClient.signIn.username({
      username,
      password,
      rememberMe,
    })

    if (error) {
      setErrorMessage(error.message ?? 'Unable to sign in.')
      setIsSubmitting(false)
      return
    }

    setPassword('')
    setIsSubmitting(false)
    navigate({ to: '/dashboard' })
  }

  async function handleSignOut() {
    setErrorMessage('')
    setIsSubmitting(true)

    const { error } = await authClient.signOut()

    if (error) {
      setErrorMessage(error.message ?? 'Unable to sign out.')
    }

    setIsSubmitting(false)
  }

  return (
    <main className="auth-screen px-4 py-6 sm:px-6 sm:py-10">
      <section className="auth-card rise-in mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] px-6 py-7 sm:px-7 sm:py-8">
        <div className="auth-brand mb-8">
          <div className="auth-brand-mark">
            <span />
          </div>
          <div>
            <p className="island-kicker mb-2">POS Console</p>
            <h1 className="display-title m-0 text-[2rem] leading-[1.02] font-bold text-[var(--sea-ink)]">
              {currentUser ? 'Session ready' : 'Login'}
            </h1>
            <p className="mt-3 mb-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
              {currentUser
                ? `Signed in as ${currentUser.name}.`
                : 'Use your username and password to continue.'}
            </p>
          </div>
        </div>

        {currentUser ? (
          <div className="space-y-4">
            <div className="auth-user-card rounded-[1.6rem] p-5">
              <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
                @{currentUser.username}
              </p>
              <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
                {currentUser.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSubmitting}
              className="login-button inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSignIn}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--sea-ink)]">
                Username
              </span>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="shiftlead"
                className="login-input w-full rounded-2xl px-4 py-3.5 text-sm outline-none"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--sea-ink)]">
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="login-input w-full rounded-2xl px-4 py-3.5 text-sm outline-none"
                required
              />
            </label>

            <label className="flex items-center gap-2 pt-1 text-sm text-[var(--sea-ink-soft)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-[var(--line)] accent-[var(--foreground)]"
              />
              Keep me signed in
            </label>

            {errorMessage ? (
              <p className="m-0 rounded-2xl border border-[color-mix(in_oklab,#dc2626_22%,transparent)] bg-[color-mix(in_oklab,#dc2626_8%,transparent)] px-4 py-3 text-sm text-[#b91c1c] dark:text-[#fca5a5]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || session.isPending}
              className="login-button inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
