import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { RuleBuilder } from '../../domain/rule';

class RuleData{
  constructor(
    public property: string = '',
      public not:boolean = false,
      public condition:string = 'equal_to',
      public target:string = '',
      public andChecked:boolean = false,
      public orChecked: boolean = false,
      public and:RuleData|undefined = undefined,
      public or:RuleData|undefined = undefined,
  ){}
    clone(): RuleData{
      return new RuleData(this.property,this.not,this.condition,this.target,this.andChecked,false, this.and ? this.and.clone() : undefined,undefined);
    }
}


@Component({
  selector: 'app-logic-editor',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './logic-editor.component.html',
  styleUrl: './logic-editor.component.scss'
})
export class LogicEditorComponent {
  fail = {
    "name":"bob jr",
    "country":"US",
    "age": 15
  };

  pass = {
    "name":"bob",
    "country":"US",
    "age": 35
  };

  Jarret = {
    "name":"Jarret",
    "country":"CA",
    "age": 14
  };

  Garret = {
    "name":"Garret",
    "country":"CA",
    "age": 19
  };

  german = {
    "name":"Hans",
    "country":"DE",
    "age": 17
  }
  germanfail = {
    "name":"Wolfgang",
    "country":"DE",
    "age": 11
  }

  rule = model(new RuleData());
  constructor() {}

  orCheckbox = signal(false);
  andCheckbox = signal(false);

  processRule(property:string, not:boolean, condition:string,target:string|number, builder:RuleBuilder) {
    const isNumber = (val: any) => (typeof val ==='number' && val - val === 0)||(typeof val === 'string' && Number.isFinite(+val) && val.trim() !== '');
    const theta = builder.input(property);
    if(not) {
      theta.not();
    }
    if (condition === 'greater_than') {
      if(isNumber(target)) {
        theta.greaterThan(+target);
      } else {
        theta.greaterThan(target);
      }
    } else if (condition === 'less_than') {
      if(isNumber(target)) {
        theta.lessThan(+target);
      } else {
        theta.lessThan(target);
      }
    } else {
      if(isNumber(target)) {
        theta.equalTo(+target);
      } else {
        theta.equalTo(target);
      }
    }
  }

  // a simpler recursive solution
  buildRuleTree(rule: RuleData, builder: RuleBuilder){
    const property = rule.property;
    const not = rule.not;
    const condition = rule.condition;
    const target = rule.target;
    this.processRule(property, not, condition, target, builder)

    if(rule.andChecked && rule.and){
      this.buildRuleTree(rule.and, builder.and());
    }

    if(rule.orChecked && rule.or){
      this.buildRuleTree(rule.or, builder.or());
    }
    return builder.build();
  }

  test() {
    console.log("Testing...");
    let currentRule: RuleData|undefined = this.rule();
    console.log("Rule: ", currentRule);
    const originalBuilder = new RuleBuilder();
    const newRule = this.buildRuleTree(currentRule, originalBuilder);
    console.log("test pass : ", newRule(this.pass));
    console.log("test fail: ", newRule(this.fail));
    console.log("test canada pass: ", newRule(this.Garret));
    console.log("test canada fail: ", newRule(this.Jarret));
    console.log("test german pass: ", newRule(this.german));
    console.log("test german fail: ", newRule(this.germanfail));
  }

  get subRule(): RuleData{
    const subRule = this.rule().and;
    return subRule?subRule:this.rule().and = new RuleData();
  }

  get sideRule(): RuleData{
    const subRule = this.rule().or;
    return subRule?subRule:this.rule().or = this.rule().clone();
  }
}
