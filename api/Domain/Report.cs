namespace api.Domain;

public class ReportDTO {
  public int id { get; set; }
  public String name{ get; set; }
  public ReportField[] fields{ get; set; }
  public bool singleton;

  public ReportDTO (String name, ReportField[] fields, bool singleton = false) {
    this.name = name;
    this.fields = fields;
    this.singleton = singleton;
  }
  public ReportDTO (int id, String name, ReportField[] fields, bool singleton = false) {
    this.id = id;
    this.name = name;
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

  public ReportField(int reportId, String name, String type, String value) {
    this.reportId = reportId;
    this.name = name;
    this.type = type;
    this.value = value;
  }
}
