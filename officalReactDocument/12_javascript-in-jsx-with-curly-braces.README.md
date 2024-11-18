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

### 객체 전달의 기본 개념

- JSX는 JavaScript 객체를 전달할 수 있음
- 객체는 기본적으로 중괄호로 표시됨
- JSX에서 객체를 전달할 때는 이중 중괄호`({{}})` 필요

### 인라인 스타일 사용

- style 속성에는 객체 형태로 스타일을 전달
- CSS 속성은 camelCase로 작성
- 값은 문자열 또는 숫자로 전달

### 예시 코드

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

### 주요 규칙

- HTML 스타일 속성과 React 스타일 속성 비교:

  - HTML: `background-color: black`
  - React: `backgroundColor: "black"`

- 객체 전달 예시:
  - 일반 객체: `{ name: "Hedy Lamarr", inventions: 5 }`
  - JSX에서 사용: `person={{ name: "Hedy Lamarr", inventions: 5 }}`

### 주의 사항

- 이중 중괄호({{}})는 특별한 구문이 아님
- JSX의 중괄호 안에 있는 일반 JavaScript 객체를 의미
- 가능하면 인라인 스타일보다 CSS 클래스 사용을 권장

## 4. JavaScript 객체와 중괄호에 대해서 더 알아보기

### JavaScript 객체 활용

- JSX에서 여러 값을 하나의 객체로 그룹화하여 사용 가능
- 객체의 속성을 JSX 내에서 점(.) 표기법으로 접근
- 데이터와 스타일을 구조화하여 관리 가능

### 객체 구조화 예시

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

### 객체 구조

```jsx
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};
```

### 객체 속성 사용

```html
<div style="{person.theme}">
  <h1>{person.name}'s Todos</h1>
</div>
```

### 주요 특징

- JSX는 JavaScript 템플릿 언어의 특성을 가짐
- 데이터와 로직을 JavaScript 객체로 구조화 가능
- 객체의 중첩된 속성도 자유롭게 접근 가능
- 코드의 재사용성과 유지보수성 향상
