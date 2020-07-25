/*
iterable?
내부 요소들을 공개적으로 탐색(반복)할 수 있는 데이터 구조.
[]
*/
const arr = [1, 2, 3]
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
const set = new Set([1, 2, 3])
const str = '이런것도 된다.'
const gene = (function* () {
    yield 1
    yield 2
    yield 3
}) ()

Array.from(map)
/*
여기서 정리!!
Array.from(iterable) => 반복된 결과를 바탕으로 배열로 만들어줌
...iterable          => Spread Operator: 반복된 결과를 묶음 처리해서 넘겨줌
[, , a] = iterable   => 해체 할당 

var a = iterable[Symbol.iterator]()  => 얘가 곧 iterator
a.next() => 반복호출. done이 true가 되기 전까지.
*/