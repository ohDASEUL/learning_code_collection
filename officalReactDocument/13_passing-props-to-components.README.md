# 컴포넌트에 props 전달하기

## 개요

- props는 React 컴포넌트 간의 통신 수단
- 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달
- JavaScript의 모든 값 타입 전달 가능:
  - 문자열, 숫자
  - 객체, 배열
  - 함수 등

## 1. 친숙한 props

- JSX 태그에 전달하는 모든 속성값
- HTML 속성과 유사하게 작성
- 내장 컴포넌트와 사용자 정의 컴포넌트 모두에서 사용 가능

### 예시 코드

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return <Avatar />;
}
```

### 주요 특징

- 내장 컴포넌트 (`<img>` 등)는 미리 정의된 props 사용
- 사용자 정의 컴포넌트는 원하는 props를 자유롭게 정의 가능
- props는 읽기 전용으로, 컴포넌트 내에서 수정할 수 없음
- 부모 컴포넌트에서 자식 컴포넌트로 단방향 데이터 흐름 형성

## 2. 컴포넌트에 props 전달하기

- 아래 코드에서 Profile 컴포넌트는 자식 컴포넌트인 Avatar에 어떠한 props도 전달하지 않음

```jsx
export default function Profile() {
  return <Avatar />;
}
```

- 두 단계에 걸쳐 Avatar에 props를 전달할 수 있음

### 1단계 : 자식 컴포넌트에 props 전달하기

- Avatar에 몇몇 props 전달하기

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

- 이제 Avatar 컴포넌트 내 props를 읽을 수 있음

### 2단계 : 자식 컴포넌트 내부에서 props 읽기

- function Avatar 바로 뒤에 있는 {{ 와 }} 안에 그들의 이름인 person, size 등을 ,로 구분함으로써 읽을 수 있음
- 이렇게하면 Avatar 코드 내에서 변수를 사용하는 것처럼 사용할 수 있음

```jsx
function Avatar({ person, size }) {
  // person과 size는 이곳에서 사용가능
}
```

- Avatar에 렌더링을 위해 person과 size props를 사용하는 로직을 추가하면 완료됨.
- 이제 Avatar를 다른 props를 이용해 다양한 방식으로 렌더링하도록 구성할 수 있음

```jsx
import { getImageUrl } from "./utils.js";

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}
```

```jsx
export function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}
```

- props를 사용하면 부모 컴포넌트와 자식 컴포넌트를 독립적으로 생각할 수 있음.
- 예 : Avatar가 props를 어떻게 사용하는지 생각하는지 생각할 필요 없이 Profile의 person 또는 size props를 수정할 수 있음
- 마찬가지로 Profile을 보지 않고도 Avatar가 props를 사용하는 방식을 바꿀 수 있음

- props는 조절 가능한 손잡이
- props는 함수의 인수와 동일한 역할 수행
- props는 컴포넌트에 대한 유일한 인자
- React 컴포넌트 함수는 하나의 인자, 즉 props 객체를 받음

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

- 보통은 전체 props 자체를 필요로 하지는 않기에, 개별 props로 구조 분해 할당함.

(주의사항)

- props를 선언할 때 ( 및 ) 안에 { 및 } 쌍을 놓치지 말기(구조 분해 할당)

```jsx
function Avatar({ person, size }) {
  // ...
}
```

- 구조 분해 할당이라고 부르며 함수 매개변수의 속성과 동등함

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## 3. prop의 기본값 지정하기

- 값이 지정되지 않았을 때, prop에 기본값을 주길 원한다면, 변수 바로 뒤에 = 과 함께 기본값을 넣어 구조 분해 할당을 해줄 수 있음

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

- `<Avatar person={...}/>` 가 size prop이 없이 렌더링된다면 size는 100으로 설정됨
- 기본값은 size prop이 없거나 size={undefined}로 전달될 때 사용
- size= = {null} 또는 size = {0} 으로 전달된다면, 기본값은 사용되지 않음

## 4. JSX spread 문법으로 props 전달하기

- 가끔 props로 전달되는 값들이 비슷하거나 똑같아서 중복될 때가 있음

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

- Profile이 Avatar에서 하는 것처럼, 일부 컴포넌트는 그들의 모든 props를 자식 컴포넌트에 전달함

- props를 직접 사용하지 않기에 간결한 'spread' 문법을 사용하는 것이 합리적일 수 있음

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

- 이렇게하면 Profile의 모든 props를 각각의 이름을 나열하지 않고 Avatar로 전달함
- 단, spread 문법을 제한적으로 사용할 것.
- 다른 모든 컴포넌트에 이 구문을 사용한다면 문제가 있음
- 이는 종종 컴포넌트들을 분할해 자식을 JSX로 전달해야 함을 나타냄

## 5. 자식을 JSX로 전달하기

- 내장된 브라우저 태그는 중첩하는 것이 일반적

```jsx
<div>
  <img />
</div>
```

- 같은 방식으로 자체 컴포넌트를 중첩하고 싶을 때

```jsx
<Card>
  <Avatar />
</Card>
```

- JSX 태그 내에 콘텐츠를 중첩하면, 부모 컴포넌트는 해당 콘텐츠를 children이라는 prop으로 받음
- 아래의 Card 컴포넌트는 `<Avatar />`로 설정된 children prop을 받아 이를 래퍼 div에 렌더링 할 것

```jsx
import Avatar from "./Avatar.js";

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}
```

```jsx
import { getImageUrl } from "./utils.js";

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

```jsx
export function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}
```

- children prop을 가지고 있는 컴포넌트는 부모 컴포넌트가 임의의 JSX로 “채울” 수 있는 “구멍”이 있는 것으로 생각할 수 있음
- 패널, 그리드 등의 시각적 래퍼에 종종 children prop를 사용

## 6. 시간에 따라 props가 변하는 방식

- 아래 Clock 컴포넌트는 부모 컴포넌트로부터 color와 time이라는 두 가지 props를 받음.

```jsx
export default function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
}
```

- 위 예시에서 컴포넌트가 다른 props를 받을 수 있음을 보여줌
- Props는 항상 고정되어 있지 않음.
- time prop은 매초 변경되고, color prop은 다른 색상을 선택하면 변경됨.
- Props는 컴포넌트의 데이터를 처음 반영하는 것이 아니라 모든 시점에 반영함.

- but. props는 컴퓨터 과학에서 "변경할 수 없다"라는 의미의 불변성을 가지고 있음
- 컴포넌트가 props를 변경해야하는 경우(예 : 사용자의 상호작용, 새로운 데이터에 대한 응답), 부모 컴포넌트에 다른 props, 즉 새로운 객체를 전달하도록 "요청"해야 함
- 그러면 이전의 props는 버려지고, 결국 JS 엔진은 기존 props가 차지한 메모리를 회수하게 됨

- (경고) "props 변경"을 시도하지 말기
