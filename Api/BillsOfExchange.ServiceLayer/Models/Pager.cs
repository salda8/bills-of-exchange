using System;
using System.ComponentModel.DataAnnotations;

namespace BillsOfExchange.ServiceLayer.Models
{
    public class Pager
    {
        [Required]
        public long TotalItems { get; set; }

        [Required]
        public long StartIndex { get; set; }

        [Required]
        public int PageSize { get; set; }

        [Required]
        public int TotalPages { get; set; }

        public Pager(long totalItems, int pageSize = 1, long startIndex = 0)
        {
            StartIndex = startIndex;
            PageSize = pageSize;
            TotalItems = totalItems;

            if (pageSize > 0)
            {
                TotalPages = totalItems > pageSize ? (int)Math.Ceiling((double)TotalItems / PageSize) : 1;
            }
            else
            {
                TotalPages = 1;
            }
        }
    }
}