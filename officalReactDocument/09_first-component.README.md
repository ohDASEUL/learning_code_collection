# 첫 번째 컴포넌트

## 1. 컴포넌트 : UI 구성 요소

### HTML과 React 컴포넌트 비교

- 기본 HTML 구조

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

- React 컴포넌트 구조

```html
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

### 주요 특징

- UI를 재사용 가능한 독립적인 조각으로 분할
- HTML 태그처럼 컴포넌트를 조합하여 페이지 구성
- 컴포넌트의 중첩과 조합으로 복잡한 UI 구현 가능

### 장점

- 재사용성 : 동일한 컴포넌트를 여러 곳에서 사용
- 유지보수 : 독립적인 단위로 관리 가능
- 계층 구조 : HTML과 유사한 직관적인 구조화 가능

## 2. 컴포넌트 정의하기

### 기본 컴포넌트 구조

```js
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
```

### 컴포넌트 정의 3단계

1. 컴포넌트 내보내기

- export default 사용
- JavaScript 표준 문법
- 다른 파일에서 import 가능하게 함

2. 함수 정의

- JavaScript 함수로 정의
- 컴포넌트 이름은 반드시 대문자로 시작
  - 예: function Profile() { }

3. 마크업 추가

- JSX 반환
- 한 줄 작성:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

- 여러 줄 작성(괄호 필수)

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

### 주의사항

- 컴포넌트 이름은 항상 대문자로 시작
- 여러 줄의 JSX를 반환할 때는 반드시 괄호로 감싸기
- 괄호 없이 새 줄에 JSX를 작성하면 무시됨

## 3. 컴포넌트 사용하기

### 기본 사용 예시

```js
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

### 컴포넌트 렌더링 결과

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### 주요 규칙

1. 대소문자 구분

- 소문자: HTML 태그(`<section>`)
- 대문자: React 컴포넌트(`<Profile/>`)

2. 컴포넌트 정의 위치

- ❌ 잘못된 예시 (중첩된 정의)

```js
export default function Gallery() {
  // 🔴 절대 컴포넌트 안에 다른 컴포넌트를 정의하면 안 됨
  function Profile() {
    // ...
  }
  // ...
}
```

- ✅ 올바른 예시 (최상위 레벨 정의)

```js
export default function Gallery() {
  // ...
}

// ✅ 최상위 레벨에서 컴포넌트를 선언
function Profile() {
  // ...
}
```

### 특징

- 컴포넌트는 여러 번 재사용 가능
- 부모-자식 관계로 구성 가능
- 한 파일에 여러 컴포넌트 정의 가능
- Props를 통해 부모에서 자식으로 데이터 전달 가능
