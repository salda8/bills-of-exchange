namespace BillsOfExchange.DataProvider.Models
{
    /// <summary>
    /// Represents a legal person
    /// </summary>
    public class Party
    {
        public int Id { get; set; }

        /// <summary>
        /// Full name of the person
        /// </summary>
        public string Name { get; set; }
    }
}