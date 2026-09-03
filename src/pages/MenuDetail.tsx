import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StarIcon } from '../components/icons'
import type { MenuRow } from '../data/menuItems'
import { supabase } from '../lib/supabase'
import { maskName } from '../utils/mask'

interface ReviewRow {
  id: string
  userName: string
  rating: number
  content: string
  designerName: string | null
}

const categoryLabel: Record<MenuRow['category'], string> = {
  cut: '커트',
  perm: '펌',
  color: '컬러',
  clinic: '클리닉',
}

export default function MenuDetail() {
  const { id } = useParams()
  const [menuItem, setMenuItem] = useState<MenuRow | null | undefined>(undefined)
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  const load = useCallback(async () => {
    if (!id) return
    setReviewsLoading(true)

    const [menuRes, reviewsRes] = await Promise.all([
      supabase.from('menus').select('*').eq('id', id).maybeSingle(),
      supabase
        .from('reviews')
        .select('id, user_name, rating, content, designers(name, title)')
        .eq('menu_id', id)
        .order('created_at', { ascending: false }),
    ])

    setMenuItem((menuRes.data as MenuRow | null) ?? null)
    setReviews(
      (reviewsRes.data ?? []).map((r) => ({
        id: r.id as string,
        userName: r.user_name as string,
        rating: r.rating as number,
        content: r.content as string,
        designerName: r.designers
          ? (() => {
              const designer = r.designers as unknown as { name: string; title: string }
              return `${designer.name} ${designer.title}`
            })()
          : null,
      })),
    )
    setReviewsLoading(false)
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  if (menuItem === undefined) {
    return null
  }

  if (!menuItem) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-ink">시술을 찾을 수 없습니다</h1>
        <Link to="/menu" className="mt-4 inline-block text-accent underline">
          시술 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* 시술 정보 */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-start gap-10 sm:grid-cols-2 sm:gap-16">
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {categoryLabel[menuItem.category]}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">{menuItem.name}</h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-ink/60">
              <span>{menuItem.duration_minutes}분</span>
              <span className="text-ink/20">·</span>
              <span className="text-lg font-semibold text-accent">
                {menuItem.price.toLocaleString('ko-KR')}원
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-ink/70">{menuItem.detail}</p>

            <Link
              to="/booking"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              이 시술로 예약하기
            </Link>
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="border-t border-accent/20 bg-white/40 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-ink">후기 {reviews.length}</h2>

          {reviewsLoading ? (
            <p className="mt-6 text-sm text-ink/50">불러오는 중...</p>
          ) : reviews.length === 0 ? (
            <p className="mt-6 text-sm text-ink/50">아직 등록된 후기가 없습니다.</p>
          ) : (
            <div className="mt-8 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-accent/20 bg-background p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink">{maskName(review.userName)}</span>
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="size-4" filled={i < review.rating} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{review.content}</p>
                  {review.designerName && (
                    <p className="mt-3 text-xs text-ink/40">시술 디자이너: {review.designerName}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
