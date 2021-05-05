namespace BillsOfExchange.ServiceLayer.Exceptions
{
    public class MoreThanOnePreviousEndorsementIsNotSetException : InvalidDataException
    {
        public MoreThanOnePreviousEndorsementIsNotSetException(string message) : base(message)
        {
        }
    }
}