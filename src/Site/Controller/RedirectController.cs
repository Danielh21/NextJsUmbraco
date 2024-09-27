using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Tls;
using Umbraco.Cms.Web.Common.Controllers;

namespace Site.Controller
{
    [Route("redirect")]
    public class RedirectController : UmbracoApiController
    {

        private readonly IConfiguration Configuration;

        public RedirectController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        [Route("")]
        public  RedirectResult Base(string path)
        {
            var baseURLNextApp = Configuration.GetValue<string>("NextEnv:BaseURL");
            return new RedirectResult($"{baseURLNextApp}{path}");
        }

    }
}
