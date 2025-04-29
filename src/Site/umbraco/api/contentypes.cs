using System.Linq;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Controllers;
using Microsoft.AspNetCore.Mvc;
using NUglify.Helpers;

[ApiController]
[Route("api/schema")]
public class SchemaController : UmbracoApiController
{
    private readonly IContentTypeService _contentTypeService;

    public SchemaController(IContentTypeService contentTypeService)
    {
        _contentTypeService = contentTypeService;
    }

    [HttpGet("document-types")]
    public IActionResult GetDocumentTypes()
    {
        var contentTypes = _contentTypeService.GetAll();

        var result = contentTypes.Select(contentType =>
        {
            var allProperties = new List<object>();

            // Own properties
            allProperties.AddRange(contentType.PropertyTypes.Select(p => new
            {
                p.Alias,
                p.PropertyEditorAlias,
                p.Name
            }));

            // Composition properties
            foreach (var composition in contentType.ContentTypeComposition)
            {
                allProperties.AddRange(composition.PropertyTypes.Select(p => new
                {
                    p.Alias,
                    p.PropertyEditorAlias,
                    p.Name
                }));
            }

            return new
            {
                contentType.Alias,
                contentType.Name,
                Properties = allProperties
            };
        });

        return Ok(result);
    }
}