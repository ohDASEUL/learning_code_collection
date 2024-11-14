# 중괄호가 있는 JSX 안에서 자바스크립트 사용하기

- JSX를 사용하면 JS 파일에 HTML과 비슷한 마크업을 작성해 렌더링 로직과 콘텐츠를 같은 곳에 놓을 수 있음.

- JS 로직을 추가하거나 해당 마크업 내부의 동적인 프로퍼티를 참조하고 싶을 땐 JSX에서 {}를 사용해 JS를 사용할 수 있음

## 1. 따옴표로 문자열 전달하기

- 문자열 어트리뷰트를 JSX에 전달하려면 작은따옴표('') 나 큰따옴표("")로 묶어야 함

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

- src 또는 alt를 동적으로 지정하려면 다음과 같이 작성 가능

```jsx
export default function Avatar() {
  const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";
  return <img className="avatar" src={avatar} alt={description} />;
}
```

- 이미지를 동글게 만드는 "avatar" CSS 클래스 이름을 지정하는 className="avatar"와 avatar라는 JavaScript 변수의 값을 읽는 src={avatar}의 차이점에 주목
- {}를 사용하면 마크업에서 바로 JavaScript를 사용할 수 있기 때문

## 2. 중괄호 사용하기: JavaScript 세계로 연결하는 창

- {} 사이에서 JS 사용 가능.

```jsx
export default function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

- formatDate()와 같은 함수 호출을 포함해 모든 JS 표현식은 {} 사이에서 작동함

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function TodoList() {
  return <h1>To Do List for {formatDate(today)}</h1>;
}
```

### 중괄호를 사용하는 곳

1. JSX 태그 안의 문자: `<h1>{name}'s To Do List</h1>`는 작동하지만, `<{tag}>Gregorio Y. Zara's To Do List</{tag}>`는 작동하지 안 함
2. = 바로 뒤에 오는 어트리뷰트: `src={avatar}`는 avatar 변수를 읽지만 `src="{avatar}"`는 `"{avatar}"` 문자열을 전달함

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
