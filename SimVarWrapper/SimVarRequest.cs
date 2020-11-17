namespace NarrativeHorizons
{
    public class SimVarRequest
    {
        public eDummy Def = 0;

        public eDummy Request = 0;

        public string Name { get; set; }

        public double Value { get; set; }

        public string Units { get; set; }

        public bool Pending = true;

        public bool StillPending { get; set; }
    };
}
