import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const inputClass =
  'w-full rounded-xl border border-accent/30 bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none'

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!PASSWORD_PATTERN.test(password)) {
      setError('비밀번호는 8자 이상이며 숫자와 문자를 모두 포함해야 합니다.')
      return
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setSubmitting(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    })

    setSubmitting(false)

    if (signUpError) {
      // 이메일 확인이 꺼져 있으면 중복 가입 시 이 메시지로 바로 에러가 옴
      if (signUpError.message.includes('already registered')) {
        setError('이미 가입된 이메일입니다.')
        return
      }
      setError(signUpError.message)
      return
    }

    // 이메일 확인이 켜져 있으면 중복 가입이어도 에러 없이 성공 응답을 주고,
    // identities가 빈 배열로 오는 걸로만 구분할 수 있음
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError('이미 가입된 이메일입니다.')
      return
    }

    navigate('/login', { state: { justSignedUp: true } })
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Sign up</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
              전화번호
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="예약 확인을 위해 사용됩니다"
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="8자 이상, 숫자+문자 포함"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              pattern={PASSWORD_PATTERN.source}
              title="8자 이상이며 숫자와 문자를 모두 포함해야 합니다."
              required
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="mb-1.5 block text-sm font-medium text-ink">
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className={inputClass}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-ink/70">
            <input type="checkbox" className="mt-0.5 accent-accent" required />
            이용약관 및 개인정보처리방침에 동의합니다
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-medium text-accent hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
