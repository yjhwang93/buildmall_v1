# Docker Compose 빌드 가이드

## 개발 환경 실행

```bash
# 개발 서버 실행 (핫 리로드)
docker compose up -d

# 로그 확인
docker compose logs -f front-user

# 서비스 중지
docker compose down
```

## 프로덕션 빌드

### 방법 1: 프로덕션 Docker Compose 파일 사용

```bash
# 프로덕션 빌드 및 실행
docker compose -f docker-compose.prod.yml up --build -d

# 로그 확인
docker compose -f docker-compose.prod.yml logs -f front-user

# 서비스 중지
docker compose -f docker-compose.prod.yml down
```

### 방법 2: 빌드 서비스 사용

```bash
# 빌드만 실행 (컨테이너 내에서 빌드)
docker compose --profile build up front-user-build --build

# 빌드 후 프로덕션 컨테이너 실행
docker compose -f docker-compose.prod.yml up -d
```

### 방법 3: 직접 빌드

```bash
# 빌드
cd front-user
docker build -f Dockerfile -t buildmall-front-user:latest .

# 실행
docker run -p 4710:3000 --name buildmall_front_user buildmall-front-user:latest
```

## 빌드 결과 확인

빌드가 성공하면:
- `front-user/.next/` 디렉토리에 빌드 결과물이 생성됩니다
- 프로덕션 모드에서는 `standalone` 출력이 생성됩니다

## 주의사항

1. **환경 변수**: `.env.local` 파일이 있으면 자동으로 로드됩니다
2. **의존성**: `package-lock.json`이 없으면 `npm install`이 실행됩니다
3. **빌드 시간**: 첫 빌드는 시간이 걸릴 수 있습니다 (의존성 다운로드)
4. **포트**: 기본 포트는 4710입니다 (`docker-compose.yml`에서 변경 가능)



