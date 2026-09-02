import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 환경변수가 설정되지 않았습니다.')
}

// 고객용 로그인 세션과 완전히 분리하기 위해 별도의 storageKey를 쓰는 관리자 전용 클라이언트.
// 같은 프로젝트/키를 쓰지만 브라우저 저장소는 독립적이라 두 로그인이 서로 영향을 주지 않음.
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'hairme-admin-auth',
  },
})
