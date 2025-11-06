'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import { useCartStore } from '@/lib/store/useCartStore'
import type { Category, ApiResponse } from '@/lib/types/api'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, signOut } = useAuthStore()
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [showApartmentMenu, setShowApartmentMenu] = useState(false)
  const itemCount = useCartStore((state) => state.itemCount)

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>('/api/v1/categories')
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleLogout = () => {
    signOut()
    router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Build Mall
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/products" className="text-sm font-medium hover:text-primary">
                상품
              </Link>
              <Link href="/products/discount" className="text-sm font-medium hover:text-primary">
                할인상품
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setShowApartmentMenu(true)}
                onMouseLeave={() => setShowApartmentMenu(false)}
              >
                <button className="text-sm font-medium hover:text-primary flex items-center gap-1">
                  아파트 관리
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${showApartmentMenu ? 'rotate-180' : ''}`} />
                </button>
                {showApartmentMenu && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-48"
                    onMouseEnter={() => setShowApartmentMenu(true)}
                    onMouseLeave={() => setShowApartmentMenu(false)}
                  >
                    <div className="bg-background border rounded-lg shadow-lg p-2">
                      <Link
                        href="/apartment"
                        className="block p-2 hover:bg-accent rounded-md text-sm"
                        onClick={() => setShowApartmentMenu(false)}
                      >
                        아파트 관리
                      </Link>
                      <Link
                        href="/apartment/purchase"
                        className="block p-2 hover:bg-accent rounded-md text-sm"
                        onClick={() => setShowApartmentMenu(false)}
                      >
                        아파트 관리 용품 구매
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <button className="text-sm font-medium hover:text-primary flex items-center gap-1">
                  카테고리
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                </button>
                {showCategories && categories.length > 0 && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-64"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                  >
                    <div className="bg-background border rounded-lg shadow-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.id}`}
                            className="p-2 hover:bg-accent rounded-md text-sm h-10 flex items-center"
                            onClick={() => setShowCategories(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-4 flex-1 max-w-md ml-8">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="상품 검색..."
                className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" variant="ghost" size="icon">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </Button>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-accent rounded-md">
              <ShoppingCartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/mypage" className="p-2 hover:bg-accent rounded-md">
                  <UserIcon className="h-5 w-5" />
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

