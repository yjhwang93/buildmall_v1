'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Product, PaginatedResponse } from '@/lib/types/api'
import { StarIcon } from '@heroicons/react/24/solid'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(query)

  useEffect(() => {
    if (query) {
      setSearchTerm(query)
      searchProducts(query)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const searchProducts = async (term: string) => {
    if (!term.trim()) return

    setLoading(true)
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        `/api/v1/products?search=${encodeURIComponent(term)}&pageSize=20`
      )
      if (response.data.success) {
        setProducts(response.data.data.items)
      }
    } catch (error) {
      console.error('Failed to search products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchProducts(searchTerm)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">상품 검색</h1>

        {/* 검색 바 */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="상품명을 검색하세요..."
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? '검색 중...' : '검색'}
            </button>
          </div>
        </form>

        {/* 검색 결과 */}
        {query && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              &quot;{query}&quot; 검색 결과: {products.length}개
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">검색 중...</div>
        ) : products.length === 0 && query ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            </CardContent>
          </Card>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">검색어를 입력하세요.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

