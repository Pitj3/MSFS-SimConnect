using NarrativeHorizons;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Threading;
using System.Windows;

namespace PitLink
{
    public partial class MainWindow : Window
    {
        private MainViewModel _mainViewModel;
        private SimVarWrapper _sim;
        private DateTime _lastBlinkTime = DateTime.Now;
        private SerialPort _serialPort;

        public MainWindow()
        {
            InitializeComponent();

            _mainViewModel = new MainViewModel();
            this.DataContext = _mainViewModel;

            _sim = new SimVarWrapper(MainLoop);

            string[] comports = SerialPort.GetPortNames();
            List<ComPortEntry> comEntries = new List<ComPortEntry>();
            foreach(string port in comports)
            {
                ComPortEntry comEntry = new ComPortEntry(port);
                comEntries.Add(comEntry);
            }

            _mainViewModel.ComPortEntries = new System.Windows.Data.CollectionView(comEntries);
        }

        private bool MainLoop()
        {
            if ((DateTime.Now - _lastBlinkTime).TotalSeconds >= 1)
            {
                _lastBlinkTime = DateTime.Now;
                _mainViewModel.OddTick = !_mainViewModel.OddTick;
            }

            if (_serialPort != null)
            {
                _mainViewModel.ComConnected = _serialPort.IsOpen;
            }

            return true;
        }

        private void _serialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            if (_serialPort.ReadChar() == 'X')
            {
                string serialLine = _serialPort.ReadLine();
            }
        }

        #region Window Events
        private void ConnectButton_Click(object sender, RoutedEventArgs e)
        {
            if (_sim.IsConnected())
            {
                _mainViewModel.Connected = false;

                _sim.Disconnect();
                return;
            }

            if (!_sim.Connect())
            {
                Console.WriteLine("Failed to connect to MSFS");
                return;
            }
            else
            {
                Console.WriteLine("Connected to MSFS");

                _mainViewModel.Connected = true;
            }
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (_sim != null)
            {
                _sim.Dispose();
                _sim = null;
            }
        }

        private void ConnectToDeviceButton_Click(object sender, RoutedEventArgs e)
        {
            if(_serialPort != null && _serialPort.IsOpen)
            {
                if (_mainViewModel.ComPortEntry != _serialPort.PortName)
                {
                    _serialPort.Close();
                    _serialPort = null;
                }
                else
                {
                    return;
                }
            }

            _serialPort = new SerialPort
            {
                PortName = _mainViewModel.ComPortEntry,
                BaudRate = 9600,
                Parity = Parity.None,
                DataBits = 8,
                StopBits = StopBits.One,
                Handshake = Handshake.None,

                ReadTimeout = 500,
                WriteTimeout = 500
            };

            _serialPort.Open();
            _serialPort.DataReceived += _serialPort_DataReceived;
        }
        #endregion
    }
}
