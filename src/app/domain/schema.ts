export class SchemaFieldDTO{
  constructor(
    public name: string,
    public type: string,
      public id: number = 0,
      public schemaId: number = 0,
      public subFields: string = '',
  ){}
    public static fromSchemaField(field: SchemaField){
      const name = field.name;
      const type = field.type;
      const id = field.id;
      const schemaId = field.schemaId;
      const subFields = field.subFieldsString;
      return new SchemaFieldDTO(name,type,id,schemaId,subFields);
    }
}
export class SchemaField{
  constructor(
    public name: string,
    public type: string,
    public editingName: boolean = false,
      public id: number = 0,
      public schemaId: number = 0,
      private _subFields: string|string[] = [],
  ){}

    public static fromData(data: any): SchemaField{
      return new SchemaField(data.name,data.type, false, data.id, data.schemaId, data._subFields ? data._subFields : data.subfields);
    }

    public static createEmpty(): SchemaField{
      return new SchemaField("", "", false);
    }

    public extractSubfields(): string[] {
      if(Array.isArray(this._subFields)){
        return this._subFields;
      }
      return this._subFields = (this._subFields as string).split("\x01");
    }

    public get subFields():string[] {
      if (typeof this._subFields === 'string') {
        return this.extractSubfields();
      } else {
        return this._subFields as unknown as string[];
      }
    }

    public get subFieldsString(): string{
      if(typeof this._subFields === "string"){
        return this._subFields;
      }
      let subfields = this.subFields[0];
      this._subFields.slice(1).forEach((each)=>{
        subfields += "\x01" + each;
      });
      return subfields
    }
}

export class SchemaDTO {
  constructor(
    public name: string,
    public fields: SchemaFieldDTO[],
    public singleton: boolean = false,
      public id: number = 0,
  ){}
    public static fromSchema(schema: Schema){
      return new SchemaDTO(schema.name, schema.fields.map((each:SchemaField) => {
        return SchemaFieldDTO.fromSchemaField(each);
      }), schema.singleton, schema.id);
    }
}

export class Schema {
  constructor(
    public name: string,
    public fields: SchemaField[],
    public singleton: boolean = false,
      public id: number = 0,
  ){
      this.fields = fields.map((each:any) => {
        return SchemaField.fromData(each);
      });
      this.fields.forEach((each)=>{
        if(each.type==='select' || each.type === 'radiobutton') {
          each.extractSubfields();
        }
      })
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

    public asDTO(): SchemaDTO{
      return SchemaDTO.fromSchema(this);
    }
}
