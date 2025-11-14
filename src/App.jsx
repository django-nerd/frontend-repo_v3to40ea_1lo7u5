import { useState } from 'react'
import Spline from '@splinetool/react-spline'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [taglineAlt, setTaglineAlt] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'checking…' })
    try {
      const res = await fetch(`${backend}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'something went wrong')
      setStatus({ state: 'success', message: 'you’re in. check your inbox soon.' })
      setEmail('')
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'not eligible' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white">
      {/* top bar */}
      <header className="px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-sm bg-black" />
          <span className="text-base tracking-wide lowercase">paired</span>
        </div>
        <nav className="text-xs lowercase text-neutral-500">private beta</nav>
      </header>

      {/* hero */}
      <main className="px-6 sm:px-10 pt-6 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <section className="order-2 lg:order-1">
          <h1 className="lowercase text-5xl sm:text-6xl font-semibold leading-[0.95] tracking-tight">
            {taglineAlt ? 'if you know you know' : 'choose, don’t chase'}
          </h1>
          <p className="mt-4 lowercase text-neutral-500 max-w-xl">
            a quieter dating app for people who like intention. thoughtfully matched, never loud. fewer swipes, better signals.
          </p>

          <form onSubmit={submit} className="mt-8 max-w-md">
            <label className="block text-xs lowercase text-neutral-500 mb-2">join the list (ivy emails only)</label>
            <div className="flex rounded-xl border border-neutral-200 bg-white focus-within:border-neutral-900 transition">
              <input
                type="email"
                required
                placeholder="your .edu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-4 py-3 text-sm placeholder-neutral-400 focus:outline-none lowercase"
                aria-label="email"
              />
              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="px-4 py-3 text-sm font-medium lowercase bg-black text-white hover:opacity-90 disabled:opacity-60"
              >
                {status.state === 'loading' ? 'checking…' : 'request access'}
              </button>
            </div>
            {status.message && (
              <p className={`mt-2 text-sm lowercase ${status.state === 'error' ? 'text-rose-500' : 'text-neutral-500'}`}>
                {status.message}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTaglineAlt((v) => !v)}
                className="text-xs lowercase text-neutral-400 hover:text-neutral-700 underline-offset-4 hover:underline"
              >
                {taglineAlt ? 'show “choose, don’t chase”' : 'show “if you know you know”'}
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs lowercase text-neutral-400">only ivy league domains are eligible for now.</p>
        </section>

        {/* visual */}
        <section className="order-1 lg:order-2">
          <div className="relative rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.15),transparent)]" />
            <div className="h-[420px] sm:h-[520px] lg:h-[620px]">
              <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="px-6 sm:px-10 pb-10 text-xs text-neutral-400 lowercase">
        © {new Date().getFullYear()} paired — all rights reserved
      </footer>
    </div>
  )
}

export default App
