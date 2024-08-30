using Microsoft.AspNetCore.Mvc;
using api.Domain;
using api.Data;
namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase {
  DataContextDapper dapper;

  public UserController(IConfiguration config) {
    this.dapper = new DataContextDapper(config);
  }

	[HttpGet("", Name="getUsers")]
	public IEnumerable<UserDTO> getUsers () {
    String sql = @"SELECT [id], [name], [password], [email], [access] FROM monitoring.dbo.users;";
    IEnumerable<UserDTO> users = dapper.getData<UserDTO>(sql);
		return users;
	}

	[HttpPost("", Name="saveUsers")]
	public UserDTO save(UserDTO user) {
		return user;
	}
}
