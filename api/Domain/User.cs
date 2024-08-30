namespace api.Domain;

public class UserDTO{
  public int id{ get; set; }
  public String name{ get; set; }
  public String password{ get; set; }
  public String email{ get; set; }
  public String access{ get; set; }

  public UserDTO ( int id, String name, String password, String email, String access) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.access = access;
  }
}
