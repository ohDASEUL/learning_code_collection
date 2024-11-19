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

### 1단계 : 자식 컴포넌트에 props 전달하기

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

### 2단계 : 자식 컴포넌트 내부에서 props 읽기

- 구조 분해 할당을 통해 전달받은 props를 컴포넌트 내에서 사용

```jsx
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
```

### 주요 특징

- props를 통해 부모-자식 컴포넌트를 독립적으로 관리 가능
- props는 컴포넌트의 유일한 매개변수
- 일반적으로 구조 분해 할당으로 props를 개별적으로 받아서 사용
- 구조 분해 할당 시 중괄호 { } 사용을 잊지 말 것

## 3. prop의 기본값 지정하기

### props의 기본값을 설정하는 핵심 내용

- 구조 분해 할당 시 = 을 사용해 기본값 지정 가능

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

### 주요 특징

- prop이 전달되지 않거나 undefined일 때만 기본값 적용
- null이나 0 같은 명시적 값이 전달되면 기본값 무시됨
- 컴포넌트를 더 유연하게 사용할 수 있게 해줌

## 4. JSX spread 문법으로 props 전달하기

- 가끔 props로 전달되는 값들이 비슷하거나 똑같아서 중복될 때가 있음

```jsx
// 일반적인 방식 - props를 각각 전달
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

// spread 문법 사용 - 모든 props를 한번에 전달
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

### 주요 특징

- spread 문법(...props)을 사용하면 모든 props를 한번에 전달 가능
- 부모 컴포넌트가 props를 직접 사용하지 않고 자식에게 전달만 할 때 유용
- 하지만 과도한 사용은 피해야 함
- 많은 컴포넌트에서 spread 문법 사용이 필요하다면, 컴포넌트 구조를 재검토해볼 필요가 있음

## 5. 자식을 JSX로 전달하기

```jsx
// 브라우저 태그 중첩
<div>
  <img />
</div>

// 커스텀 컴포넌트 중첩
<Card>
  <Avatar />
</Card>

// children prop 사용 예시
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

### 주요 특징

- 중첩된 JSX 콘텐츠는 children이라는 특별한 prop으로 전달됨
- children prop을 사용하면 컴포넌트에 "구멍"을 만들어 부모가 원하는 내용을 채울 수 있음
- 주로 패널, 그리드 같은 레이아웃 컴포넌트에서 사용됨
- 컴포넌트의 재사용성과 유연성을 높이는 방법

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
