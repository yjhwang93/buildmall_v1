'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, CreateInquiryRequest } from '@/lib/types/api'

export default function WriteInquiryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')

  const [type, setType] = useState<'general' | 'product' | 'order' | 'payment' | 'shipping'>(
    productId ? 'product' : 'general'
  )
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      alert('문의 내용을 입력해주세요.')
      return
    }

    setSubmitting(true)

    try {
      const inquiryData: CreateInquiryRequest = {
        productId: productId || undefined,
        type,
        title: title.trim(),
        content: content.trim(),
      }

      // TODO: 문의 작성 API 호출
      // await apiClient.post('/api/v1/inquiries', inquiryData)

      // Mock 처리
      setTimeout(() => {
        alert('문의가 등록되었습니다.')
        router.push('/inquiry')
      }, 500)
    } catch (error) {
      console.error('Failed to submit inquiry:', error)
      alert('문의 등록에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">1:1 문의</h1>

          <Card>
            <CardHeader>
              <CardTitle>문의 작성</CardTitle>
              <CardDescription>문의사항을 작성해주세요. 빠르게 답변드리겠습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 문의 유형 */}
                <div>
                  <label htmlFor="type" className="text-sm font-medium mb-2 block">
                    문의 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="general">일반 문의</option>
                    <option value="product">상품 문의</option>
                    <option value="order">주문/배송 문의</option>
                    <option value="payment">결제 문의</option>
                    <option value="shipping">배송 문의</option>
                  </select>
                </div>

                {/* 제목 */}
                <div>
                  <label htmlFor="title" className="text-sm font-medium mb-2 block">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="문의 제목을 입력하세요"
                    required
                    maxLength={200}
                  />
                </div>

                {/* 내용 */}
                <div>
                  <label htmlFor="content" className="text-sm font-medium mb-2 block">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
                    placeholder="문의 내용을 자세히 입력해주세요."
                    required
                    maxLength={2000}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {content.length} / 2000자
                  </p>
                </div>

                {/* 제출 버튼 */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                  >
                    취소
                  </Button>
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting ? '등록 중...' : '문의 등록'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}




