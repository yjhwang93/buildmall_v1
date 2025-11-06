import { http, HttpResponse } from 'msw'
import { mockUsers } from './data/users'
import { mockProducts } from './data/products'
import { mockCategories } from './data/categories'
import { mockOrders } from './data/orders'
import { mockReviews } from './data/reviews'
import type {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateUserRequest,
  Product,
  Category,
  Order,
  Review,
  User,
} from '@/lib/types/api'

const API_BASE = '/api/v1'

// 인증 API
export const authHandlers = [
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    try {
      const body = (await request.json()) as LoginRequest
      const user = mockUsers.find((u) => u.email === body.email)

      console.log('Login attempt:', { email: body.email, userFound: !!user })

      if (!user) {
        console.log('User not found:', body.email)
        return HttpResponse.json(
          { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
          { status: 401 }
        )
      }

      if (body.password !== 'password123') {
        console.log('Invalid password for user:', body.email)
        return HttpResponse.json(
          { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
          { status: 401 }
        )
      }

      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: {
          accessToken: `mock_token_${user.id}`,
          refreshToken: `mock_refresh_${user.id}`,
          user,
        },
      }

      console.log('Login successful for user:', body.email)
      return HttpResponse.json(response)
    } catch (error) {
      console.error('Login handler error:', error)
      return HttpResponse.json(
        { success: false, error: '로그인 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }
  }),

  http.post(`${API_BASE}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as RegisterRequest
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: body.email,
      name: body.name,
      phone: body.phone,
      role: body.userType === 'business' ? 'business' : 'user',
      userType: body.userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: {
        accessToken: `mock_token_${newUser.id}`,
        refreshToken: `mock_refresh_${newUser.id}`,
        user: newUser,
      },
    }

    return HttpResponse.json(response)
  }),

  http.get(`${API_BASE}/auth/me`, async ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return HttpResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const userId = token.replace('mock_token_', '')
    const user = mockUsers.find((u) => u.id === userId)

    if (!user) {
      return HttpResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    return HttpResponse.json({ success: true, data: user })
  }),

  http.put(`${API_BASE}/auth/me`, async ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return HttpResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const userId = token.replace('mock_token_', '')
    const userIndex = mockUsers.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return HttpResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const body = (await request.json()) as UpdateUserRequest
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    mockUsers[userIndex] = updatedUser

    return HttpResponse.json({ success: true, data: updatedUser })
  }),
]

// 상품 API
export const productHandlers = [
  http.get(`${API_BASE}/products`, async ({ request }) => {
    const url = new URL(request.url)
    const categoryId = url.searchParams.get('categoryId')
    const search = url.searchParams.get('search')
    const minPrice = url.searchParams.get('minPrice')
    const maxPrice = url.searchParams.get('maxPrice')
    const inStock = url.searchParams.get('inStock')
    const sortBy = url.searchParams.get('sortBy') || 'createdAt'
    const sortOrder = url.searchParams.get('sortOrder') || 'desc'
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10')

    let filteredProducts = [...mockProducts]

    // 카테고리 필터
    if (categoryId) {
      filteredProducts = filteredProducts.filter((p) => p.categoryId === categoryId)
    }

    // 검색 필터
    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) => p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 가격 필터
    if (minPrice) {
      const minPriceNum = parseInt(minPrice)
      filteredProducts = filteredProducts.filter((p) => p.price >= minPriceNum)
    }

    if (maxPrice) {
      const maxPriceNum = parseInt(maxPrice)
      filteredProducts = filteredProducts.filter((p) => p.price <= maxPriceNum)
    }

    // 재고 필터
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter((p) => p.stock > 0)
    }

    // 정렬
    filteredProducts.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price
          break
        case 'name':
          comparison = a.name.localeCompare(b.name, 'ko')
          break
        case 'rating':
          comparison = (b.averageRating || 0) - (a.averageRating || 0)
          break
        case 'createdAt':
        default:
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    // 페이징
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedProducts = filteredProducts.slice(start, end)

    const response: ApiResponse<PaginatedResponse<Product>> = {
      success: true,
      data: {
        items: paginatedProducts,
        total: filteredProducts.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredProducts.length / pageSize),
      },
    }

    return HttpResponse.json(response)
  }),

  http.get(`${API_BASE}/products/:id`, async ({ params }) => {
    // 아파트 묶음 상품 확인
    const { apartmentPackageProducts } = await import('./data/apartmentProducts')
    const apartmentProduct = apartmentPackageProducts.find((p) => p.id === params.id)
    
    if (apartmentProduct) {
      return HttpResponse.json({ success: true, data: apartmentProduct })
    }

    // 아파트 개별 상품 확인
    const { apartmentIndividualProducts } = await import('./data/products')
    const apartmentIndividualProduct = apartmentIndividualProducts.find((p) => p.id === params.id)
    
    if (apartmentIndividualProduct) {
      return HttpResponse.json({ success: true, data: apartmentIndividualProduct })
    }

    // 일반 상품 확인
    const product = mockProducts.find((p) => p.id === params.id)

    if (!product) {
      return HttpResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    return HttpResponse.json({ success: true, data: product })
  }),
]

// 카테고리 API
export const categoryHandlers = [
  http.get(`${API_BASE}/categories`, async () => {
    const response: ApiResponse<Category[]> = {
      success: true,
      data: mockCategories,
    }
    return HttpResponse.json(response)
  }),

  http.get(`${API_BASE}/categories/:id`, async ({ params }) => {
    const category = mockCategories.find((c) => c.id === params.id)

    if (!category) {
      return HttpResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }

    return HttpResponse.json({ success: true, data: category })
  }),
]

// 주문 API
export const orderHandlers = [
  http.get(`${API_BASE}/orders`, async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10')

    let filteredOrders = [...mockOrders]

    if (userId) {
      filteredOrders = filteredOrders.filter((o) => o.userId === userId)
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedOrders = filteredOrders.slice(start, end)

    const response: ApiResponse<PaginatedResponse<Order>> = {
      success: true,
      data: {
        items: paginatedOrders,
        total: filteredOrders.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredOrders.length / pageSize),
      },
    }

    return HttpResponse.json(response)
  }),

  http.get(`${API_BASE}/orders/:id`, async ({ params }) => {
    const order = mockOrders.find((o) => o.id === params.id)

    if (!order) {
      return HttpResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    return HttpResponse.json({ success: true, data: order })
  }),
]

// 리뷰 API
export const reviewHandlers = [
  http.get(`${API_BASE}/reviews`, async ({ request }) => {
    const url = new URL(request.url)
    const productId = url.searchParams.get('productId')
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10')

    let filteredReviews = [...mockReviews]

    if (productId) {
      filteredReviews = filteredReviews.filter((r) => r.productId === productId)
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedReviews = filteredReviews.slice(start, end)

    const response: ApiResponse<PaginatedResponse<Review>> = {
      success: true,
      data: {
        items: paginatedReviews,
        total: filteredReviews.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredReviews.length / pageSize),
      },
    }

    return HttpResponse.json(response)
  }),
]

// 헬스 체크
export const healthHandler = http.get('/api/health', () => {
  return HttpResponse.json({ ok: true })
})

// 모든 핸들러 통합
export const handlers = [
  healthHandler,
  ...authHandlers,
  ...productHandlers,
  ...categoryHandlers,
  ...orderHandlers,
  ...reviewHandlers,
]
