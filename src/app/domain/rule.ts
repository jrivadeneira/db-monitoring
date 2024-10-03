export class RuleBuilder {
  constructor(
    public ruleFunction: Function|undefined = undefined,
  ) {}

  input(key: string): RuleCondition {
    return new RuleCondition(key, this);
  }

  build() {
    if(this.ruleFunction===undefined){
      return ()=>{};
    } else {
      return this.ruleFunction;
    }
  }

  and(): RuleBuilder{
    const newRuleBuilder = new RuleBuilder();
    const oldFunction = this.ruleFunction;
    const newFunction = (paramsObject: any) => {
      if(oldFunction){
        return oldFunction(paramsObject) && newRuleBuilder.build()(paramsObject);
      } else {
        return false;
      }
    }
    this.ruleFunction = newFunction;
    return newRuleBuilder;
  }

  or(): RuleBuilder{
    const newRuleBuilder = new RuleBuilder();
    const oldFunction = this.ruleFunction;
    const newFunction = (paramsObject: any) => {
      if(oldFunction){
        return oldFunction(paramsObject) || newRuleBuilder.build()(paramsObject);
      } else {
        return false;
      }
    }
    this.ruleFunction = newFunction;
    return newRuleBuilder;
  }
}

class RuleCondition{

  private notFlag = false;
  constructor(private key: string, private parent: RuleBuilder){}

  public greaterThan(value: number): RuleBuilder{
    const condition = (paramsObject: any) => {
      const result = paramsObject[this.key] > value;
      return result !== this.notFlag;
    }
    if(this.parent.ruleFunction === undefined){
      this.parent.ruleFunction = condition;
      return this.parent;
    }
    return new RuleBuilder(condition);
  }

  public lessThan(value: number): RuleBuilder{
    const condition = (paramsObject: any) => {
      const result = paramsObject[this.key] < value;
      return result !== this.notFlag;
    }
    if(this.parent.ruleFunction === undefined){
      this.parent.ruleFunction = condition;
      return this.parent;
    }
    return new RuleBuilder(condition);
  }

  public equalTo(value: number|string): RuleBuilder{
    const condition = (paramsObject: any) => {
      const result = paramsObject[this.key] === value;
      return result !== this.notFlag;
    }
    if(this.parent.ruleFunction === undefined){
      this.parent.ruleFunction = condition;
      return this.parent;
    }
    return new RuleBuilder(condition);
  }

  public not(): RuleCondition {
    this.notFlag = !this.notFlag;
    return this;
  }
}

const fail = {
  "name":"bob jr",
  "country":"US",
  "age":15
};

const pass = {
  "name":"bob",
  "country":"US",
  "age":35
};

const Jarret = {
  "name":"Jarret",
  "country":"CA",
  "age": 14
};

const Garret = {
  "name":"Garret",
  "country":"CA",
  "age": 19
};

// Syntax area
const builder = new RuleBuilder();
// can they enter the bar?
builder
.input("age").not().lessThan(21)
.or()
.input("country").equalTo("CA")
.and()
.input("age").not().lessThan(17)
.build();

const ruleFunction = builder.build();
console.log(ruleFunction);
console.log("Should fail:", ruleFunction(fail));
console.log("Should pass:", ruleFunction(pass));
console.log("Should fail:", ruleFunction(Jarret));
console.log("Should pass:", ruleFunction(Garret));
