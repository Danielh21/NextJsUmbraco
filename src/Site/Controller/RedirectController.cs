using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Tls;
using Umbraco.Cms.Web.Common.Controllers;

namespace Site.Controller
{
    [Route("redirect")]
    public class RedirectController : UmbracoApiController
    {

        [HttpGet]
        [Route("")]
        public  RedirectResult Base(string path)
        {
            return new RedirectResult($"http://localhost:7523{path}");
        }

    }
}
