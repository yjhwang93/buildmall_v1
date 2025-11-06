'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Product, CreateReviewRequest } from '@/lib/types/api'
import { StarIcon } from '@heroicons/react/24/solid'

export default function WriteReviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')
  const orderId = searchParams.get('orderId')

  const [product, setProduct] = useState<Product | null>(null)
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/api/v1/products/${productId}`)
      if (response.data.success) {
        setProduct(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productId || !orderId) {
      alert('상품 정보가 없습니다.')
      return
    }

    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.')
      return
    }

    setSubmitting(true)

    try {
      const reviewData: CreateReviewRequest = {
        productId,
        orderId,
        rating,
        title: title.trim() || undefined,
        content: content.trim(),
      }

      // TODO: 리뷰 작성 API 호출
      // await apiClient.post('/api/v1/reviews', reviewData)

      // Mock 처리
      setTimeout(() => {
        alert('리뷰가 작성되었습니다.')
        router.push(`/products/${productId}`)
      }, 500)
    } catch (error) {
      console.error('Failed to submit review:', error)
      alert('리뷰 작성에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p>상품을 찾을 수 없습니다.</p>
            <Button className="mt-4" onClick={() => router.push('/orders')}>
              주문 내역으로
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">리뷰 작성</h1>

          {/* 상품 정보 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>주문 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">📦</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 리뷰 작성 폼 */}
          <Card>
            <CardHeader>
              <CardTitle>리뷰 작성</CardTitle>
              <CardDescription>상품에 대한 솔직한 리뷰를 작성해주세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 평점 */}
                <div>
                  <label className="text-sm font-medium mb-2 block">평점</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <StarIcon
                          className={`h-8 w-8 ${
                            star <= rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rating}점 선택됨
                  </p>
                </div>

                {/* 제목 */}
                <div>
                  <label htmlFor="title" className="text-sm font-medium mb-2 block">
                    제목 (선택)
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="리뷰 제목을 입력하세요"
                    maxLength={100}
                  />
                </div>

                {/* 내용 */}
                <div>
                  <label htmlFor="content" className="text-sm font-medium mb-2 block">
                    리뷰 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
                    placeholder="상품에 대한 솔직한 리뷰를 작성해주세요."
                    required
                    maxLength={1000}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {content.length} / 1000자
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
                    {submitting ? '작성 중...' : '리뷰 작성'}
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

