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
            Options("/lat", (req) =>
            {
                var response = this.Context.Response;

                var res = new Nancy.Response();

                res.WithHeader("Access-Control-Allow-Headers", "*");
                res.WithHeader("Access-Control-Allow-Origin", "http://localhost:8080");
                
                this.Context.Response = res;

                return res;
            });

            Get("/lat", async _ =>
            {
                var latitude = await Sim.GetValueAsync("PLANE LATITUDE", "degree");

                var response = this.Context.Response;

                Nancy.Response res = latitude.ToString();

                res.WithContentType("application/json");
                res.WithHeader("Access-Control-Allow-Headers", "*");
                res.WithHeader("Access-Control-Allow-Origin", "http://localhost:8080");
                res.WithStatusCode(HttpStatusCode.OK);
                
                this.Context.Response = res;

                return res;
            });

            Options("/lon", (req) =>
            {
                var response = this.Context.Response;

                var res = new Nancy.Response();

                res.WithHeader("Access-Control-Allow-Headers", "*");
                res.WithHeader("Access-Control-Allow-Origin", "http://localhost:8080");

                this.Context.Response = res;

                return res;
            });

            Get("/lon", async _ =>
            {
                var latitude = await Sim.GetValueAsync("PLANE LONGITUDE", "degree");

                var response = this.Context.Response;

                Nancy.Response res = latitude.ToString();

                res.WithContentType("application/json");
                res.WithHeader("Access-Control-Allow-Headers", "*");
                res.WithHeader("Access-Control-Allow-Origin", "http://localhost:8080");
                res.WithStatusCode(HttpStatusCode.OK);

                this.Context.Response = res;

                return res;
            });
        }
    }
}
