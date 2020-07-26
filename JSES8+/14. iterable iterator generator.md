# 14. iterable, iterator, generator

## 14-1. iterable

### 14-1-1. 소개

내부 요소들을 공개적으로 탐색(반복)할 수 있는 데이터 구조.  
[Symbol.iterator] 메소드를 가지고 있다.

```js
const arr = ['a', 'b', 'c']
const set = new Set(['a', 'b', 'c'])
const map = new Map([[false, 'no'], [true, 'yes'], ['well', 'soso']])
const str = '문자열도 이터러블하다!?!!'
```

### 14-1-2. 개체 자신이 iterable한 경우

#### 1) array, map, set, string

#### 2) `[Symbol.iterator]` 메소드가 존재하는 모든 개체

```js
console.dir([1, 2, 3])
console.dir(new Set([1, 2, 3]))
console.dir(new Map([[0, 1], [1, 2], [2, 3]]))
```

- 없는 경우
```js
const obj = { 0: 1, 1: 2, 2: 3, length: 3 }
console.dir(obj)
```

#### 3) `generator`를 호출한 결과

```js
function* generator () {
  yield 1
  yield 2
  yield 3
}
const gene = generator()
console.dir(gene)
```

### 14-1-3. iterable한 개체의 특징

```js
const arr = [1, 2, 3]
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
const set = new Set([1, 2, 3])
const str = '이런것도 된다.'
const gene = (function* () {
  yield 1
  yield 2
  yield 3
})()
```

#### 1) Array.from 메소드로 배열로 전환 가능

```js
const arrFromArr1 = Array.from(arr)
const arrFromMap1 = Array.from(map)
const arrFromSet1 = Array.from(set)
const arrFromStr1 = Array.from(str)
const arrFromGene1 = Array.from(gene)
```

#### 2) spread operator로 배열로 전환 가능

```js
const arrFromArr2 = [...arr]
const arrFromMap2 = [...map]
const arrFromSet2 = [...set]
const arrFromStr2 = [...str]
const arrFromGene2 = [...gene]
```

#### 3) 해체할당 가능

```js
const [arrA, , arrC] = arr
const [mapA, , mapC] = map
const [ , setB, setC] = set
const [ , strB, ...strRest] = str
const [geneA, ...geneRest] = gene
console.log(arrA, arrC)
console.log(mapA, mapC)
console.log(setB, setC)
console.log(strB, strRest)
console.log(geneA, geneRest)
```

#### 4) for ... of 명령 수행 가능

```js
for (const x of arr) {
  console.log(x)
}
for (const x of map) {
  console.log(x)
}
for (const x of set) {
  console.log(x)
}
for (const x of str) {
  console.log(x)
}
for (const x of gene) {
  console.log(x)
}
```

#### 5) `Promise.all`, `Promise.race` 명령 수행 가능

```js
const a = [
  new Promise((resolve, reject) => { setTimeout(resolve, 500, 1) }),
  new Promise((resolve, reject) => { setTimeout(resolve, 100, 2) }),
  3456,
  'abc',
  new Promise((resolve, reject) => { setTimeout(resolve, 300, 3) }),
]
Promise.all(a)
  .then(v => { console.log(v) })
  .catch(err => { console.error(err) })

const s = new Set([
  new Promise((resolve, reject) => { setTimeout(resolve, 300, 1) }),
  new Promise((resolve, reject) => { setTimeout(resolve, 100, 2) }),
  new Promise((resolve, reject) => { setTimeout(reject, 200, 3) }),
])
Promise.race(s)
  .then(v => { console.log(v) })
  .catch(err => { console.error(err) })
```

#### 6) `generator - yield*` 문법으로 이용 가능

```js
const arr = [1, 2, 3]
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
const set = new Set([1, 2, 3])
const str = '이런것도 된다.'

const makeGenerator = iterable => function* () {
  yield* iterable
}
const arrGen = makeGenerator(arr)()
const mapGen = makeGenerator(map)()
const setGen = makeGenerator(set)()
const strGen = makeGenerator(str)()

console.log(arrGen.next())
console.log(mapGen.next())
console.log(...setGen)
console.log(...strGen)
```

> 여기까지 모두 내부적으로는 
> `Symbol.iterator` 또는 `generator`을 실행하여 iterator로 변환한 상태에서
> `next()`를 반복 호출하는 동일한 로직을 기반으로 함.

#### 7) iterable 객체에 `[Symbol.iterator]`가 **잘** 정의되지 않은 경우

