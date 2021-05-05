using System;

namespace BillsOfExchange.ServiceLayer.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}