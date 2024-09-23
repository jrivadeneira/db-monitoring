namespace api.Domain;

public class ReportDTO {
  public int id { get; set; }
  public String name { get; set; }
  public String studyId { get; set; }
  public String siteId { get; set; }
  public String schemaId { get; set; }
  public ReportField[] fields{ get; set; }
  public bool singleton { get; set; }

  public ReportDTO(){
    this.name = "";
    this.studyId = "";
    this.siteId = "";
    this.schemaId = "";
    this.fields = [];
  }

  public ReportDTO (String name, ReportField[] fields, bool singleton = false) {
    this.name = name;
    this.studyId = "";
    this.siteId = "";
    this.schemaId = "";
    this.fields = fields;
    this.singleton = singleton;
  }

  public ReportDTO (int id, String name, ReportField[] fields, bool singleton = false) {
    this.id = id;
    this.name = name;
    this.studyId = "";
    this.siteId = "";
    this.schemaId = "";
    this.fields = fields;
    this.singleton = singleton;
  }
}

public class Report {
  public int id { get; set; }
  public String name{ get; set; }
  public bool singleton;

  public Report(String name, bool singleton = false) {
    this.name = name;
    this.singleton = singleton;
  }
  public Report(int id, String name, bool singleton = false) {
    this.id = id;
    this.name = name;
    this.singleton = singleton;
  }
}

public class ReportField{
  public int id { get; set; }
  public int reportId { get; set; }
  public String name{ get; set; }
  public String type{ get; set; }
  public String value{ get; set; }

  public ReportField(){
    name = "";
    type = "";
    value = "";
  }

  public ReportField(int id, int reportId, String name, String type, String value) {
    this.id = id;
    this.reportId = reportId;
    this.name = name;
    this.type = type;
    this.value = value;
  }

  public ReportField(int reportId, String name, String type, String value) {
    this.reportId = reportId;
    this.name = name;
    this.type = type;
    this.value = value;
  }
}
