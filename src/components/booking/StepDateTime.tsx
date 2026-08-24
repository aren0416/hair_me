const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getAvailableDates() {
  const dates: { key: string; label: string; weekday: number }[] = []
  const today = new Date()
  for (let i = 1; dates.length < 12 && i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const weekday = d.getDay()
    if (weekday === 1) continue // 월요일 휴무
    dates.push({
      key: toDateKey(d),
      label: `${d.getMonth() + 1}/${d.getDate()} (${WEEKDAY_LABELS[weekday]})`,
      weekday,
    })
  }
  return dates
}

function getTimeSlots(weekday: number) {
  const isSunday = weekday === 0
  const open = isSunday ? 11 : 10
  const close = isSunday ? 18 : 20
  const slots: string[] = []
  for (let hour = open; hour < close; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`)
  }
  return slots
}

interface StepDateTimeProps {
  date: string | null
  time: string | null
  onChangeDate: (date: string) => void
  onChangeTime: (time: string) => void
  onNext: () => void
  onBack: () => void
}

export default function StepDateTime({ date, time, onChangeDate, onChangeTime, onNext, onBack }: StepDateTimeProps) {
  const dates = getAvailableDates()
  const selectedDate = dates.find((d) => d.key === date)
  const timeSlots = selectedDate ? getTimeSlots(selectedDate.weekday) : []

  return (
    <div>
      <h2 className="text-center text-xl font-semibold text-ink">날짜와 시간을 선택해주세요</h2>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-ink">날짜 (매주 월요일 휴무)</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => {
                onChangeDate(d.key)
                onChangeTime('')
              }}
              className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                date === d.key
                  ? 'border-accent bg-accent text-background'
                  : 'border-accent/30 text-ink/70 hover:border-accent'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-ink">시간</p>
        {timeSlots.length === 0 ? (
          <p className="text-sm text-ink/50">날짜를 먼저 선택해주세요.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onChangeTime(slot)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  time === slot
                    ? 'border-accent bg-accent text-background'
                    : 'border-accent/30 text-ink/70 hover:border-accent'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
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
          disabled={!date || !time}
          onClick={onNext}
          className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}
