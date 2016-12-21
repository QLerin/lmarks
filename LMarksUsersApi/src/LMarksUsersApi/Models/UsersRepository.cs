using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

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
        }

        public IEnumerable<User> GetAll()
        {
            var u = connection.Query<User>("SELECT [login] FROM t_users");
            return u;
        }

        public void Add(User u)
        {
            u.Key = Guid.NewGuid().ToString();
            connection.Execute(@"INSERT INTO t_users ([key], [login], [email], [passwordHash], [securityStamp]) values (@a, @b, @c, @d, @e)",
                new {a = u.Key, b = u.Login, c = u.Email, d = u.PasswordHash, e = u.SecurityStamp});
        }

        public User Find(string key)
        {
            var u = connection.Query<User>("select [key], [login], [email], [passwordHash], [securityStamp] FROM t_users where [key] = @key", new {key} );
            return u.FirstOrDefault();
        }

        public User Remove(string key)
        {
            var u = Find(key);
            connection.Execute(@"DELETE FROM t_users WHERE [key]=@key", new {key});

            return u;
        }

        public void Update(User u)
        {
            connection.Execute(@"UPDATE t_users SET [login]=@a, [email]=@b, [passwordHash]=@c, [securityStamp]=@d WHERE [key]=@e;", new { a = u.Login, b = u.Email, c = u.PasswordHash, d = u.SecurityStamp,e = u.Key });
        }
    }
}
