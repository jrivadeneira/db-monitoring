using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;

namespace api.Data;

class DataContextDapper {
   private readonly IConfiguration config;

   public DataContextDapper(IConfiguration config){
     this.config = config;
   }

   public IEnumerable<T> getData<T>(string sql){
      IDbConnection connection = new SqlConnection(config.GetConnectionString("Default"));
      return connection.Query<T>(sql);
   }

   public T getDataSingle<T>(string sql){
      IDbConnection connection = new SqlConnection(config.GetConnectionString("Default"));
      return connection.QuerySingle<T>(sql);
   }

   public bool executeSql(string sql) {
      IDbConnection connection = new SqlConnection(config.GetConnectionString("Default"));
      return connection.Execute(sql) > 0;
   }

   public int executeSqlWithRowCount(string sql) {
      IDbConnection connection = new SqlConnection(config.GetConnectionString("Default"));
      return connection.Execute(sql);
   }
}
