using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillsOfExchange.Models
{
    public class ExceptionDetail
    {
        public readonly int StatusCode;
        public readonly string Message;

        public ExceptionDetail(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message ?? "No error message found in exception.";
        }

        public override string ToString() => JsonConvert.SerializeObject(this);
    }
}
