using System.Windows.Data;

namespace PitLink
{
    public class MainViewModel : ObservableObject
    {
        public bool Connected
        {
            get { return _connected; }
            set
            {
                this.SetProperty(ref _connected, value);
                this.OnPropertyChanged(nameof(ConnectButtonText));
            }
        }
        private bool _connected = false;

        public bool ComConnected
        {
            get { return _comConnected; }
            set
            {
                this.SetProperty(ref _comConnected, value);
                this.OnPropertyChanged(nameof(ConnectButtonText));
            }
        }
        private bool _comConnected = false;

        public bool OddTick
        {
            get { return _oddTick; }
            set
            {
                this.SetProperty(ref _oddTick, value);
            }
        }
        private bool _oddTick = false;

        public string ConnectButtonText
        {
            get
            {
                return _connected ? "Disconnect" : "Connect To Sim";
            }
        }


        public CollectionView ComPortEntries
        {
            get
            {
                return _comPortEntries;
            }
            set
            {
                this.SetProperty(ref _comPortEntries, value);
            }
        }
        private CollectionView _comPortEntries;

        public string ComPortEntry
        {
            get
            {
                return _comPortEntry;
            }
            set
            {
                if (_comPortEntry == value) return;
                _comPortEntry = value;

                this.SetProperty(ref _comPortEntry, value);
            }
        }
        private string _comPortEntry;
    }

    public class ComPortEntry
    {
        public string Name { get; set; }

        public ComPortEntry(string name)
        {
            Name = name;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
