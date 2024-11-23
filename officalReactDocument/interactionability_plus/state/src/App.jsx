import { useState } from "react";
import { sculptureList } from "./data";

// 챌린지 1 of 4

// 마지막 조각상에서 “Next”를 누르면 코드가 충돌.. 로직을 수정하여 이를 해결
// 이벤트 핸들러에 추가로 로직을 추가하거나 동작이 불가능할 때 버튼을 비활성화하여 이를 처리 가능
// 충돌을 수정한 후, 이전 조각상을 표시하는 “Previous” 버튼을 추가
// 첫 번째 조각상에서는 충돌이 발생하지 않아야 함

// 해설 코드

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handlePrevClick} disabled={!hasPrev}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={!hasNext}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
