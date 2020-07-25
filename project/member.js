const Name = Symbol.for('이름')
const Gender = Symbol.for('성별')
const Position = Symbol.for('세션')
const kw = {
    [Name]: '홍경원',
    [Gender]: 'male',
    [Position]: 'Vocal',
    age: 26
}
const sh = {
    [Name]: '김세환',
    [Gender]: 'male',
    [Position]: 'Guitar',
    age: 25
}
const nh = {
    [Name]: '조남현',
    [Gender]: 'male',
    [Position]: 'Guitar',
    age: 27
}
const hk = {
    [Name]: '서한결',
    [Gender]: 'male',
    [Position]: 'Bass',
    age: 25
}
const yb = {
    [Name]: '이용범',
    [Gender]: 'male',
    [Position]: 'Drum',
    age: 25
}   

console.log(kw[Name]);