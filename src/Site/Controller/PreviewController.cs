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

        public PreviewApiController(IUmbracoContextFactory umbracoContextFactory)
        {
            UmbracoContextFactory = umbracoContextFactory;
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
                var parrentPath = content?.Parent?.Url();
                var combinedPath = parrentPath + path.Substring(1);
                var previewSecret = "preview";
                return new RedirectResult($"http://localhost:7523/api/preview?secret={previewSecret}&path={combinedPath}");
            }
        }
    }
}
