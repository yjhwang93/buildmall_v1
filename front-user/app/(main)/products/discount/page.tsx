'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Product, PaginatedResponse, ProductListParams } from '@/lib/types/api'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function DiscountProductsPage() {
  const searchParams = useSearchParams()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'))
  const pageSize = 12

  useEffect(() => {
    fetchAllProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchAllProducts = async () => {
    setLoading(true)
    try {
      // 모든 상품을 가져와서 할인 상품만 필터링
      let allItems: Product[] = []
      let currentPage = 1
      let hasMore = true

      while (hasMore) {
        const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
          `/api/v1/products?page=${currentPage}&pageSize=100`
        )

        if (response.data.success && response.data.data.items.length > 0) {
          allItems = [...allItems, ...response.data.data.items]
          if (currentPage >= response.data.data.totalPages) {
            hasMore = false
          } else {
            currentPage++
          }
        } else {
          hasMore = false
        }
      }

      setAllProducts(allItems)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  // 할인 상품만 필터링 (businessPrice가 있는 상품)
  const discountProducts = useMemo(() => {
    return allProducts.filter(product => product.businessPrice && product.businessPrice > 0)
  }, [allProducts])

  // 할인율 계산
  const calculateDiscountRate = (price: number, businessPrice: number) => {
    return Math.round(((price - businessPrice) / price) * 100)
  }

  // 페이징
  const totalPages = Math.ceil(discountProducts.length / pageSize)
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return discountProducts.slice(start, end)
  }, [discountProducts, page, pageSize])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">할인상품</h1>
        <p className="text-muted-foreground">
          {discountProducts.length > 0 
            ? `할인 상품 ${discountProducts.length}개` 
            : '할인 상품이 없습니다'}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">로딩 중...</div>
      ) : paginatedProducts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">할인 상품을 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {paginatedProducts.map((product) => {
              const discountRate = product.businessPrice 
                ? calculateDiscountRate(product.price, product.businessPrice)
                : 0
              
              return (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col border-2 border-red-500">
                    <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <span className="text-3xl">📦</span>
                      {/* 할인 배지 */}
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg z-10">
                        {discountRate}%
                      </div>
                      {/* 할인 강조 효과 */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <StarIcon className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">
                          {product.averageRating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          ({product.reviewCount || 0})
                        </span>
                      </div>
                      <div className="space-y-1">
                        {/* 원가 (취소선) */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground line-through">
                            {product.price.toLocaleString()}원
                          </span>
                        </div>
                        {/* 할인가 (강조) */}
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-red-600">
                            {product.businessPrice?.toLocaleString()}원
                          </span>
                          <span className="text-xs font-bold text-red-500 bg-red-50 px-1 rounded">
                            할인
                          </span>
                        </div>
                        {/* 할인율 표시 */}
                        <div className="text-xs text-red-600 font-semibold">
                          {discountRate}% 할인
                        </div>
                      </div>
                      {product.stock > 0 ? (
                        <p className="text-[10px] text-green-600 mt-1">재고: {product.stock}개</p>
                      ) : (
                        <p className="text-[10px] text-red-600 mt-1">품절</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
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
    </div>
  )
}



