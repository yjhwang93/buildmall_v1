'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowPathIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline'

export default function ReturnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">반품/교환 안내</h1>

        {/* 반품/교환 안내 요약 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 안내</CardTitle>
              <CardDescription>반품 및 교환 정책 안내</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-700">반품 가능 기간</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    상품 수령 후 <strong>7일 이내</strong> 반품 신청 가능
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowPathIcon className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-700">교환 가능 기간</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    상품 수령 후 <strong>7일 이내</strong> 교환 신청 가능
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품/교환 신청 방법 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 신청 방법</CardTitle>
              <CardDescription>마이페이지에서 간편하게 신청하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">마이페이지 접속</h3>
                    <p className="text-sm text-muted-foreground">
                      로그인 후 마이페이지 → 주문 내역으로 이동합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">주문 선택</h3>
                    <p className="text-sm text-muted-foreground">
                      반품/교환을 원하는 주문을 선택하고 주문 상세를 확인합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">반품/교환 신청</h3>
                    <p className="text-sm text-muted-foreground">
                      반품 또는 교환 버튼을 클릭하고 사유를 선택합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">상품 발송</h3>
                    <p className="text-sm text-muted-foreground">
                      반품 안내를 받은 후 상품을 발송합니다. 교환의 경우 교환 상품을 받은 후 기존 상품을 발송합니다.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/orders">
                    <Button>주문 내역으로 이동</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품/교환 가능한 경우 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 가능한 경우</CardTitle>
              <CardDescription>무료 반품/교환이 가능한 경우</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">상품 하자</h3>
                      <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                        <li>상품이 파손되었거나 불량인 경우</li>
                        <li>상품 사양과 다른 상품이 배송된 경우</li>
                        <li>포장이 손상되어 상품이 사용 불가능한 경우</li>
                        <li>배송비: 무료 (판매자 부담)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">오배송</h3>
                      <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                        <li>주문한 상품과 다른 상품이 배송된 경우</li>
                        <li>수량이 맞지 않는 경우</li>
                        <li>배송비: 무료 (판매자 부담)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-700 mb-2">단순 변심</h3>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>고객님의 단순 변심으로 인한 반품</li>
                        <li>상품이 손상되지 않은 상태 (미개봉, 미사용)</li>
                        <li>배송비: 고객 부담 (15,000원)</li>
                        <li>5만원 이상 주문 시 반품 배송비 무료</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품/교환 불가능한 경우 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 불가능한 경우</CardTitle>
              <CardDescription>반품/교환이 제한되는 경우</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-700 mb-2">반품/교환 불가</h3>
                      <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                        <li>고객님의 책임 있는 사유로 상품이 멸실 또는 훼손된 경우</li>
                        <li>상품의 사용 또는 일부 소비로 상품의 가치가 감소한 경우</li>
                        <li>시간이 지나 재판매가 어려울 정도로 상품의 가치가 감소한 경우</li>
                        <li>복제가 가능한 상품의 포장을 훼손한 경우</li>
                        <li>주문제작 상품의 경우 (고객님의 사양에 따라 제작된 상품)</li>
                        <li>상품 수령 후 7일이 경과한 경우</li>
                        <li>레미콘, 시멘트 등 특수 상품으로 배송 후 경과 시간이 지난 경우</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품 배송비 안내 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품 배송비 안내</CardTitle>
              <CardDescription>반품 시 배송비 정책</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">무료 반품</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>상품 하자 또는 오배송의 경우</li>
                    <li>판매자 부담 (무료)</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">유료 반품</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>단순 변심의 경우</li>
                    <li>고객 부담: 15,000원</li>
                    <li>5만원 이상 주문 시 반품 배송비 무료</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-700">반품 배송비 결제</h3>
                  <p className="text-sm text-blue-700">
                    반품 배송비는 반품 상품 접수 후 환불 처리 시 차감됩니다. 
                    무료 반품의 경우 배송비가 차감되지 않습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품/교환 프로세스 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 처리 프로세스</CardTitle>
              <CardDescription>신청부터 완료까지의 과정</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">반품/교환 신청</h3>
                    <p className="text-sm text-muted-foreground">
                      마이페이지에서 반품/교환 신청을 합니다. 사유를 선택하고 상세 내용을 입력합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">신청 확인</h3>
                    <p className="text-sm text-muted-foreground">
                      신청이 접수되면 확인 SMS를 발송합니다. 영업일 기준 1-2일 내 확인합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">상품 발송</h3>
                    <p className="text-sm text-muted-foreground">
                      반품 안내를 받은 후 상품을 발송합니다. 교환의 경우 교환 상품을 먼저 받은 후 기존 상품을 발송합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">상품 확인</h3>
                    <p className="text-sm text-muted-foreground">
                      반품 상품이 도착하면 확인 후 처리합니다. 상품 상태를 검수합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">처리 완료</h3>
                    <p className="text-sm text-muted-foreground">
                      반품의 경우 환불을 진행하고, 교환의 경우 교환 상품을 배송합니다. 완료 알림을 발송합니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 환불 안내 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>환불 안내</CardTitle>
              <CardDescription>반품 시 환불 처리 안내</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">환불 처리 기간</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>상품 반품 확인 후 영업일 기준 3-5일 내 환불 처리</li>
                    <li>신용카드 결제: 카드사에 따라 5-7일 소요</li>
                    <li>계좌이체: 3-5일 소요</li>
                    <li>가상계좌: 1-2일 소요</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">환불 금액</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>상품 금액 전체 환불</li>
                    <li>단순 변심의 경우 반품 배송비 차감</li>
                    <li>상품 하자 또는 오배송의 경우 배송비 포함 전체 환불</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-700">주의사항</h3>
                  <p className="text-sm text-blue-700">
                    환불은 원래 결제 수단으로 진행됩니다. 환불 처리 기간은 카드사 및 금융기관에 따라 
                    다를 수 있으며, 자세한 사항은 고객센터로 문의해주세요.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품/교환 시 주의사항 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 시 주의사항</CardTitle>
              <CardDescription>반품/교환 전 확인해야 할 사항</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">상품 포장</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>반품 시 원래 포장 상태로 포장해주세요</li>
                    <li>상품이 손상되지 않도록 안전하게 포장해주세요</li>
                    <li>배송 시 받은 상품과 동일한 상태로 보내주세요</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">반품 발송</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>반품 안내를 받은 후 발송해주세요</li>
                    <li>반품 안내에 포함된 주소로 발송해주세요</li>
                    <li>운송장번호를 확인하여 반품 추적이 가능하도록 해주세요</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">특수 상품</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>레미콘, 시멘트 등 특수 상품은 배송 후 시간이 경과하면 반품이 어려울 수 있습니다</li>
                    <li>대형 상품의 경우 반품 배송비가 추가로 발생할 수 있습니다</li>
                    <li>특수 상품 반품 문의는 고객센터로 연락주세요</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반품/교환 문의 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>반품/교환 문의</CardTitle>
              <CardDescription>반품/교환 관련 문의사항</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  반품/교환 관련 문의사항이 있으시면 고객센터로 연락주시거나 1:1 문의를 이용해주세요.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">고객센터</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>전화: 1588-0000</li>
                      <li>이메일: support@buildmall.com</li>
                      <li>운영시간: 평일 09:00 - 18:00</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">1:1 문의</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      마이페이지에서 반품/교환 관련 문의를 작성하실 수 있습니다.
                    </p>
                    <Link href="/inquiry/write">
                      <Button variant="outline" size="sm">
                        1:1 문의하기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}




