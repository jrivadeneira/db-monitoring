using Microsoft.AspNetCore.Mvc;
using api.Domain;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class Report : ControllerBase {

	[HttpGet("", Name="getReports")]
	public IEnumerable<ReportDTO> getReports () {
		return [];
	}

	[HttpPost("", Name="saveReports")]
	public ReportDTO save(ReportDTO report) {
		return report;
	}
}
