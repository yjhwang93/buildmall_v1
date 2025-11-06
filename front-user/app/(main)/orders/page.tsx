'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import { useAuthStore } from '@/lib/store/useAuthStore'
import type { Order, ApiResponse, PaginatedResponse } from '@/lib/types/api'

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        '/api/v1/orders?pageSize=20'
      )
      if (response.data.success) {
        setOrders(response.data.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
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

  const getOrderStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'text-yellow-600',
      confirmed: 'text-blue-600',
      preparing: 'text-purple-600',
      shipping: 'text-indigo-600',
      delivered: 'text-green-600',
      cancelled: 'text-red-600',
    }
    return colorMap[status] || 'text-gray-600'
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">주문 내역</h1>

        {loading ? (
          <div className="text-center py-12">로딩 중...</div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">주문 내역이 없습니다.</p>
              <Link href="/products">
                <Button>상품 보러가기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>주문번호: {order.orderNumber}</CardTitle>
                      <CardDescription>
                        주문일: {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                        {getOrderStatusText(order.orderStatus)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.paymentStatus === 'completed' ? '결제 완료' : '결제 대기'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 주문 상품 목록 */}
                    <div>
                      <h3 className="font-medium mb-2">주문 상품</h3>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span>
                              {item.product?.name || '상품명 없음'} × {item.quantity}개
                            </span>
                            <span>{item.totalPrice.toLocaleString()}원</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 배송 정보 */}
                    <div>
                      <h3 className="font-medium mb-2">배송지</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.recipient} ({order.shippingAddress.phone})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.address} {order.shippingAddress.detailAddress}
                      </p>
                    </div>

                    {/* 결제 정보 */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">총 결제금액</span>
                      <span className="text-xl font-bold">
                        {order.finalAmount.toLocaleString()}원
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/orders/${order.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          상세보기
                        </Button>
                      </Link>
                      {order.orderStatus === 'pending' && (
                        <Button variant="destructive" className="flex-1">
                          주문 취소
                        </Button>
                      )}
                      {order.orderStatus === 'delivered' && (
                        <Button variant="outline" className="flex-1">
                          리뷰 작성
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}




