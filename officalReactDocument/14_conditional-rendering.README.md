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

- 부모 컴포넌트 JSX에 컴포넌트를 조건부로 포함하거나 제외할 수 있음.
- 이전 예시에서는 어떤 항목(있는 경우)을 제어했음
- 컴포넌트가 JSX 트리를 반환함
- 렌더링된 출력에서 이미 일부 중복이 있을 수도 있음

```JSX
<li className="item">{name} ✅</li>
```

- 위 코드는 아래 코드랑 비슷함.

```jsx
<li className="item">{name}</li>
```

- 두 조건부 분기가 모두 <li className="item">...</li>를 반환

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

- 중복코드가 나쁘지는 않지만 코드를 유지 보수하기 더 어렵게 만들어 조건부로 약간의 JSXㄹ르 포함해 코드를 더 DRY(덜 반복적이게) 만들 수 있음

### 삼항 조건 연산자(? : )

```jsx
// isPacked가 참이면 (?) name + ' ✔'을 렌더링하고, 그렇지 않으면 (:) name을 렌더링한다.
return <li className="item">{isPacked ? name + " ✅" : name}</li>;
```

- `<del>`과 같은 다른 HTML 태그로 줄바꿈해서 삭제
- 더 많은 JSX를 중첩하기 쉽도록 새로운 줄과 괄호를 추가할 수 있음

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">{isPacked ? <del>{name + " ✅"}</del> : name}</li>
  );
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

- React에서 마크업은 코드의 일부이므로 변수 및 함수와 같은 도구를 사용하여 복잡한 식을 정리할 수 있음

### 논리 AND 연산자(&&)

- React 컴포넌트에서는 조건이 참일 때 일부 JSX를 렌더링하거나 그렇지 않으면 아무것도 렌더링하지 않을 때를 나타내는 경우가 많음
- 다음과 같이 &&를 사용하면 isPacked가 true인 경우에만 조건부로 체크 표시를 렌더링할 수 있음

```jsx
return (
  // isPacked이면 (&&) 체크 표시를 렌더링하고, 그렇지 않으면 아무것도 렌더링하지 않음
  <li className="item">
    {name} {isPacked && "✅"}
  </li>
);
```

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✅"}
    </li>
  );
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

- JavaScript && 표현식은 왼쪽(조건)이 true이면 오른쪽(체크 표시)의 값을 반환
- but. 조건이 false이면 전체 표현 식이 false
- React는 false를 null 또는 undefined처럼 JSX 트리의 “구멍”으로 간주하고 그 자리에 아무것도 렌더링하지 않음

(주의사항) &&의 왼쪽에 숫자 두지 말기

- 조건을 테스트하기 위해 JavaScript는 자동으로 왼쪽을 부울로 변환

  - 그러나 왼쪽이 0이면 전체 식이 (0)을 얻게 되고, React는 아무것도 아닌 0을 렌더링할 것

- 예 : `messageCount && <p>New messages</p>`와 같은 코드를 작성하면 메시지 카운트가 0일 때 아무것도 렌더링하지 않는다고 쉽게 추측할 수 있지만, 실제로는 0 자체를 렌더링함.
- 이 문제를 해결하려면 `messageCount > 0 && <p>New messages</p>` 처럼 왼쪽을 부울로 만들어야 함

### 변수에 조건부로 JSX를 할당하기

- 이전 방법이 일반 코드를 작성하는 데 방해가 되면 if 문과 변수를 사용할 수 있음
- let으로 정의된 변수는 재할당할 수 있으므로 표시할 기본 내용인 이름을 먼저 대입.

```jsx
let itemContent = name;
```

- if문을 사용해 isPacked={true}인 경우 JSX 표현식을 itemContent에 다시 할당

```jsx
if (isPacked) {
  itemContent = name + " ✅";
}
```

- - [{}는 JS로 들어가는 창을 열어줌](./12_javascript-in-jsx-with-curly-braces.README.md#2-중괄호-사용하기-javascript-세계로-연결하는-창)
- 반환된 JSX 트리에 {}를 사용해 이전에 계산된 식을 JSX 내부에 중첩해 변수를 포함.

```jsx
<li className="item">{itemContent}</li>
```

- 이 스타일은 가장 장황하면서도 가장 유연함

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return <li className="item">{itemContent}</li>;
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

- 임의의 JSX에도 작동함

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = <del>{name + " ✅"}</del>;
  }
  return <li className="item">{itemContent}</li>;
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
