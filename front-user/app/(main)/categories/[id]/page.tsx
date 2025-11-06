'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Category, Product, PaginatedResponse, ProductListParams } from '@/lib/types/api'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// 쿠키 헬퍼 함수
const COOKIE_NAME = 'product_filters'

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

const loadFiltersFromCookie = (): Partial<ProductListParams> => {
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

const saveFiltersToCookie = (filters: ProductListParams) => {
  try {
    const { pageSize, ...filtersToSave } = filters
    const cookieValue = encodeURIComponent(JSON.stringify(filtersToSave))
    setCookie(COOKIE_NAME, cookieValue)
  } catch (error) {
    console.error('Failed to save filters to cookie:', error)
  }
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string
  const [category, setCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  // 초기 필터값: URL 파라미터 > 쿠키 > 기본값 순서로 우선순위
  const getInitialFilters = (): ProductListParams => {
    const cookieFilters = loadFiltersFromCookie()
    return {
      categoryId: categoryId, // 카테고리 페이지이므로 항상 현재 카테고리 ID 사용
      search: cookieFilters.search || undefined,
      minPrice: cookieFilters.minPrice || undefined,
      maxPrice: cookieFilters.maxPrice || undefined,
      inStock: cookieFilters.inStock !== undefined ? cookieFilters.inStock : undefined,
      sortBy: cookieFilters.sortBy || 'createdAt',
      sortOrder: cookieFilters.sortOrder || 'desc',
      pageSize: 12,
    }
  }
  
  const [filters, setFilters] = useState<ProductListParams>(getInitialFilters())

  useEffect(() => {
    fetchCategory()
    fetchCategories()
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, page, filters])

  const fetchCategory = async () => {
    try {
      const response = await apiClient.get<ApiResponse<Category>>(`/api/v1/categories/${categoryId}`)
      if (response.data.success) {
        setCategory(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch category:', error)
    }
  }

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

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('categoryId', categoryId) // 카테고리 페이지이므로 항상 현재 카테고리 ID 사용
      if (filters.search) params.append('search', filters.search)
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.inStock) params.append('inStock', 'true')
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
      params.append('page', page.toString())
      params.append('pageSize', '12')

      const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        `/api/v1/products?${params.toString()}`
      )

      if (response.data.success) {
        setProducts(response.data.data.items)
        setTotalPages(response.data.data.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof ProductListParams, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    setPage(1)
    // 쿠키에 저장
    saveFiltersToCookie(newFilters)
  }
  
  // 필터 변경 시 쿠키에 저장
  useEffect(() => {
    saveFiltersToCookie(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p>카테고리를 찾을 수 없습니다.</p>
            <Link href="/products">
              <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md">
                상품 목록으로
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
      </div>

      <div className="flex gap-8">
        {/* 필터 사이드바 */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>필터</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">카테고리</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={false}
                      disabled
                      className="rounded"
                    />
                    <span className="text-sm">{category.name} (현재)</span>
                  </label>
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={filters.categoryId === cat.id}
                        onChange={() => {
                          // 다른 카테고리로 이동
                          window.location.href = `/categories/${cat.id}`
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{cat.name}</span>
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
          {loading ? (
            <div className="text-center py-12">로딩 중...</div>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">이 카테고리에 상품이 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {products.length > 0 ? `${products.length}개의 상품` : '상품이 없습니다'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                      <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                        <span className="text-6xl">📦</span>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
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

