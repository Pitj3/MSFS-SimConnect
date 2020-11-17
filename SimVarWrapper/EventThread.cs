using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.FlightSimulator.SimConnect;

namespace NarrativeHorizons
{
    public class EventThread : IDisposable
    {
        private bool _disposedValue;
        private SimVarWrapper _wrapper;
        private bool _isStopping = false;
        private Thread _thread = null;
        private object _lock = new object();

        public EventThread(SimVarWrapper wrapper)
        {
            lock (_lock)
                _isStopping = false;

            _wrapper = wrapper;

            StartThread();
        }

        private void StartThread()
        {
            if (_thread != null)
                StopThread();

            _thread = new Thread(ThreadBody);

            _thread.Start();
        }

        private void StopThread()
        {
            if (_thread == null)
                return;

            var isRunning = (_thread.ThreadState.HasFlag(ThreadState.Running)
                            || _thread.ThreadState.HasFlag(ThreadState.Suspended)
                            || _thread.ThreadState.HasFlag(ThreadState.SuspendRequested)
                            || _thread.ThreadState.HasFlag(ThreadState.Unstarted));

            var startTime = new DateTime();

            while (isRunning && (DateTime.Now - startTime).TotalSeconds < 5)
            {
                Thread.Sleep(10);

                isRunning = (_thread.ThreadState.HasFlag(ThreadState.Running)
                            || _thread.ThreadState.HasFlag(ThreadState.Suspended)
                            || _thread.ThreadState.HasFlag(ThreadState.SuspendRequested)
                            || _thread.ThreadState.HasFlag(ThreadState.Unstarted));
            }

            try
            {
                if (isRunning)
                    _thread.Abort();
            }
            catch (Exception)
            { }

            _thread = null;
        }

        private void ThreadBody()
        {
            while (!IsStopping())
            {
                _wrapper.OnTick(SIMCONNECT_SIMOBJECT_TYPE.USER);

                Thread.Sleep(100);
            }
        }

        private bool IsStopping()
        {
            lock (_lock)
                return _isStopping;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // Dispose managed state (managed objects).
                    StopThread();
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
    }
}
