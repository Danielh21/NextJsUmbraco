using System.Linq;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Controllers;
using Microsoft.AspNetCore.Mvc;

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
        var result = contentTypes.Select(ct => new
        {
            ct.Alias,
            ct.Name,
            Properties = ct.PropertyTypes.Select(p => new {
                p.Alias,
                p.PropertyEditorAlias,
                p.Name
            })
        });

        return Ok(result);
    }
}