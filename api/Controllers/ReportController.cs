using Microsoft.AspNetCore.Mvc;
using api.Domain;
using api.Data;
namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ReportController : ControllerBase {

  private DataContextDapper dapper;
  public ReportController(IConfiguration config){
    this.dapper = new DataContextDapper(config);
  }

  [HttpGet("", Name="getReports")]
  public IEnumerable<ReportDTO> getReports() {

    String sql = "SELECT * FROM reports;";
    IEnumerable<Report> fetchedReports = dapper.getData<Report>(sql);
    foreach (Report eachReport in fetchedReports){
      int id = eachReport.id;
      bool singleton = eachReport.singleton;
      String eachSql = "SELECT * FROM report_fields where reportId=" + id;
      IEnumerable<ReportField> fetchedFields = dapper.getData<ReportField>(eachSql);
      ReportDTO eachDto = new ReportDTO(id, eachReport.name, fetchedFields.ToArray(), singleton);
      yield return eachDto;
    }
  }

  private int createReport(String name, bool singleton){
    String sql = @"INSERT INTO reports OUTPUT INSERTED.* VALUES ('" + name + "', " + (singleton ? 1 : 0) + ")";
    return dapper.getDataSingle<Report>(sql).id;
  }

  private void createReportFields(IEnumerable<ReportField> fields, int reportId){
    String sql = "INSERT INTO report_fields OUTPUT INSERTED.* VALUES ";
    foreach (ReportField eachField in fields) {
      String newsql = sql + "(" + reportId + ", '" + eachField.name + "', '" + eachField.type + "', '" + eachField.value +  "');";
      Console.WriteLine(newsql);
      eachField.reportId = reportId;
      ReportField inserted = dapper.getDataSingle<ReportField>(newsql);
      eachField.id = inserted.id;
    }
  }

  private void updateReport(Report report){
    int id = report.id;
    String name = report.name;
    bool singleton = report.singleton;
    String sql = @"update reports SET name='" + name + "', singleton=" + (singleton ? 1 : 0) + " WHERE id=" + id + ";";
    dapper.executeSql(sql);
  }

  private void updateReportFields(IEnumerable<ReportField> fields){
    String sql = "UPDATE report_fields SET ";
    foreach (ReportField eachField in fields) {
      int id = eachField.id;
      int reportId = eachField.reportId;
      String name = eachField.name;
      String type = eachField.type;
      String value = eachField.value;
      String newsql = sql + "reportId=" + reportId + ", name='" + name + "', type='" + type + "', value='" + value + "'";
      newsql += " WHERE id=" + id + ";";
      dapper.executeSql(newsql);
    }
  }

  [HttpPost]
  public ReportDTO saveReport(ReportDTO report) {
    // TODO ensure sanatized inputs prevent sql injection.
    int id = report.id;
    String name = report.name;
    bool singleton = report.singleton;
    if(id == 0) {
      // TODO make into a transaction so that it's a single move
      id = createReport(name, singleton);
      createReportFields(report.fields, id);
      report.id = id;
    } else {
      Console.WriteLine("Trying update...");
      updateReport(new Report(report.id,report.name,report.singleton));
      updateReportFields(report.fields);
    }
    return report;
  }
}
