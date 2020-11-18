using Microsoft.FlightSimulator.SimConnect;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace NarrativeHorizons
{
    public class SimVarWrapper : IDisposable
    {
        public const int WM_USER_SIMCONNECT = 0x0402;

        private SimConnect _simConnect = null;

        private List<SimVarRequest> _simVarRequests { get; set; } = new List<SimVarRequest>();

        private int _lastReqId = 0;

        private bool _isConnected = false;

        private LoopThread _thread = null;

        private bool _disposedValue;

        public SimVarWrapper()
        {
            StartThread();
        }

        public bool Connect()
        {
            Disconnect();

            _simVarRequests = new List<SimVarRequest>();

            try
            {
                _simConnect = new SimConnect("Simconnect - Var Test", new IntPtr(0), WM_USER_SIMCONNECT, null, 0);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error has occurred while trying to connect to SimConnect. Error: " + ex.Message);
                return false;
            }

            _simConnect.OnRecvOpen += new SimConnect.RecvOpenEventHandler(SimConnect_OnRecvOpen);
            _simConnect.OnRecvQuit += new SimConnect.RecvQuitEventHandler(SimConnect_OnRecvQuit);
            _simConnect.OnRecvSimobjectDataBytype += new SimConnect.RecvSimobjectDataBytypeEventHandler(SimConnect_OnRecvSimobjectDataBytype);

            var startTime = DateTime.Now;

            while (!_isConnected && (DateTime.Now - startTime).TotalSeconds <= 10)
            {
                System.Threading.Thread.Sleep(100);

                _simConnect.ReceiveMessage();
            }

            return _isConnected;
        }

        public bool IsConnected()
        {
            return _isConnected;
        }

        public void Disconnect()
        {
            if (_isConnected && _simConnect != null)
                _simConnect.Dispose();

            _simConnect = null;
            _isConnected = false;
        }

        private bool OnEventTick(bool isShuttingDown)
        {
            if (!_isConnected || _simConnect == null)
                return true;

            OnTick(SIMCONNECT_SIMOBJECT_TYPE.USER);

            return true;
        }

        private bool RegisterToSimConnect(SimVarRequest simvarRequest)
        {
            if (_simConnect == null)
                return false;

            /// Define a data structure
            _simConnect.AddToDataDefinition((eDummy)simvarRequest.Def, simvarRequest.Name, simvarRequest.Units, SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);

            /// IMPORTANT: Register it with the simconnect managed wrapper marshaller
            /// If you skip this step, you will only receive a uint in the .dwData field.
            _simConnect.RegisterDataDefineStruct<double>((eDummy)simvarRequest.Def);

            return true;
        }

        private void UnregisterToSimConnect(SimVarRequest simvarRequest)
        {
            if (_simConnect == null)
                return;

            _simConnect.ClearDataDefinition((eDummy)simvarRequest.Def);
        }

        public void OnTick(SIMCONNECT_SIMOBJECT_TYPE simObjectType)
        {
            if (_simConnect == null)
                return;

            _simConnect.ReceiveMessage();

            foreach (SimVarRequest simVarRequest in _simVarRequests)
            {
                if (!simVarRequest.Pending)
                {
                    _simConnect.RequestDataOnSimObjectType((eDummy)simVarRequest.Request, (eDummy)simVarRequest.Def, 0, simObjectType);
                    simVarRequest.Pending = true;
                }
                else
                {
                    simVarRequest.StillPending = true;
                }
            }
        }

        private void SimConnect_OnRecvSimobjectDataBytype(SimConnect sender, SIMCONNECT_RECV_SIMOBJECT_DATA_BYTYPE data)
        {
            // Loop backwards because we may need to remove items from the list in the case of one-time events, etc.
            for (int i = _simVarRequests.Count - 1; i >= 0; --i)
            {
                var request = _simVarRequests[i];

                uint iRequest = data.dwRequestID;

                if (iRequest == (uint)request.Request)
                {
                    double dValue = (double)data.dwData[0];

                    Console.WriteLine(request.Name + " Value: " + dValue);

                    request.Value = dValue;
                    request.Pending = false;
                    request.StillPending = false;

                    // Dispatch the OnSimVarChanged event to any subscribed listeners.
                    request.DispatchSimVarChanged(new SimVarUpdatedEventArgs(request));

                    if (request.OneTimeEvent)
                    {
                        // This is a one-time event, unregister it.
                        UnregisterToSimConnect(request);

                        _simVarRequests.RemoveAt(i);
                    }
                }
            }
        }

        private void SimConnect_OnRecvQuit(SimConnect sender, SIMCONNECT_RECV data)
        {
            Disconnect();
        }

        private void SimConnect_OnRecvOpen(SimConnect sender, SIMCONNECT_RECV_OPEN data)
        {
            Console.WriteLine("Oh shit it connected!");

            _isConnected = true;
        }

        public SimVarRequest AddRequest(string simvar, string unit)
        {
            Console.WriteLine("Adding request for value: " + simvar);

            string newSimvarRequest = simvar;
            string newUnitRequest = unit;
            var reqId = ++_lastReqId;

            SimVarRequest request = new SimVarRequest
            {
                Def = (eDummy)reqId,
                Request = (eDummy)reqId,
                Name = newSimvarRequest,
                Units = newUnitRequest,
                OneTimeEvent = false
            };

            request.Pending = !RegisterToSimConnect(request);
            request.StillPending = request.Pending;

            _simVarRequests.Add(request);

            return request;
        }

        public Task<Double> GetValueAsync(string simvar, string unit)
        {
            Console.WriteLine("Adding a one-time request for value: " + simvar);

            string newSimvarRequest = simvar;
            string newUnitRequest = unit;
            var reqId = ++_lastReqId;

            SimVarRequest request = new SimVarRequest
            {
                Def = (eDummy)reqId,
                Request = (eDummy)reqId,
                Name = newSimvarRequest,
                Units = newUnitRequest,
                OneTimeEvent = true
            };

            double retValue = 0d;
            bool isFinished = false;

            request.SimVarChanged += (object sender, SimVarUpdatedEventArgs e) =>
            {
                retValue = e.Request.Value;
                isFinished = true;
            };

            request.Pending = !RegisterToSimConnect(request);
            request.StillPending = request.Pending;

            _simVarRequests.Add(request);

            return Task<Double>.Factory.StartNew(() =>
            {
                while (!isFinished)
                {
                    System.Threading.Thread.Yield();
                }

                return retValue;
            });
        }

        public void SetValue(string simvar, string unit, double value)
        {
            var request = _simVarRequests.Find(x => (x.Name == simvar));
            if (request == null)
            {
                request = AddRequest(simvar, unit);
            }

            Console.WriteLine("Setting " + simvar + " to value: " + value);

            _simConnect.SetDataOnSimObject(request.Def, SimConnect.SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_DATA_SET_FLAG.DEFAULT, value);
        }

        private void StartThread()
        {
            if (_thread != null)
                StopThread();

            _thread = new LoopThread(OnEventTick);
        }

        private void StopThread()
        {
            if (_thread != null)
            {
                _thread.Dispose();
                _thread = null;
            }
        }

        #region "IDisposable"

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // Dispose managed state (managed objects)
                    StopThread();
                    Disconnect();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
