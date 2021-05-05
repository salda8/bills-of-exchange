using System;

namespace BillsOfExchange.ServiceLayer.Exceptions
{
    public abstract class InvalidDataException : Exception
    {
        protected InvalidDataException(string message) : base(message)
        {
        }
    }
}