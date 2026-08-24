import { Link } from 'react-router-dom'

const infoCards = [
  {
    title: '운영시간',
    lines: ['화–토 10:00 – 20:00', '일요일 11:00 – 18:00', '매주 월요일 휴무'],
  },
  {
    title: '대중교통',
    lines: ['수인분당선 서울숲역 3번 출구', '도보 5분'],
  },
  {
    title: '주차 안내',
    lines: ['건물 내 방문객 전용 주차 2대', '선착순 무료 이용'],
  },
]

export default function Location() {
  return (
    <div>
      {/* Intro */}
      <section className="px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Location</p>
        <h1 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          HAIRME를 찾아오시는 길
        </h1>
        <p className="mt-4 text-ink/70">서울숲 근처, 편안한 발걸음으로 찾아오실 수 있습니다.</p>
      </section>

      {/* Map + address */}
      <section className="border-t border-accent/20 bg-white/40 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2 sm:gap-16">
          <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-sm text-ink/50">
            지도 영역 (추후 연동)
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">오시는 길</h2>
            <div className="mt-5 space-y-2 text-ink/70">
              <p className="text-lg font-medium text-ink">서울특별시 성동구 서울숲길 42, 2층</p>
              <p>02-555-2847</p>
            </div>
            <a
              href="tel:02-555-2847"
              className="mt-8 inline-block rounded-full border border-accent/30 px-8 py-3 text-sm font-medium text-ink transition hover:border-accent"
            >
              전화로 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">방문 안내</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {infoCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-accent/20 bg-white/40 p-6">
                <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                <div className="mt-3 space-y-1">
                  {card.lines.map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-ink/70">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink/50">
            예약 시간보다 10분 일찍 도착해주시면 여유롭게 상담받으실 수 있습니다.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-2xl font-semibold text-background sm:text-3xl">지금 예약하기</h2>
        <Link
          to="/booking"
          className="mt-8 inline-block rounded-full bg-background px-8 py-3 text-sm font-medium text-ink transition hover:opacity-90"
        >
          원하는 시간에 예약하기
        </Link>
      </section>
    </div>
  )
}
