namespace BillsOfExchange.ServiceLayer.Exceptions
{
    public class CantReferenceOldEndorsementsException : InvalidDataException
    {
        public CantReferenceOldEndorsementsException(string message) : base(message)
        {
        }
    }
}