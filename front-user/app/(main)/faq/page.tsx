'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: '주문/결제',
    question: '주문은 어떻게 하나요?',
    answer: '상품을 선택한 후 장바구니에 담고, 장바구니에서 주문하기 버튼을 클릭하시면 됩니다. 배송지 정보와 결제 방법을 선택하신 후 주문을 완료하시면 됩니다.',
  },
  {
    id: '2',
    category: '주문/결제',
    question: '결제 방법은 무엇이 있나요?',
    answer: '신용카드, 계좌이체, 가상계좌, 외상 구매(기업용) 결제 방법을 지원합니다. 기업 고객의 경우 외상 구매를 이용하실 수 있습니다.',
  },
  {
    id: '3',
    category: '주문/결제',
    question: '주문 취소는 언제까지 가능한가요?',
    answer: '주문 접수 후 배송 준비 전까지 주문 취소가 가능합니다. 배송이 시작된 경우에는 반품/교환 절차를 진행해주세요.',
  },
  {
    id: '4',
    category: '배송',
    question: '배송비는 얼마인가요?',
    answer: '기본 배송비는 15,000원입니다. 5만원 이상 주문 시 무료배송이 적용됩니다. 빠른 배송이나 현장 배송의 경우 추가 비용이 발생할 수 있습니다.',
  },
  {
    id: '5',
    category: '배송',
    question: '배송 기간은 얼마나 걸리나요?',
    answer: '일반 배송은 주문 접수 후 2-3일 소요됩니다. 빠른 배송은 1일, 현장 배송은 공사 현장 위치에 따라 상이합니다. 자세한 사항은 배송 전 연락드립니다.',
  },
  {
    id: '6',
    category: '배송',
    question: '현장 배송이 가능한가요?',
    answer: '네, 공사 현장으로 직접 배송이 가능합니다. 주문 시 배송 방법에서 "현장 배송"을 선택하시면 됩니다. 배송 가능 지역과 시간은 별도로 문의해주세요.',
  },
  {
    id: '7',
    category: '배송',
    question: '운송장번호는 어디서 확인할 수 있나요?',
    answer: '주문 내역 페이지에서 주문 상세를 클릭하시면 운송장번호를 확인하실 수 있습니다. 배송이 시작되면 SMS로도 안내드립니다.',
  },
  {
    id: '8',
    category: '반품/교환',
    question: '반품은 어떻게 하나요?',
    answer: '마이페이지 > 주문 내역에서 반품 신청을 하실 수 있습니다. 상품 수령 후 7일 이내에 반품 신청이 가능하며, 단순 변심의 경우 배송비는 고객 부담입니다.',
  },
  {
    id: '9',
    category: '반품/교환',
    question: '교환은 가능한가요?',
    answer: '상품 하자나 오배송의 경우 무료 교환이 가능합니다. 교환 신청은 마이페이지 > 주문 내역에서 가능합니다.',
  },
  {
    id: '10',
    category: '반품/교환',
    question: '반품 배송비는 누가 부담하나요?',
    answer: '상품 하자나 오배송의 경우 무료 반품이 가능하며, 단순 변심의 경우 배송비는 고객 부담입니다. 자세한 사항은 반품 정책을 참고해주세요.',
  },
  {
    id: '11',
    category: '회원',
    question: '회원가입은 어떻게 하나요?',
    answer: '홈페이지 상단의 "로그인" 버튼을 클릭하신 후 "회원가입"을 선택하시면 됩니다. 일반 사용자와 기업 사용자 중 선택하실 수 있습니다.',
  },
  {
    id: '12',
    category: '회원',
    question: '기업 회원과 일반 회원의 차이는 무엇인가요?',
    answer: '기업 회원은 사업자 인증을 통해 기업 할인가를 적용받을 수 있으며, 외상 구매가 가능합니다. 일반 회원은 개인 구매 시 적용되는 가격으로 구매하실 수 있습니다.',
  },
  {
    id: '13',
    category: '회원',
    question: '비밀번호를 잊어버렸어요.',
    answer: '로그인 페이지에서 "비밀번호를 잊으셨나요?" 링크를 클릭하시면 이메일로 비밀번호 재설정 링크를 보내드립니다.',
  },
  {
    id: '14',
    category: '회원',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer: '마이페이지 > 회원 정보 수정에서 회원 탈퇴를 진행하실 수 있습니다. 탈퇴 시 보유하신 포인트와 쿠폰은 모두 소멸됩니다.',
  },
  {
    id: '15',
    category: '상품',
    question: '상품 재고는 어떻게 확인하나요?',
    answer: '상품 상세 페이지에서 재고 수량을 확인하실 수 있습니다. 품절 상태인 상품은 주문이 불가능하며, 재입고 알림을 받으실 수 있습니다.',
  },
  {
    id: '16',
    category: '상품',
    question: '대량 구매는 가능한가요?',
    answer: '네, 대량 구매가 가능합니다. 기업 회원은 대량 구매 시 추가 할인을 받으실 수 있습니다. 대량 구매 문의는 고객센터로 연락주시면 상담해드립니다.',
  },
  {
    id: '17',
    category: '상품',
    question: '상품 사양서를 받을 수 있나요?',
    answer: '상품 상세 페이지의 "상품 사양" 탭에서 확인하실 수 있습니다. 추가 자료가 필요한 경우 상품 문의를 통해 요청하실 수 있습니다.',
  },
  {
    id: '18',
    category: '상품',
    question: '상품에 대한 문의는 어떻게 하나요?',
    answer: '상품 상세 페이지의 "문의하기" 버튼이나 마이페이지 > 1:1 문의에서 상품 문의를 작성하실 수 있습니다. 영업일 기준 1-2일 내 답변드립니다.',
  },
  {
    id: '19',
    category: '기타',
    question: '개인정보는 어떻게 보호되나요?',
    answer: '회사는 고객님의 개인정보를 중요하게 생각하며, 관련 법규를 준수하여 안전하게 보호하고 있습니다. 개인정보 처리방침에서 자세한 내용을 확인하실 수 있습니다.',
  },
  {
    id: '20',
    category: '기타',
    question: '고객센터 연락처는 무엇인가요?',
    answer: '전화: 1588-0000, 이메일: support@buildmall.com, 운영시간: 평일 09:00 - 18:00입니다. 주말 및 공휴일은 휴무입니다.',
  },
  {
    id: '21',
    category: '기타',
    question: '공지사항은 어디서 확인하나요?',
    answer: '홈페이지 하단의 "공지사항" 링크나 메뉴에서 확인하실 수 있습니다. 중요한 공지는 홈페이지 상단에 배너로도 표시됩니다.',
  },
  {
    id: '22',
    category: '기타',
    question: '사업자 등록증 제출은 어떻게 하나요?',
    answer: '기업 회원 가입 후 마이페이지에서 사업자 등록증을 업로드하실 수 있습니다. 승인까지 1-2일 소요되며, 승인 후 기업 할인가가 적용됩니다.',
  },
]

const categories = ['전체', '주문/결제', '배송', '반품/교환', '회원', '상품', '기타']

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const filteredFAQs =
    selectedCategory === '전체'
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory)

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">자주 묻는 질문 (FAQ)</h1>

        {/* 카테고리 필터 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">해당 카테고리의 FAQ가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openItems.has(faq.id) ? (
                        <ChevronUpIcon className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
                {openItems.has(faq.id) && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="pt-4 border-t">
                      <p className="text-muted-foreground whitespace-pre-line">{faq.answer}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        {/* 추가 문의 안내 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>원하는 답변을 찾지 못하셨나요?</CardTitle>
            <CardDescription>1:1 문의를 통해 직접 문의해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <a
                href="/inquiry/write"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                1:1 문의하기
              </a>
              <div className="text-sm text-muted-foreground">
                <p>고객센터: 1588-0000</p>
                <p>운영시간: 평일 09:00 - 18:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}




