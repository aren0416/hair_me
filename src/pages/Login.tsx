import { Link } from 'react-router-dom'

const inputClass =
  'w-full rounded-xl border border-accent/30 bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none'

export default function Login() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Login</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">로그인</h1>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-10 space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              이메일
            </label>
            <input id="email" type="email" placeholder="you@example.com" className={inputClass} />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              비밀번호
            </label>
            <input id="password" type="password" placeholder="비밀번호를 입력하세요" className={inputClass} />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            로그인
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
