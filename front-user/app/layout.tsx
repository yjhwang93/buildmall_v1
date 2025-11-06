import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'Build Mall',
  description: '건축 자재를 온라인에서 판매하는 쇼핑몰',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

