import {SchemaField} from "./schema";

export class ReportField{
  constructor(
    public fieldName: string,
    public fieldType: string,
    public fieldValue: string = "",
  ){}
}

export class Report{

  constructor(
    public studyId: string,
    public siteId: string,
    public reportId: string,
    public schemaId: string,
    public fields: ReportField[],
  ){}

  static preview(fields: SchemaField[]): Report {
    return new Report("", "", "", "", fields.map((each) => {
      return new ReportField(each.name, each.type)
    }));
  }
}
