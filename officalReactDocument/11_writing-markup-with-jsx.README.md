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

- 위 코드를 컴포넌트로 만들기(작동 안 함)

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

### 단일 루트 엘리먼트

- 컴포넌트는 반드시 하나의 부모 태그로 감싸진 엘리먼트를 반환해야 함
- 부모 태그로는 `<div>` 또는 `Fragment(<>)`를 사용
- Fragment를 사용하면 불필요한 DOM 노드 추가를 방지할 수 있음

### 태그 닫기 규칙

- 모든 JSX 태그는 명시적으로 닫아야 함
- 자체 닫는 태그도 반드시 `/>`로 닫아야 함(예: `<img/>`, `<br/>`)

### 명명 규칙

- JSX 어트리뷰트는 camelCase로 작성
- HTML과 다른 주요 속성들 :
  - class → className
  - stroke-width → strokeWidth
  - font-size → fontSize
- 예외: `aria-*`와 `data-*` 어트리뷰트는 하이픈 사용

### 예시 코드

```jsx
function TodoList() {
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

export default TodoList;
```

### Fragment 사용 예시

```jsx
// div 사용
function Profile() {
  return (
    <div>
      <Avatar />
      <Biography />
    </div>
  );
}

// Fragment 사용
function Profile() {
  return (
    <>
      <Avatar />
      <Biography />
    </>
  );
}
```
