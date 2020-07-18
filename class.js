var extendClass = (function(){
    function Bridge(){}
    return function(Parent, Child){
        Bridge.prototype = Parent.prototype;
        Child.prototype = new Bridge();
        Child.prototype.constructor = Child;
        Child.prototype.superClass = Parent;
    }
})();
function Person(name, age){
    this.name = name || '이름없음';
    this.age = age || '나이모름';
}
Person.prototype.getName = function() {
    return this.name; //ㅓㅣ마퍼ㅏㅇㅍㅇ
}