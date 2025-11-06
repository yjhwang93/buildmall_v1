'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function OrderCompletePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderId) {
      router.push('/orders')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, router])

  if (!orderId) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">주문이 완료되었습니다</h1>
          <p className="text-muted-foreground">주문해주셔서 감사합니다.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>주문 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문번호</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                주문 내역은 마이페이지에서 확인할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Link href={`/orders/${orderId}`}>
            <Button size="lg">주문 상세보기</Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline" size="lg">
              주문 내역
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

