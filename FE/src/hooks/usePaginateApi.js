import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import API from '@/api/BaseApi';

const usePaginateApi = (request, watch) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  const fetch = () => {
    if (!router.isReady) {
      return;
    }

    setFetching(true);
    setError(null);

    request.url = `${request.url}?page=${page}`;

    API.request(request)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setFetching(false));
  };
  useEffect(() => {
    fetch();
  }, [router.isReady, page, ...watch]);

  return [data, page, setPage, fetching, error];
};

export default usePaginateApi;
