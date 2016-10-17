using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMarksBookmarksApi.Models
{
    public class Bookmark
    {
        public string Key { get; set; }
        public string User { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
