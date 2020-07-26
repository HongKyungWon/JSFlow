# 11. Symbol

## 11-1. `Symbol`

- primitive value! => 유일무이하고 고유한 존재.
- 비공개 멤버에 대한 needs에서 탄생.
- 기본적인 열거대상에서 제외.
- 암묵적 형변환 불가.

### 11-1-1. 만들기

- `Symbol([string])` : 문자열이 아닌 타입은 자동으로 toString 처리.

```js
const sb1 = Symbol()
const sb2 = Symbol()
console.log(sb1, sb2)
console.log(sb1 === sb2)
```

```js
const sb1 = Symbol('symbol')
const sb2 = Symbol('symbol')
console.log(sb1, sb2)
console.log(sb1 === sb2)
```

```js
const obj = { a: 1 }
const sb1 = Symbol(obj)
const sb2 = Symbol(obj)
console.log(sb1, sb2)
console.log(sb1 === sb2)
```

```js
const sb = Symbol(null)
console.log(typeof sb)
```

### 11-1-2. 객체 프로퍼티의 키로 활용

```js
const NAME = Symbol('이름')
const GENDER = Symbol('성별')
const iu = {
  [NAME]: '아이유',
  [GENDER]: 'female',
  age: 26
}
const suzi = {
  [NAME]: '수지',
  [GENDER]: 'female',
  age: 26
}
const jn = {
  [NAME]: '재남',
  [GENDER]: 'male',
  age: 30
}

console.log(iu, suzi, jn)
```

### 11-1-3. 프로퍼티 키로 할당한 심볼 탐색 (접근)

```js
console.log(iu[NAME], suzi[NAME], jn[NAME])

for (const prop in iu) {
  console.log(prop, iu[prop])
}

Object.keys(iu).forEach(k => {
  console.log(k, iu[k])
})

Object.getOwnPropertyNames(iu).forEach(k => {
  console.log(k, iu[k])
})

Object.getOwnPropertySymbols(iu).forEach(k => {
  console.log(k, iu[k])
})

Reflect.ownKeys(iu).forEach(k => {
  console.log(k, iu[k])
})
```

### 11-1-4. private member 만들기

```js
const obj = (() => {
  const _privateMember1 = Symbol('private1')
  const _privateMember2 = Symbol('private1')
  return {
    [_privateMember1]: '외부에서 보이긴 하는데 접근할 방법이 마땅찮네',
    [_privateMember2]: 10,
    publicMember1: 20,
    publicMember2: 30
  }
})()
console.log(obj)
console.log(obj[Symbol('private1')])
console.log(obj[_privateMember1])

for (const prop in obj) {
  console.log(prop, obj[prop])
}

Object.keys(obj).forEach(k => {
  console.log(k, obj[k])
})

Object.getOwnPropertyNames(obj).forEach(k => {
  console.log(k, obj[k])
})

// 물론 아래 방법들로는 접근 가능하나...
Object.getOwnPropertySymbols(obj).forEach(k => {
  console.log(k, obj[k])
})

Reflect.ownKeys(obj).forEach(k => {
  console.log(k, obj[k])
})
```

### 11-2. `Symbol.for` - 공유심볼

- public member! 전역공간에서 공유되는 심볼.

```js
const COMMON1 = Symbol.for('공유심볼')
const obj = {
  [COMMON1]: '공유할 프로퍼티 키값이에요. 어디서든 접근 가능하답니다.'
}
console.log(obj[COMMON1])

const COMMON2 = Symbol.for('공유심볼')
console.log(obj[COMMON2])

console.log(COMMON1 === COMMON2)

const UNCOMMON = Symbol('비공유심볼')
const commonSymbolKey1 = Symbol.keyFor(COMMON1)
const commonSymbolKey2 = Symbol.keyFor(COMMON2)
const commonSymbolKey2 = Symbol.keyFor(UNCOMMON)
```

```js
const obj = (() => {
  const COMMON1 = Symbol.for('공유심볼')
  return {
    [COMMON1]: '공유할 프로퍼티 키값이에요. 어디서든 접근 가능하답니다.'
  }
})()
const COMMON2 = Symbol.for('공유심볼')
console.log(obj[COMMON2])
```

## 11-3. 표준 심볼

- Symbol.hasInstance:  
  `instance instanceof constructor` 명령은 내부적으로 `constructor[Symbol.hasInstance](instance)` 으로 동작.
- Symbol.isConcatSpreadable:  
  array의 `concat` 메소드에 인자로 넘길 때 이를 flatten할지 여부를 가리키는 boolean값 (default: true)

```js
const arr = [4, 5, 6]
arr[Symbol.isConcatSpreadable] = true
console.log([1, 2, 3].concat(arr))

arr[Symbol.isConcatSpreadable] = false
console.log([1, 2, 3].concat(arr))
```

- Symbol.iterator: 추후 다룸.
- Symbol.match: 정규표현식 및 문자열 관련.
- Symbol.replace: 정규표현식 및 문자열 관련.
- Symbol.search: 정규표현식 및 문자열 관련.
- Symbol.species: 파생클래스를 만들기 위한 생성자.
- Symbol.split: 문자열을 나누는 조건 설정.

```js
const str = '이 _ 문자열을 _ 이렇게 _ 나누어주었으면 _ 좋겠어.'
String.prototype[Symbol.split] = function (string) {
  let result = ''
  let residue = string
  let index = 0
  do {
    index = residue.indexOf(this)
    if(index <= -1) {
      break
    }
    result += residue.substr(0, index) + '/'
    residue = residue.substr(index + this.length)
  } while (true)
  result += residue
  return result
}
console.log(str.split(' _ '))
```

- Symbol.toStringTag: `Object.prototype.toString`이 호출되었을 때 어떤 명칭을 반환할 지를 지정 가능.

```js
class Person {
  constructor (name) { this.name = name }
}
const jn = new Person('재남')
console.log(jn.toString())

Person.prototype[Symbol.toStringTag] = 'PERSON'
console.log(jn.toString())
```

- Symbol.unscopables: with문과 관련.


> 표준 심볼들의 의의: 해당 심볼을 재정의함으로써 기존에는 표준객체 내부 전용이던 기능들을 개발자의 입맛에 맞게 바꾸어 쓸 수 있게 되었음.
