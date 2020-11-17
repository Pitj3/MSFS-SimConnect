using System;

namespace NarrativeHorizons
{
    class Program
    {
        private static SimVarWrapper _sim = null;

        static void Main(string[] args)
        {
            _sim = new SimVarWrapper();

            if (!_sim.Connect())
            {
                Console.WriteLine("Failed to connect to SimConnect.");
                return;
            }

            while (true)
            {
                System.Threading.Thread.Sleep(100);
                _sim.SetValue("FLAPS HANDLE INDEX", "number", 2);
            }
        }


    }
}
