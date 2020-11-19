using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nancy;
using Nancy.Hosting.Self;
using System.IO;

using NarrativeHorizons;

namespace PitLink
{
    public class RestApiServer : IDisposable
    {
        private bool _disposedValue;
        private NancyHost _host = null;
        private SimVarWrapper _sim = null;

        public RestApiServer(SimVarWrapper sim)
        {
            _sim = sim;

            RestModule.Sim = sim;

            var config = new Nancy.Hosting.Self.HostConfiguration();

            config.UrlReservations.CreateAutomatically = true;

            _host = new NancyHost(config, new Uri("http://localhost:29785"));

            _host.Start();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // Dispose managed state (managed objects)
                    RestModule.Sim = null;

                    if (_host != null)
                    {
                        _host.Stop();
                        _host.Dispose();
                        _host = null;
                    }
                }

                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }

    public class RestModule : NancyModule
    {
        public static SimVarWrapper Sim = null;

        public RestModule()
        {
            // Register the API endpoints.
            RegisterCorsOptions("/latitude");
            Get("/latitude", async _ =>
            {
                var latitude = await Sim.GetValueAsync("PLANE LATITUDE", "degree");

                return WrapResponse(latitude.ToString());
            });

            RegisterCorsOptions("/longitude");
            Get("/longitude", async _ =>
            {
                var longitude = await Sim.GetValueAsync("PLANE LONGITUDE", "degree");

                return WrapResponse(longitude.ToString());
            });

            RegisterCorsOptions("/coordinates");
            Get("/coordinates", (args) =>
            {
                var lat = (double)this.Context.Request.Query.latitude;
                var lng = (double)this.Context.Request.Query.longitude;
                
                Sim.SetValue("PLANE LATITUDE", "degree", lat);
                Sim.SetValue("PLANE LONGITUDE", "degree", lng);

                return WrapResponse("success");
            });
        }

        private Response WrapResponse(Response response)
        {
            response.WithContentType("application/json");
            response.WithHeader("Access-Control-Allow-Headers", "*");
            response.WithHeader("Access-Control-Allow-Origin", "http://localhost:8080");
            response.WithStatusCode(HttpStatusCode.OK);

            this.Context.Response = response;

            return response;
        }

        private void RegisterCorsOptions(string path)
        {
            Options(path, (req) =>
            {
                var response = this.Context.Response;

                var res = new Nancy.Response();

                res.WithHeader("Access-Control-Allow-Headers", "*");
                res.WithHeader("Access-Control-Allow-Origin", "http://localhost:8080");

                this.Context.Response = res;

                return res;
            });
        }
    }
}
