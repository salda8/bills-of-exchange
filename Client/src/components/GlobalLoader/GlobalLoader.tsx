import { Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../api/api";

const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => setCounter((counter) => counter + 1), [
    setCounter,
  ]);
  const dec = useCallback(() => setCounter((counter) => counter - 1), [
    setCounter,
  ]);

  useEffect(() => {
    const reqInterceptor = http.interceptors.request.use(async (config) => {
      inc();
      return config;
    });

    const resInterceptor = http.interceptors.response.use(async (config) => {
      dec();
      return config;
    });

    return () => {
      // remove all intercepts when done
      http.interceptors.request.eject(reqInterceptor);
      http.interceptors.response.eject(resInterceptor);
    };
  }, [inc, dec]);

  return [counter > 0];
};

const GlobalLoader = () => {
  const [loading] = useAxiosLoader();

  return loading ? (
    <div>{<Typography>Loading</Typography>}</div>
  ) : (
    <Typography />
  );
};

export default GlobalLoader;
