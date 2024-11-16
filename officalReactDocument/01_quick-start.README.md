# 빠르게 시작하기

## 1. 컴포넌트 생성 및 중첩하기

### 컴포넌트?

- React 앱의 기본 구성 단위
- 독립적인 UI 조각으로, 자체 로직과 외관을 가짐
- 버튼부터 전체 페이지까지 다양한 크기로 구성 가능

### 컴포넌트 작성 규칙

- React 컴포넌트는 마크업을 반환하는 JavaScript 함수
- 컴포넌트 이름은 반드시 대문자로 시작 (MyButton)
- HTML 태그는 소문자로 시작

### 기본 문법

```js
function MyButton() {
  return <button>I'm a button</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

### 주요 특징

- 컴포넌트는 다른 컴포넌트 안에 중첩 가능
- export default를 사용하여 파일의 주요 컴포넌트 지정

## 2. JSX로 마크업 작성하기

### 기본 규칙

- 모든 태그는 명시적으로 닫아야 함 (예: <br />)
- 컴포넌트는 반드시 단일 JSX 태그를 반환해야 함

### 여러 요소 반환하기

- 다수의 JSX 태그는 반드시 부모 요소로 감싸야 함
  부모 요소 옵션:

- `<div>...</div>`
- Fragment: `<>...</>`

- 예시 코드

```js
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
```

- HTML을 JSX로 변환할 때는 ![온라인 변환기](https://transform.tools/html-to-jsx) 사용하면 편리함.

## 3. 스타일 추가하기

### CSS 클래스 적용하기

- React에서는 className 속성을 사용
- HTML의 class 속성과 동일한 기능

### 예시 코드

`<img className="avatar" />`

```css
.avatar {
  border-radius: 50%;
}
```

### CSS 파일 추가

- React는 특정 CSS 파일 추가 방식을 강제하지 않음
- 일반적으로 HTML의 <link> 태그를 통해 추가

## 4. 데이터 표시하기

### JSX에서 JavaScript 사용하기

- 중괄호 {}를 사용하여 JavaScript 표현식 삽입 가능
- 변수, 객체 속성, 함수 등 JavaScript 표현식 사용 가능

### 데이터 표시 방법

1. 텍스트로 표시

```js
return <h1>{user.name}</h1>;
```

2. 속성(어트리뷰트)으로 전달

```js
return <img className="avatar" src={user.imageUrl} />;
```

3. 인라인 스타일 적용

- style 속성은 JavaScript 객체를 받음
- 객체 속성은 camelCase로 작성

### 종합 에시

```js
const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}
```

## 5. 조건부 렌더링

### if문

- 컴포넌트 내에서 일반적인 if 문으로 조건부 렌더링 가능

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

### 조건부 삼항 연산자

- JSX 내부에서 직접 조건부 렌더링 가능
- 더 간결한 문법 제공

```js
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

### && 연산자

- 조건이 참일 때만 요소를 렌더링
- 주로 조건부 속성이나 단일 조건 렌더링에 사용

```js
<div> {isLoggedIn && <AdminPanel />}</div>
```

### 사용 시점

- if 문: 복잡한 조건 로직이 필요할 때
- 삼항 연산자: 간단한 조건부 렌더링에 적합
- && 연산자: 단일 조건으로 요소를 보여주거나 숨길 때

## 6. 리스트 렌더링

### 기본 개념

- JavaScript의 배열 메서드(map(), for 등)를 사용하여 리스트 렌더링
- 각 리스트 아이템은 고유한 key 속성을 가져야 함

### key 속성

- 목적: React가 각 항목을 식별하고 DOM 업데이트를 최적화하는 데 사용
- 형제 요소 간에 고유한 값이어야 함
- 문자열 또는 숫자 사용

### 기본 예시

```js
const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];
```

### 조건부 스타일링을 포함한 고급 예시

```js
const products = [
  { title: "Cabbage", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? "magenta" : "darkgreen",
      }}
    >
      {product.title}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
```

## 7. 이벤트에 응답하기

- 컴포넌트 내부에 이벤트 핸들러 함수를 선언해 이벤트에 응답 가능.

```js
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

- (주의사항) : 이벤트 핸들러 함수를 호출하지 않고 전달만 할 것.

## 8. 화면 업데이트하기

### State 개념

- 컴포넌트가 데이터를 "기억"하고 변경할 수 있게 해주는 기능
- useState Hook을 통해 구현
- 각 컴포넌트는 독립적인 state를 가짐

### state 사용하기

1. React에서 useState 가져오기

```jsx
import { useState } from "react";
```

2. State 변수 선언하기

```js
const [count, setCount] = useState(0);
```

- count: 현재 state 값
- setCount: state 업데이트 함수
- useState(0): 초기값 설정

### 예시: 클릭 카운터

```js
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

### 독립적인 State 예시

```js
import { useState } from "react";

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

### 주요 특징

- State가 변경되면 React는 컴포넌트를 자동으로 다시 렌더링
- 같은 컴포넌트의 여러 인스턴스는 각각 독립적인 state를 가짐
- State 업데이트는 해당 컴포넌트에만 영향을 미침

## 9. Hook 사용하기

### Hook 기본 규칙

- use로 시작하는 특별한 함수
- 반드시 컴포넌트나 다른 Hook의 최상위에서만 호출 가능

### State 공유 방식

1. 독립적인 State

```jsx
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

- 각 버튼이 독립적인 state를 가짐
- 개별적으로 업데이트됨

2. State 끌어올리기

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

### State 공유 과정

1. state를 공통 부모 컴포넌트로 이동
2. props를 통해 state와 이벤트 핸들러 전달
3. 자식 컴포넌트에서 props로 전달받은 값과 함수 사용

### 주요 개념

- Props: 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법
- State 끌어올리기: 여러 컴포넌트 간 state 공유를 위해 공통 부모로 state를 이동하는 패턴
