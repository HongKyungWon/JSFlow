 /* 
 1. 중복이 허용되지 않으며 순서를 보장하는, 값들로만 이루어진 리스트
 2. 추가, 삭제, 초기화, 요소의 총 개수, 포함여부 확인
 
Set 사용시
장점
1. 중복 제거
2. 전체 순회할 필요성이 있는 경우
3. 값의 유무 판단
단점
x. 특정 요소에 접근
x. 인덱스가 필요한 경우
 */

 const newArr = new Set()
 set.add(5)
 set.add('5')
 set.add(-0)
 set.add(+0)

 // WeakSet ?
 const s = new WeakSet() // 참조 카운트를 증가시키지 않음
 // undefined
 let o = {}; // o 라는 변수가 {} 요런 객체를 참조합니다. -> 참조 카운트가 1이 되었어요.
 let o2 = o; // o2라는 변수도 o를 통해서 {} 요 객체를 참조합니다. -> 참조 카운트가 2가 되었어요.

 o2 = null; // o2가 null이 들어가면서 -> {}요 객체의 참조 카운트는 1이 됩니다.
 o = null; // {} reference count: 0 -> Garbage collector의 수거 대상이 됩니다!

 s.add(o); // o라는 변수가 가리키는 {}를 s에 추가했지만, 참조카운트는 여전히 1이에요.
 o = null; // {}의 참카가 0이 됩니다. -> GC. 언젠가 GC되고 나면 s에는... 아무것도 없게 됩니다.!!

 /*
 1. 참조형 데이터만 요소로 삼을 수 있다.
 2. iterable 이아니다.
 - for... of 사용 불가
 - size property X
 - x.keys(), x.values(), x.entries() 등 사용 불가
 3. 활용 사례가 아직까지는 많지 않음. 알려진건 하나뿐.. use case of WeakSet
 */