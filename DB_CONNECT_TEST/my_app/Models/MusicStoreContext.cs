using MySql.Data.MySqlClient;  
using System;  
using System.Collections.Generic;  
  
namespace my_app.Models  
{  
    public class MusicStoreContext  
    {  
        public string ConnectionString { get; set; }  
  
        public MusicStoreContext(string connectionString)  
        {  
            this.ConnectionString = connectionString;  
        }  
  
        private MySqlConnection GetConnection()  
        {  
            return new MySqlConnection(ConnectionString);  
        }

        public TestTable GetTestTableById(int id)
        {
            TestTable Result = null;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand($"select * from TestTable where id = {id.ToString()}", conn); 
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())  
                    {  
                        Result = new TestTable()  
                        {  
                            id = Convert.ToInt32(reader["id"]),  
                            firstname = reader["firstname"].ToString()  
                        };  
                    } 
                }
            }

            return Result;
        }

        public List<TestTable> GetAllTestTableItems()  
        {  
            List<TestTable> list = new List<TestTable>();  
  
            using (MySqlConnection conn = GetConnection())  
            {
                conn.Open();  
                MySqlCommand cmd = new MySqlCommand("select * from TestTable", conn);  
                using (var reader = cmd.ExecuteReader())  
                {  
                    while (reader.Read())  
                    {  
                        list.Add(new TestTable()  
                        {  
                            id = Convert.ToInt32(reader["id"]),  
                            firstname = reader["firstname"].ToString()  
                        });  
                    }  
                }  
            }  
            return list;  
        }  

    }  
}