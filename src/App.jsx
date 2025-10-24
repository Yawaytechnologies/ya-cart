import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Tailwind + Vite is <span className="text-indigo-600">working</span> 🎉
        </h1>

        <p className="mt-2 text-slate-600">
          If you see colors, spacing, and rounded corners, Tailwind compiled.
        </p>

        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Indigo Button
          </button>
          <button className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">
            Outline Button
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-10 rounded bg-indigo-100" />
          <div className="h-10 rounded bg-emerald-100" />
          <div className="h-10 rounded bg-rose-100" />
        </div>
      </div>
    </div>
  )
}

export default App
