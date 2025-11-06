'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/lib/store/useCartStore'
import { useAuthStore } from '@/lib/store/useAuthStore'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import type { Address, CreateAddressRequest } from '@/lib/types/api'

export default function CheckoutPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { items, totalAmount, itemCount, clearCart } = useCartStore()
  const [shippingFee, setShippingFee] = useState(15000)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'site_delivery'>('standard')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'virtual_account' | 'credit_purchase'>('card')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState<CreateAddressRequest>({
    name: '',
    recipient: '',
    phone: '',
    zipCode: '',
    address: '',
    detailAddress: '',
    isDefault: false,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout')
      return
    }

    if (items.length === 0) {
      router.push('/cart')
      return
    }

    // 배송비 계산
    setShippingFee(totalAmount >= 50000 ? 0 : 15000)

    // Mock 배송지 목록
    setAddresses([
      {
        id: '1',
        userId: '1',
        name: '집',
        recipient: '홍길동',
        phone: '010-1234-5678',
        zipCode: '12345',
        address: '서울시 강남구 테헤란로 123',
        detailAddress: '101동 101호',
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    setSelectedAddressId('1')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, items.length, totalAmount, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAddressId) {
      alert('배송지를 선택해주세요.')
      return
    }

    // TODO: 주문 API 호출
    const orderData = {
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      shippingAddressId: selectedAddressId,
      shippingMethod,
      paymentMethod,
    }

    // Mock 주문 처리
    setTimeout(() => {
      clearCart()
      router.push(`/orders/complete?orderId=mock_order_${Date.now()}`)
    }, 1000)
  }

  const finalAmount = totalAmount + shippingFee

  if (!isAuthenticated || items.length === 0) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">주문하기</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 주문 정보 */}
            <div className="md:col-span-2 space-y-6">
              {/* 배송지 선택 */}
              <Card>
                <CardHeader>
                  <CardTitle>배송지 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                              기본
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.recipient} ({address.phone})
                        </p>
                        <p className="text-sm">
                          ({address.zipCode}) {address.address} {address.detailAddress}
                        </p>
                      </div>
                    </label>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                  >
                    {showAddressForm ? '취소' : '+ 새 배송지 추가'}
                  </Button>

                  {showAddressForm && (
                    <div className="p-4 border rounded-lg space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">배송지 이름</label>
                        <input
                          type="text"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="집, 회사 등"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">받는 분</label>
                        <input
                          type="text"
                          value={newAddress.recipient}
                          onChange={(e) => setNewAddress({ ...newAddress, recipient: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">전화번호</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="text-sm font-medium mb-2 block">우편번호</label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-2 block">주소</label>
                          <input
                            type="text"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">상세주소</label>
                        <input
                          type="text"
                          value={newAddress.detailAddress}
                          onChange={(e) => setNewAddress({ ...newAddress, detailAddress: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />
                      </div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        />
                        <span className="text-sm">기본 배송지로 설정</span>
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 배송 방법 */}
              <Card>
                <CardHeader>
                  <CardTitle>배송 방법</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value as any)}
                    />
                    <div>
                      <p className="font-medium">일반 배송</p>
                      <p className="text-sm text-muted-foreground">2-3일 소요</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value as any)}
                    />
                    <div>
                      <p className="font-medium">빠른 배송</p>
                      <p className="text-sm text-muted-foreground">1일 소요 (추가비용)</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="site_delivery"
                      checked={shippingMethod === 'site_delivery'}
                      onChange={(e) => setShippingMethod(e.target.value as any)}
                    />
                    <div>
                      <p className="font-medium">현장 배송</p>
                      <p className="text-sm text-muted-foreground">공사 현장 직접 배송</p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              {/* 결제 방법 */}
              <Card>
                <CardHeader>
                  <CardTitle>결제 방법</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                    />
                    <span className="font-medium">신용카드</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                    />
                    <span className="font-medium">계좌이체</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="virtual_account"
                      checked={paymentMethod === 'virtual_account'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                    />
                    <span className="font-medium">가상계좌</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_purchase"
                      checked={paymentMethod === 'credit_purchase'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                    />
                    <span className="font-medium">외상 구매 (기업용)</span>
                  </label>
                </CardContent>
              </Card>
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
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>총 결제금액</span>
                        <span>{finalAmount.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="truncate">{item.product.name}</span>
                        <span className="ml-2">
                          {item.quantity}개 × {item.price.toLocaleString()}원
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    주문하기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}

