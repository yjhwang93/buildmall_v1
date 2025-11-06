'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { apiClient } from '@/lib/api/client'
import type { User, ApiResponse, UpdateUserRequest } from '@/lib/types/api'

export default function MyPage() {
  const { accessToken, signOut } = useAuthStore()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', phone: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (accessToken) {
      fetchUserInfo()
    }
  }, [accessToken])

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/api/v1/auth/me')
      if (response.data.success) {
        setUser(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setError(null)
    setSuccess(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (user) {
      setEditForm({
        name: user.name || '',
        phone: user.phone || '',
      })
    }
    setError(null)
    setSuccess(null)
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const updateData: UpdateUserRequest = {
        name: editForm.name.trim() || undefined,
        phone: editForm.phone.trim() || undefined,
      }

      const response = await apiClient.put<ApiResponse<User>>('/api/v1/auth/me', updateData)
      
      if (response.data.success) {
        setUser(response.data.data)
        setIsEditing(false)
        setSuccess('회원정보가 성공적으로 수정되었습니다.')
      } else {
        setError(response.data.error || '회원정보 수정에 실패했습니다.')
      }
    } catch (error: any) {
      console.error('Failed to update user info:', error)
      setError(error.response?.data?.error || '회원정보 수정 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

          {loading ? (
            <div className="text-center py-12">로딩 중...</div>
          ) : user ? (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 정보</CardTitle>
                  <CardDescription>
                    {isEditing ? '회원 정보를 수정하세요' : '회원 정보를 확인하세요'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                      {success}
                    </div>
                  )}
                  
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          이름
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          placeholder="이름을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          전화번호
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          placeholder="전화번호를 입력하세요 (선택)"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1"
                          onClick={handleSave}
                          disabled={saving || !editForm.name.trim()}
                        >
                          {saving ? '저장 중...' : '저장'}
                        </Button>
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={handleCancel}
                          disabled={saving}
                        >
                          취소
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">이름</label>
                        <p className="text-lg">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">이메일</label>
                        <p className="text-lg">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">이메일은 변경할 수 없습니다.</p>
                      </div>
                      {user.phone && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">전화번호</label>
                          <p className="text-lg">{user.phone}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">회원 유형</label>
                        <p className="text-lg">
                          {user.userType === 'business' ? '기업 사용자' : '일반 사용자'}
                        </p>
                      </div>
                      {user.businessInfo && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">사업자 정보</label>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm">사업자명: {user.businessInfo.businessName}</p>
                            <p className="text-sm">사업자등록번호: {user.businessInfo.businessNumber}</p>
                            <p className="text-sm">
                              상태:{' '}
                              {user.businessInfo.status === 'approved'
                                ? '인증 완료'
                                : user.businessInfo.status === 'pending'
                                ? '인증 대기'
                                : '인증 거부'}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>계정 관리</CardTitle>
                  <CardDescription>계정 설정 및 관리</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isEditing && (
                    <Button className="w-full" variant="outline" onClick={handleEdit}>
                      회원 정보 수정
                    </Button>
                  )}
                  <Button className="w-full" variant="outline">
                    비밀번호 변경
                  </Button>
                  {user.userType === 'business' && !user.businessInfo && (
                    <Button className="w-full" variant="outline">
                      사업자 인증
                    </Button>
                  )}
                  <Button className="w-full" variant="destructive" onClick={signOut}>
                    로그아웃
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p>사용자 정보를 불러올 수 없습니다.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

