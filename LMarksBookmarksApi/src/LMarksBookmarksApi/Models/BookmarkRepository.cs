using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMarksBookmarksApi.Models
{
    public class BookmarkRepository : IBookmarkRepository
    {
        private static ConcurrentDictionary<string, Bookmark> _marks = new ConcurrentDictionary<string, Bookmark>();

        public BookmarkRepository()
        {
            Add(new Bookmark { User = "Li", Description = "Google", Link = "http://www.google.com/"});
        }

        public void Add(Bookmark mark)
        {
            mark.Key = Guid.NewGuid().ToString();
            _marks[mark.Key] = mark;
        }

        public IEnumerable<Bookmark> GetAll()
        {
            return _marks.Values;
        }

        public Bookmark Find(string key)
        {
            Bookmark mark;
            _marks.TryGetValue(key, out mark);
            return mark;
        }

        public Bookmark Remove(string key)
        {
            Bookmark mark;
            _marks.TryRemove(key, out mark);
            return mark;
        }

        public void Update(Bookmark mark)
        {
            _marks[mark.Key] = mark;
        }
    }
}
