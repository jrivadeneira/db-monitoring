import { DbOption } from "../components/db-table/DbOption";
import { Schema, SchemaField } from "./schema";

export class DbSelect{
  constructor(
    public selected: string,
    public options: string[],
  ){}

  public static fromString(str: string){
      const valueBreakout = (str as string).split("\x01");
      const first = valueBreakout[0];
      const remainder = valueBreakout.slice(1);
      return new DbSelect(first, remainder);
  }

  public toString():string{
    let str = this.selected;
    for(let eachString in this.options){
      str+= "\x01" + eachString;
    }
    return str;
  }
}

export class ReportField{
  constructor(
    public name: string,
    public type: string,
    public value: string | DbSelect = "",
    public reportId: number = 0,
    public id: number = 0,
  ){}

  public static fromData(data: any):ReportField{
    let val = data.value;
    if(data.type === "select" || data.type === "radio") {
      val = DbSelect.fromString(val);
    }
    return new ReportField(data.name, data.type, val, data.reportId, data.id);
  }

  public toDTO(): ReportField {
    this.value = this.value.toString();
    return this;
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
      if(!each.subFields){
        //each.subFields = [];
      }
      const select: DbSelect = new DbSelect(each.subFields[1],each.subFields);
      if(each.subFields.length > 0){
        return new ReportField(each.name, each.type, select)
      }
      return new ReportField(each.name, each.type);
    }));
  }

  static createEmpty(){
    return new Report(0, "", "", "", "", []);
  }

  static createFromSchema(schema: Schema):Report{
    return new Report(0, schema.name, "", "", "" + schema.id, schema.fields.map((each) => {
      if(!each.subFields){
        //each.subFields = [];
      }
      const select: DbSelect = new DbSelect(each.subFields[1],each.subFields);
      if (each.subFields.length > 0) {
        return new ReportField(each.name, each.type, select)
      }
      return new ReportField(each.name, each.type);
    }));
  }

  public toDTO(): Report{
    this.fields.forEach((each)=>{
      each.toDTO();
    });
    return this;
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
