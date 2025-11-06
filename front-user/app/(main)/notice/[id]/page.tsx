'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Notice } from '@/lib/types/api'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function NoticeDetailPage() {
  const params = useParams()
  const noticeId = params.id as string
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotice()
  }, [noticeId])

  const fetchNotice = async () => {
    try {
      // TODO: 공지사항 상세 API 호출
      // const response = await apiClient.get<ApiResponse<Notice>>(`/api/v1/notices/${noticeId}`)
      // if (response.data.success) {
      //   setNotice(response.data.data)
      // }

      // Mock 데이터
      setNotice({
        id: noticeId,
        title: '시스템 점검 안내',
        content: `2024년 1월 15일 02:00 ~ 04:00 시스템 점검이 진행됩니다.

점검 시간 동안 서비스 이용이 제한될 수 있습니다.
불편을 드려 죄송합니다.`,
        category: 'system',
        isImportant: true,
        viewCount: 123,
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
      })
    } catch (error) {
      console.error('Failed to fetch notice:', error)
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p>공지사항을 찾을 수 없습니다.</p>
            <Link href="/notice">
              <Button className="mt-4">공지사항 목록으로</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/notice">
            <Button variant="ghost" size="sm">
              ← 공지사항 목록
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
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
            <CardTitle className="text-2xl">{notice.title}</CardTitle>
            <CardDescription>
              {new Date(notice.createdAt).toLocaleDateString('ko-KR')} · 조회수{' '}
              {notice.viewCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-muted-foreground">{notice.content}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/notice">
            <Button variant="outline">목록으로</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}




