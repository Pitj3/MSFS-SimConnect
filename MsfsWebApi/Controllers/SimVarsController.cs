using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using NarrativeHorizons;

namespace MsfsWebApi.Controllers
{
    [RoutePrefix("api/SimVars")]
    public class SimVarsController : ApiController
    {
        static SimVarWrapper wrapper = new SimVarWrapper();

        //// GET api/values
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/SimVars/{name}
        [HttpGet]
        [Route("{name}")]
        public async Task<string> Get(string name)
        {
            if (!wrapper.IsConnected())
                wrapper.Connect();

            return (await wrapper.GetValueAsync("FLAPS HANDLE INDEX", "number")).ToString();
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
