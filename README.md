# 공사 자재 쇼핑몰 프로젝트

## 프로젝트 구조

```
buildmall_www/
├── front-user/          # 사용자용 프론트엔드 (Next.js)
├── doc/                 # 문서
└── docker-compose.yml   # Docker Compose 설정
```

## 시작하기

### Docker를 사용한 개발 환경 실행

```bash
# 프론트엔드 개발 서버 실행
docker-compose up

# 백그라운드 실행
docker-compose up -d

# 중지
docker-compose down
```

프론트엔드는 다음 주소에서 접속 가능합니다:
- 로컬: http://localhost:4710
- 외부 IP: http://116.125.141.115:4710

**참고**: 외부 접속을 위해서는 서버 방화벽에서 4710 포트가 열려있어야 합니다.

## 개발 가이드

자세한 개발 가이드는 `/doc/development_plan.md` 파일을 참고하세요.

