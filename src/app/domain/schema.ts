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
  ){

    }

    public static fromData(schemaData: any) :Schema {
      return new Schema(
        schemaData.name,
        schemaData.fields,
        schemaData.singleton,
        schemaData.id);
    }
    private compareFields(fields: SchemaField[]) :boolean {
      let ret = true;
      this.fields.forEach((eachField: SchemaField) => {
        if(!fields.includes(eachField)) {
          ret = false;
        }
      });
      return ret;
    }

    public equals(schema: Schema) :boolean {
      return this === schema || (
        this.name == schema.name &&
          this.singleton == schema.singleton &&
          this.fields.length == schema.fields.length &&
          this.compareFields(schema.fields)
      );
    }

    public static createEmptySchema(): Schema {
      return new Schema("", []);
    }
}
