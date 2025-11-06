'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/lib/store/useCartStore'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

export default function CartPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { items, totalAmount, itemCount, removeItem, updateQuantity, clearCart } = useCartStore()
  const [shippingFee, setShippingFee] = useState(15000)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router])

  useEffect(() => {
    // 5만원 이상 무료배송
    setShippingFee(totalAmount >= 50000 ? 0 : 15000)
  }, [totalAmount])

  const finalAmount = totalAmount + shippingFee

  if (!isAuthenticated) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">장바구니</h1>
          <Card>
            <CardContent className="py-12">
              <p className="text-muted-foreground mb-6">장바구니가 비어있습니다.</p>
              <Link href="/products">
                <Button>상품 보러가기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">장바구니</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 장바구니 아이템 목록 */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.productId}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-semibold text-lg hover:text-primary">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.product.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 hover:bg-accent rounded-md"
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-accent"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-accent"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          재고: {item.product.stock}개
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {(item.price * item.quantity).toLocaleString()}원
                        </p>
                        <p className="text-sm text-muted-foreground">
                          단가: {item.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 주문 요약 */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>상품 수</span>
                  <span>{itemCount}개</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>상품 금액</span>
                  <span>{totalAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>배송비</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600">무료</span>
                    ) : (
                      `${shippingFee.toLocaleString()}원`
                    )}
                  </span>
                </div>
                {totalAmount < 50000 && (
                  <p className="text-xs text-primary">
                    {((50000 - totalAmount) / 1000).toFixed(0)}천원 더 구매 시 무료배송
                  </p>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>총 결제금액</span>
                    <span>{finalAmount.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => router.push('/checkout')}
              >
                주문하기
              </Button>

              <Link href="/products">
                <Button variant="outline" className="w-full">
                  쇼핑 계속하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

