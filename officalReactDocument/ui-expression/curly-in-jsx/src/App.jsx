// 챌린지 3 of 3:

import { getImageUrl } from "utils/utils";

// 아래 객체에서 전체 이미지 URL은 기본 URL, imageId, imageSize 및 파일 확장자 네 부분으로 나누어져 있음
// 이미지 URL은 기본 URL (항상 'https://i.imgur.com/'), imageId ('7vQD0fP'), imageSize ('s') 및 파일 확장자 (항상 '.jpg')와 같은 어트리뷰트를 결합
// 그러나 <img> 태그가 src를 지정하는 방식에 문제가 있음

// const baseUrl = "https://i.imgur.com/";
// const person = {
//   name: "Gregorio Y. Zara",
//   imageId: "7vQD0fP",
//   imageSize: "s",
//   theme: {
//     backgroundColor: "black",
//     color: "pink",
//   },
// };

// function App() {
//   return (
//     <div style={person.theme}>
//       <h1>{person.name}'s Todos</h1>
//       <img
//         className="avatar"
//         src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
//         alt={person.name}
//       />
//       <ul>
//         <li>Improve the videophone</li>
//         <li>Prepare aeronautics lectures</li>
//         <li>Work on the alcohol-fuelled engine</li>
//       </ul>
//     </div>
//   );
// }

// 해결 방법 1

// src={baseUrl + person.imageId + person.imageSize + '.jpg'}같이 작성 가능
// 1. { 는 JavaScript 표현식을 열어줌
// 2. baseUrl + person.imageId + person.imageSize + '.jpg' 는 올바른 URL 문자열을 생성함.
// 3. } 는 JavaScript 표현식을 닫아줌

// const baseUrl = "https://i.imgur.com/";
// const person = {
//   name: "Gregorio Y. Zara",
//   imageId: "7vQD0fP",
//   imageSize: "s",
//   theme: {
//     backgroundColor: "black",
//     color: "pink",
//   },
// };

// function App() {
//   return (
//     <div style={person.theme}>
//       <h1>{person.name}'s Todos</h1>
//       <img
//         className="avatar"
//         src={baseUrl + person.imageId + person.imageSize + ".jpg"}
//         alt={person.name}
//       />
//       <ul>
//         <li>Improve the videophone</li>
//         <li>Prepare aeronautics lectures</li>
//         <li>Work on the alcohol-fuelled engine</li>
//       </ul>
//     </div>
//   );
// }

const person = {
  name: "Gregorio Y. Zara",
  imageId: "7vQD0fP",
  imageSize: "s",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

function App() {
  return (
    <div style={person.theme}>
      <h1>{person.name}`s Todos</h1>
      <img className="avatar" src={getImageUrl(person)} alt={person.name} />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

export default App;
