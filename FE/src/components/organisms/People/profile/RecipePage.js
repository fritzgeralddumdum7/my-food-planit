import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import Category from '@/icons/Category';
import Funnel from '@/icons/Funnel';
import Filter from '@/icons/FilterV2';
import RecipeListItem from '@/components/organisms/Recipe/RecipeListItem';
import RecipeListItemTiled from '@/components/organisms/Recipe/RecipeListItemTiled';
import {
  Box,
  Input,
  Center,
  Text,
  Divider
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useForm } from '@mantine/form';

const RecipePage = () => {
  const router = useRouter();
  const { id, keyword, sort, notification } = router.query;
  const [viewType, setViewType] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [type, setType] = useState('imported');

  const [page, setPage] = useState(1)
  const [data, fetching, error, paginator] = useInfiniteScroll(
    `users/profile/${id}/recipes`,
    keyword,
    sort,
    type,
    page,
    viewType
  );

  const handleChange = (e) => {
    const keyword = e.target.value;
    router.query.keyword = keyword;
    setPage(1)
    router.query.page = page
    router.push(router);
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    router.query.sort = sort;
    setPage(1)
    router.query.page = page
    router.push(router);
  };

  const handleType = (e) => {
    setType(e);
    router.query.type = e;
    setPage(1)
    router.query.page = page
    router.push(router);
  };

  const handleViewType = (view) => {
    setPage(1)
    router.query.page = page
    router.query.view = view
    router.push(router);
    setViewType(view)
  }

  const form = useForm({
    initialValues: {
      url: '',
    },

    validate: {
      url: (value) => {
        let regex = new RegExp(
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
        );
        if ([undefined, ''].includes(value)) {
          return 'Please input URL';
        } else if (!value.match(regex)) {
          return 'Please input valid URL';
        }
        return null;
      },
    },
  });

  const observer = useRef()
  const lastItem = useCallback(node => {
    if (fetching) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && paginator.next_page_url) {
        setPage(prevPage => prevPage + 1)
        router.query.page = page
        router.push(router, undefined, { scroll: false })
      }
    })
    if (node) observer.current.observe(node)
  }, [fetching, page])

  useEffect(() => {
    if (fetching || !notification) {
      return;
    }
    showNotification({
      title: 'Success',
      autoClose: 2000,
      color: 'green',
      message: notification,
    });
    delete router.query.notification;
    router.replace('/recipes');
  }, [fetching, notification]);

  return (
    <Box>
      <Box py={26}>
        <Center>
          <Text color='#0B2C2A' size='md' mr='xs'>
            Sort by:
          </Text>
          {router.isReady && (
            <select
              defaultValue={sort || ''}
              onChange={handleSort}
              style={{
                border: 'none',
                minWidth: 70,
                outline: 'none',
                cursor: 'pointer',
                lineHeight: 1.2,
                fontSize: 16,
              }}
            >
              <option value=''>All</option>
              <option value='created_at'>Date Imported</option>
              <option value='title'>Title</option>
              <option value='author'>Author</option>
            </select>
          )}
          <Center ml={18} sx={{ display: 'flex', cursor: 'pointer', marginLeft: 'auto' }}>
            <Box
              onClick={() => handleViewType('list')}
              sx={{
                padding: 11,
                borderRadius: '8px 0 0 8px',
                width: 48,
                height: 48,
                background: viewType === 'list' ? '#006C52' : '#EFF5F4',
              }}
            >
              <Filter filled={viewType === 'list' ?? false} />
            </Box>
            <Box
              onClick={() => handleViewType('tile')}
              sx={{
                padding: 11,
                width: 48,
                height: 48,
                borderRadius: '0 8px 8px 0',
                background: viewType === 'tile' ? '#006C52' : '#EFF5F4',
              }}
            >
              <Category filled={viewType === 'tile' ?? false} />
            </Box>
            <Box sx={{ width: 30, display: 'flex', justifyContent: 'center' }}>
              <Divider sx={{ height: '48px' }} orientation="vertical" />
            </Box>
            <Box
              onClick={() => { }}
              sx={{
                background: '#EFF2F4',
                width: 48,
                height: 48,
                borderRadius: '8px',
                cursor: 'pointer',
                padding: 11,
              }}
            >
              <Funnel width={24} height={24} outline={'#006C52'} />
            </Box>
          </Center>
        </Center>
      </Box>

      {viewType === 'list'
        ? (<RecipeListItem recipes={data} recipeLast={debounce(lastItem, 300)} fetching={fetching} />)
        : (<RecipeListItemTiled recipes={data} recipeLast={debounce(lastItem, 300)} fetching={fetching} />)
      }
    </Box>
  );
};

export default RecipePage;
