using Microsoft.FlightSimulator.SimConnect;
using System;
using System.Threading;

namespace NarrativeHorizons
{
    public class EventThread : IDisposable
    {
        public int SleepTime
        {
            get
            {
                lock (_lock)
                    return _sleepTime;
            }
            set
            {
                lock (_lock)
                    _sleepTime = value;
            }
        }

        private int _sleepTime = 100;
        private bool _disposedValue;
        private Func<bool> _callback;
        private bool _isStopping = false;
        private Thread _thread = null;
        private object _lock = new object();

        public EventThread(Func<bool> callback)
        {
            lock (_lock)
                _isStopping = false;

            _callback = callback;

            StartThread();
        }

        private void StartThread()
        {
            if (_thread != null)
                StopThread();

            if (_callback == null)
                throw new Exception("Unable to start thread because a callback method was not specified.");

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
                if (_callback == null)
                {
                    StopThread();
                    return;
                }

                var cbResult = _callback();

                if (!cbResult)
                {
                    StopThread();
                    return;
                }

                Thread.Sleep(SleepTime);
            }
        }

        private bool IsStopping()
        {
            lock (_lock)
                return _isStopping;
        }

        #region IDisposable
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
        #endregion
    }
}
