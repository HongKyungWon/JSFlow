/*
Map?
[객체의 단점]
1. iterabe 하지 않다.
2. 키를 문자열로 취급한다
3. 프로퍼티 개수를 직접 파악할 수 없다.(변환해야됨 .key or .values)

[Map]
1. [key,value] 쌍으로 이루어진 요소들의 집합.
2. 순서를 보장하며, iterable 하다.
3. 키에는 어떤 데이터타입도 저장할 수 있으며, 문자열로 취급하지 않는다.
*/
const map = new Map()
map.set(1,10)
map.set(01,20)
map.set('01',30)
map.set({}, 40)
map.set(function() {}, () => {})
console.log(map);