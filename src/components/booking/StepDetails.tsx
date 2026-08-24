const inputClass =
  'w-full rounded-xl border border-accent/30 bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none'

interface StepDetailsProps {
  name: string
  phone: string
  notes: string
  onChangeName: (value: string) => void
  onChangePhone: (value: string) => void
  onChangeNotes: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export default function StepDetails({
  name,
  phone,
  notes,
  onChangeName,
  onChangePhone,
  onChangeNotes,
  onNext,
  onBack,
}: StepDetailsProps) {
  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-center text-xl font-semibold text-ink">예약자 정보를 입력해주세요</h2>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="booking-name" className="mb-1.5 block text-sm font-medium text-ink">
            이름
          </label>
          <input
            id="booking-name"
            type="text"
            placeholder="이름을 입력하세요"
            className={inputClass}
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="booking-phone" className="mb-1.5 block text-sm font-medium text-ink">
            연락처
          </label>
          <input
            id="booking-phone"
            type="tel"
            placeholder="예약 확인 연락을 위해 사용됩니다"
            className={inputClass}
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="booking-notes" className="mb-1.5 block text-sm font-medium text-ink">
            요청사항 (선택)
          </label>
          <textarea
            id="booking-notes"
            rows={4}
            placeholder="디자이너에게 전달하고 싶은 내용을 남겨주세요"
            className={inputClass}
            value={notes}
            onChange={(e) => onChangeNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-accent/30 px-8 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
        >
          이전
        </button>
        <button
          type="button"
          disabled={!name.trim() || !phone.trim()}
          onClick={onNext}
          className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}
