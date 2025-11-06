import { useAuthStore } from '@/lib/store/useAuthStore'
import { apiClient } from '@/lib/api/client'

// API 클라이언트에 토큰 추가
export function setupAuthInterceptor() {
  apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

// 초기화 함수
if (typeof window !== 'undefined') {
  setupAuthInterceptor()
  
  // 토큰이 변경될 때마다 인터셉터 업데이트
  useAuthStore.subscribe((state) => {
    setupAuthInterceptor()
  })
}




