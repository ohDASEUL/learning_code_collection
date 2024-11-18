# 중괄호가 있는 JSX 안에서 자바스크립트 사용하기

- JSX를 사용하면 JS 파일에 HTML과 비슷한 마크업을 작성해 렌더링 로직과 콘텐츠를 같은 곳에 놓을 수 있음.

- JS 로직을 추가하거나 해당 마크업 내부의 동적인 프로퍼티를 참조하고 싶을 땐 JSX에서 {}를 사용해 JS를 사용할 수 있음

## 1. 따옴표로 문자열 전달하기

### 문자열 전달 기본 규칙

- JSX에서 문자열 어트리뷰트는 작은따옴표('') 또는 큰따옴표("")로 묶어서 전달
- 동적 값은 중괄호({})를 사용하여 전달

### 정적 값과 동적 값의 차이

- 정적 값: 따옴표로 직접 전달 (예: `className="avatar"`)
- 동적 값: 중괄호로 JavaScript 표현식 전달 (예: `src={avatar}`)
- 중괄호({})를 사용하면 JSX 내에서 JavaScript 로직 사용 가능

### 예시 코드

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

- 동적 값 사용

```jsx
export default function Avatar() {
  const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";
  return <img className="avatar" src={avatar} alt={description} />;
}
```

## 2. 중괄호 사용하기: JavaScript 세계로 연결하는 창

### 중괄호({}) 기본 개념

- JSX에서 중괄호({})는 JavaScript 표현식을 삽입하는 특별한 구문
- JavaScript 코드를 마크업 내에서 직접 실행 가능
- 모든 유효한 JavaScript 표현식 사용 가능 (변수, 함수 호출 등)

### 중괄호 사용 위치

- JSX 태그 내부의 텍스트로 사용
- 어트리뷰트 값으로 사용
- 주의: 태그 이름으로는 사용 불가

### 기본 예시 코드

```jsx
function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

### 함수 호출 예시

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function TodoList() {
  return <h1>To Do List for {formatDate(today)}</h1>;
}
```

### 주의사항

- 태그 내부: `<h1>{name}</h1>` (올바른 사용)
- 어트리뷰트: `src={avatar}` (올바른 사용)
- 잘못된 사용: `<{tag}>Content</{tag}>` (태그 이름으로 사용 불가)
- 문자열 전달 시 주의: `src="{avatar}"` (문자열 그대로 전달됨)

## 3. ”이중 중괄호” 사용하기: JSX의 CSS와 다른 객체

- JSX에는 문자열, 숫자 및 기타 JavaScript 표현식뿐만 아니라 객체 전달 가능
- 또한 객체는 { name: "Hedy Lamarr", inventions: 5 }처럼 중괄호로 표시됨
- 따라서 JSX에서 객체를 전달하려면 person={{ name: "Hedy Lamarr", inventions: 5 }}와 같이 다른 중괄호 쌍으로 객체를 감싸야 함.

- JSX의 인라인 CSS 스타일에서도 볼 수 있음.
- React에서 인라인 스타일을 사용할 필요가 없지만(CSS class는 대부분 잘 작동합니다) 인라인 스타일이 필요할 때 style 어트리뷰트에 객체를 전달해야함.

```jsx
export default function TodoList() {
  return (
    <ul
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    >
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

- JSX에서 {{ 와 }} 를 본다면 JSX {} 안의 객체에 불과하다는 것을 알아야 함

(주의사항) 인라인 style 프로퍼티는 캐멀 케이스로 작성됨.
예: HTML에서의 `<ul style="background-color: black">`은 컴포넌트에서 `<ul style={{ backgroundColor: 'black' }}>`로 작성

## 4. JavaScript 객체와 중괄호에 대해서 더 알아보기

- 여러 표현식을 하나의 객체로 옮기고 {}안의 JSX에서 참조할 수 있음.

```jsx
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

- person 객체는 name 문자열과 theme 객체를 포함함.

```jsx
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};
```

- 컴포넌트는 person 값을 아래와 같이 사용 가능

```html
<div style="{person.theme}">
  <h1>{person.name}'s Todos</h1>
</div>
```

- JSX는 JS를 사용해 데이터와 논리를 구성할 수 있는 매우 작은 템플릿 언어.
