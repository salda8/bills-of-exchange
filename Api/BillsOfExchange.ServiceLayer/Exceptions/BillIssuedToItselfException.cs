namespace BillsOfExchange.ServiceLayer.Exceptions
{
    public class BillIssuedToItselfException : InvalidDataException
    {
        public BillIssuedToItselfException(string message) : base(message)
        {
        }
    }
}