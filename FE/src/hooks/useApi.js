import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import API from '@/api/BaseApi';

const useApi = (request, watch) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  const fetch = () => {
    if (!router.isReady) {
      return;
    }

    setFetching(true);
    setError(null);

    console.log({ request });
    API.request(request)
      .then((response) => {
        console.log({ response: response.data });
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setFetching(false));
  };
  useEffect(() => {
    fetch();
  }, [router.isReady, ...watch]);

  return [data, fetching, error, fetch];
};

export default useApi;
