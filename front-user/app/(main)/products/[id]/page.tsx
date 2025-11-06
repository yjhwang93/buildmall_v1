'use client'

import { useState, useEffect, useMemo, Fragment } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { apiClient } from '@/lib/api/client'
import type { ApiResponse, Product, Review, PaginatedResponse, Category } from '@/lib/types/api'
import { StarIcon } from '@heroicons/react/24/solid'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/lib/store/useCartStore'
import { useWishlistStore } from '@/lib/store/useWishlistStore'
import type { ApartmentPackageProduct, IndividualProduct } from '@/lib/mocks/data/apartmentProducts'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | ApartmentPackageProduct | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<string>('description')
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  // 아파트 묶음 상품인지 확인
  const isApartmentPackage = (product: Product | ApartmentPackageProduct | null): product is ApartmentPackageProduct => {
    return product !== null && 'packageCategory' in product
  }

  useEffect(() => {
    setLoading(true)
    setActiveTab('description') // 기본값 초기화
    fetchProduct()
    fetchReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  useEffect(() => {
    // 상품 로드 후 탭 초기화
    if (product) {
      const initialTab = isApartmentPackage(product) ? 'package' : 'description'
      setActiveTab(initialTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  useEffect(() => {
    if (product && product.categoryId) {
      fetchCategory(product.categoryId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/api/v1/products/${productId}`)
      if (response.data.success) {
        setProduct(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategory = async (categoryId: string) => {
    try {
      const response = await apiClient.get<ApiResponse<Category>>(`/api/v1/categories/${categoryId}`)
      if (response.data.success) {
        setCategory(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch category:', error)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Review>>>(
        `/api/v1/reviews?productId=${productId}`
      )
      if (response.data.success) {
        setReviews(response.data.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    setAddingToCart(true)
    addItem(product, quantity)
    setTimeout(() => {
      setAddingToCart(false)
      alert('장바구니에 추가되었습니다.')
    }, 500)
  }

  const handleBuyNow = () => {
    if (!product) return
    // TODO: 바로 구매 로직
    alert('바로 구매 기능은 추후 구현 예정입니다.')
  }

  // Breadcrumb 아이템 생성
  const breadcrumbItems = useMemo(() => {
    const items: Array<{ label: string; href?: string }> = []
    
    if (!product) {
      items.push({
        label: '상품 목록',
        href: '/products',
      })
      return items
    }
    
    // 카테고리가 있으면 카테고리 추가
    if (category) {
      items.push({
        label: category.name,
        href: `/categories/${category.id}`,
      })
    } else if (product.categoryId) {
      // 일반 상품인지 확인 (packageCategory가 없으면 일반 상품)
      const hasPackageCategory = 'packageCategory' in product
      if (!hasPackageCategory) {
        items.push({
          label: '상품 목록',
          href: `/products?categoryId=${product.categoryId}`,
        })
      } else {
        items.push({
          label: '상품 목록',
          href: '/products',
        })
      }
    } else {
      items.push({
        label: '상품 목록',
        href: '/products',
      })
    }
    
    // 상품명 추가 (현재 페이지)
    items.push({
      label: product.name,
      href: undefined, // 현재 페이지는 링크 없음
    })
    
    return items
  }, [product, category])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: '상품 목록', href: '/products' }]} />
        <div className="text-center mt-8">로딩 중...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: '상품 목록', href: '/products' }]} />
        <Card className="mt-8">
          <CardContent className="py-12 text-center">
            <p>상품을 찾을 수 없습니다.</p>
            <Link href="/products">
              <Button className="mt-4">상품 목록으로</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 상품 이미지 갤러리 */}
          <div className="space-y-4">
            {/* 메인 이미지 */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center" style={{ display: product.images && product.images.length > 0 ? 'none' : 'flex' }}>
                <span className="text-9xl">📦</span>
              </div>
            </div>
            
            {/* 썸네일 이미지 목록 */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.slice(0, 10).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                        <span className="text-2xl">📦</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 상품 정보 */}
          <div>
            {isApartmentPackage(product) && (
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {product.packageName}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">{product.packageCategory}</span>
              </div>
            )}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-medium">{product.averageRating?.toFixed(1) || '0.0'}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount || 0}개 리뷰)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">
                  {product.price.toLocaleString()}원
                </span>
                {product.businessPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.businessPrice.toLocaleString()}원
                  </span>
                )}
              </div>
              {product.businessPrice && (
                <p className="text-sm text-primary">기업 할인가: {product.businessPrice.toLocaleString()}원</p>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">수량</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    (재고: {product.stock}개)
                  </span>
                </div>
              </div>

              {product.stock > 0 ? (
                <div className="flex gap-4">
                  <Button
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    {addingToCart ? '추가 중...' : '장바구니'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleBuyNow}
                  >
                    바로 구매
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (product && isInWishlist(product.id)) {
                        removeFromWishlist(product.id)
                        alert('찜하기에서 제거되었습니다.')
                      } else if (product) {
                        addToWishlist(product)
                        alert('찜하기에 추가되었습니다.')
                      }
                    }}
                  >
                    <HeartIcon
                      className={`h-5 w-5 ${
                        product && isInWishlist(product.id)
                          ? 'fill-red-500 text-red-500'
                          : ''
                      }`}
                    />
                  </Button>
                </div>
              ) : (
                <Button className="w-full" disabled>
                  품절
                </Button>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>배송비: 15,000원 (5만원 이상 무료배송)</p>
                <p>배송 기간: 2-3일</p>
                <p>현장 배송 가능 (별도 문의)</p>
              </CardContent>
            </Card>
          </div>
      </div>

        {/* 상품 상세 정보 탭 */}
        {product && isApartmentPackage(product) ? (
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              console.log('Tab changed to:', value)
              setActiveTab(value)
            }} 
            className="mb-12"
          >
            <TabsList>
              <TabsTrigger value="package">패키지 소개</TabsTrigger>
              <TabsTrigger value="specifications">상품 사양</TabsTrigger>
              <TabsTrigger value="items">포함 상품 ({product.individualProducts?.length || 0})</TabsTrigger>
              <TabsTrigger value="reviews">리뷰 ({product.reviewCount || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="package" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{product.packageName}</CardTitle>
                  <CardDescription>{product.packageCategory}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">패키지 소개</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">주요 구성품</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {product.mainItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {product.specifications && (
                    <div>
                      <h3 className="font-semibold mb-2">상세 정보</h3>
                      <dl className="space-y-2">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex border-b pb-2">
                            <dt className="font-medium w-32">{key}</dt>
                            <dd className="flex-1">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>상품 사양</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {product.specifications ? (
                    <dl className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex border-b pb-2">
                          <dt className="font-medium w-32">{key}</dt>
                          <dd className="flex-1">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-muted-foreground">사양 정보가 없습니다.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="items" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>포함된 개별 상품</CardTitle>
                  <CardDescription>패키지에 포함된 개별 상품 목록입니다. 각 상품을 클릭하면 상세 페이지로 이동합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.individualProducts && product.individualProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.individualProducts.map((item: IndividualProduct) => (
                        <Link key={item.id} href={`/products/${item.id}`}>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                              {item.image ? (
                                <span className="text-4xl">📦</span>
                              ) : (
                                <span className="text-4xl">📦</span>
                              )}
                            </div>
                            <CardHeader>
                              <CardTitle className="text-base line-clamp-2">{item.name}</CardTitle>
                              <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold">{item.price.toLocaleString()}원</span>
                                <span className="text-xs text-muted-foreground">수량: {item.quantity}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">포함된 개별 상품이 없습니다.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">리뷰가 없습니다.</p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{review.user?.name || '익명'}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                          {review.title && <p className="font-medium mb-1">{review.title}</p>}
                          <p className="text-sm text-muted-foreground">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              console.log('Tab changed to:', value)
              setActiveTab(value)
            }} 
            className="mb-12"
          >
            <TabsList>
              <TabsTrigger value="description">상품 설명</TabsTrigger>
              <TabsTrigger value="specifications">상품 사양</TabsTrigger>
              <TabsTrigger value="reviews">리뷰 ({product.reviewCount || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="whitespace-pre-line">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.specifications ? (
                    <dl className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex border-b pb-2">
                          <dt className="font-medium w-32">{key}</dt>
                          <dd className="flex-1">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-muted-foreground">사양 정보가 없습니다.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">리뷰가 없습니다.</p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{review.user?.name || '익명'}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                          {review.title && <p className="font-medium mb-1">{review.title}</p>}
                          <p className="text-sm text-muted-foreground">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : null}
    </div>
  )
}

