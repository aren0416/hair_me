const steps = ['메뉴 선택', '디자이너 선택', '날짜 · 시간 선택', '요청사항 확인', '최종 제출']

export default function Booking() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <span className="mb-3 block text-xs font-medium uppercase tracking-widest text-accent">준비 중인 화면</span>
      <h1 className="text-3xl font-semibold text-ink">예약하기</h1>
      <p className="mt-3 text-ink/70">아래 5단계를 거쳐 예약을 진행하는 화면입니다.</p>

      <ol className="mt-10 flex flex-col gap-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-4 rounded-xl border border-accent/20 bg-white/40 px-5 py-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-background">
              {index + 1}
            </span>
            <span className="text-ink/80">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
