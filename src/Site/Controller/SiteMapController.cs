using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Site.Models;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.UmbracoContext;
using Umbraco.Cms.Web.Website.Controllers;


namespace Site.Controller
{
    public class SiteMapController : SurfaceController
    {
        private readonly IUmbracoContextAccessor _umbracoContextAccessor;
        private readonly IConfiguration _configuration;
        public SiteMapController(IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider, IConfiguration configuration) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _umbracoContextAccessor = umbracoContextAccessor;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("sitemap")]
        public ActionResult RenderCustomView()
        {
            _umbracoContextAccessor.TryGetUmbracoContext(out var umbracoContext);
            var root = umbracoContext.Content.GetAtRoot().FirstOrDefault();
            var nextJSPath = _configuration.GetValue<string>("NextEnv:BaseURL");
            SiteMapModel model = new SiteMapModel();
            model.Root = root;
            model.LocalNextJSPath = nextJSPath;

            return View("~/Views/SiteMap.cshtml", model);
        }

    }
}
