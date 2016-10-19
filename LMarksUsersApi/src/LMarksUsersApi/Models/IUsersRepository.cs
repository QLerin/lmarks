using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMarksUsersApi.Models
{
    public interface IUsersRepository
    {
        void Add(User item);
        IEnumerable<User> GetAll();
        User Find(string id);
        User Remove(string key);
        void Update(User item);
    }
}
