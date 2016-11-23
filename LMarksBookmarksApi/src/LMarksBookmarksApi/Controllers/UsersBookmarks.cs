using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LMarksBookmarksApi.Models;

namespace LMarksBookmarksApi.Controllers
{
    [Route("b")]
    public class UsersBookmarks : Controller
    {


        [HttpGet("{id}")]
        public IEnumerable<Bookmark> GetById(string id)
        {
            IEnumerable<Bookmark> a = new List<Bookmark>();
            string login = "";
            User userlist = new User();
            IList<User> uL = userlist.GetAll();
            foreach (var user in uL)
            {
                if (user.Login == id)
                {
                    login = user.Login;
                }
            }
            if (login == "")
            {
                NotFound();
                return a;
            }
                BookmarkRepository rep = new BookmarkRepository();
                a = rep.GetAllUserBookmarks(login);

            return a;
        }
    }
}
