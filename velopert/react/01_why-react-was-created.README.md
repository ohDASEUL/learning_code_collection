# 리액트의 탄생 배경

- 상태 변경 시 UI를 완전히 새로 만드는 아이디어에서 시작
- 이를 통해 '업데이트 로직'에 대한 고민을 줄이고자 함

# 직접 DOM 조작의 문제점

- 모든 UI를 새로 만드는 방식은 성능상 큰 문제 발생
- 브라우저 DOM 직접 조작은 비용이 큼

# Virtual DOM의 해결책

## 작동 원리

1. 가상 DOM은 메모리상의 자바스크립트 객체
2. 실제 브라우저 DOM보다 훨씬 가벼움
3. 상태 업데이트 발생 시:

- Virtual DOM에서 먼저 렌더링
- 효율적인 비교 알고리즘으로 실제 DOM과 차이점 감지
- 필요한 부분만 실제 DOM에 패치

## 장점

- 개발자는 업데이트 로직을 신경 쓸 필요 없음
- 성능 최적화와 개발 편의성을 동시에 확보
- 효율적인 UI 업데이트 가능
