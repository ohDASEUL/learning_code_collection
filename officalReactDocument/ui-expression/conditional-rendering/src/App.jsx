// 챌린지 2 of 3
// 각 Item은 숫자 타입인 importance를 props로 받고 있음.
// & 연산자를 사용하여 “(Importance: X)“를 이탤릭체로 렌더링하되 난이도가 0이 아닌 항목만 렌더링

// function Item({ name, importance }) {
//   return (
//     <li className="item">
//       {name}
//     </li>
//   );
// }

// 작성 코드
function Item({ name, importance }) {
  return (
    <li className="item">
      {name} {importance > 0 && <i>(Importance: {importance})</i>}
    </li>
  );
}

// 해설 코드
// function Item({ name, importance }) {
//   return (
//     <li className="item">
//       {name}
//       {importance > 0 && " "}
//       {importance > 0 && <i>(Importance: {importance})</i>}
//     </li>
//   );
// }

function App() {
  return (
    <section>
      <h1>Sally Ride`s Packing List</h1>
      <ul>
        <Item importance={9} name="Space suit" />
        <Item importance={0} name="Helmet with a golden leaf" />
        <Item importance={6} name="Photo of Tam" />
      </ul>
    </section>
  );
}

export default App;
