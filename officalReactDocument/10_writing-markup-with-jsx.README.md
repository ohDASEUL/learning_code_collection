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

1. 컴포넌트를 추가할 JS 파일 생성
2. 새로 만든 파일에서 함수 컴포넌트를 export함.
   (default 또는 named export 방식을 사용)
3. 컴포넌트를 사용할 파일에서 import 함.
   (적절한 방식을 선택해서 default 또는 named로 import 함)

App.js

- Default 방식으로 Gallery를 Gallery.js로부터 import
- Root App 컴포넌트를 default 방식으로 export함.

```js
import Gallery from "./Gallery.js";

export default function App() {
  return <Gallery />;
}
```

Gallery.js

- Profile 컴포넌트를 정의하고 해당 파일에서만 사용되기에 export 되지 않음
- Default 방식으로 Gallery 컴포넌트를 export함

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
