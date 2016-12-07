using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LMarksUsersApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LMarksUsersApi.Controllers
{
     [Route("u")]
    [DisableCors]
    public class UsersController : Controller
    {
        public UsersController(IUsersRepository userlist)
        {
            Userlist = userlist;
        }

        public IUsersRepository Userlist { get; set; }

        // GET: u
        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return Userlist.GetAll();
        }

        // GET u/name
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(string id)
        {
            var user = Userlist.Find(id);
            if (user == null)
            {
                NotFound();
            }
            return new ObjectResult(user);
        }


        // POST u
        [HttpPost]
        public IActionResult Create([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            Userlist.Add(user);
            return CreatedAtRoute("GetUser", new { id = user.Key }, user);
        }

        // PUT u/name
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]User user)
        {
            if (user == null || user.Key != id)
            {
                return BadRequest();
            }

            var u = Userlist.Find(id);
            if (u == null)
            {
                return NotFound();
            }
            Userlist.Update(user);
            return new NoContentResult();
        }
        
        [HttpPatch("{id}")]
        public IActionResult Update([FromBody] User user, string id)
        {
            if (user == null)
            {
                return BadRequest();
            }

            var bookmark = Userlist.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            user.Key = bookmark.Key;

            Userlist.Update(user);
            return new NoContentResult();
        }

        // DELETE u/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {

            var bookmark = Userlist.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            Userlist.Remove(id);
            return new NoContentResult();
        }
    }
    
}
