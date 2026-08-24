import { Link } from 'react-router-dom'
import { designers } from '../data/designers'

const heroImg =
  'https://images.unsplash.com/photo-1637777277337-f114350fb088?auto=format&fit=crop&w=1800&q=80'
const brandImg =
  'https://images.unsplash.com/photo-1614838280822-4fdea45dc3c3?auto=format&fit=crop&w=1200&q=80'

const menus = [
  {
    name: '여성 커트',
    description: '얼굴형과 모질을 고려한 맞춤 디자인 커트',
    price: '55,000원',
    image: 'https://images.unsplash.com/photo-1647462741351-4e7a5e7317c7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '펌 & 스타일링',
    description: '자연스러운 볼륨과 원하는 분위기를 살리는 맞춤 펌',
    price: '110,000원',
    image: 'https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '컬러',
    description: '퍼스널 컬러와 피부톤을 고려한 맞춤 헤어 컬러',
    price: '95,000원',
    image: 'https://images.unsplash.com/photo-1638064432648-bc2f9a91b06b?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section id="hero" className="relative flex min-h-[85vh] items-end overflow-hidden">
        <img src={heroImg} alt="HAIRME 살롱 내부" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <p className="text-sm font-medium tracking-[0.3em] text-background/80">HAIRME</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-background sm:text-5xl">
            당신에게 가장 잘 어울리는 스타일,
            <br />
            HAIRME에서
          </h1>
          <p className="mt-4 text-background/80">원하는 스타일을 찾았다면, 지금 HAIRME에서 예약하세요</p>
          <Link
            to="/booking"
            className="mt-8 inline-block rounded-full bg-background px-8 py-3 text-sm font-medium text-ink transition hover:opacity-90"
          >
            예약하기
          </Link>
        </div>
      </section>

      {/* Brand */}
      <section id="brand" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2 sm:gap-16">
          <div className="order-2 sm:order-1">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">Brand Story</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              정교한 진단이
              <br />
              완성하는 스타일
            </h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              HAIRME는 얼굴형과 모질, 피부톤을 세심하게 진단하는 전문 상담을 시작으로, 숙련된 디자이너의 정교한
              기술로 스타일을 완성합니다. 유행을 따르기보다 당신에게 최적화된 스타일을 제안하는 것, HAIRME가
              지키는 원칙입니다.
            </p>
            <Link to="/brand" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
              브랜드 자세히 보기 →
            </Link>
          </div>
          <div className="order-1 sm:order-2">
            <img
              src={brandImg}
              alt="HAIRME 브랜드 이미지"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-accent/20 bg-white/40 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">Signature Menu</p>
          <h2 className="mt-3 text-center text-2xl font-semibold text-ink sm:text-3xl">시그니처 메뉴</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {menus.map((menu) => (
              <div key={menu.name} className="overflow-hidden rounded-2xl border border-accent/20 bg-background">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink">{menu.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{menu.description}</p>
                  <p className="mt-4 font-medium text-accent">{menu.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designers */}
      <section id="designers" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">Designers</p>
          <h2 className="mt-3 text-center text-2xl font-semibold text-ink sm:text-3xl">디자이너</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {designers.map((designer) => (
              <Link
                key={designer.id}
                to={`/designers/${designer.id}`}
                className="group overflow-hidden rounded-2xl border border-accent/20 bg-white/40 transition hover:border-accent"
              >
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink">
                    {designer.name} <span className="font-normal text-ink/60">{designer.title}</span>
                  </h3>
                  <p className="mt-2 text-sm text-ink/70">{designer.specialties.join(' · ')} 전문</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="border-t border-accent/20 bg-white/40 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Location</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">위치 & 운영시간</h2>

          <div className="mt-10 flex aspect-video w-full items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-sm text-ink/50">
            지도 영역 (추후 연동)
          </div>

          <div className="mt-8 space-y-1 text-ink/70">
            <p>서울특별시 성동구 서울숲길 42, 2층</p>
            <p>화–토 10:00–20:00 · 일 11:00–18:00 · 매주 월요일 휴무</p>
            <p>02-555-2847</p>
          </div>
          <Link to="/location" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
            오시는 길 자세히 보기 →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-accent px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-2xl font-semibold text-background sm:text-3xl">지금 예약하기</h2>
        <p className="mt-3 text-background/80">원하는 시간에 예약하고, 나에게 어울리는 스타일을 만나보세요</p>
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
