using Microsoft.AspNetCore.Mvc;
using api.Domain;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class Rule : ControllerBase {

	[HttpGet("", Name="getRules")]
	public IEnumerable<RuleDTO> getRules () {
		return [];
	}

	[HttpPost("", Name="saveRules")]
	public RuleDTO save(RuleDTO rule) {
		return rule;
	}
}