'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">회사 정보</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>회사명: Build Mall</li>
              <li>대표: 홍길동</li>
              <li>사업자등록번호: 123-45-67890</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">고객 지원</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-primary">1:1 문의</Link>
              </li>
              <li>
                <Link href="/notice" className="hover:text-primary">공지사항</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">이용 안내</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shipping" className="hover:text-primary">배송 안내</Link>
              </li>
              <li>
                <Link href="/return" className="hover:text-primary">반품/교환</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">이용약관</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">개인정보 처리방침</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>전화: 1588-0000</li>
              <li>이메일: support@buildmall.com</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Build Mall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

