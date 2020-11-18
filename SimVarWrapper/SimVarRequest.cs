using System;

namespace NarrativeHorizons
{
    public class SimVarRequest
    {
        public event EventHandler<SimVarUpdatedEventArgs> SimVarChanged;

        public eDummy Def = 0;

        public eDummy Request = 0;

        public string Name { get; set; }

        public double Value { get; set; }

        public string Units { get; set; }


        public bool Pending = true;

        public bool StillPending { get; set; }

        public bool OneTimeEvent { get; set; }

        public void DispatchSimVarChanged(SimVarUpdatedEventArgs e)
        {
            // Make a temporary copy of the event to avoid possibility of
            // a race condition if the last subscriber unsubscribes
            // immediately after the null check and before the event is raised.
            EventHandler<SimVarUpdatedEventArgs> raiseEvent = SimVarChanged;

            // Event will be null if there are no subscribers.
            if (raiseEvent != null)
            {
                // Call to raise the event.
                raiseEvent(this, e);
            }
        }
    }

    public class SimVarUpdatedEventArgs : EventArgs
    {
        public SimVarRequest Request { get; set; }

        public SimVarUpdatedEventArgs(SimVarRequest request)
        {
            Request = request;
        }
    }
}
