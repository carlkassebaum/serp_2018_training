using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using my_app.Models;

namespace my_app.Controllers  
{
    [Route("api/[controller]")]
    [ApiController]  
    public class TestTableController : Controller  
    {  
        [HttpGet]
        public ActionResult<IEnumerable<TestTable>> Index()  
        {  
            MusicStoreContext context = HttpContext.RequestServices.GetService(typeof(my_app.Models.MusicStoreContext)) as MusicStoreContext;  
  
            return context.GetAllTestTableItems();
        }
  
        [HttpGet("{id}")]
        public ActionResult<TestTable> Get(int id)
        {
            MusicStoreContext context = HttpContext.RequestServices.GetService(typeof(my_app.Models.MusicStoreContext)) as MusicStoreContext;
            
            return context.GetTestTableById(id);
        }
    }  
}