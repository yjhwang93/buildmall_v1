import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  setToken: (token: string | null) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setToken: (token) => {
        if (typeof window !== 'undefined') {
          if (token) {
            localStorage.setItem('auth_token', token)
          } else {
            localStorage.removeItem('auth_token')
          }
        }
        set({ accessToken: token, isAuthenticated: !!token })
      },
      signOut: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
        }
        set({ accessToken: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ accessToken: state.accessToken, isAuthenticated: state.isAuthenticated }),
    }
  )
)

// 초기화 시 localStorage에서 토큰 불러오기
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token')
  if (token) {
    useAuthStore.getState().setToken(token)
  }
}
