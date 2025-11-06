'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { apiClient } from '@/lib/api/client'
import type { Order, ApiResponse } from '@/lib/types/api'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await apiClient.get<ApiResponse<Order>>(`/api/v1/orders/${orderId}`)
      if (response.data.success) {
        setOrder(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getOrderStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '주문 대기',
      confirmed: '주문 확인',
      preparing: '준비 중',
      shipping: '배송 중',
      delivered: '배송 완료',
      cancelled: '취소됨',
    }
    return statusMap[status] || status
  }

  const getPaymentStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '결제 대기',
      completed: '결제 완료',
      failed: '결제 실패',
      refunded: '환불됨',
    }
    return statusMap[status] || status
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p>주문을 찾을 수 없습니다.</p>
            <Link href="/orders">
              <Button className="mt-4">주문 내역으로</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/orders">
            <Button variant="ghost" size="sm">
              ← 주문 내역으로
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">주문 상세</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* 주문 정보 */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>주문 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">주문번호</p>
                  <p className="font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">주문일시</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">주문 상태</p>
                  <p className="font-medium">{getOrderStatusText(order.orderStatus)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">결제 상태</p>
                  <p className="font-medium">{getPaymentStatusText(order.paymentStatus)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>주문 상품</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-medium hover:text-primary">
                            {item.product?.name || '상품명 없음'}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          수량: {item.quantity}개
                        </p>
                        <p className="text-sm text-muted-foreground">
                          단가: {item.price.toLocaleString()}원
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {item.totalPrice.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 배송 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">받는 분</p>
                  <p className="font-medium">{order.shippingAddress.recipient}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">연락처</p>
                  <p className="font-medium">{order.shippingAddress.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">배송지</p>
                  <p className="font-medium">
                    ({order.shippingAddress.zipCode}) {order.shippingAddress.address}{' '}
                    {order.shippingAddress.detailAddress}
                  </p>
                </div>
                {order.shipping && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">배송 방법</p>
                      <p className="font-medium">
                        {order.shippingMethod === 'standard'
                          ? '일반 배송'
                          : order.shippingMethod === 'express'
                          ? '빠른 배송'
                          : '현장 배송'}
                      </p>
                    </div>
                    {order.shipping.trackingNumber && (
                      <div>
                        <p className="text-sm text-muted-foreground">운송장번호</p>
                        <p className="font-medium">{order.shipping.trackingNumber}</p>
                      </div>
                    )}
                    {order.shipping.carrier && (
                      <div>
                        <p className="text-sm text-muted-foreground">배송사</p>
                        <p className="font-medium">{order.shipping.carrier}</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 결제 요약 */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>결제 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>상품 금액</span>
                  <span>{order.totalAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>배송비</span>
                  <span>{order.shippingFee.toLocaleString()}원</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>할인</span>
                    <span>-{order.discountAmount.toLocaleString()}원</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>총 결제금액</span>
                    <span>{order.finalAmount.toLocaleString()}원</span>
                  </div>
                </div>
                {order.payment && (
                  <div className="pt-4 border-t space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">결제 방법</p>
                      <p className="font-medium">
                        {order.payment.method === 'card'
                          ? '신용카드'
                          : order.payment.method === 'bank_transfer'
                          ? '계좌이체'
                          : order.payment.method === 'virtual_account'
                          ? '가상계좌'
                          : '외상 구매'}
                      </p>
                    </div>
                    {order.payment.transactionId && (
                      <div>
                        <p className="text-sm text-muted-foreground">거래번호</p>
                        <p className="font-medium text-xs">{order.payment.transactionId}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 주문 액션 */}
        <div className="flex gap-4">
          {order.orderStatus === 'pending' && (
            <Button variant="destructive" onClick={() => alert('주문 취소 기능은 추후 구현 예정입니다.')}>
              주문 취소
            </Button>
          )}
          {order.orderStatus === 'delivered' && (
            <Button variant="outline" onClick={() => router.push('/reviews/write')}>
              리뷰 작성
            </Button>
          )}
          <Link href="/orders">
            <Button variant="outline">주문 내역으로</Button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  )
}

