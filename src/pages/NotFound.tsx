import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold text-ink">페이지를 찾을 수 없습니다</h1>
      <Link to="/" className="mt-4 text-accent underline">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
