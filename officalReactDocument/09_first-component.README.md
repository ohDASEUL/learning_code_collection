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

- Profile 컴포넌트를 다른 컴포넌트 안에 중첩 가능함.

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

### 브라우저에 표시되는 내용

- 대소문자 차이에 주목.
- `<section>`은 소문자이므로 React는 HTML태그를 가리킨다고 이해
- `<Profile />`은 대문자 p로 시작하므로 React는 Profile이라는 컴포넌트를 사용하고자 한다고 이해
- Profile은 더 많은 `<img/>`가 포함되어 브라우저에 표시되는 내용은 다음과 같음

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### 컴포넌트 중첩 및 구성

- 컴포넌트는 일반 JS 함수이므로 같은 파일에 여러 컴포넌트를 포함할 수 있음
- 컴포넌트가 상대적으로 작거나 서로 밀접하게 관련돼 있을 때 편리함.
- Profile 컴포넌트는 Gallery 안에서 렌더링되기에(여러 번) Gallery는 각 Profile을 "자식"으로 렌더링하는 부모 컴포넌트라고 말할 수 있음.
- 컴포넌트를 한 번 정의한 다음 원하는 곳에서 원하는 만큼 여러 번 사용가능한 점이 React의 마법.

(주의사항)

- 컴포넌트는 다른 컴포넌트를 렌더링할 수 있지만, 그 정의를 중첩해서는 안 됨.

```js
export default function Gallery() {
  // 🔴 절대 컴포넌트 안에 다른 컴포넌트를 정의하면 안 됨
  function Profile() {
    // ...
  }
  // ...
}
```

- 최상위 레벨에서 컴포넌트 정의해야함.

```js
export default function Gallery() {
  // ...
}

// ✅ 최상위 레벨에서 컴포넌트를 선언
function Profile() {
  // ...
}
```

- 자식 컴포넌트에 부모 컴포넌트의 일부 데이터가 필요한 경우, props로 전달
