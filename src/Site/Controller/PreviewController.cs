using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Common.UmbracoContext;
using static Umbraco.Cms.Core.Collections.TopoGraph;

namespace Site.Controller
{
    [Route("")]
    public class PreviewApiController : UmbracoApiController
    {

        private readonly IUmbracoContextFactory UmbracoContextFactory;
        private readonly IConfiguration Configuration;

        public PreviewApiController(IUmbracoContextFactory umbracoContextFactory, IConfiguration configuration)
        {
            UmbracoContextFactory = umbracoContextFactory;
            Configuration = configuration;
        }

        [HttpGet]
        [Route("umbraco/preview")]
        public RedirectResult Preview(int id)
        {
            // You can fetch the current content id from the querystring ?id=x.
            using (var umbracoContextReference = UmbracoContextFactory.EnsureUmbracoContext())
            {
                var content =  umbracoContextReference.UmbracoContext.Content.GetById(id);
                var path = content.Url();
                var previewSecret = Configuration.GetValue<string>("NextEnv:PreviewSecret");
                var baseURLNextApp = Configuration.GetValue<string>("NextEnv:BaseURL");
                return new RedirectResult($"{baseURLNextApp}/api/preview?secret={previewSecret}&path={path}");
            }
        }
    }
}
