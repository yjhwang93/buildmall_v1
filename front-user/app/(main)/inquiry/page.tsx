'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Inquiry, PaginatedResponse } from '@/lib/types/api'

export default function InquiryPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      // TODO: 문의 내역 API 호출
      // const response = await apiClient.get<ApiResponse<PaginatedResponse<Inquiry>>>('/api/v1/inquiries')
      // if (response.data.success) {
      //   setInquiries(response.data.data.items)
      // }

      // Mock 데이터
      setInquiries([])
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      general: '일반 문의',
      product: '상품 문의',
      order: '주문/배송 문의',
      payment: '결제 문의',
      shipping: '배송 문의',
    }
    return typeMap[type] || type
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '답변 대기',
      answered: '답변 완료',
      closed: '완료',
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'text-yellow-600',
      answered: 'text-blue-600',
      closed: 'text-gray-600',
    }
    return colorMap[status] || 'text-gray-600'
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">1:1 문의</h1>
          <Link href="/inquiry/write">
            <Button>문의하기</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">로딩 중...</div>
        ) : inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">문의 내역이 없습니다.</p>
              <Link href="/inquiry/write">
                <Button>문의하기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {getTypeText(inquiry.type)}
                        </span>
                        <span className={`text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                          {getStatusText(inquiry.status)}
                        </span>
                      </div>
                      <CardTitle>{inquiry.title}</CardTitle>
                      <CardDescription>
                        {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {inquiry.content}
                  </p>
                  {inquiry.answer && (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-2">답변</p>
                      <p className="text-sm text-muted-foreground">{inquiry.answer}</p>
                      {inquiry.answeredAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(inquiry.answeredAt).toLocaleDateString('ko-KR')}
                        </p>
                      )}
                    </div>
                  )}
                  {inquiry.product && (
                    <Link
                      href={`/products/${inquiry.productId}`}
                      className="text-sm text-primary hover:underline"
                    >
                      관련 상품 보기 →
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}




