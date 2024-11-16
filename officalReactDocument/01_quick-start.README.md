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

- JSX를 사용하면 JS에 마크업을 넣을 수 있음
- {}를 사용하면 코드에서 일부 변수를 삽입해 사용자에게 표시가 가능하게 JS로 "이스케이프 백(Escape Back)"
- 예시 : user.name 표시

```js
return <h1>{user.name}</h1>;
```

- JSX 어트리뷰트에서 {}를 사용해 "JS로 이스케이프(Escape Into JavaScript)" 할 수 있음
- 예 : className="avatar"는 "avatar" 문자열을 CSS로 전달하지만 src={user.imageUrl}는 자바스크립트 user.imageUrl 변수 값을 읽은 다음 해당 값을 src 어트리뷰트로 전달

```js
return <img className="avatar" src={user.imageUrl} />;
```

- JSX 중괄호 안에 문자열 연결과 같이 더 복잡한 표현식을 넣을 수도 있음
  - 아래 예시에서는 style={ } JSX 중괄호 안에 있는 일반 {} 객체임.
  - 스타일이 JS 변수에 의존하는 경우 style 어트리뷰트 사용 가능.

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

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

### 조건부 삼항 연산자 (JSX 내부에서 동작)

```js
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

### && 연산자

- 어트리뷰트를 조건부로 지정할 때 동작함.

```js
<div> {isLoggedIn && <AdminPanel />}</div>
```

## 6. 리스트 렌더링

- 컴포넌트 리스트를 렌더링하기 위해서는 for문 및 map() 함수와 같은 JS 기능 사용함.
- 예 : 여러 제품이 있다고 가정

```js
const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];
```

- 컴포넌트 내에서 map() 함수를 사용해 제품 배열을 `<li>` 항목 배열로 변환

```js
const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
));

return <ul>{listItems}</ul>;
```

- `<li>` 에 key 어트리뷰트가 있는 것을 주목할 것
- 목록의 각 항목에 대해, 형제 항목 사이에서 해당 항목을 고유하게 식별하는 문자열 또는 숫자를 전달해야 함.
- React는 나중에 항목을 삽입, 삭제 또는 재정렬할 때 어떤 일이 일어났는지 알기 위해 key를 사용함.

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

- 컴포넌트가 특정 정보를 "기억" 하면서 표시하기를 원하는 경우가 종종 있음
  - 예 : 버튼이 클릭된 횟수를 세고 싶을 때는 컴포넌트에 state를 추가하면 됨

1. React에서 useState 가져오기
   > import { useState } from 'react';
2. 컴포넌트 내부에 state 변수 선언하기

```js
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
}
```

- useState로 현재 state(count)와 이를 업데이트할 수 있는 함수(setCount)를 얻을 수 있음
- 버튼이 처음 표시 될 때는 useState()에 0을 전달했기에 count가 0이 됨.
- state를 변경하고 싶다면 setCount()를 실행하고 새 값 전달하기.

```js
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

- React가 컴포넌트 함수를 다시 호출함.
- 다음은 count가 1이 되고, 그 다음에는 2 .. 이런 방식
  - 같은 컴포넌트를 여러 번 렌더링하면 각각의 컴포넌트는 고유한 state를 얻게 됨.
  - 각 버튼이 고유한 count state를 "기억"하고 다른 버튼에 영향을 주지 않는 방식에 주목할 것.

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

## 9. Hook 사용하기

- Hook : use로 시작하는 함수
- 컴포넌트(또는 다른 Hook)의 상단에서만 Hook을 호출할 수 있음.

### 컴포넌트 간에 데이터 공유하기

- 이전 예시에서는 각각의 MyButton에 독립적인 count가 있었고, 각 버튼을 클릭하면 클릭하면 버튼의 count만 변경되었음.

![이전MyButton-1](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child.dark.png&w=640&q=75)

처음에 각 MyButton의 count State는 0

![이전MyButton-2](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child_clicked.dark.png&w=640&q=75)

첫 번째 MyButton이 count를 1로 업데이트 함.

---

- but. 데이터를 공유하고 항상 함께 업데이트하기 위한 컴포넌트가 필요한 경우가 많음.
- 두 MyButton 컴포넌트가 동일한 count를 표시하고 함께 업데이트하려면, state를 개별 버튼에서 모든 버튼이 포함된 가장 가까운 컴포넌트로 “위쪽”으로 이동해야 함.

![MyApp-1](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent.dark.png&w=640&q=75)

처음에 MyApp의 count state는 0이며 두 자식에게 모두 전달 됨.

![MyApp-2](https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent_clicked.dark.png&w=640&q=75)

클릭 시 MyApp은 count state를 1로 업데이트하고 두 자식에게 전달함.

---

- 이제 두 버튼 중 하나를 클릭하면 MyApp의 count가 변경되어 MyButton의 카운트가 모두 변경됨.

```js
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

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

- 그 다음 공유된 클릭 핸들러와 함께 MyApp에서 각 MyButton으로 state를 전달함.
- JSX {} 를 사용해 MyButton에 정보를 전달할 수 있음
- 이렇게 전달한 정보는 props 라고 함.
- 이제 MyApp 컴포넌트는 count state와 handleClick 이벤트 핸들러를 포함하며, 이 두 가지를 각 버튼에 props로 전달

```js
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
```

- 부모 컴포넌트에서 전달한 props를 읽도록 MyButton을 변경함.

```js
function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

- 버튼을 클릭하면 onClick 핸들러가 실행
- 각 버튼의 onClick prop는 MyApp 내부의 handleClick 함수로 설정되었으므로 그 안에 있는 코드가 실행됨
- setCount(count + 1)를 실행하여 count state 변수를 증가시킴
- 새로운 count 값은 각 버튼에 prop로 전달되므로 모든 버튼에는 새로운 값이 표시되는데 이를 "state 끌어올리기" 라고 함.
  - state를 위로 이동함으로써 컴포넌트 간에 state를 공유하게 됨.

```js
import { useState } from "react";

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
