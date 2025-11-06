'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/lib/store/useWishlistStore'
import { StarIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">찜하기</h1>
          {items.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              전체 삭제
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">찜한 상품이 없습니다.</p>
              <Link href="/products">
                <Button>상품 보러가기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center cursor-pointer">
                    <span className="text-6xl">📦</span>
                  </div>
                </Link>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">
                      {product.averageRating?.toFixed(1) || '0.0'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      {product.price.toLocaleString()}원
                    </span>
                    {product.businessPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.businessPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => removeItem(product.id)}
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      삭제
                    </Button>
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button className="w-full">상세보기</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}




