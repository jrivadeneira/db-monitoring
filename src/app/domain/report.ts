import {DbOption} from "../components/db-table/DbOption";
import {Schema, SchemaField} from "./schema";

export class ReportField{
  constructor(
    public name: string,
    public type: string,
    public value: string = "",
    public reportId: number = 0,
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
    // public createdOn: Date = new Date(),
    public tableOptions: DbOption[] = [
      new DbOption("Select item", ()=>{
        return undefined;
      }),
      new DbOption("Create From", () => {
        const newReport = Report.createFromExisting(this);
        console.log(newReport);
        return newReport;
      }),
    ]
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
    // We need to get studies and sites
    // do reports need names?
    // reports can have a date field
    return new Report(0, schema.name, "", "", "" + schema.id, schema.fields.map((each) => {
      return new ReportField(each.name, each.type);
    }));
  }

  static clone(report: Report): Report {
    return new Report(report.id, report.name, report.studyId, report.siteId, report.schemaId, report.fields);
  }
  static createFromExisting(report: Report): Report {
    return new Report(0, report.name, report.studyId, report.siteId, report.schemaId, report.fields);
  }
}