```js
const obj = {
  a: 1,
  b: 2,
  [Symbol.iterator] () {
    return 1
  }
}
console.log([...obj])
```

### 14-1-4. iterable한 개체를 인자로 받을 수 있는 개체

```js
new Map()
new Set()
new WeakMap()
new WeakSet()
Promise.all()
Promise.race()
Array.from()
```

## 14-2. Iterator

### 14-2-1. 소개

반복을 위해 설계된 특별한 인터페이스를 가진 객체.

- 객체 내부에는 `next()` 메소드가 있는데,
- 이 메소드는 `value`와 `done` 프로퍼티를 지닌 객체를 반환한다.
- `done` 프로퍼티는 boolean값이다.

초간단 이터레이터 예시

```js
const iter = {
  items: [10, 20, 30],
  count: 0,
  next () {
	const done = this.count >= this.items.length
    return {
      done,
      value: !done ? this.items[this.count++] : undefined
    }
  }
}
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
```

### 14-2-2. `iterator` 구현해보기

#### 1) 객체에는 'next' 메소드가 존재해야 한다.

```js
const iter = {
  next () {}
}
```

#### 2) next 메소드는 다시 객체를 반환해야 한다.

```js
const iter = {
  next () {
    return {}
  }
}
```

#### 3) 반환되는 객체에는 boolean 값을 가지는 done 프로퍼티가 존재해야 한다.

```js
const iter = {
  next () {
	return {
      done: false
    }
  }
}
console.log(iter.next())
```

#### 4) value 프로퍼티를 추가하고, 일정시점에 done을 true로 변환할 수 있게끔 한다.

```js
const iter = {
  val: 0,
  next () {
    const isDone = ++this.val >= 5
    return {
      done: isDone,
      value: !isDone ? this.val : undefined
    }
  }
}
console.log(iter.next())
```

### 14-2-3. 기본 이터레이터

- 기본 이터레이터에 접근하기

```js
const arr = [ 1, 2 ]
const arrIterator = arr[Symbol.iterator]()
console.log(arrIterator.next())
console.log(arrIterator.next())
console.log(arrIterator.next())
```

- 객체가 이터러블한지 확인하기

```js
const isIterable = target => typeof target[Symbol.iterator] === 'function'
```

### 14-2-4. 이터러블한 개체 만들기

#### 1) 개체의 Symbol.iterator 메소드를 호출하면 iterator가 반환되도록 한다.

> `for...of`, `...(spread)` 등은 모두 개체 내부 (또는 개체의 `__proto__`)의 [Symbol.iterator]를 실행한 결과를 바탕으로, `done`이 `true`가 될 때까지 계속하여 `next()`를 호출하는 식으로 구현되어 있다.

```js
// 절대 실행하지 말 것!!
const createIterator = () => {
  return {
    next () {
      return {
        done: false
      }
    }
  }
}
const obj = {
  [Symbol.iterator]: createIterator
}
console.log(...obj)
```

```js
// 절대 실행하지 말 것!!
const obj = {
  [Symbol.iterator]() {
    return this
  },
  next() {
    return {
      done: false
    }
  }
}
console.log(...obj)
```

#### 2) done이 true가 나오지 않는 한 이터레이트시 무한정 반복실행한다. 따라서 적절한 시점에 done을 true로 바꾸어주어야 한다.

```js
const createIterator = () => {
  let count = 0
  return {
    next () {
      return {
        done: count > 3
      }
    }
  }
}
const obj = {
  [Symbol.iterator]: createIterator
}
console.log(...obj)
```

#### 3) value 프로퍼티를 추가하면 완성!

```js
const createIterator = function () {
  let count = 0
  const items = Object.entries(this)
  return {
    next () {
      return {
        done: count >= items.length,
        value: items[count++]
      }
    }
  }
}
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  [Symbol.iterator]: createIterator
}
console.log(...obj)
```

#### 4) 객체 내부에 직접 할당한 형태

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  [Symbol.iterator] () {
    let count = 0
    const items = Object.entries(this)
    return {
      next () {
        return {
          done: count >= items.length,
          value: items[count++]
        }
      }
    }
  }
}
console.log(...obj)
```

#### 5) 또는 generator를 실행한 결과 역시 이터러블하다.

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  *[Symbol.iterator] () {
    yield* Object.entries(this)
  }
}
console.log(...obj)
```

#### 6) 정리

- `for-of`, `...(spread operator)`, `forEach 메소드` 등은 내부적으로
- `[Symbol.iterator]`를 실행한 결과 객체를 들고, 
- 객체 내부의 `next()` 메소드를 
- `done 프로퍼티`가 `true`가 나올 때까지 반복하여 호출한다.
- 즉, Symbol.iterator 메소드의 내용을 위 요구사항에 맞추어 구현하기만 하면 iterable한 객체이다.

