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
        private SqlConnection connection;

        public bool MakeDatabaseConnection()
        {
            if (connection != null)
                return true;

            connection = new SqlConnection();
            connection.ConnectionString = "SERVER=DESKTOP-1T3FQ28\\SQLEXPRESS;" + "DATABASE=" + "bookmarks" + ";" + "UID=" + "linas" + ";" + "PASSWORD=" + "linas" + ";MultipleActiveResultSets=True;";
            connection.Open();
            if (connection.State == System.Data.ConnectionState.Open)
                return true;

            return false;
        }

        public BookmarkRepository()
        {
            MakeDatabaseConnection();
        }

        public void Add(Bookmark mark)
        {
            mark.Key = Guid.NewGuid().ToString();

            string sqlText = "INSERT INTO t_bookmarks ([key], [user], [link], [description]) VALUES('" + mark.Key +
                             "', '" + mark.User + "', '" + mark.Link + "', '" + mark.Description + "');";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            SqlDataReader rdr = cmd.ExecuteReader();
            
        }

        public IEnumerable<Bookmark> GetAll()
        {
            ConcurrentDictionary<string, Bookmark> m = new ConcurrentDictionary<string, Bookmark>();
            string sqlText = "SELECT * FROM t_bookmarks;";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Bookmark temp = new Bookmark();
                    temp.Key = reader.GetString(0).TrimEnd();
                    temp.User = reader.GetString(1).TrimEnd();
                    temp.Link = reader.GetString(2).TrimEnd();
                    temp.Description = reader.GetString(3).TrimEnd();
                    //temp.Date = reader.GetDateTime(4);
                    m[temp.Key] = temp;
                    
                }
            }
            _marks = m;
            return m.Values;
        }

        public IEnumerable<Bookmark> GetAllUserBookmarks(string user)
        {
            ConcurrentDictionary<string, Bookmark> m = new ConcurrentDictionary<string, Bookmark>();
            string sqlText = "SELECT * FROM t_bookmarks;";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Bookmark temp = new Bookmark();
                    temp.Key = reader.GetString(0).TrimEnd();
                    temp.User = reader.GetString(1).TrimEnd();
                    temp.Link = reader.GetString(2).TrimEnd();
                    temp.Description = reader.GetString(3).TrimEnd();
                    //temp.Date = reader.GetDateTime(4);
                    if (temp.User == user)
                    {
                        m[temp.Key] = temp;
                    }

                }
            }
            return m.Values;
        }

        public Bookmark Find(string key)
        {
            GetAll();
            Bookmark mark;
            _marks.TryGetValue(key, out mark);
            return mark;
        }

        public Bookmark Remove(string key)
        {
            GetAll();

            Bookmark mark;
            _marks.TryRemove(key, out mark);

            if (key.Length < 200)
            {
                for (int i = 0; i < (200 - key.Length); i++)
                {
                    key += " ";
                }
            }
            string sqlText =
                "DELETE FROM t_bookmarks WHERE [key]='" + key + "';";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            cmd.ExecuteNonQuery();


            return mark;
        }

        public void Update(Bookmark mark)
        {
            string sqlText ="UPDATE t_bookmarks SET [user]='" + mark.User + "', [link]='" + mark.Link + "', [description]='" + mark.Description + "' WHERE [key]='" + mark.Key + "';";
            SqlCommand cmd = new SqlCommand(sqlText, connection);
            cmd.ExecuteNonQuery();
        }
    }
}
