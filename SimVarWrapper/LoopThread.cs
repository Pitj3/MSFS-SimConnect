using System;
using System.Threading;

namespace NarrativeHorizons
{
    /// <summary>
    /// A wrapper around a Thread that repeatedly calls the specified callback function until it is shutdown/disposed.
    /// </summary>
    public class LoopThread : IDisposable
    {
        /// <summary>
        /// The duration of the interval in between each loop iteration in milliseconds.
        /// </summary>
        public int LoopInterval
        {
            get
            {
                lock (_lock)
                    return _loopInterval;
            }
            set
            {
                lock (_lock)
                    _loopInterval = value;
            }
        }

        private int _loopInterval = 100;
        private bool _disposedValue;
        private Func<bool, bool> _callback;
        private bool _isStopping = false;
        private Thread _thread = null;
        private object _lock = new object();

        public LoopThread(Func<bool, bool> callback, int loopInterval = 100)
        {
            lock (_lock)
            {
                _isStopping = false;
                _loopInterval = loopInterval;
            }

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

        public void StopThread()
        {
            if (_thread == null)
                return;

            lock (_lock)
                _isStopping = true;

            var isRunning = IsRunning();

            var startTime = DateTime.Now;

            while (isRunning && (DateTime.Now - startTime).TotalSeconds < 5)
            {
                Thread.Sleep(10);

                isRunning = IsRunning();
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

                try
                {
                    var cbResult = _callback(false);

                    if (!cbResult)
                    {
                        StopThread();
                        return;
                    }
                }
                catch (ThreadAbortException)
                { }
                catch (Exception ex)
                {
                    Console.WriteLine("An error has occurred in LoopThread's callback function. Error: " + ex.ToString());
                }

                Thread.Sleep(LoopInterval);
            }

            var cbCleanupResult = _callback(true);

            if (!cbCleanupResult)
            {
                StopThread();
                return;
            }
        }

        public bool IsRunning()
        {
            return (!_thread.ThreadState.HasFlag(ThreadState.Stopped)
                            && !_thread.ThreadState.HasFlag(ThreadState.Aborted)
                            && !_thread.ThreadState.HasFlag(ThreadState.Unstarted));
        }

        public bool IsStopping()
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
