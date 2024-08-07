
export class SchemaField{
  constructor(
    public name: string,
    public type: string,
    public editingName: boolean = false
  ){}
}

export class Schema {
  constructor(
    public name: string,
    public fields: SchemaField[],
    public singleton: boolean = false,
  ){}
}
