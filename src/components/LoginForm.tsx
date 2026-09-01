import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Toast from './Toast'
import { supabase } from '../lib/supabase'

const inputClass =
  'w-full rounded-xl border border-accent/30 bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none'

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showSignupToast, setShowSignupToast] = useState(
    Boolean((location.state as { justSignedUp?: boolean } | null)?.justSignedUp),
  )

  useEffect(() => {
    if (!showSignupToast) return
    window.history.replaceState({}, '')
    const timer = setTimeout(() => setShowSignupToast(false), 3000)
    return () => clearTimeout(timer)
  }, [showSignupToast])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    setSubmitting(false)

    if (signInError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      return
    }

    if (location.pathname !== '/booking') {
      navigate('/')
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6">
      {showSignupToast && <Toast message="회원가입이 완료됐어요. 로그인해주세요." />}
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Login</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">로그인</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="font-medium text-accent hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
