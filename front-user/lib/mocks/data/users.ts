import { User } from '@/lib/types/api'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'user1@example.com',
    name: '홍길동',
    phone: '010-1234-5678',
    role: 'user',
    userType: 'individual',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'business1@example.com',
    name: '김건설',
    phone: '010-2345-6789',
    role: 'business',
    userType: 'business',
    businessInfo: {
      businessNumber: '123-45-67890',
      businessName: '건설자재 유한회사',
      representativeName: '김건설',
      address: '서울시 강남구 테헤란로 123',
      status: 'approved',
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: '관리자',
    phone: '010-3456-7890',
    role: 'admin',
    userType: 'individual',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]




