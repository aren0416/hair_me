import { Link } from 'react-router-dom'

const storyImg =
  'https://images.unsplash.com/photo-1614838280822-4fdea45dc3c3?auto=format&fit=crop&w=1200&q=80'

const values = [
  {
    title: '정밀한 스타일 진단',
    description: '얼굴형, 모질, 피부톤을 분석해 가장 잘 어울리는 스타일을 제안합니다.',
  },
  {
    title: '숙련된 전문 기술',
    description: '각 분야에서 경력을 쌓은 디자이너가 정교한 기술로 시술합니다.',
  },
  {
    title: '지속가능한 애프터케어',
    description: '시술 후 관리 방법까지 안내해 스타일이 오래 유지되도록 돕습니다.',
  },
]

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1627075932202-39e03abdeb4f?auto=format&fit=crop&w=800&q=80',
    alt: 'HAIRME 스타일링 체어',
  },
  {
    src: 'https://images.unsplash.com/photo-1626379464632-cc45ac86daae?auto=format&fit=crop&w=800&q=80',
    alt: 'HAIRME 전문 제품 라인업',
  },
  {
    src: 'https://images.unsplash.com/photo-1647462741268-e5724e5886c0?auto=format&fit=crop&w=800&q=80',
    alt: 'HAIRME 디자이너의 정교한 시술',
  },
]

export default function Brand() {
  return (
    <div>
      {/* Intro */}
      <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Brand</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          정교한 진단과 숙련된 기술로
          <br />
          완성하는 스타일
        </h1>
        <p className="mt-4 text-ink/70">HAIRME는 감각이 아닌 전문성을 바탕으로 스타일을 설계합니다.</p>
      </section>

      {/* Story */}
      <section className="border-t border-accent/20 bg-white/40 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2 sm:gap-16">
          <img
            src={storyImg}
            alt="HAIRME 상담 및 스타일링 장면"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">분석에서 시작되는 스타일링</h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              HAIRME의 모든 시술은 상담에서 시작됩니다. 얼굴형과 모질, 두피 상태, 라이프스타일까지 세심하게
              파악한 뒤, 이를 바탕으로 가장 잘 어울리는 스타일을 설계합니다. 트렌드를 따라가기보다 고객 개개인에게
              최적화된 결과를 만드는 것, 이것이 HAIRME 디자이너들이 공유하는 원칙입니다.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              경력을 쌓아온 디자이너들은 각자의 전문 분야에서 꾸준히 기술을 연마하며, 시술 전후 세심한 관리로
              스타일이 오래 유지되도록 돕습니다. 베이지와 브라운이 어우러진 차분한 공간은 이 모든 과정이 편안하게
              이루어지도록 설계되었습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">HAIRME가 지키는 원칙</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-accent/20 bg-white/40 p-6">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-accent/20 bg-white/40 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">HAIRME의 공간</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {gallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[3/4] w-full rounded-2xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-2xl font-semibold text-background sm:text-3xl">전문적인 스타일 진단을 받아보세요</h2>
        <Link
          to="/booking"
          className="mt-8 inline-block rounded-full bg-background px-8 py-3 text-sm font-medium text-ink transition hover:opacity-90"
        >
          지금 예약하기
        </Link>
      </section>
    </div>
  )
}
