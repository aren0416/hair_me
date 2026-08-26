import type { Reservation } from '../context/ReservationsContext'
import { addDays, toDateKey } from '../utils/date'
import { designers } from './designers'
import { menuItems } from './menuItems'

interface SeedSpec {
  name: string
  phone: string
  offsetDays: number
  status: Reservation['status']
  menuIndex: number
  designerIndex: number | null
  time: string
  notes?: string
}

const specs: SeedSpec[] = [
  // 김민준
  { name: '김민준', phone: '010-1111-2222', offsetDays: -20, status: '완료', menuIndex: 0, designerIndex: 0, time: '10:00' },
  { name: '김민준', phone: '010-1111-2222', offsetDays: -5, status: '완료', menuIndex: 3, designerIndex: 1, time: '14:00' },
  { name: '김민준', phone: '010-1111-2222', offsetDays: 2, status: '예정', menuIndex: 6, designerIndex: 0, time: '11:00' },

  // 이서연
  { name: '이서연', phone: '010-2222-3333', offsetDays: -30, status: '완료', menuIndex: 1, designerIndex: 1, time: '13:00' },
  { name: '이서연', phone: '010-2222-3333', offsetDays: -10, status: '완료', menuIndex: 1, designerIndex: 1, time: '13:00' },
  { name: '이서연', phone: '010-2222-3333', offsetDays: -2, status: '완료', menuIndex: 9, designerIndex: null, time: '15:00' },
  { name: '이서연', phone: '010-2222-3333', offsetDays: 5, status: '예정', menuIndex: 1, designerIndex: 1, time: '13:00' },

  // 박도윤
  { name: '박도윤', phone: '010-3333-4444', offsetDays: -15, status: '완료', menuIndex: 4, designerIndex: 0, time: '16:00' },
  {
    name: '박도윤',
    phone: '010-3333-4444',
    offsetDays: 0,
    status: '예정',
    menuIndex: 2,
    designerIndex: null,
    time: '17:00',
    notes: '짧게 정리만 부탁드려요.',
  },

  // 최지우
  { name: '최지우', phone: '010-4444-5555', offsetDays: -60, status: '완료', menuIndex: 7, designerIndex: 1, time: '11:00' },
  { name: '최지우', phone: '010-4444-5555', offsetDays: -1, status: '취소됨', menuIndex: 7, designerIndex: 1, time: '11:00' },
  { name: '최지우', phone: '010-4444-5555', offsetDays: 3, status: '예정', menuIndex: 8, designerIndex: 0, time: '10:00' },

  // 정하윤
  { name: '정하윤', phone: '010-5555-6666', offsetDays: -8, status: '완료', menuIndex: 5, designerIndex: 0, time: '14:00' },
  { name: '정하윤', phone: '010-5555-6666', offsetDays: -3, status: '완료', menuIndex: 10, designerIndex: 1, time: '15:00' },
  {
    name: '정하윤',
    phone: '010-5555-6666',
    offsetDays: 0,
    status: '예정',
    menuIndex: 0,
    designerIndex: 0,
    time: '10:00',
    notes: '얼굴형에 맞는 스타일 추천 부탁드려요.',
  },

  // 강시우
  { name: '강시우', phone: '010-6666-7777', offsetDays: -45, status: '완료', menuIndex: 2, designerIndex: 1, time: '16:00' },
  { name: '강시우', phone: '010-6666-7777', offsetDays: 7, status: '예정', menuIndex: 2, designerIndex: 1, time: '16:00' },

  // 조은우
  { name: '조은우', phone: '010-7777-8888', offsetDays: -12, status: '완료', menuIndex: 6, designerIndex: null, time: '13:00' },
  { name: '조은우', phone: '010-7777-8888', offsetDays: -4, status: '취소됨', menuIndex: 6, designerIndex: null, time: '13:00' },
  { name: '조은우', phone: '010-7777-8888', offsetDays: 1, status: '예정', menuIndex: 9, designerIndex: 0, time: '11:00' },

  // 윤서아
  { name: '윤서아', phone: '010-8888-9999', offsetDays: -25, status: '완료', menuIndex: 3, designerIndex: 0, time: '15:00' },
  { name: '윤서아', phone: '010-8888-9999', offsetDays: -18, status: '완료', menuIndex: 3, designerIndex: 0, time: '15:00' },
  { name: '윤서아', phone: '010-8888-9999', offsetDays: -1, status: '완료', menuIndex: 8, designerIndex: 1, time: '17:00' },
  { name: '윤서아', phone: '010-8888-9999', offsetDays: 4, status: '예정', menuIndex: 3, designerIndex: 0, time: '15:00' },

  // 임지호
  { name: '임지호', phone: '010-9999-0000', offsetDays: -6, status: '완료', menuIndex: 1, designerIndex: 1, time: '10:00' },
  {
    name: '임지호',
    phone: '010-9999-0000',
    offsetDays: 0,
    status: '예정',
    menuIndex: 4,
    designerIndex: null,
    time: '14:00',
    notes: '세팅력이 오래가는 걸로 부탁드려요.',
  },

  // 한유나
  { name: '한유나', phone: '010-1010-2020', offsetDays: -50, status: '완료', menuIndex: 10, designerIndex: 0, time: '11:00' },
  { name: '한유나', phone: '010-1010-2020', offsetDays: -20, status: '완료', menuIndex: 10, designerIndex: 0, time: '11:00' },
  { name: '한유나', phone: '010-1010-2020', offsetDays: -3, status: '취소됨', menuIndex: 5, designerIndex: 1, time: '16:00' },
  { name: '한유나', phone: '010-1010-2020', offsetDays: 6, status: '예정', menuIndex: 10, designerIndex: 0, time: '11:00' },
]

export function createSeedReservations(): Reservation[] {
  const today = new Date()

  return specs.map((spec, index) => {
    const appointmentDate = addDays(today, spec.offsetDays)
    const creationOffset = Math.min(spec.offsetDays - 3, -1)
    const createdAt = addDays(today, creationOffset)

    return {
      id: `seed-${index + 1}`,
      menuId: menuItems[spec.menuIndex].id,
      designerId: spec.designerIndex === null ? null : designers[spec.designerIndex].id,
      date: toDateKey(appointmentDate),
      time: spec.time,
      name: spec.name,
      phone: spec.phone,
      notes: spec.notes ?? '',
      status: spec.status,
      createdAt: createdAt.toISOString(),
    }
  })
}
