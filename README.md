# monorepo-nestjs

## 모노리포 구축 과정

### yarn 설치

- https://minify.tistory.com/40

### monorepo settings

1. folder 생성 후 `yarn init`
2. package.json 셋팅

```json
{
  "name": "monorepo-nestjs",
  "packageManager": "yarn@3.2.4",
  "private": true,
  "workspaces": {
    "packages": ["packages/*"],
    "nohoist": ["packages/*"] // yarn workspace는 의존성이 기본적으로 hoist 됨
  }
}
```

3. yarnrc.yml 파일 설정

- https://velog.io/@johnwi/wil-01-Yarn-Berry

```yaml
# .yarnrc.yml
nodeLinker: node-modules
```

### 더 참고 할만한 사이트

- https://techblog.woowahan.com/7976/
- https://medium.com/wantedjobs/yarn-berry-%EC%A0%81%EC%9A%A9%EA%B8%B0-2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A0%81%EC%9A%A9%EA%B8%B0-45f1ba67c24c

### 추후 수정 예정 사항

1. eslint 공통으로 뺄 것
2. tsconfig 공통으로 뺄 것
