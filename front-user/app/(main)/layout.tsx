import MainLayout from '@/components/layout/MainLayout'

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}




