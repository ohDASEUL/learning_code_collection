# 첫 번째 컴포넌트

## 1. 컴포넌트 : UI 구성 요소

- 웹에서는 HTML을 통해 풍부한 구조의 문서 제작 가능.

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

- React를 사용하면 앱의 재사용 가능한 UI 요소인 사용자 정의 "컴포넌트"로 결합 가능.
- HTML 태그와 마찬가지로 컴포넌트를 작성, 순서 지정 및 중첩하여 전체 페이지를 디자인할 수 있음

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

## 2. 컴포넌트 정의하기

- React 컴포넌트는 마크업으로 뿌릴 수 있는 JS 함수

```jsx
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
```

### 1단계 : 컴포넌트 내보내기

- `export default` 접두사는 표준 JS 구문(React에만 해당되지 않음)
  - 다른 파일에서 가져올 수 있도록 파일에 주요 기능 표시 가능.

### 2단계 : 함수 정의하기

- `function Profile() { }` 을 사용하면 Profile이라는 이름의 JS 함수 정의 가능

(주의사항) React 컴포넌트는 일반 JS 함수지만, 이름은 대문자로 시작해야함.

### 3단계 : 마크업 추가하기

- 이 컴포넌트는 src 및 alt 속성을 가진 `<img/>` 태그를 반환
- <img /> 는 JSX임
- 반환문은 이 컴포넌트에서처럼 한 줄에 모두 작성 가능함.

```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

- 그러나 마크업이 모두 return 키워드와 같은 라인에 있지 않은 경우에는 다음과 같이 괄호로 묶어야 함.

```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

- (참고사항) 위 파일을 브라우저에서 직접 실행하려면 html 에 다음과 같이 작성

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script
    async
    src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"
  ></script>

  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react?dev",
        "react-dom/client": "https://esm.sh/react-dom/client?dev"
      }
    }
  </script>

  <script type="text/babel" data-type="module">
    import React, { StrictMode } from "react";
    import { createRoot } from "react-dom/client";

    let App = function Profile() {
      return <img src="https://placehold.co/200x200" alt="Katherine Johnson" />;
    };

    const root = createRoot(document.getElementById("root"));
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  </script>
</html>
```

(주의사항) ()가 없으면 return 뒷 라인에 있는 모든 코드가 무시됨.

## 3. 컴포넌트 사용하기

- Profile 컴포넌트를 다른 컴포넌트 안에 중첩 가능함.

```jsx
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

- (참고사항) 위 파일을 브라우저에서 직접 실행하려면 html 에 다음과 같이 작성

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script
    async
    src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"
  ></script>

  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react?dev",
        "react-dom/client": "https://esm.sh/react-dom/client?dev"
      }
    }
  </script>

  <script type="text/babel" data-type="module">
    import React, { StrictMode } from "react";
    import { createRoot } from "react-dom/client";

    function Profile() {
      return <img src="https://placehold.co/90x90" alt="Katherine Johnson" />;
    }

    let App = function Gallery() {
      return (
        <section>
          <h1>Amazing scientists</h1>
          <Profile />
          <Profile />
          <Profile />
        </section>
      );
    };

    const root = createRoot(document.getElementById("root"));
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  </script>
</html>
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

```jsx
export default function Gallery() {
  // 🔴 절대 컴포넌트 안에 다른 컴포넌트를 정의하면 안 됨
  function Profile() {
    // ...
  }
  // ...
}
```

- 최상위 레벨에서 컴포넌트 정의해야함.

```jsx
export default function Gallery() {
  // ...
}

// ✅ 최상위 레벨에서 컴포넌트를 선언
function Profile() {
  // ...
}
```

- 자식 컴포넌트에 부모 컴포넌트의 일부 데이터가 필요한 경우, props로 전달