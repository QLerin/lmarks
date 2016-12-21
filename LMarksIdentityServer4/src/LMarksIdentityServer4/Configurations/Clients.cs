using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;
using IdentityServer4.Models;

namespace LMarksIdentityServer4.Configurations
{
    public class Clients
    {
        public static List<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "resClient",
                    ClientSecrets =
                    {
                        new Secret("LMsecret".Sha256())
                    },
                    AllowedScopes = new List<string>()
                        {"myApi", "myApi2"},

                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                }

            };
        }
    }
}


