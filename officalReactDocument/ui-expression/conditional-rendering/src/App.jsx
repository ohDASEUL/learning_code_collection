// 챌린지 3 of 3
// Drink 컴포넌트는 일련의 ? : 조건을 사용하여 name props가 tea인지 coffee인지에 따라 다른 정보를 표시
// 문제는 각 음료에 대한 정보가 여러 가지 조건에 걸쳐 퍼져 있음
// 세 가지 ? : 조건 대신 하나의 if 문을 사용하도록 이 코드를 리팩토링

// function Drink({ name }) {
//   return (
//     <section>
//       <h1>{name}</h1>
//       <dl>
//         <dt>Part of plant</dt>
//         <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
//         <dt>Caffeine content</dt>
//         <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
//         <dt>Age</dt>
//         <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
//       </dl>
//     </section>
//   );
// }

// 작성 코드
function Drink({ name }) {
  let part, caffeine, age;
  if (name === "tea") {
    part = <dd>leaf</dd>;
    caffeine = <dd>15–70 mg/cup</dd>;
    age = <dd>4,000+ years</dd>;
  } else {
    part = <dd>bean</dd>;
    caffeine = <dd>80–185 mg/cup</dd>;
    age = <dd>1,000+ years</dd>;
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        {part}
        <dt>Caffeine content</dt>
        {caffeine}
        <dt>Age</dt>
        {age}
      </dl>
    </section>
  );
}

// 해설 코드 1 : 각 음료에 대한 정보가 여러 조건에 분산되지 않고 함께 그룹화
// function Drink({ name }) {
//   let part, caffeine, age;
//   if (name === 'tea') {
//     part = 'leaf';
//     caffeine = '15–70 mg/cup';
//     age = '4,000+ years';
//   } else if (name === 'coffee') {
//     part = 'bean';
//     caffeine = '80–185 mg/cup';
//     age = '1,000+ years';
//   }
//   return (
//     <section>
//       <h1>{name}</h1>
//       <dl>
//         <dt>Part of plant</dt>
//         <dd>{part}</dd>
//         <dt>Caffeine content</dt>
//         <dd>{caffeine}</dd>
//         <dt>Age</dt>
//         <dd>{age}</dd>
//       </dl>
//     </section>
//   );
// }

// 해설 코드 2 : 정보를 객체로 이동하여 조건을 완전히 제거
// const drinks = {
//   tea: {
//     part: 'leaf',
//     caffeine: '15–70 mg/cup',
//     age: '4,000+ years'
//   },
//   coffee: {
//     part: 'bean',
//     caffeine: '80–185 mg/cup',
//     age: '1,000+ years'
//   }
// };

// function Drink({ name }) {
//   const info = drinks[name];
//   return (
//     <section>
//       <h1>{name}</h1>
//       <dl>
//         <dt>Part of plant</dt>
//         <dd>{info.part}</dd>
//         <dt>Caffeine content</dt>
//         <dd>{info.caffeine}</dd>
//         <dt>Age</dt>
//         <dd>{info.age}</dd>
//       </dl>
//     </section>
//   );
// }

function App() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}

export default App;