> Duck type Protocol : [덕타이핑](https://ko.wikipedia.org/wiki/%EB%8D%95_%ED%83%80%EC%9D%B4%ED%95%91)


## 14-3. Generator

### 14-3-1. 소개

- 중간에서 멈췄다가 이어서 실행할 수 있는 함수.  
- function 키워드 뒤에 `*`를 붙여 표현하며, 함수 내부에는 `yield` 키워드를 활용한다.  
- 함수 실행 결과에 대해 `next()` 메소드를 호출할 때마다 순차적으로 제너레이터 함수 내부의 `yield` 키워드를 만나기 전까지 실행하고, `yield` 키워드에서 일시정지한다.
- 다시 `next()` 메소드를 호출하면 그 다음 `yield` 키워드를 만날 때까지 함수 내부의 내용을 진행하는 식이다.

```js
function* gene () {
  console.log(1)
  yield 1
  console.log(2)
  yield 2
  console.log(3)
}
const gen = gene()
```

- 선언 방식

```js
function* gene () { yield }
const gene = function* () { yield }
const obj = {
  gene1: function* () { yield }
  *gene2 () { yield }
}
class A {
  *gene () { yield }
}
```

### 14-3-2. 이터레이터로서의 제너레이터

```js
function* gene () {
  console.log(1)
  yield 1
  console.log(2)
  yield 2
  console.log(3)
}
const gen = gene()
console.log(...gen)
```

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator] () {
    for (let prop in this) {
      yield [prop, this[prop]]
    }
  }
}
console.log(...obj)
for (let p of obj) {
  console.log(p)
}
```

### 14-3-3. `yield* [iterable]`

```js
function* gene () {
  yield* [1, 2, 3, 4, 5]
  yield
  yield* 'abcde'
}
for (const c of gene()) {
  console.log(c)
}
```

```js
function* gene1 () {
  yield [1, 10]
  yield [2, 20]
}
function* gene2 () {
  yield [3, 30]
  yield [4, 40]
}
function* gene3 () {
  console.log('yield gene1')
  yield* gene1()
  console.log('yield gene2')
  yield* gene2()
  console.log('yield* [[5, 50], [6, 60]]')
  yield* [[5, 50], [6, 60]]
  console.log('yield [7, 70]')
  yield [7, 70]
}
const gen = gene3()
for (let [k, v] of gen) {
  console.log(k, v)
}
```

#### 14-3-4. 인자 전달하기

```js
function* gene () {
  let first = yield 1
  let second = yield first + 2
  yield second + 3
}
const gen = gene()
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
```

#### 14-3-5. 비동기 작업 수행

```js
const ajaxCalls = () => {
  const res1 = fetch.get('https://api.github.com/users?since=1000')
  const res2 = fetch.get('https://api.github.com/user/1003')
}
const m = ajaxCalls()
```

```js
const fetchWrapper = (gen, url) => fetch(url)
  .then(res => res.json())
  .then(res => gen.next(res));

function* getNthUserInfo() {
  const [gen, from, nth] = yield;
  const req1 = yield fetchWrapper(gen, `https://api.github.com/users?since=${from || 0}`);
  const userId = req1[nth - 1 || 0].id;
  console.log(userId);
  const req2 = yield fetchWrapper(gen, `https://api.github.com/user/${userId}`);
  console.log(req2);
}
const runGenerator = (generator, ...rest) => {
  const gen = generator();
  gen.next();
  gen.next([gen, ...rest]);
}
runGenerator(getNthUserInfo, 1000, 4);
runGenerator(getNthUserInfo, 1000, 6);
```

```js
const fetchWrapper = url => fetch(url).then(res => res.json());
function* getNthUserInfo() {
  const [from, nth] = yield;
  const req1 = yield fetchWrapper(`https://api.github.com/users?since=${from || 0}`);
  const userId = req1[nth - 1 || 0].id;
  console.log(userId);
  const req2 = yield fetchWrapper(`https://api.github.com/user/${userId}`);
  console.log(req2);
}
const runGenerator = (generator, ...rest) => {
  const gen = generator();
  gen.next();
  gen.next([...rest]).value
    .then(res => gen.next(res).value)
    .then(res => gen.next(res));
}
runGenerator(getNthUserInfo, 1000, 4);
runGenerator(getNthUserInfo, 1000, 6);
```