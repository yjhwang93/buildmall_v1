'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Notice, PaginatedResponse } from '@/lib/types/api'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      // TODO: 공지사항 API 호출
      // const response = await apiClient.get<ApiResponse<PaginatedResponse<Notice>>>('/api/v1/notices')
      // if (response.data.success) {
      //   setNotices(response.data.data.items)
      // }

      // Mock 데이터
      setNotices([
        {
          id: '1',
          title: '시스템 점검 안내',
          content: '2024년 1월 15일 02:00 ~ 04:00 시스템 점검이 진행됩니다.',
          category: 'system',
          isImportant: true,
          viewCount: 123,
          createdAt: '2024-01-10T00:00:00Z',
          updatedAt: '2024-01-10T00:00:00Z',
        },
        {
          id: '2',
          title: '배송비 정책 변경 안내',
          content: '2024년 2월부터 배송비 정책이 변경됩니다. 자세한 내용은 공지를 참고해주세요.',
          category: 'shipping',
          isImportant: false,
          viewCount: 456,
          createdAt: '2024-01-12T00:00:00Z',
          updatedAt: '2024-01-12T00:00:00Z',
        },
      ])
    } catch (error) {
      console.error('Failed to fetch notices:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryText = (category: string) => {
    const categoryMap: Record<string, string> = {
      system: '시스템',
      event: '이벤트',
      shipping: '배송',
      general: '일반',
    }
    return categoryMap[category] || category
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">공지사항</h1>

      {loading ? (
        <div className="text-center py-12">로딩 중...</div>
      ) : notices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">공지사항이 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <Link key={notice.id} href={`/notice/${notice.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {getCategoryText(notice.category)}
                        </span>
                        {notice.isImportant && (
                          <span className="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                            <ExclamationTriangleIcon className="h-3 w-3" />
                            중요
                          </span>
                        )}
                      </div>
                      <CardTitle>{notice.title}</CardTitle>
                      <CardDescription>
                        {new Date(notice.createdAt).toLocaleDateString('ko-KR')} · 조회수{' '}
                        {notice.viewCount}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notice.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}




