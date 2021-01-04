using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Exceptions
{
    public class ModelDataException : Exception
    {
        public object DataObject { get; private set; }
        public ModelDataException(string message, object data) : base(message) { DataObject = data; }
    }
}
