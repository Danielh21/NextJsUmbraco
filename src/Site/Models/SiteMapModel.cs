using Umbraco.Cms.Core.Models.PublishedContent;

namespace Site.Models
{
    public class SiteMapModel
    {

        public IPublishedContent Root { get; set; }

        public string LocalNextJSPath { get; set; }
    }
}
