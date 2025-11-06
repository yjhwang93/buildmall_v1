'use client'

import { useEffect, useState } from 'react'
import { startMockWorker } from '@/lib/mocks/browser'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    // MSW 초기화
    const initMSW = async () => {
      try {
        await startMockWorker()
        setMswReady(true)
        console.log('MSW initialized successfully')
      } catch (error) {
        console.error('Failed to initialize MSW:', error)
        setMswReady(true) // MSW 실패해도 앱은 계속 실행
      }
    }
    
    initMSW()
  }, [])

  return <>{children}</>
}
