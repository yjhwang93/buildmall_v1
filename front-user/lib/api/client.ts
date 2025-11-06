import axios from 'axios'

// MSW를 사용할 때는 baseURL을 빈 문자열로 설정 (상대 경로 사용)
// 실제 API를 사용할 때는 환경 변수에서 가져옴
const baseURL = process.env.NEXT_PUBLIC_USE_MOCK_API === 'false' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  : '' // MSW를 사용할 때는 상대 경로 사용

export const apiClient = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - 토큰 추가
apiClient.interceptors.request.use((config) => {
  // 클라이언트 사이드에서만 실행
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Response interceptor - 에러 처리
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // 로그인 페이지에서는 401 에러 시 자동 리다이렉트하지 않음
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && currentPath !== '/register') {
        // 인증 실패 시 로그아웃 처리 (로그인/회원가입 페이지 제외)
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
