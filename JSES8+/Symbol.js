const Name = Symbol('이름')
const Gender = Symbol('성별')
const iu = {
    [Name]: '아이유',
    [Gender]: 'female',
    age: 26
}
const suzi = {
    [Name]: '수지',
    [Gender]: 'female',
    age: 26
}
const kw = {
    [Name]: '경원',
    [Gender]: 'male',
    age: 26
}

console.log(iu, suzi, kw);

// private member 만들기
const obj = (() => {
    const _privateMember1 = Symbol('private1')
    const _privateMember2 = Symbol('private1')
    return {
        [_privateMember1]: '외부에선 보이긴 하는데 접근할 방법이 마땅찮네',
        [_privateMember2]: 10,
        publicMember1: 20,
        publicMember2: 30
    }
})()
console.log(obj)
console.log(obj[Symbol('private1')])
console.log(obj[_privateMember1])

for (const prop in iu) {
    console.log(prop, iu[prop])
}

Object.keys(iu).forEach(k => {
    console.log(k, iu[k])
})

Object.getOwnPropertyNames(iu).forEach(k =>{
    console.log(k, iu[k])
})