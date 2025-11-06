'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { apartmentPackageProducts, type ApartmentPackageProduct } from '@/lib/mocks/data/apartmentProducts'

// 쿠키 헬퍼 함수
const COOKIE_NAME = 'apartment_product_filters'

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

const loadFiltersFromCookie = (): any => {
  try {
    const cookieValue = getCookie(COOKIE_NAME)
    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue))
    }
  } catch (error) {
    console.error('Failed to load filters from cookie:', error)
  }
  return {}
}

const saveFiltersToCookie = (filters: any) => {
  try {
    const cookieValue = encodeURIComponent(JSON.stringify(filters))
    setCookie(COOKIE_NAME, cookieValue)
  } catch (error) {
    console.error('Failed to save filters to cookie:', error)
  }
}

interface FilterState {
  packageType?: 'essential' | 'emergency' | 'seasonal' | 'all'
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export default function ApartmentPurchasePage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'))
  const pageSize = 12
  
  // 초기 필터값: URL 파라미터 > 쿠키 > 기본값 순서로 우선순위
  const getInitialFilters = (): FilterState => {
    const cookieFilters = loadFiltersFromCookie()
    return {
      packageType: (searchParams.get('packageType') as any) || cookieFilters.packageType || 'all',
      search: searchParams.get('search') || cookieFilters.search || undefined,
      minPrice: searchParams.get('minPrice') 
        ? parseInt(searchParams.get('minPrice')!) 
        : cookieFilters.minPrice || undefined,
      maxPrice: searchParams.get('maxPrice') 
        ? parseInt(searchParams.get('maxPrice')!) 
        : cookieFilters.maxPrice || undefined,
      sortBy: (searchParams.get('sortBy') as any) || cookieFilters.sortBy || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as any) || cookieFilters.sortOrder || 'desc',
    }
  }
  
  const [filters, setFilters] = useState<FilterState>(getInitialFilters())

  // 필터링된 상품 목록
  const filteredProducts = useMemo(() => {
    let products = [...apartmentPackageProducts]

    // 패키지 타입 필터
    if (filters.packageType && filters.packageType !== 'all') {
      products = products.filter(p => p.packageType === filters.packageType)
    }

    // 검색 필터
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.packageCategory.toLowerCase().includes(searchLower)
      )
    }

    // 가격 필터
    if (filters.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice!)
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice!)
    }

    // 정렬
    const sortedProducts = [...products].sort((a, b) => {
      let comparison = 0
      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rating':
          comparison = (b.averageRating || 0) - (a.averageRating || 0)
          break
        case 'createdAt':
        default:
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          break
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return sortedProducts
  }, [filters])

  // 페이징
  const totalPages = Math.ceil(filteredProducts.length / pageSize)
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return filteredProducts.slice(start, end)
  }, [filteredProducts, page, pageSize])

  // 패키지 타입 목록
  const packageTypes = [
    { value: 'all', label: '전체' },
    { value: 'essential', label: '🥇 필수 시설 안전/보수 기본 패키지' },
    { value: 'emergency', label: '🚨 긴급 대응 및 장비 보강 패키지' },
    { value: 'seasonal', label: '🌿 계절 맞춤형 조경/환경 패키지' },
  ]

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    setPage(1)
    // 쿠키에 저장
    saveFiltersToCookie(newFilters as any)
  }
  
  // 필터 변경 시 쿠키에 저장
  useEffect(() => {
    saveFiltersToCookie(filters as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* 필터 사이드바 */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>필터</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">패키지 타입</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {packageTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md"
                    >
                      <input
                        type="radio"
                        name="packageType"
                        value={type.value}
                        checked={filters.packageType === type.value || (type.value === 'all' && filters.packageType === 'all')}
                        onChange={() => handleFilterChange('packageType', type.value === 'all' ? 'all' : type.value)}
                        className="rounded"
                      />
                      <span className="text-sm">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">검색</label>
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="상품명 검색..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">가격 범위</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="최소"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="최대"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.inStock || false}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked ? true : undefined)}
                    className="rounded"
                  />
                  <span className="text-sm">재고 있는 상품만</span>
                </label>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">정렬</label>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-')
                    handleFilterChange('sortBy', sortBy)
                    handleFilterChange('sortOrder', sortOrder)
                  }}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="createdAt-desc">최신순</option>
                  <option value="price-asc">가격 낮은순</option>
                  <option value="price-desc">가격 높은순</option>
                  <option value="rating-desc">평점 높은순</option>
                  <option value="name-asc">이름순</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* 상품 목록 */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">아파트 관리 용품 구매</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length > 0 
                ? `아파트 관리에 필요한 세트 상품 ${filteredProducts.length}개` 
                : '상품이 없습니다'}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">로딩 중...</div>
          ) : paginatedProducts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">상품을 찾을 수 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                      <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center relative">
                        <span className="text-6xl">📦</span>
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          세트
                        </div>
                      </div>
                      <CardHeader>
                        <div className="mb-2">
                          <span className="text-xs text-muted-foreground">{product.packageCategory}</span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                        <div className="mt-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">주요 구성품:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {product.mainItems.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                            {product.mainItems.length > 3 && (
                              <li className="text-xs text-primary">+{product.mainItems.length - 3}개 더</li>
                            )}
                          </ul>
                        </div>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <div className="flex items-center gap-1 mb-2">
                          <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {product.averageRating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">
                            {product.price.toLocaleString()}원
                          </span>
                          {product.businessPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.businessPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                        {product.stock > 0 ? (
                          <p className="text-xs text-green-600 mt-2">재고: {product.stock}개</p>
                        ) : (
                          <p className="text-xs text-red-600 mt-2">품절</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* 페이징 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    이전
                  </Button>
                  <span className="text-sm">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    다음
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

