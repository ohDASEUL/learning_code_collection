# 컴포넌트 import 및 export 하기

## 1. Root 컴포넌트

- Profile 컴포넌트와 Gallery 컴포넌트는 아래와 같이 렌더링 됨

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

- 이 예시들은 모두 App.js 라는 root 컴포넌트 파일에 존재함.
- 설정에 따라 root 컴포넌트가 다른 파일에 위치할 수도 있음.

## 2. 컴포넌트를 import 하거나 export 하는 방법

### 기본 절차

1. 컴포넌트용 새 JavaScript 파일 생성
2. 파일에서 컴포넌트 export(default 또는 named)
3. 필요한 곳에서 컴포넌트 import

### 예시 코드

- App.jsx(메인 파일)

```js
import Gallery from "@components/Gallery";

function App() {
  return <Gallery />;
}

export default App;
```

- Gallery.js(컴포넌트 파일)

```js
function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
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

### Export/Import 방식

1. Default Export/Import

- 파일당 하나의 기본 export만 가능

```jsx
// Export
export default function Button() {}

// Import
import Button from "./Button.js";
```

2. Named Export/Import

- 한 파일에서 여러 개의 export 가능

```jsx
// Export
export function Button() {}

// Import
import { Button } from "./Button.js";
```

### 주의사항

- 내부에서만 사용되는 컴포넌트는 export 하지않아도 됨
- 파일 확장자(.js)는 import 시 생략 가능
- import 경로는 ./로 시작(같은 폴더 내 파일 참조)

## 한 파일에서 여러 컴포넌트를 import 하거나 export 하는 방법

- named export 방식을 사용해서 Gallery.js 파일에서 Profile 컴포넌트를 export함.(default 키워드 사용x)

```js
export function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}
```

- `<Profile/>` 을 App 컴포넌트에서 렌더링

```js
export default function App() {
  return <Profile />;
}
```

- Gallery.js에는 default Gallery export랑 named Profile export라는 두 가지의 export가 존재함.
- App.js에서는 두 컴포넌트를 import 해서 사용함.

```js
import Gallery from "./Gallery.js";
import { Profile } from "./Gallery.js";

export default function App() {
  return <Profile />;
}
```

```js
export function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
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
