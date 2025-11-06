'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <DocumentTextIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">이용약관</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            시행일자: 2025년 1월 1일
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none space-y-8">
              {/* 제1조 목적 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제1조 (목적)</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  이 약관은 Build Mall(이하 "회사"라 함)이 운영하는 온라인 쇼핑몰에서 제공하는 서비스(이하 "서비스"라 함)의 이용과 관련하여 
                  회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              {/* 제2조 용어의 정의 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제2조 (용어의 정의)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>"서비스"란 회사가 제공하는 건축 자재 온라인 판매 서비스를 의미합니다.</li>
                  <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.</li>
                  <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 
                  회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.</li>
                  <li>"비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
                  <li>"일반 회원"이란 개인 사용자를 의미합니다.</li>
                  <li>"기업 회원"이란 사업자 등록증을 제출하여 인증을 받은 기업 사용자를 의미합니다.</li>
                </ol>
              </section>

              {/* 제3조 약관의 효력 및 변경 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제3조 (약관의 효력 및 변경)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.</li>
                  <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                  <li>약관이 변경되는 경우 회사는 변경 사항을 시행일자 7일 전부터 공지합니다. 
                  다만, 회원에게 불리한 내용으로 변경하는 경우에는 시행일자 30일 전부터 공지합니다.</li>
                  <li>회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있으며, 
                  변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용하는 경우 약관의 변경사항에 동의한 것으로 간주됩니다.</li>
                </ol>
              </section>

              {/* 제4조 회원가입 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제4조 (회원가입)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</li>
                  <li>회원은 일반 회원 또는 기업 회원 중 선택하여 가입할 수 있습니다.</li>
                  <li>기업 회원의 경우 사업자 등록증을 제출하여 인증을 받아야 하며, 인증 완료 후 기업 할인가를 적용받을 수 있습니다.</li>
                  <li>회사는 제1항과 같이 회원가입을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                      <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                      <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                    </ul>
                  </li>
                  <li>회원가입은 회사의 승낙이 회원에게 도달한 시점에 완료됩니다.</li>
                </ol>
              </section>

              {/* 제5조 회원 정보의 변경 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제5조 (회원 정보의 변경)</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  회원은 개인정보 관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 
                  다만, 서비스 관리를 위해 필요한 실명, 아이디 등은 수정이 불가능합니다. 
                  회원이 변경사항을 수정하지 않아 발생한 불이익에 대하여 회사는 책임을 지지 않습니다.
                </p>
              </section>

              {/* 제6조 개인정보보호 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제6조 (개인정보보호)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.</li>
                  <li>회사는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 
                  다만, 관련 법령상 의무이행을 위하여 필요한 정보는 미리 수집할 수 있습니다.</li>
                  <li>회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.</li>
                  <li>회사는 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 
                  또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.</li>
                </ol>
              </section>

              {/* 제7조 회원 탈퇴 및 자격 상실 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제7조 (회원 탈퇴 및 자격 상실)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.</li>
                  <li>회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                      <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                      <li>서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                    </ul>
                  </li>
                  <li>회사가 회원 자격을 제한·정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 
                  회사는 회원자격을 상실시킬 수 있습니다.</li>
                </ol>
              </section>

              {/* 제8조 서비스의 제공 및 변경 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제8조 (서비스의 제공 및 변경)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회사는 다음과 같은 서비스를 제공합니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>건축 자재 온라인 판매 서비스</li>
                      <li>상품 정보 제공 및 검색 서비스</li>
                      <li>주문 및 결제 처리 서비스</li>
                      <li>배송 및 배송 추적 서비스</li>
                      <li>고객 지원 서비스</li>
                    </ul>
                  </li>
                  <li>회사는 상품 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 상품·용역의 내용을 변경할 수 있습니다.</li>
                  <li>회사는 제공하는 서비스의 내용을 변경할 수 있으며, 변경 시에는 사전에 공지합니다.</li>
                </ol>
              </section>

              {/* 제9조 주문 및 결제 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제9조 (주문 및 결제)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>이용자는 회사가 제공하는 양식에 따라 주문을 신청할 수 있으며, 회사는 다음 각 호에 해당하지 않는 한 주문을 승인합니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>신청 내용에 허위, 기재누락, 오기가 있는 경우</li>
                      <li>상품의 재고가 부족한 경우</li>
                      <li>기타 주문 신청에 승낙하는 것이 회사의 기술상 현저히 지장이 있다고 판단하는 경우</li>
                    </ul>
                  </li>
                  <li>회사의 승낙이 이용자에게 도달한 시점에 구매계약이 성립한 것으로 봅니다.</li>
                  <li>결제는 신용카드, 계좌이체, 가상계좌, 외상 구매(기업용) 중 선택할 수 있습니다.</li>
                  <li>기업 회원의 경우 외상 구매가 가능하며, 별도의 신용 평가 후 승인됩니다.</li>
                </ol>
              </section>

              {/* 제10조 배송 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제10조 (배송)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회사는 이용자와 상품의 배송에 관한 별도의 계약을 체결한 경우 그에 따릅니다.</li>
                  <li>배송 방법은 일반 배송, 빠른 배송, 현장 배송 중 선택할 수 있습니다.</li>
                  <li>배송비는 기본 15,000원이며, 5만원 이상 주문 시 무료배송이 적용됩니다.</li>
                  <li>배송 기간은 주문 접수 후 일반 배송 2-3일, 빠른 배송 1일, 현장 배송은 협의를 통해 결정됩니다.</li>
                  <li>회사는 이용자가 주문한 상품을 배송할 때 운송장번호를 발송하여 배송 추적이 가능하도록 합니다.</li>
                </ol>
              </section>

              {/* 제11조 환불 및 반품 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제11조 (환불 및 반품)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>이용자는 상품을 수령한 날로부터 7일 이내에 반품 또는 교환을 신청할 수 있습니다.</li>
                  <li>다음 각 호에 해당하는 경우에는 반품 또는 교환이 불가능합니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>이용자의 책임 있는 사유로 상품이 멸실 또는 훼손된 경우</li>
                      <li>상품의 사용 또는 일부 소비로 인하여 상품의 가치가 현저히 감소한 경우</li>
                      <li>시간이 지나 재판매가 어려울 정도로 상품의 가치가 감소한 경우</li>
                      <li>복제가 가능한 상품의 포장을 훼손한 경우</li>
                      <li>상품 수령 후 7일이 경과한 경우</li>
                    </ul>
                  </li>
                  <li>반품 배송비는 상품 하자 또는 오배송의 경우 회사 부담, 단순 변심의 경우 이용자 부담입니다.</li>
                  <li>환불은 원래 결제 수단으로 진행되며, 영업일 기준 3-5일 소요됩니다.</li>
                </ol>
              </section>

              {/* 제12조 회원의 의무 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제12조 (회원의 의무)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회원은 다음 행위를 하여서는 안 됩니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>신청 또는 변경 시 허위 내용의 등록</li>
                      <li>타인의 정보 도용</li>
                      <li>회사가 게시한 정보의 변경</li>
                      <li>회사가 정한 정보 이외의 정보 등의 송신 또는 게시</li>
                      <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                      <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                      <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                    </ul>
                  </li>
                  <li>회원은 관계법령, 이 약관의 규정, 이용안내 및 주의사항 등 회사가 통지하는 사항을 준수하여야 합니다.</li>
                </ol>
              </section>

              {/* 제13조 회사의 의무 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제13조 (회사의 의무)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 지속적이고, 안정적으로 서비스를 제공하는데 최선을 다합니다.</li>
                  <li>회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보보호를 위해 보안시스템을 구축하며 개인정보처리방침을 공시하고 준수합니다.</li>
                  <li>회사는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.</li>
                  <li>회사는 서비스와 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다.</li>
                </ol>
              </section>

              {/* 제14조 손해배상 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제14조 (손해배상)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회사는 무료로 제공하는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 중대한 과실에 의한 경우를 제외하고 이에 대하여 책임을 부담하지 않습니다.</li>
                  <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                  <li>회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 
                  그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
                </ol>
              </section>

              {/* 제15조 분쟁 해결 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제15조 (분쟁 해결)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
                  <li>회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 
                  주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다.</li>
                  <li>회사와 이용자 간에 발생한 전자상거래 분쟁에 관하여는 대한민국 법을 적용합니다.</li>
                </ol>
              </section>

              {/* 부칙 */}
              <section className="pt-6 border-t">
                <h2 className="text-xl font-bold mb-4">부칙</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  이 약관은 2025년 1월 1일부터 시행됩니다.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* 문의 안내 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>약관 관련 문의</CardTitle>
            <CardDescription>이용약관 관련 문의사항</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                이용약관 관련 문의사항이 있으시면 고객센터로 연락주시거나 1:1 문의를 이용해주세요.
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
                  <p className="text-sm text-muted-foreground">
                    마이페이지에서 약관 관련 문의를 작성하실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

