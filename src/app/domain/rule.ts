export class RuleFactory{
  greaterThan(input: any): Function{
    return (x: any)=> x > input;
  }

  lessThan(input: any): Function{
    return (x: number)=> x > input;
  }

  equalTo(input: any): Function {
    return (x: any) => {
      //console.log("EQUAL")
      //console.log(x + " === " + input + " : " + (x === input));
      return x === input;
    }
  }

  and(check1: Function, check2: Function): Function {
    return (one: any, two: any) => {
      //console.log("AND")
      const first = check1(one, two);
      const second = check2(two, one);
      return  first && second;
    }
  }

  nand(check1: Function, check2: Function): Function{
    return (one: any, two: any) => {
      //console.log("NAND")
      const first = check1(one, two);
      const second = check2(two, one);
      return  !(first && second);
    }
  }

  or(check1: Function, check2: Function): Function{
    return (one: any, two:any) => {
      //console.log("OR")
      const first = check1(one,two);
      const second = check2(two,one);
      return (first || second);
    }
  }

  nor(check1: Function, check2: Function): Function{
    return (one: any, two: any) => {
      //console.log('NOR!')
      const first = check1(one, two);
      const second = check2(two, one);
      //console.log(first + " Nor " + second)
      return !(first || second);
    }
  }
}


class Test {
  constructor() {
    const factory = new RuleFactory();
    const isThree = factory.equalTo(3);
    const isTwo = factory.equalTo(2);
    const xor = (one: any, two: any) => factory.and(
      factory.or(
        one,
        two,
      ),
      factory.nand(
        one,
        two,
      )
    );
    const xor3 = xor(isThree, isThree);
    const xor2 = xor(isTwo, isTwo);
    const xor32 = factory.and(xor2,xor3);
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
}

const x = new Test();
