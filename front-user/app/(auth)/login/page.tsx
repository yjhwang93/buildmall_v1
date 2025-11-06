'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { apiClient } from '@/lib/api/client'
import type { LoginRequest, ApiResponse, LoginResponse } from '@/lib/types/api'

export default function LoginPage() {
  const router = useRouter()
  const { setToken } = useAuthStore()
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('Attempting login with:', { email: formData.email })
      const response = await apiClient.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', formData)
      console.log('Login response:', response.data)
      
      if (response.data.success) {
        setToken(response.data.data.accessToken)
        router.push('/')
      } else {
        setError(response.data.error || '로그인에 실패했습니다.')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      console.error('Error response:', err.response)
      console.error('Error message:', err.message)
      
      // 네트워크 에러 또는 MSW가 작동하지 않는 경우
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setError('서버에 연결할 수 없습니다. MSW가 작동하지 않을 수 있습니다. 브라우저 콘솔을 확인해주세요.')
      } else {
        const errorMessage = err.response?.data?.error || err.message || '로그인에 실패했습니다.'
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>계정에 로그인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                계정이 없으신가요?{' '}
                <Link href="/register" className="text-primary hover:underline">
                  회원가입
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-muted rounded-md">
          <p className="text-sm font-semibold mb-2">테스트 계정:</p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>일반 사용자: user1@example.com / password123</li>
            <li>기업 사용자: business1@example.com / password123</li>
            <li>관리자: admin@example.com / password123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

