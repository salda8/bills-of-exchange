using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace BillsOfExchange.Objects.Proxies
{
    public class LogProxy<A> : DispatchProxy
    {
        private A _obj;

        protected override object Invoke(MethodInfo targetMethod, object[] args)
        {
            Debug.Print($"Call Proxy Information: {Environment.NewLine}" +
                            $"Object: {_obj.GetType().FullName} {Environment.NewLine}" +
                            $"Method: {targetMethod.Name} {Environment.NewLine}"
                );
            return targetMethod.Invoke(_obj, args);
        }

        public static A Instance(A obj)
        {
            object p = Create<A, LogProxy<A>>();
            ((LogProxy<A>)p)._obj = obj;
            return (A)p;
        }
    }
}
