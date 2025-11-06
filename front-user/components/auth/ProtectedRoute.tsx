'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, requireAuth, router])

  if (requireAuth && !isAuthenticated) {
    return null
  }

  return <>{children}</>
}




