export class DbOption {
  constructor(
    public name: string,
    public run: Function,
    public params: any = undefined
  ){}

  toString(): string {
    return this.name;
  }
}

export class DbOptionBuilder {
  constructor(public option:DbOption = new DbOption("",()=>{})){}
}
