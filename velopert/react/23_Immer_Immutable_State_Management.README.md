# 23. Immer를 사용한 더 쉬운 불변성 관리

Immer는 불변성 관리를 쉽게 해주는 라이브러리. 복잡한 객체의 불변성을 유지하면서 업데이트할 때 유용함

## 기본 사용법

```jsx
import produce from "immer";

const nextState = produce(state, (draft) => {
  // 불변성 신경 쓰지 않고 업데이트 가능
  draft.number += 1;
});
```

## 예시: 복잡한 객체 업데이트

기존 방식:

```jsx
const nextState = {
  ...state,
  posts: state.posts.map((post) =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: "새로운 댓글",
          }),
        }
      : post
  ),
};
```

Immer 사용:

```jsx
const nextState = produce(state, (draft) => {
  const post = draft.posts.find((post) => post.id === 1);
  post.comments.push({
    id: 3,
    text: "와 정말 쉽다!",
  });
});
```

## 리듀서에서 Immer 사용 예시

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}
```

## 함수형 업데이트와 함께 사용

```jsx
const [todo, setTodo] = useState({
  text: "Hello",
  done: false,
});

const onClick = useCallback(() => {
  setTodo(
    produce((draft) => {
      draft.done = !draft.done;
    })
  );
}, []);
```

주의사항:

- 성능적으로는 Immer를 사용하지 않는 것이 더 빠름
- 구형 브라우저나 react-native에서는 성능이 더 저하될 수 있음
- 데이터 구조가 복잡할 때만 사용하고, 간단한 업데이트는 일반 JavaScript 사용 권장
