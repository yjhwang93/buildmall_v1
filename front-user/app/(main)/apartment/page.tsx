'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BuildingOfficeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ApartmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">아파트 관리</h1>
        <p className="text-muted-foreground">
          아파트 관리 기능을 이용하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">아파트 정보</CardTitle>
            </div>
            <CardDescription>아파트 기본 정보를 관리합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              관리하기
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">입주자 관리</CardTitle>
            </div>
            <CardDescription>입주자 정보를 관리합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              관리하기
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">공지사항</CardTitle>
            </div>
            <CardDescription>아파트 공지사항을 관리합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              관리하기
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">통계 및 리포트</CardTitle>
            </div>
            <CardDescription>아파트 관리 통계를 확인합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              확인하기
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">아파트 관리 용품 구매</CardTitle>
            </div>
            <CardDescription>아파트 관리에 필요한 세트 상품을 구매하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="default" asChild>
              <Link href="/apartment/purchase">
                구매하기
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>최근 아파트 관리 활동 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="p-2 bg-muted rounded-md">
                  <DocumentTextIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">새 공지사항 등록</p>
                  <p className="text-xs text-muted-foreground">2024-11-05 14:30</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="p-2 bg-muted rounded-md">
                  <UserGroupIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">입주자 정보 수정</p>
                  <p className="text-xs text-muted-foreground">2024-11-04 10:15</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="p-2 bg-muted rounded-md">
                  <BuildingOfficeIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">아파트 정보 업데이트</p>
                  <p className="text-xs text-muted-foreground">2024-11-03 09:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>빠른 메뉴</CardTitle>
            <CardDescription>자주 사용하는 기능</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline" asChild>
              <Link href="/products">
                상품 구매
              </Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/orders">
                주문 내역
              </Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/mypage">
                마이페이지
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


