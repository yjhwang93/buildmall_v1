import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductImage } from '@/components/ProductImage'
import Link from 'next/link'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid'
import type { Product } from '@/lib/types/api'
import { mockProducts } from '@/lib/mocks/data/products'
import { mockCategories } from '@/lib/mocks/data/categories'
import { apartmentPackageProducts } from '@/lib/mocks/data/apartmentProducts'
import type { ApartmentPackageProduct } from '@/lib/mocks/data/apartmentProducts'

function getPopularProducts(): Product[] {
  return [...mockProducts]
    .sort((a, b) => {
      const ratingA = a.averageRating || 0
      const ratingB = b.averageRating || 0
      return ratingB - ratingA
    })
    .slice(0, 5)
}

function getCategories() {
  return mockCategories.slice(0, 10)
}

function getNewProducts(): Product[] {
  return [...mockProducts]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
    .slice(0, 5)
}

function getApartmentPackageProducts(): ApartmentPackageProduct[] {
  return [...apartmentPackageProducts]
    .sort((a, b) => {
      const ratingA = a.averageRating || 0
      const ratingB = b.averageRating || 0
      return ratingB - ratingA
    })
    .slice(0, 5)
}

export default function Home() {
  const popularProducts = getPopularProducts()
  const categories = getCategories()
  const newProducts = getNewProducts()
  const apartmentPackageProducts = getApartmentPackageProducts()

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build Mall에서 쉽고 빠르게
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              다양한 건축 자재를 한 곳에서 구매하세요. 기업 할인 및 대량 구매 지원
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  상품 보러가기
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  회원가입
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(0, 10).map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl mb-2">🏗️</div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 상품 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">인기 상품</h2>
            <Link href="/products">
              <Button variant="ghost">
                전체 보기
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {popularProducts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>인기 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {popularProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="aspect-square bg-muted rounded-t-lg relative overflow-hidden">
                      <ProductImage
                        src={product.images && product.images.length > 0 ? product.images[0] : undefined}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {product.averageRating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
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
                        <p className="text-xs text-green-600 mt-2">재고 있음</p>
                      ) : (
                        <p className="text-xs text-red-600 mt-2">품절</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 신상품 섹션 */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">신상품</h2>
            <Link href="/products?sortBy=createdAt&sortOrder=desc">
              <Button variant="ghost">
                전체 보기
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {newProducts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>신상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {newProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="aspect-square bg-muted rounded-t-lg relative overflow-hidden">
                      <ProductImage
                        src={product.images && product.images.length > 0 ? product.images[0] : undefined}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {product.averageRating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
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
                        <p className="text-xs text-green-600 mt-2">재고 있음</p>
                      ) : (
                        <p className="text-xs text-red-600 mt-2">품절</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 아파트 관리용품 패키지 상품 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">아파트 관리용품 패키지</h2>
            <Link href="/apartment/purchase">
              <Button variant="ghost">
                전체 보기
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {apartmentPackageProducts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>아파트 관리용품 패키지 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {apartmentPackageProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col border-primary/20">
                    <div className="aspect-square bg-muted rounded-t-lg relative overflow-hidden">
                      <ProductImage
                        src={product.images && product.images.length > 0 ? product.images[0] : undefined}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                        패키지
                      </div>
                    </div>
                    <CardHeader>
                      <div className="mb-2">
                        <span className="text-xs text-muted-foreground">{product.packageCategory}</span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground mb-1">주요 구성품:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {product.mainItems.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-1">•</span>
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                          {product.mainItems.length > 2 && (
                            <li className="text-xs text-primary">+{product.mainItems.length - 2}개 더</li>
                          )}
                        </ul>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {product.averageRating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
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
                        <p className="text-xs text-green-600 mt-2">재고 있음</p>
                      ) : (
                        <p className="text-xs text-red-600 mt-2">품절</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 프로모션 배너 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">기업 고객 특별 할인</h2>
              <p className="text-lg mb-6 text-primary-foreground/90">
                기업 인증 고객에게는 특별 할인가를 제공합니다
              </p>
              <Link href="/register?userType=business">
                <Button size="lg" variant="secondary">
                  기업 회원가입
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
