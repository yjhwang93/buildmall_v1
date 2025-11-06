import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function startMockWorker() {
  if (typeof window === 'undefined') return
  
  // 개발 환경에서는 항상 MSW 활성화
  const enabled = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false'
  
  if (!enabled) {
    console.log('MSW is disabled')
    return
  }
  
  try {
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    })
    console.log('MSW started successfully')
  } catch (error) {
    console.error('Failed to start MSW:', error)
  }
}
