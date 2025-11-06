'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TruckIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">배송 안내</h1>

        {/* 배송 방법 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">배송 방법</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <TruckIcon className="h-6 w-6 text-primary" />
                  <CardTitle>일반 배송</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 배송 기간: 2-3일</li>
                  <li>• 배송비: 15,000원</li>
                  <li>• 무료배송: 5만원 이상</li>
                  <li>• 평일 오후 2시 이전 주문 시 당일 출고</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <ClockIcon className="h-6 w-6 text-primary" />
                  <CardTitle>빠른 배송</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 배송 기간: 1일</li>
                  <li>• 배송비: 25,000원</li>
                  <li>• 긴급 자재 구매 시</li>
                  <li>• 평일 오전 10시 이전 주문 시 당일 도착</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPinIcon className="h-6 w-6 text-primary" />
                  <CardTitle>현장 배송</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 공사 현장 직접 배송</li>
                  <li>• 배송비: 문의 필요</li>
                  <li>• 대량 구매 시 무료</li>
                  <li>• 배송 일정 협의 가능</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 배송비 정책 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <CurrencyDollarIcon className="h-6 w-6 text-primary" />
                <CardTitle>배송비 정책</CardTitle>
              </div>
              <CardDescription>배송비 안내 및 무료배송 조건</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">일반 배송비</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 기본 배송비: 15,000원</li>
                    <li>• 제주도 및 도서산간 지역: 추가 5,000원</li>
                    <li>• 무거운 상품(시멘트, 레미콘 등): 추가 비용 발생 가능</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-700">무료배송 조건</h3>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• 5만원 이상 주문 시 무료배송</li>
                    <li>• 기업 회원 대량 구매 시 무료배송</li>
                    <li>• 현장 배송 시 별도 협의</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-700">배송비 계산</h3>
                  <p className="text-sm text-blue-700">
                    주문 금액이 5만원 미만인 경우 배송비가 추가됩니다. 
                    장바구니에서 주문 금액과 배송비를 확인하실 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 배송 프로세스 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>배송 프로세스</CardTitle>
              <CardDescription>주문부터 배송 완료까지의 과정</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">주문 접수</h3>
                    <p className="text-sm text-muted-foreground">
                      주문이 접수되면 주문 확인 SMS를 발송합니다. 결제 완료 후 배송 준비를 시작합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">상품 준비</h3>
                    <p className="text-sm text-muted-foreground">
                      창고에서 주문하신 상품을 준비합니다. 재고가 없는 경우 별도로 연락드립니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">배송 시작</h3>
                    <p className="text-sm text-muted-foreground">
                      배송이 시작되면 운송장번호를 SMS로 발송합니다. 주문 내역에서도 확인 가능합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">배송 완료</h3>
                    <p className="text-sm text-muted-foreground">
                      배송이 완료되면 배송 완료 알림을 발송합니다. 상품을 확인하시고 문제가 있으면 즉시 연락주세요.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 배송 지역 및 기간 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>배송 지역 및 기간</CardTitle>
              <CardDescription>지역별 배송 안내</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">서울 및 수도권</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 서울, 경기, 인천: 1-2일</li>
                    <li>• 평일 오후 2시 이전 주문 시 다음날 배송</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">충청/강원/전라/경상</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 대도시: 2-3일</li>
                    <li>• 중소도시: 3-4일</li>
                    <li>• 산간 지역: 추가 1-2일 소요</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">제주도 및 도서산간</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 제주도: 4-5일</li>
                    <li>• 도서산간 지역: 5-7일</li>
                    <li>• 추가 배송비 5,000원 발생</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>※ 주의사항:</strong> 배송 기간은 주문 접수 기준이며, 
                    공휴일, 연휴, 천재지변 등으로 인해 지연될 수 있습니다. 
                    긴급한 경우 빠른 배송을 이용해주세요.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 배송 주의사항 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>배송 주의사항</CardTitle>
              <CardDescription>배송 시 확인해야 할 사항</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">배송 전 확인사항</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>배송지 주소가 정확한지 확인해주세요</li>
                    <li>배송 가능 시간대를 지정해주세요</li>
                    <li>공동현관 비밀번호가 있는 경우 미리 알려주세요</li>
                    <li>배송지에 수령인이 있을 수 있도록 주의해주세요</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">배송 중 주의사항</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>무거운 상품은 크레인이나 지게차가 필요할 수 있습니다</li>
                    <li>현장 배송 시 사전에 배송 일정을 협의해주세요</li>
                    <li>배송 기사에게 현장 위치를 명확히 안내해주세요</li>
                    <li>배송 중 문제 발생 시 즉시 고객센터로 연락주세요</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">수령 시 확인사항</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>상품이 정확한지 확인해주세요</li>
                    <li>포장이 손상되지 않았는지 확인해주세요</li>
                    <li>수량이 맞는지 확인해주세요</li>
                    <li>문제가 있으면 배송 기사에게 즉시 알려주세요</li>
                    <li>배송 완료 후 문제 발견 시 7일 이내 반품 신청 가능</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 운송장 조회 */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>운송장 조회</CardTitle>
              <CardDescription>배송 추적 방법</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">운송장번호 확인 방법</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>1. 마이페이지 → 주문 내역 → 주문 상세</li>
                    <li>2. 배송 시작 시 SMS로 운송장번호 발송</li>
                    <li>3. 주문 내역 이메일에서 확인</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">배송 추적</h3>
                  <p className="text-sm text-muted-foreground">
                    운송장번호를 클릭하시면 배송사의 배송 추적 페이지로 이동합니다. 
                    실시간 배송 위치를 확인하실 수 있습니다.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-700">주요 배송사</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• CJ대한통운</li>
                    <li>• 한진택배</li>
                    <li>• 롯데택배</li>
                    <li>• 현장 배송: 자체 물류</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 배송 문의 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>배송 문의</CardTitle>
              <CardDescription>배송 관련 문의사항</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  배송 관련 문의사항이 있으시면 고객센터로 연락주시거나 1:1 문의를 이용해주세요.
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
                      마이페이지에서 배송 관련 문의를 작성하실 수 있습니다.
                    </p>
                    <a
                      href="/inquiry/write"
                      className="text-sm text-primary hover:underline"
                    >
                      1:1 문의하기 →
                    </a>
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




