# 조건부 렌더링

## 1. 조건부로 JSX 변환하기

- 조건에 따라 다른 JSX를 반환히는 예시

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    // true일 경우 체크 표시(✅) 추가
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

// isPacked prop의 값에 따라 다른 JSX 반환
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

### 주요 특징

- React에서는 JavaScript의 조건문(if)을 사용해 조건부 렌더링 가능
- 조건에 따라 완전히 다른 JSX 트리 반환 가능

## 2. 조건부로 null을 사용해 아무것도 반환하지 않기

```jsx
function Item({ name, isPacked }) {
  // isPacked가 true인 항목은 화면에 표시되지 않음
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

### 주요 특징

- 컴포넌트가 아무것도 렌더링하지 않아야 할 때 null 반환 가능

## 3. 조건부로 JSX 포함시키기

- 컴포넌트에서 조건부 렌더링을 구현하는 3가지 주요 방법

### 삼항 조건 연산자(? : )

```jsx
// isPacked가 참이면 (?) name + ' ✔'을 렌더링하고, 그렇지 않으면 (:) name을 렌더링한다.
return <li className="item">{isPacked ? name + " ✅" : name}</li>;
```

### 논리 AND 연산자(&&)

```jsx
return (
  // isPacked이면 (&&) 체크 표시를 렌더링하고, 그렇지 않으면 아무것도 렌더링하지 않음
  <li className="item">
    {name} {isPacked && "✅"}
  </li>
);
```

- 주의: && 왼쪽에 숫자를 두면 0일 때 0이 렌더링될 수 있음
- 해결: 부울 조건으로 변환 (예: `messageCount > 0 && <p>New messages</p>`)

### 변수에 조건부로 JSX를 할당하기

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = <del>{name + " ✅"}</del>;
  }
  return <li className="item">{itemContent}</li>;
}
```

### 주요 특징

- 세 방법 모두 유효하며 상황에 따라 적절한 방법 선택
- 간단한 조건은 삼항 연산자나 && 사용
- 복잡한 조건은 변수 할당 방식이 더 명확할 수 있음
- JSX는 JavaScript 코드의 일부로 취급되어 변수나 함수처럼 다룰 수 있음
