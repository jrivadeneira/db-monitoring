"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleFactory = void 0;
var RuleFactory = /** @class */ (function () {
    function RuleFactory() {
    }
    RuleFactory.prototype.greaterThan = function (input) {
        return function (x) { return x > input; };
    };
    RuleFactory.prototype.lessThan = function (input) {
        return function (x) { return x > input; };
    };
    RuleFactory.prototype.equalTo = function (input) {
        return function (x) {
            //console.log("EQUAL")
            //console.log(x + " === " + input + " : " + (x === input));
            return x === input;
        };
    };
    RuleFactory.prototype.and = function (check1, check2) {
        return function (one, two) {
            //console.log("AND")
            var first = check1(one, two);
            var second = check2(two, one);
            return first && second;
        };
    };
    RuleFactory.prototype.nand = function (check1, check2) {
        return function (one, two) {
            //console.log("NAND")
            var first = check1(one, two);
            var second = check2(two, one);
            return !(first && second);
        };
    };
    RuleFactory.prototype.or = function (check1, check2) {
        return function (one, two) {
            //console.log("OR")
            var first = check1(one, two);
            var second = check2(two, one);
            return (first || second);
        };
    };
    RuleFactory.prototype.nor = function (check1, check2) {
        return function (one, two) {
            //console.log('NOR!')
            var first = check1(one, two);
            var second = check2(two, one);
            //console.log(first + " Nor " + second)
            return !(first || second);
        };
    };
    return RuleFactory;
}());
exports.RuleFactory = RuleFactory;
var Test = /** @class */ (function () {
    function Test() {
        var factory = new RuleFactory();
        var isThree = factory.equalTo(3);
        var isTwo = factory.equalTo(2);
        var xor = function (one, two) { return factory.and(factory.or(one, two), factory.nand(one, two)); };
        var xor3 = xor(isThree, isThree);
        var xor2 = xor(isTwo, isTwo);
        var xor32 = factory.and(xor2, xor3);
        console.log("result: ", xor32(4, 3));
        console.log("result: ", xor32(3, 4));
        console.log("result: ", xor32(3, 3));
        console.log("result: ", xor32(2, 3));
        console.log("result: ", xor32(3, 2));
        console.log("result: ", xor32(1, 3));
        console.log("result: ", xor32(3, 1));
        console.log("result: ", xor32(2, 2));
        console.log("result: ", xor32(2, 2));
        console.log("result: ", xor32(2, 1));
        console.log("result: ", xor32(1, 2));
    }
    return Test;
}());
var x = new Test();
