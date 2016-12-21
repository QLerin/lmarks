using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;

namespace LMarksIdentityServer4.Configurations
{
    public class Scopes
    {
        public static List<Scope> GetScopes()
        {
            return new List<Scope>()
            {
                new Scope()
                {
                    Name = "myApi",
                    Description = "Some description about myApi"
                },

                new Scope()
                {
                    Name = "myApi2",
                    Description = "Some description about myApi"
                }
            };
        }
    }
}
