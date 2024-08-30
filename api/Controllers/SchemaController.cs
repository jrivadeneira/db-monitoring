using Microsoft.AspNetCore.Mvc;
using api.Domain;
using api.Data;

namespace api.Controller;

[ApiController]
[Route("[controller]")]
public class SchemaController : ControllerBase {

  private DataContextDapper dapper;
  public SchemaController(IConfiguration config){
    this.dapper = new DataContextDapper(config);
  }

  [HttpGet("", Name="getSchemas")]
  public IEnumerable<SchemaDTO> getSchemas() {

    String sql = "SELECT * FROM schemas;";
    IEnumerable<Schema> fetchedSchemas = dapper.getData<Schema>(sql);
    foreach (Schema eachSchema in fetchedSchemas){
      int id = eachSchema.id;
      bool singleton = eachSchema.singleton;
      String eachSql = "SELECT * FROM schema_fields where schemaId=" + id;
      IEnumerable<SchemaField> fetchedFields = dapper.getData<SchemaField>(eachSql);
      SchemaDTO eachDto = new SchemaDTO(id, eachSchema.name, fetchedFields.ToArray(), singleton);
      yield return eachDto;
    }
  }

  private int createSchema(String name, bool singleton){
    String sql = @"INSERT INTO schemas OUTPUT INSERTED.* VALUES ('" + name + "', " + (singleton ? 1 : 0) + ")";
    return dapper.getDataSingle<Schema>(sql).id;
  }

  private void createSchemaFields(IEnumerable<SchemaField> fields, int schemaId){
    String sql = "INSERT INTO schema_fields VALUES ";
    foreach(SchemaField eachField in fields){
      String newsql = sql + "(" + schemaId + ", '" + eachField.name + "', '" + eachField.type + "');";
      dapper.executeSql(newsql);
    }
  }

  [HttpPost]
  public SchemaDTO saveSchema(SchemaDTO schema) {
    // TODO ensure sanatized inputs prevent sql injection.
    int id = schema.id;
    String name = schema.name;
    bool singleton = schema.singleton;
    if(id == 0){
      // TODO make into a transaction so that it's a single move
      id = createSchema(name, singleton);
      createSchemaFields(schema.fields, id);
      schema.id = id;
    }
    return schema;
  }
}
