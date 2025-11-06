'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">개인정보 처리방침</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            시행일자: 2025년 1월 1일
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none space-y-8">
              {/* 서문 */}
              <section>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Build Mall(이하 "회사"라 함)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 
                  이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                </p>
              </section>

              {/* 제1조 개인정보의 처리목적 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제1조 (개인정보의 처리목적)</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                  이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    <strong>회원 가입 및 관리</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리</li>
                      <li>서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적</li>
                      <li>기업 회원의 경우 사업자 인증 및 기업 할인 적용</li>
                    </ul>
                  </li>
                  <li>
                    <strong>재화 또는 서비스 제공</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>물품 배송, 서비스 제공, 계약서·청약서 발송</li>
                      <li>콘텐츠 제공, 맞춤 서비스 제공, 본인인증</li>
                      <li>주문 및 배송 정보 제공, 결제 및 환불 처리</li>
                    </ul>
                  </li>
                  <li>
                    <strong>마케팅 및 광고에의 활용</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                      <li>이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                      <li>서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                    </ul>
                  </li>
                </ol>
              </section>

              {/* 제2조 개인정보의 처리 및 보유기간 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </li>
                  <li>
                    각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                      <li>
                        <strong>회원 가입 및 관리:</strong> 회원 탈퇴 시까지 (다만, 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 
                        해당 수사·조사 종료 시까지, 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 거래기록 보존: 5년)
                      </li>
                      <li>
                        <strong>재화 또는 서비스 제공:</strong> 재화·서비스 공급완료 및 요금결제·정산 완료 시까지 
                        (다만, 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 거래기록 보존: 5년)
                      </li>
                      <li>
                        <strong>마케팅 및 광고에의 활용:</strong> 회원 탈퇴 시까지 또는 동의 철회 시까지
                      </li>
                      <li>
                        <strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년
                      </li>
                      <li>
                        <strong>대금결제 및 재화 등의 공급에 관한 기록:</strong> 5년
                      </li>
                      <li>
                        <strong>소비자의 불만 또는 분쟁처리에 관한 기록:</strong> 3년
                      </li>
                      <li>
                        <strong>신용정보의 수집/처리 및 이용 등에 관한 기록:</strong> 3년
                      </li>
                    </ul>
                  </li>
                </ol>
              </section>

              {/* 제3조 처리하는 개인정보의 항목 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제3조 (처리하는 개인정보의 항목)</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  회사는 다음의 개인정보 항목을 처리하고 있습니다.
                </p>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    <strong>회원 가입 및 관리</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>필수항목: 이메일, 비밀번호, 이름, 전화번호, 회원 유형(일반/기업)</li>
                      <li>기업 회원 추가항목: 사업자등록번호, 사업자명, 대표자명, 사업장 주소</li>
                      <li>자동 수집항목: IP주소, 쿠키, MAC주소, 서비스 이용 기록, 접속 로그, 기기정보</li>
                    </ul>
                  </li>
                  <li>
                    <strong>재화 또는 서비스 제공</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>필수항목: 이름, 전화번호, 배송지 주소, 결제정보</li>
                      <li>선택항목: 배송지 상세 주소, 배송 요청사항</li>
                    </ul>
                  </li>
                  <li>
                    <strong>마케팅 및 광고에의 활용</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>선택항목: 이메일, 전화번호, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                    </ul>
                  </li>
                </ol>
              </section>

              {/* 제4조 개인정보의 제3자 제공 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제4조 (개인정보의 제3자 제공)</h2>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 
                    정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                  </li>
                  <li>
                    회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보를 제3자에게 제공할 수 있습니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                      <li>
                        <strong>배송 서비스 제공업체:</strong> 배송을 위해 이름, 전화번호, 배송지 주소 제공
                      </li>
                      <li>
                        <strong>결제 서비스 제공업체:</strong> 결제 처리를 위해 결제 정보 제공
                      </li>
                    </ul>
                  </li>
                  <li>
                    회사는 제2항에 따른 개인정보 제공 시 사전에 정보주체에게 제공받는 자, 제공목적, 제공항목, 보유 및 이용기간을 알리고 동의를 받습니다.
                  </li>
                </ol>
              </section>

              {/* 제5조 개인정보처리 위탁 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제5조 (개인정보처리 위탁)</h2>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                      <li>
                        <strong>배송 서비스</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>위탁받는 자: CJ대한통운, 한진택배, 롯데택배</li>
                          <li>위탁하는 업무의 내용: 상품 배송</li>
                        </ul>
                      </li>
                      <li>
                        <strong>결제 서비스</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>위탁받는 자: 이니시스(결제대행)</li>
                          <li>위탁하는 업무의 내용: 결제 처리</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    회사는 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 
                    기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 
                    계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                  </li>
                  <li>
                    위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하겠습니다.
                  </li>
                </ol>
              </section>

              {/* 제6조 정보주체의 권리·의무 및 행사방법 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제6조 (정보주체의 권리·의무 및 행사방법)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>개인정보 처리정지 요구권</li>
                      <li>개인정보 열람 요구권</li>
                      <li>개인정보 정정·삭제 요구권</li>
                      <li>개인정보 처리정지 요구권</li>
                    </ul>
                  </li>
                  <li>
                    제1항에 따른 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 
                    모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
                  </li>
                  <li>
                    제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 
                    이 경우 「개인정보 보호법」 시행령 제11조에 따른 위임장을 제출하셔야 합니다.
                  </li>
                  <li>
                    개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 
                    정보주체의 권리가 제한될 수 있습니다.
                  </li>
                  <li>
                    개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
                  </li>
                  <li>
                    회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 
                    열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
                  </li>
                </ol>
              </section>

              {/* 제7조 개인정보의 파기 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제7조 (개인정보의 파기)</h2>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
                    지체없이 해당 개인정보를 파기합니다.
                  </li>
                  <li>
                    정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 
                    다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 
                    옮기거나 보관장소를 달리하여 보존합니다.
                  </li>
                  <li>
                    개인정보 파기의 절차 및 방법은 다음과 같습니다:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                      <li>
                        <strong>파기절차</strong>
                        <p className="ml-4 mt-1">회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</p>
                      </li>
                      <li>
                        <strong>파기방법</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</li>
                          <li>기록물, 인쇄물, 서면 등 그 밖의 기록매체에 저장된 개인정보는 파쇄 또는 소각</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ol>
              </section>

              {/* 제8조 개인정보 보호책임자 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제8조 (개인정보 보호책임자)</h2>
                <ol className="text-sm text-muted-foreground space-y-4 list-decimal list-inside leading-relaxed">
                  <li>
                    회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 
                    피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                  </li>
                  <li>
                    <strong>개인정보 보호책임자</strong>
                    <ul className="list-none ml-4 mt-2 space-y-2">
                      <li>• 성명: 홍길동</li>
                      <li>• 직책: 개인정보보호책임자</li>
                      <li>• 연락처: 1588-0000, privacy@buildmall.com</li>
                    </ul>
                  </li>
                  <li>
                    정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 
                    피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 
                    회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
                  </li>
                </ol>
              </section>

              {/* 제9조 개인정보의 안전성 확보 조치 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제9조 (개인정보의 안전성 확보 조치)</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  회사는 「개인정보 보호법」 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
                </p>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    <strong>개인정보의 암호화</strong>
                    <p className="ml-4 mt-1">이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</p>
                  </li>
                  <li>
                    <strong>해킹 등에 대비한 기술적 대책</strong>
                    <p className="ml-4 mt-1">회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</p>
                  </li>
                  <li>
                    <strong>개인정보처리시스템 등의 접근 권한 관리</strong>
                    <p className="ml-4 mt-1">개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p>
                  </li>
                </ol>
              </section>

              {/* 제10조 개인정보 처리방침 변경 */}
              <section>
                <h2 className="text-xl font-bold mb-4">제10조 (개인정보 처리방침 변경)</h2>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>이 개인정보 처리방침은 2025년 1월 1일부터 적용됩니다.</li>
                  <li>이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</li>
                </ol>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* 문의 안내 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>개인정보 보호 관련 문의</CardTitle>
            <CardDescription>개인정보 처리방침 관련 문의사항</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                개인정보 보호 관련 문의사항이 있으시면 개인정보 보호책임자에게 연락주시거나 1:1 문의를 이용해주세요.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">개인정보 보호책임자</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>성명: 홍길동</li>
                    <li>직책: 개인정보보호책임자</li>
                    <li>전화: 1588-0000</li>
                    <li>이메일: privacy@buildmall.com</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">1:1 문의</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    마이페이지에서 개인정보 관련 문의를 작성하실 수 있습니다.
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

