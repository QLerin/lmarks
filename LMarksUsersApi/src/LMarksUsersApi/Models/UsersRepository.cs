using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace LMarksUsersApi.Models
{
    public class UsersRepository : IUsersRepository
    {
        private static ConcurrentDictionary<string, User> _users =
      new ConcurrentDictionary<string, User>();

        private SqlConnection connection;
        public bool MakeDatabaseConnection()
        {
            if (connection != null)
                return true;

            connection = new SqlConnection();
            connection.ConnectionString = "SERVER=DESKTOP-1T3FQ28\\SQLEXPRESS;" + "DATABASE=" + "users" + ";" + "UID=" + "linas" + ";" + "PASSWORD=" + "linas" + ";MultipleActiveResultSets=True;";
            connection.Open();
            if (connection.State == System.Data.ConnectionState.Open)
                return true;

            return false;
        }

        public UsersRepository()
        {
            MakeDatabaseConnection();
            Add(new User { Email = "test@test.com" });
        }

        public IEnumerable<User> GetAll()
        {
            ConcurrentDictionary<string, User> u = new ConcurrentDictionary<string, User>();
            string sqlText = "SELECT * FROM t_users;";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    User temp = new User();
                    temp.Key = reader.GetString(0).TrimEnd();
                    temp.Login = reader.GetString(1).TrimEnd();
                    temp.Email = reader.GetString(2).TrimEnd();
                    //temp.PasswordHash = reader.GetString(3).TrimEnd();
                    //temp.SecurityStamp = reader.GetString(4).TrimEnd();
                    //temp.Date = reader.GetDateTime(4);
                    u[temp.Key] = temp;

                }
            }
            _users = u;
            return u.Values;
        }

        public void Add(User u)
        {
            u.Key = Guid.NewGuid().ToString();

            string sqlText = "INSERT INTO t_users ([key], [login], [email], [passwordHash], [securityStamp]) VALUES('" + u.Key +
                             "', '" + u.Login + "', '" + u.Email + "', '" + u.PasswordHash + "', '" + u.SecurityStamp + "');";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            SqlDataReader rdr = cmd.ExecuteReader();
        }

        public User Find(string key)
        {
            GetAll();
            User u;
            _users.TryGetValue(key, out u);
            return u;
        }

        //public User FindByLogin(string login)
        //{
        //    GetAll();
        //    foreach (var person in _users)
        //    {
        //        if (person.Value.Login == login)
        //        {
        //            return person.Value;
        //        }
        //    }
        //    return null;
        //}

        public User Remove(string key)
        {
            GetAll();

            User u;
            _users.TryRemove(key, out u);

            if (key.Length < 200)
            {
                for (int i = 0; i < (200 - key.Length); i++)
                {
                    key += " ";
                }
            }
            string sqlText =
                "DELETE FROM t_users WHERE [key]='" + key + "';";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            cmd.ExecuteNonQuery();


            return u;
        }

        public void Update(User u)
        {
            string sqlText = "UPDATE t_users SET [login]='" + u.Login + "', [email]='" + u.Email + "', [passwordHash]='" + u.PasswordHash + "', [securityStamp]='" + u.SecurityStamp + "' WHERE [key]='" + u.Key + "';";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            cmd.ExecuteNonQuery();
        }
    }
}
