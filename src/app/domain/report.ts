import { DbOption } from "../components/db-table/DbOption";
import { Schema, SchemaField } from "./schema";

export class ReportField{
  constructor(
    public name: string,
    public type: string,
    public value: string = "",
    public reportId: number = 0,
    public id: number = 0,
  ){}

  public static fromData(data: any):ReportField{
    return new ReportField(data.name,data.type,data.value,data.reportId, data.id);
  }
}

export class Report{

  constructor(
    public id: number = 0,
    public name: string,
    public studyId: string,
    public siteId: string,
    public schemaId: string,
    public fields: ReportField[],
    public tableOptions: DbOption[] = []
  ){}

  static preview(fields: SchemaField[]): Report {
    return new Report(0, "", "", "", "", fields.map((each) => {
      return new ReportField(each.name, each.type)
    }));
  }

  static createEmpty(){
    return new Report(0, "", "", "", "", [])
  }

  static createFromSchema(schema: Schema):Report{
    return new Report(0, schema.name, "", "", "" + schema.id, schema.fields.map((each) => {
      return new ReportField(each.name, each.type);
    }));
  }

  public static fromData(reportData: any) :Report {
    return new Report(reportData.id,reportData.name,reportData.studyId,reportData.siteId,reportData.schemaId,reportData.fields.map((each:ReportField) => {
      return ReportField.fromData(each);
    }));
  }

  static clone(report: Report): Report {
    return new Report(report.id, report.name, report.studyId, report.siteId, report.schemaId, report.fields);
  }
  static createFromExisting(report: Report): Report {
    return new Report(0, report.name, report.studyId, report.siteId, report.schemaId, report.fields);
  }
}
