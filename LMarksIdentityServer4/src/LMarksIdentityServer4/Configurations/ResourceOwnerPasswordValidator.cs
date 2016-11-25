using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using LMarksIdentityServer4.Models;

namespace LMarksIdentityServer4.Configurations
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            using (
                IDbConnection db =
                    new SqlConnection("SERVER=DESKTOP-1T3FQ28\\SQLEXPRESS;" + "DATABASE=" + "users" + ";" + "UID=" +
                                      "linas" + ";" + "PASSWORD=" + "linas" + ";MultipleActiveResultSets=True;Trusted_Connection=True;"))
            {
                var user = db.Query<User>("SELECT * FROM t_users WHERE [login]=@a and [passwordHash]=@b", 
                    new {a = context.UserName, b = context.Password}).SingleOrDefault<User>();

                if (user == null)
                {
                    context.Result = new GrantValidationResult(TokenErrors.InvalidRequest, "User name or password incorrect.");
                    return Task.FromResult(0);
                }

                context.Result = new GrantValidationResult(user.Login, "password");
                return Task.FromResult(0);
            }
            
        }
    }
}
