namespace api.Domain;

public class SchemaDTO {
  public int id { get; set; }
  public String name { get; set; }
  public SchemaField[] fields { get; set; }
  public bool singleton { get; set; }
  public SchemaDTO(){}

  public SchemaDTO(int id, String name, SchemaField[] fields, bool singleton = false){
    this.id = id;
    this.name = name;
    this.fields = fields;
    this.singleton = singleton;
  }
}

public class SchemaField{
  public int id { get; set; }
  public int schemaId { get; set; }
  public String name{ get; set; }
  public String type{ get; set; }
  public String subfields{ get; set; }
  public SchemaField(){}

  public SchemaField(int id, String name, String type){
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public SchemaField(int id, int schemaId, String name, String type, String subfields){
    this.id = id;
    this. schemaId = id;
    this.name = name;
    this.type = type;
    this.subfields = subfields;
  }
}

public class Schema {
  public int id { get; set; }
  public String name { get; set; }
  public bool singleton { get; set; }

  public Schema(int id, String name, bool singleton){
    this.id = id;
    this.name = name;
    this.singleton = singleton;
  }
}
