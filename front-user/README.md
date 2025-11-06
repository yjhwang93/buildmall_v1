# Build Mall - 프론트엔드 (사용자)

## 설치된 라이브러리

### UI 라이브러리
- **Radix UI**: 접근성 높은 컴포넌트 라이브러리
  - Dialog, Dropdown Menu, Select, Tabs, Toast, Popover, Checkbox, Switch
- **shadcn/ui 스타일**: 컴포넌트 구조
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **tailwind-merge**: Tailwind 클래스 병합

### 아이콘 라이브러리
- **@heroicons/react**: Heroicons 아이콘 세트
- **lucide-react**: Lucide 아이콘 세트

### 기타 UI 라이브러리
- **@headlessui/react**: 접근성 높은 헤드리스 UI 컴포넌트
- **framer-motion**: 애니메이션 라이브러리
- **recharts**: 차트 라이브러리
- **@tanstack/react-table**: 테이블 컴포넌트

### 상태/유틸리티
- **zustand**: 전역 상태 관리
- **axios**: API 클라이언트
- **msw**: Mock Service Worker 기반 Mock API
- **class-variance-authority**, **clsx**, **tailwind-merge**

## 개발 서버 실행

```bash
# Docker로 실행 (최초/new deps 추가시 빌드 필요)
cd /home/buildmall/buildmall_www
sudo docker compose down
sudo docker compose up -d --build

# 컨테이너 내에서 의존성 설치만 필요할 경우
sudo docker compose exec front-user npm install
sudo docker compose restart front-user
```

## MSW 초기화 (최초 1회)
```bash
# public/에 Service Worker 생성
sudo docker compose exec front-user npm run msw:init
# 또는 로컬에서 실행 후 public/ 커밋
```

## 프로젝트 구조

```
front-user/
├── app/              # Next.js App Router
│   ├── providers.tsx # MSW 시작
│   └── layout.tsx    # Root Layout
├── components/       # React 컴포넌트
│   ├── ui/          # 공통 UI 컴포넌트
│   └── layout/       # 레이아웃 컴포넌트 (Header, Footer, MainLayout)
├── lib/             # 유틸리티 및 헬퍼
│   ├── api/         # Axios 클라이언트
│   ├── mocks/       # MSW 핸들러 및 더미 데이터
│   │   ├── data/    # 더미 데이터 (users, products, categories, orders, reviews)
│   │   └── handlers.ts # Mock API 핸들러
│   ├── store/       # Zustand 전역 상태
│   └── types/       # TypeScript 타입
│       └── api.ts   # API 엔드포인트 인터페이스 정의
└── public/          # 정적 파일 (mockServiceWorker.js 포함)
```

## Mock API 엔드포인트

### 인증
- `POST /api/v1/auth/login` - 로그인
- `POST /api/v1/auth/register` - 회원가입
- `GET /api/v1/auth/me` - 현재 사용자 정보

### 상품
- `GET /api/v1/products` - 상품 목록 (페이징, 필터링 지원)
- `GET /api/v1/products/:id` - 상품 상세

### 카테고리
- `GET /api/v1/categories` - 카테고리 목록
- `GET /api/v1/categories/:id` - 카테고리 상세

### 주문
- `GET /api/v1/orders` - 주문 목록 (페이징, 필터링 지원)
- `GET /api/v1/orders/:id` - 주문 상세

### 리뷰
- `GET /api/v1/reviews` - 리뷰 목록 (페이징, 필터링 지원)

## 더미 데이터

- **사용자**: 3명 (일반 사용자, 기업 사용자, 관리자)
- **상품**: 8개 (시멘트, 레미콘, 철근, 벽돌, 타일, 합판, 방수시트, 페인트)
- **카테고리**: 10개 (시멘트/콘크리트, 철근/철골, 벽돌/블록 등)
- **주문**: 2개 (완료된 주문, 진행중 주문)
- **리뷰**: 5개 (다양한 상품에 대한 리뷰)

## 환경 변수

`.env.local` 파일에 설정:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_API=true
```

`NEXT_PUBLIC_USE_MOCK_API=true`일 때 MSW가 활성화되어 Mock API를 사용합니다.
