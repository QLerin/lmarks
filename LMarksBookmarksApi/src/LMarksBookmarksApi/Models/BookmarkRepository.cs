using Dapper;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace LMarksBookmarksApi.Models
{
    public class BookmarkRepository : IBookmarkRepository
    {
        private ConcurrentDictionary<string, Bookmark> _marks = new ConcurrentDictionary<string, Bookmark>();
        private SqlConnection _connection;

        public bool MakeDatabaseConnection()
        {
            if (_connection != null)
                return true;

            _connection = new SqlConnection();
            _connection.ConnectionString = "SERVER=DESKTOP-1T3FQ28\\SQLEXPRESS;" + "DATABASE=" + "bookmarks" + ";" + "UID=" + "linas" + ";" + "PASSWORD=" + "linas" + ";MultipleActiveResultSets=True;";
            _connection.Open();
            return (_connection.State == System.Data.ConnectionState.Open);
        }

        public BookmarkRepository()
        {
            MakeDatabaseConnection();
        }

        public void Add(Bookmark mark)
        {
            mark.Key = Guid.NewGuid().ToString();
            mark.Date = DateTime.Now;

            _connection.Execute(@"INSERT INTO t_bookmarks ([key], [user], [link], [description], [date], [visible]) VALUES (@a, @b, @c, @d, @e, @f);",
                new { a = mark.Key, b = mark.User, c = mark.Link, d = mark.Description, e = mark.Date, f = 1});
        }

        public IEnumerable<Bookmark> GetAll()
        {
            var m = _connection.Query<Bookmark>("SELECT * FROM t_bookmarks");
            return m;
        }

        public IEnumerable<Bookmark> GetAllUserBookmarks(string user)
        {
            var m = _connection.Query<Bookmark>("SELECT * FROM t_bookmarks WHERE [user]=@a", new {a = user});
            return m;
        }

        public Bookmark Find(string key)
        {
            var m = _connection.Query<Bookmark>("SELECT * FROM t_bookmarks WHERE [key] = @key", new {key});
            return m.FirstOrDefault(); ;
        }

        public Bookmark Remove(string key)
        {
            var m = Find(key);
            _connection.Execute(@"DELETE FROM t_bookmarks WHERE [key]=@key", new { key });
            return m;
        }

        public void Update(Bookmark m)
        {
            m.Date = DateTime.Now;
            _connection.Execute(@"UPDATE t_bookmarks SET [user] = @a, [link] = @b, [description] = @c, [date] = @d, [visible] = @f WHERE [key] = @e;", 
                new { a = m.User, b = m.Link, c = m.Description, d = m.Date, e = m.Key, f = m.Visible});
        }
    }
}
