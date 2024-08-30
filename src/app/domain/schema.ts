
export class SchemaField{
  constructor(
    public name: string,
    public type: string,
    public editingName: boolean = false,
    public id: number = 0,
    public schemaId: number = 0,
  ){}
}

export class Schema {
  constructor(
    public name: string,
    public fields: SchemaField[],
    public singleton: boolean = false,
    public id: number = 0,
  ){}
}
