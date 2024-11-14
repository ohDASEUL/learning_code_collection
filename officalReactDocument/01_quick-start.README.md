# 빠르게 시작하기

## 1. 컴포넌트 생성 및 중첩하기

- React 앱은 컴포넌트로 구성됨.
  - 컴포넌트 : 고유한 로직, 모양을 가진 UI의 일부
  - 컴포넌트는 버튼만큼 작을 수도 있고, 전체 페이지만큼 클 수도 있음.
  - React 컴포넌트는 마크업을 반환하는 JS 함수

```jsx
function MyButton() {
  return <button>I'm a button</button>;
}
```

- `MyButton` 을 선언했으므로 다른 컴포넌트 안에 중첩 가능

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

- React 컴포넌트 이름은 항상 대문자(`<MyButton />`)로 시작해야 하고, HTML 태그는 소문자로 시작해야 함

```jsx
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

- export default : 파일의 기본 컴포넌트를 저장함.

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

    function MyButton() {
      return <button>I'm a button</button>;
    }

    let App = function MyApp() {
      return (
        <div>
          <h1>Welcome to my app</h1>
          <MyButton />
        </div>
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

## 2. JSX로 마크업 작성하기

- `<br/>` 같이 태그를 닫아야 함
- 컴포넌트 여러 개의 JSX 태그를 반환할 수 없음.

  - `<div>...</div>` 또는 빈 `<>...</>` 래퍼와 같이 공유되는 부모로 감싸야 함

  ```jsx
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

- JSX로 변환할 HTML이 많은 경우 ![온라인 변환기](https://transform.tools/html-to-jsx) 사용하면 편리함.

## 3. 스타일 추가하기

- className 으로 CSS 클래스를 지정함.
- HTML의 class 어트리뷰트와 동일 방식으로 동작.

`<img className="avatar" />`

```css
.avatar {
  border-radius: 50%;
}
```

- React는 CSS 파일을 추가하는 방법을 규정하진 않지만 보통 HTML에 `<link>` 태그를 추가함

## 4. 데이터 표시하기

- JSX를 사용하면 JS에 마크업을 넣을 수 있음
- {}를 사용하면 코드에서 일부 변수를 삽입해 사용자에게 표시가 가능하게 JS로 "이스케이프 백(Escape Back)"
- 예시 : user.name 표시

```jsx
return <h1>{user.name}</h1>;
```

- JSX 어트리뷰트에서 {}를 사용해 "JS로 이스케이프(Escape Into JavaScript)" 할 수 있음
- 예 : className="avatar"는 "avatar" 문자열을 CSS로 전달하지만 src={user.imageUrl}는 자바스크립트 user.imageUrl 변수 값을 읽은 다음 해당 값을 src 어트리뷰트로 전달

```jsx
return <img className="avatar" src={user.imageUrl} />;
```

- JSX 중괄호 안에 문자열 연결과 같이 더 복잡한 표현식을 넣을 수도 있음
  - 아래 예시에서는 style={ } JSX 중괄호 안에 있는 일반 {} 객체임.
  - 스타일이 JS 변수에 의존하는 경우 style 어트리뷰트 사용 가능.

```jsx
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

    const user = {
      name: "Hedy Lamarr",
      imageUrl: "https://placehold.co/90x90",
      imageSize: 90,
    };

    let App = function Profile() {
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

## 5. 조건부 렌더링

### if문

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

### 조건부 삼항 연산자 (JSX 내부에서 동작)

```jsx
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

### && 연산자

- 어트리뷰트를 조건부로 지정할 때 동작함.

```jsx
<div> {isLoggedIn && <AdminPanel />}</div>
```

## 6. 리스트 렌더링

- 컴포넌트 리스트를 렌더링하기 위해서는 for문 및 map() 함수와 같은 JS 기능 사용함.
- 예 : 여러 제품이 있다고 가정

```jsx
const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];
```

- 컴포넌트 내에서 map() 함수를 사용해 제품 배열을 `<li>` 항목 배열로 변환

```jsx
const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
));

return <ul>{listItems}</ul>;
```

- `<li>` 에 key 어트리뷰트가 있는 것을 주목할 것
- 목록의 각 항목에 대해, 형제 항목 사이에서 해당 항목을 고유하게 식별하는 문자열 또는 숫자를 전달해야 함.
- React는 나중에 항목을 삽입, 삭제 또는 재정렬할 때 어떤 일이 일어났는지 알기 위해 key를 사용함.

```jsx
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

    const products = [
      { title: "Cabbage", isFruit: false, id: 1 },
      { title: "Garlic", isFruit: false, id: 2 },
      { title: "Apple", isFruit: true, id: 3 },
    ];

    let App = function ShoppingList() {
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

## 7. 이벤트에 응답하기

- 컴포넌트 내부에 이벤트 핸들러 함수를 선언해 이벤트에 응답 가능.

```jsx
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

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
}
```

- useState로 현재 state(count)와 이를 업데이트할 수 있는 함수(setCount)를 얻을 수 있음
- 버튼이 처음 표시 될 때는 useState()에 0을 전달했기에 count가 0이 됨.
- state를 변경하고 싶다면 setCount()를 실행하고 새 값 전달하기.

```jsx
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

```jsx
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
    import { useState } from "react";

    let App = function MyApp() {
      return (
        <div>
          <h1>Counters that update separately</h1>
          <MyButton />
          <MyButton />
        </div>
      );
    };

    function MyButton() {
      const [count, setCount] = useState(0);

      function handleClick() {
        setCount(count + 1);
      }

      return <button onClick={handleClick}>Clicked {count} times</button>;
    }

    const root = createRoot(document.getElementById("root"));
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  </script>
</html>
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

```jsx
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
```

- 부모 컴포넌트에서 전달한 props를 읽도록 MyButton을 변경함.

```jsx
function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

- 버튼을 클릭하면 onClick 핸들러가 실행
- 각 버튼의 onClick prop는 MyApp 내부의 handleClick 함수로 설정되었으므로 그 안에 있는 코드가 실행됨
- setCount(count + 1)를 실행하여 count state 변수를 증가시킴
- 새로운 count 값은 각 버튼에 prop로 전달되므로 모든 버튼에는 새로운 값이 표시되는데 이를 "state 끌어올리기" 라고 함.
  - state를 위로 이동함으로써 컴포넌트 간에 state를 공유하게 됨.

```jsx
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
    import { useState } from "react";

    let App = function MyApp() {
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
    };

    function MyButton({ count, onClick }) {
      return <button onClick={onClick}>Clicked {count} times</button>;
    }

    const root = createRoot(document.getElementById("root"));
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  </script>
</html>
```