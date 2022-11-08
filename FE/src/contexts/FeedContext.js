import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import API from '@/api/BaseApi';
import useApi from '@/hooks/useApi';
import moment from 'moment';

const Context = createContext();

export function FeedCTX({ children }) {
  const [postFocus, setPostFocus] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [hasFoodDiarySelected, setHasFoodDiarySelected] = useState(false);
  const [hasImages, setHasImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);
  const [hasLike, setHasLike] = useState(false);
  const showMoreRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [paginator, setPaginator] = useState({});
  const [addedFeed, setAddedFeed] = useState(null);
  const [foodDiaryCheckList, setFoodDiaryCheckList] = useState({
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Snacks: false,
  });

  const mealsConfig = [
    {
      title: 'Breakfast',
      types: [1],
    },
    {
      title: 'Lunch',
      types: [3],
    },
    {
      title: 'Dinner',
      types: [5],
    },
    {
      title: 'Snacks',
      types: [2, 4],
    },
  ];

  useEffect(() => {
    showMoreRef.current?.focus();
  }, [postFocus]);

  const fetchFeeds = () => {
    setLoading(true);
    API.request({
      method: 'GET',
      url: '/feed',
      params: {
        page,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setPaginator(response.data);
          setLoading(false);
          setHasNewData(false);
          setFeeds((prevData) => {
            return [...new Set([...prevData, ...response.data.data])];
          });
        }
      })
      .catch((error) => console.log(error));
  };
  const observer = useRef();

  const lastItem = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && paginator.next_page_url) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, page]
  );

  const getAddedData = (data) => {
    setFeeds((prevData) => {
      return [...new Set([...data, ...prevData])];
    });
  };

  const [foodDiary] = useApi(
    {
      method: 'GET',
      url: '/tracker',
      params: {
        date: moment(moment()).format('Y-MM-D'),
      },
    },
    []
  );

  useEffect(() => {
    fetchFeeds();
  }, [page]);

  const data = {
    postFocus,
    setPostFocus,
    feeds,
    setFeeds,
    lastItem,
    hasFoodDiarySelected,
    setHasFoodDiarySelected,
    hasImages,
    setHasImages,
    loading,
    setLoading,
    hasNewData,
    setHasNewData,
    hasLike,
    setHasLike,
    showMoreRef,
    opened,
    setOpened,
    uploadModalOpened,
    setUploadModalOpened,
    page,
    setPage,
    paginator,
    setPaginator,
    addedFeed,
    setAddedFeed,
    fetchFeeds,
    getAddedData,
    foodDiary,
    foodDiaryCheckList,
    setFoodDiaryCheckList,
    mealsConfig,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
}

export function useFeedCTX() {
  return useContext(Context);
}

FeedCTX.propTypes = {
  children: PropTypes.node.isRequired,
};
