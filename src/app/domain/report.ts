import {Schema, SchemaField} from "./schema";

export class ReportField{
  constructor(
    public fieldName: string,
    public fieldType: string,
    public fieldValue: string = "",
    public reportId: string = "",
  ){}
}

export class Report{

  constructor(
    public id: number = 0,
    public name: string,
    public studyId: string,
    public siteId: string,
    public schemaId: string,
    public fields: ReportField[],
  ){}

  static preview(fields: SchemaField[]): Report {
    return new Report(0, "", "", "", "", fields.map((each) => {
      return new ReportField(each.name, each.type)
    }));
  }

  static createFromSchema(schema: Schema):Report{
    // We need to get studies and sites
    // do reports need names?
    // reports can have a date field
    return new Report(0, schema.name, "", "", "" + schema.id, schema.fields.map((each) => {
      return new ReportField(each.name, each.type);
    }));
  }

  static createFromExisting(report: Report): Report {

    return {
      ...report,
      id:0
    };
  }
}
