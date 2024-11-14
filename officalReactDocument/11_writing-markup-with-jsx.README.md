# JSX로 마크업 작성하기

- JSX는 JS를 확장한 문법으로, JS 파일을 HTML과 비슷하게 마크업을 작성할 수 있도록 해줌.

## 1. JSX: JS에 마크업 넣기

- JSX는 React에서 사용하는 JS 확장 문법으로, HTML과 유사한 마크업을 JS안에 작성할 수 있게 해줌

### 기존 웹 개발

- HTML: 내용
- CSS: 디자인
- JavaScript: 로직을 분리해서 관리

![HTML](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_html.dark.png&w=384&q=75)

![JS](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_js.dark.png&w=384&q=75)

### React 접근 방식

- 컴포넌트 내에서 렌더링 로직과 마크업을 함께 관리
- 관련 있는 코드끼리 묶어 유지보수가 쉬어짐
- 동적 콘텐츠 처리가 용이함.

![Sidebar.js](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_sidebar.dark.png&w=384&q=75)

![Form.js](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_form.dark.png&w=384&q=75)

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
