using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Collections.PagingLists
{
    public class PageInfo : IPageInfo
    {
        public int CurrentPage { get; private set; }
        public int TotalPages { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalPages;

        public PageInfo(int currentPage, int totalPages, int pageSize, int totalCount)
        {
            CurrentPage = currentPage;
            TotalPages = totalPages;
            PageSize = pageSize;
            TotalCount = totalCount;
        }
    }
}
