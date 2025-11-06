'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock 비밀번호 재설정 요청
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>이메일을 확인하세요</CardTitle>
              <CardDescription>비밀번호 재설정 링크를 보냈습니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {email}로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정하세요.
              </p>
              <Link href="/login">
                <Button className="w-full">로그인으로 돌아가기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>비밀번호 재설정</CardTitle>
            <CardDescription>등록된 이메일로 재설정 링크를 보내드립니다</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="example@email.com"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '전송 중...' : '재설정 링크 보내기'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">
                  로그인으로 돌아가기
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}




