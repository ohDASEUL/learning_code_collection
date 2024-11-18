# JSX로 마크업 작성하기

- JSX는 JS를 확장한 문법으로, JS 파일을 HTML과 비슷하게 마크업을 작성할 수 있도록 해줌.

## 1. JSX: JS에 마크업 넣기

### 개요

- JSX는 React의 JavaScript 확장 문법
- HTML과 유사한 마크업을 JavaScript 코드 안에 직접 작성 가능

### 기존 웹 개발 방식

- HTML: 콘텐츠 마크업 담당
- CSS: 디자인과 스타일링 처리
- JavaScript: 로직 처리
- 세 가지 요소가 별도의 파일로 분리되어 관리됨

### React의 컴포넌트 기반 접근

- 렌더링 로직과 마크업을 단일 컴포넌트 내에서 통합 관리
- 연관된 코드를 하나의 파일에서 관리하여 유지보수성 향상
- 동적 콘텐츠 처리가 더욱 효율적

### 예시 코드

```jsx
// Sidebar.js
function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
}

// Form.js
function Form() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 2. HTML을 JSX로 변환하기

```html
<h1>Hedy Lamarr's Todos</h1>
<img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
<ul>
  <li>Invent new traffic lights</li>
  <li>Rehearse a movie scene</li>
  <li>Improve the spectrum technology</li>
</ul>
```

- 위 코드를 컴포넌트로 만들기

```js
export default function TodoList() {
  return (
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}
```

- 동작 안 하는 이유 : JSX는 HTML보다 더 엄격하고 몇 가지 규칙이 더 있기 때문.

## 3. JSX 규칙

### 1. 하나의 루트 엘리먼트로 반환하기

- 한 컴포넌트에서 여러 엘리먼트를 반환하려면, 하나의 부모 태그로 감싸주기

```jsx
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

- 마크업에 `<div>`를 추가하고 싶지 않다면 `<>` 와 `</>`로 대체할 수 있음

- 이 빈 태그를 Fragment라고 함

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

### 2. 모든 태그는 닫아주기

- JSX에서는 태그를 명시적으로 닫아야 함

```jsx
<>
  <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### 3. 대부분 camelCase로

- JSX는 JS로 바뀌고 JSX에서 작성된 어트리뷰트는 JS 객체의 key가 됨.
- 컴포넌트에서는 종종 어트리뷰트를 변수로 읽고 싶은 경우가 있음.
- 그러나 JS는 변수명에 제한이 있음
  - 예: 변수명에 대시를 포함하거나 class처럼 예약어 사용불가
    - React에서 HTML과 SVG의 어트리뷰트 대부분이 캐멀 케잇로 작성되는 이유
    - 예: stroke-width 대신 strokeWidth로 사용
    - class는 예약어이기 때문에, React에서는 DOM의 프로퍼티의 이름을 따서 className으로 대신 작성

```jsx
<img
  src="https://i.imgur.com/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  className="photo"
/>
```

(주의사항) `aria-*` , `data-*` 의 어트리뷰트는 HTML에서와 동일하게 대시를 사용하여 작성함.

## 4. 최종 코드

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```
