# 12. set, weakset

## 12-1. Set

### 12-1-1. 소개

```js
Array.prototype.pushUnique = value => {
  if(!this.includes(value)) {
    this.push(value)
  }
  return this
}
const arr = [1, 2, 3]
arr.pushUnique(5)
arr.pushUnique(4)
arr.pushUnique(3)
```

```js
const set = new Set([1, 2, 3])
set.add(5)
set.add(4)
set.add(3)
```

### 12-1-2. 상세

#### 1. 중복이 허용되지 않으며 순서를 보장하는, 값들로만 이루어진 리스트

#### 2. 추가, 삭제, 초기화, 요소의 총 개수, 포함여부확인

```js
const set = new Set()
set.add(5)
set.add('5')
set.add(-0)
set.add(+0)

console.log(set.size)

console.log(set.has(5))
console.log(set.has(6))

set.delete(5)
console.log(set.has(5))

set.clear()
console.log(set.size)
console.log(set)
```

#### 3. 초기값 지정

인자로 iterable한 개체를 지정할 수 있다.

```js
const set1 = new Set([1, 2, 3, 4, 5, 3, 4, 2])
console.log(set1)

const map = new Map()
map.set('a', 1).set('b', 2).set({}, 3)
const set2 = new Set(map)
console.log(set2)

const gen = function* () {
	for (let i = 0; i < 5; i++) {
		yield i+1
  }
}
const set = new Set(gen())
```

#### 4. 인덱스(키)가 없다!

```js
console.log(set.keys())
console.log(set.values())
console.log(set.entries())

console.log(...set.keys())
console.log(...set.values())
console.log(...set.entries())

set.forEach(function(key, value, ownerSet) {
  console.log(key, value, this)
}, {})

console.log(set[1])
```

#### 5. 배열로 전환하기

```js
const set = new Set([1, 2, 3, 3, 4, 4, 5, 5, 1])
const arr = [...set]
console.log(arr)
```

#### 6. 중복 제거한 배열 만들기

```js
const makeUniqueArray = arr => [...new Set(arr)]
const arr = [1, 2, 3, 3, 4, 4, 5, 5, 1]

const newArr = makeUniqueArray(arr)
console.log(newArr)
```

## 12-2. WeakSet

#### 1. set과의 비교

set에 객체를 저장할 경우 set에도 해당 객체에 대한 참조가 연결되어, 여타의 참조가 없어지더라도 set에는 객체가 여전히 살아있음.  
한편 WeakSet은 객체에 대한 참조카운트를 올리지 않아, 여타의 참조가 없어질 경우 WeakSet 내의 객체는 G.C의 대상이 됨.

```js
const obj1 = { a: 1 }
const set = new Set()
set.add(obj1)
obj1 = null
```

```js
const obj2 = { b: 2 }
const wset = new WeakSet()
wset.add(obj2)
obj2 = null
```

#### 2. 참조형 데이터만 요소로 삼을 수 있다.

#### 3. iterable이 아니다.
- for ... of 사용 불가
- size 프로퍼티 없음
- `wset.keys()`, `wset.values()`, `wset.entries()` 등 사용 불가

#### 4. 활용사례는 아직까지는 많지 않다. 

- [use case of WeakSet](https://www.sitepoint.com/using-the-new-es6-collections-map-set-weakmap-weakset/) (알려진건 하나뿐..)

```js
const isMarked = new WeakSet()
const attachedData = new WeakMap()

class Node {
  constructor (id) {
    this.id = id
  }
  mark () { isMarked.add(this) }
  unmark () { isMarked.delete(this) }
  set data (data) { attachedData.set(this, data) }
  get data () { return attachedData.get(this) }
}

let foo = new Node('foo')
foo.mark()
foo.data = 'bar'
console.log(foo.data)

isMarked.has(foo)
attachedData.has(foo)

foo = null

// G.C 수거해간 이후..
isMarked.has(foo)
attachedData.has(foo)
```
