import { useState } from 'react'
import Spline from '@splinetool/react-spline'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* glow gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" style={{background: 'radial-gradient( circle at 30% 30%, rgba(56,189,248,0.25), transparent 60%)' }} />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{background: 'radial-gradient( circle at 70% 70%, rgba(168,85,247,0.25), transparent 60%)' }} />
      </div>

      {/* nav */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
          <span className="text-lg tracking-wide lowercase">paired</span>
        </div>
        <div className="text-sm text-zinc-400 lowercase">private beta</div>
      </header>

      {/* hero */}
      <main className="relative z-10 grid lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 pt-4 pb-24">
        <div className="space-y-6">
          <h1 className="lowercase text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
            build your circle.
            <br />
            keep it rare.
          </h1>
          <p className="lowercase text-zinc-400 max-w-xl">
            the network for the few. signal over noise. curated connections,
            verified identity, and access that moves quietly.
          </p>

          <form onSubmit={submit} className="mt-6 max-w-md">
            <div className="group relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/30 to-violet-500/30 blur opacity-60 group-focus-within:opacity-90 transition" />
              <div className="relative flex overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
                <input
                  type="email"
                  required
                  placeholder="ivy league email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none lowercase"
                />
                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="px-4 py-3 text-sm font-medium lowercase bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 disabled:opacity-60"
                >
                  {status.state === 'loading' ? 'checking…' : 'request access'}
                </button>
              </div>
            </div>
            {status.message && (
              <p className={`mt-2 text-sm lowercase ${status.state === 'error' ? 'text-rose-400' : 'text-zinc-400'}`}>
                {status.message}
              </p>
            )}
            <p className="mt-2 text-xs lowercase text-zinc-500">only ivy league domains are eligible for now.</p>
          </form>
        </div>

        <div className="h-[480px] sm:h-[560px] lg:h-[640px] xl:h-[720px] relative">
          <div className="absolute inset-0 rounded-3xl overflow-hidden ring-1 ring-white/10">
            <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            {/* soft overlay for contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="relative z-10 px-6 sm:px-10 pb-10 text-xs text-zinc-500 lowercase">
        © {new Date().getFullYear()} paired — all rights reserved
      </footer>
    </div>
  )
}

export default App
