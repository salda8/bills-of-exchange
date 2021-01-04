using BillsOfExchange.DataProvider.Collections.PagingLists;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BillsOfExchange.DataProvider.Collections
{
    public class PagingList<A> : List<A>, IPagingList
    {
        public PageInfo PagingInfo { get; private set; }

        public PagingList(List<A> items, int count, int pageNumber, int pageSize)
        {
            PagingInfo = new PageInfo(pageNumber, (int)Math.Ceiling(count / (double)pageSize), pageSize, count);
            AddRange(items);
        }
        public static PagingList<A> ToPagingdList(IQueryable<A> source, int pageNumber, int pageSize) =>
            new PagingList<A>(source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList(), source.Count(), pageNumber, pageSize);
    }
}
