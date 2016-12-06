using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LMarksBookmarksApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace LMarksBookmarksApi.Controllers
{
    [Route("m")] //was api/[controller]
    [DisableCors]
    public class BookmarksController : Controller
    {
        public BookmarksController(IBookmarkRepository bookmarks)
        {
            Bookmarks = bookmarks;
        }

        public IBookmarkRepository Bookmarks { get; set; }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Bookmark> GetAll()
        {
            return Bookmarks.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetMark")]
        public IActionResult GetById(string id)
        {
            var mark = Bookmarks.Find(id);
            if (mark == null)
            {
                NotFound();
            }
            return new ObjectResult(mark);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody]Bookmark mark)
        {
            if (mark == null)
            {
                return BadRequest();
            }
            Bookmarks.Add(mark);
            return CreatedAtRoute("GetMark", new { id = mark.Key}, mark);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]Bookmark mark)
        {
            if (mark == null || mark.Key != id)
            {
                return BadRequest();
            }

            var bookmark = Bookmarks.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }
            Bookmarks.Update(mark);
            return new NoContentResult();
        }

        [HttpPatch("{id}")]
        public IActionResult Update([FromBody] Bookmark mark, string id)
        {
            if (mark == null)
            {
                return BadRequest();
            }

            var bookmark = Bookmarks.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            mark.Key = bookmark.Key;

            Bookmarks.Update(mark);
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {

            var bookmark = Bookmarks.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            Bookmarks.Remove(id);
            return new NoContentResult();
        }
    }
}
