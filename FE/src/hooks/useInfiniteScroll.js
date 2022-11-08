import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import API from '@/api/BaseApi';

const useInfiniteScroll = (url, keyword, sort, type, page, view) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [paginator, setPaginator] = useState(null)

  const fetch = () => {
    if (!router.isReady) {
      return;
    }
    setFetching(true);
    API.request({
      method: 'GET',
      url: url,
      params: {
        keyword,
        sort,
        type,
        page,
        view
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setPaginator(response.data)
          setData(prevData => {
            return [...new Set([...prevData, ...response.data.data])]
          })
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setFetching(false));
  };
  useEffect(() => {
    setData([])
  }, [keyword, sort, type, view])
  useEffect(() => {
    fetch();
  }, [keyword, sort, type, page, view]);

  return [data, fetching, error, paginator];
};

export default useInfiniteScroll;
