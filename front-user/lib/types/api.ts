// API 엔드포인트 인터페이스 정의

// 공통 응답 형식
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 인증 관련
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  userType: 'individual' | 'business'
  phone?: string
}

export interface UpdateUserRequest {
  name?: string
  phone?: string
}

// 사용자 관련
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'user' | 'business' | 'admin'
  userType: 'individual' | 'business'
  businessInfo?: BusinessInfo
  createdAt: string
  updatedAt: string
}

export interface BusinessInfo {
  businessNumber: string
  businessName: string
  representativeName: string
  address: string
  status: 'pending' | 'approved' | 'rejected'
}

// 상품 관련
export interface Product {
  id: string
  name: string
  description: string
  price: number
  businessPrice?: number
  images: string[]
  categoryId: string
  category?: Category
  manufacturer?: string
  specifications?: Record<string, string>
  weight?: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  averageRating?: number
  reviewCount?: number
  createdAt: string
  updatedAt: string
}

export interface ProductListParams {
  page?: number
  pageSize?: number
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  manufacturer?: string
  search?: string
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

// 카테고리 관련
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  parent?: Category
  children?: Category[]
  imageUrl?: string
  order: number
  level: number
}

// 장바구니 관련
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  createdAt: string
}

export interface Cart {
  items: CartItem[]
  totalAmount: number
  itemCount: number
}

export interface AddToCartRequest {
  productId: string
  quantity: number
}

export interface UpdateCartItemRequest {
  quantity: number
}

// 주문 관련
export interface Order {
  id: string
  orderNumber: string
  userId: string
  user?: User
  items: OrderItem[]
  totalAmount: number
  shippingFee: number
  discountAmount: number
  finalAmount: number
  shippingAddress: Address
  shippingMethod: 'standard' | 'express' | 'site_delivery'
  paymentMethod: 'card' | 'bank_transfer' | 'virtual_account' | 'credit_purchase'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled'
  payment?: Payment
  shipping?: Shipping
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  totalPrice: number
}

export interface CreateOrderRequest {
  items: {
    productId: string
    quantity: number
  }[]
  shippingAddressId: string
  shippingMethod: 'standard' | 'express' | 'site_delivery'
  paymentMethod: 'card' | 'bank_transfer' | 'virtual_account' | 'credit_purchase'
}

// 결제 관련
export interface Payment {
  id: string
  orderId: string
  amount: number
  method: 'card' | 'bank_transfer' | 'virtual_account' | 'credit_purchase'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  paidAt?: string
  createdAt: string
}

// 배송 관련
export interface Shipping {
  id: string
  orderId: string
  trackingNumber?: string
  carrier?: string
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled'
  estimatedDeliveryDate?: string
  deliveredAt?: string
  address: Address
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  userId: string
  name: string
  recipient: string
  phone: string
  zipCode: string
  address: string
  detailAddress: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAddressRequest {
  name: string
  recipient: string
  phone: string
  zipCode: string
  address: string
  detailAddress: string
  isDefault?: boolean
}

// 리뷰 관련
export interface Review {
  id: string
  productId: string
  product?: Product
  userId: string
  user?: User
  rating: number
  title?: string
  content: string
  images?: string[]
  helpfulCount: number
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateReviewRequest {
  productId: string
  orderId: string
  rating: number
  title?: string
  content: string
  images?: string[]
}

export interface ReviewListParams {
  productId?: string
  userId?: string
  rating?: number
  page?: number
  pageSize?: number
  sortBy?: 'createdAt' | 'rating' | 'helpfulCount'
  sortOrder?: 'asc' | 'desc'
}

// 문의 관련
export interface Inquiry {
  id: string
  userId: string
  user?: User
  productId?: string
  product?: Product
  type: 'general' | 'product' | 'order' | 'payment' | 'shipping'
  title: string
  content: string
  status: 'pending' | 'answered' | 'closed'
  answer?: string
  answeredAt?: string
  answeredBy?: string
  createdAt: string
  updatedAt: string
}

export interface CreateInquiryRequest {
  productId?: string
  type: 'general' | 'product' | 'order' | 'payment' | 'shipping'
  title: string
  content: string
}

// 공지사항 관련
export interface Notice {
  id: string
  title: string
  content: string
  category: 'system' | 'event' | 'shipping' | 'general'
  isImportant: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

// 찜하기 관련
export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  createdAt: string
}

