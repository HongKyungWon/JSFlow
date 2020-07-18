class Person {
    constructor (name, age) {
        this.name = name || '이름없음';
        this.age = age || '나이모름';
    }
    getName() {
        return this.name;
    }
    getAge () {
        return this.age;
    }
}
class Employee extends Person {
    constructor (name, age, position) {
        super(name, age);
        this.position = position || '직책모름';
    }
    getPosition () {
        return this.position;
    }
}
const a = Employee;
a._name = "김세환";
a.age = 25;
a.position = '사원';
console.log(a);