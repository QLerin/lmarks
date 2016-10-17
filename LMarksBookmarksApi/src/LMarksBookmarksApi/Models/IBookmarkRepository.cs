using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMarksBookmarksApi.Models
{
    public interface IBookmarkRepository
    {
        void Add(Bookmark mark);
        IEnumerable<Bookmark> GetAll();
        Bookmark Find(string key);
        Bookmark Remove(string key);
        void Update(Bookmark mark);
    }
}
