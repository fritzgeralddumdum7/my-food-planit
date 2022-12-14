import { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import Search from '@/icons/Search';
import FullPageSpinner from '@/components/molecules/FullPageSpinner';
import Category from '@/icons/Category';
import Filter from '@/icons/FilterV2';
import RecipeListItem from '@/components/organisms/Recipe/RecipeListItem';
import RecipeListItemTiled from '@/components/organisms/Recipe/RecipeListItemTiled';
import {
  Box,
  SegmentedControl,
  Button,
  Input,
  Center,
  Text,
  Tooltip,
  Modal,
  Divider,
  TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import TagInput from '@/components/molecules/TagInput';
import { useForm } from '@mantine/form';
import API from '@/api/BaseApi';

const Index = ({ recipeType }) => {
  const router = useRouter();
  const { keyword, sort, notification } = router.query;
  const [viewType, setViewType] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  let typeVal = recipeType == 0 ? 'ninety-ten' : 'imported';
  const [type, setType] = useState(typeVal);

  const [page, setPage] = useState(1);
  const [data, fetching, error, paginator] = useInfiniteScroll(
    '/recipes/paginated-recipe',
    keyword,
    sort,
    type,
    page,
    viewType
  );

  const handleChange = (e) => {
    const keyword = e.target.value;
    router.query.keyword = keyword;
    setPage(1);
    router.query.page = page;
    router.push(router);
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    router.query.sort = sort;
    setPage(1);
    router.query.page = page;
    router.push(router);
  };

  const handleType = (e) => {
    setType(e);
    setPage(1);
    router.query.page = page;
    router.push('/recipes/' + e);
  };

  const handleViewType = (view) => {
    setPage(1);
    router.query.page = page;
    router.query.view = view;
    router.push(router);
    setViewType(view);
  };

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

  const fetchScrapedRecipe = (id) => {
    API.request({
      method: 'GET',
      url: `/scraper/show/${id}`,
    })
      .then(({ data }) => {
        if (!data.is_job_done) {
          return setTimeout(() => {
            return fetchScrapedRecipe(id);
          }, 1000);
        }
        if (data.error) {
          setIsImporting(false);
          return form.setErrors({ url: data.error });
        }

        localStorage.setItem(
          'scrapedRecipe',
          JSON.stringify({ ...JSON.parse(data.recipe), tags })
        );
        router.push(`/recipes/new/?id=${id}`);
      })
      .catch((error) => {
        setIsImporting(false);
        form.setErrors({ url: error.data.message });
      });
  };

  const useHandleImport = (values) => {
    setIsImporting(true);
    API.request({
      method: 'GET',
      url: '/scraper',
      params: values,
    })
      .then(({ data }) => {
        fetchScrapedRecipe(data);
      })
      .catch(({ response }) => {
        form.setErrors({ url: response.data.message });
      });
  };
  const observer = useRef();
  const lastItem = useCallback(
    (node) => {
      if (fetching) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && paginator.next_page_url) {
          setPage((prevPage) => prevPage + 1);
          router.query.page = page;
          router.push(router, undefined, { scroll: false });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [fetching, page]
  );

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
      {isImporting && <FullPageSpinner label='Importing recipe...' />}
      <Modal
        centered
        size='xl'
        opened={showModal}
        onClose={() => setShowModal(false)}
        title='Add Recipe'
        styles={{
          title: {
            fontSize: 28,
          },
          close: {
            width: 35,
            height: 35,
            background: '#EFF2F4',
            color: '#8C97A1',
            borderRadius: '50%',
          },
          modal: { padding: '0 !important' },
          header: { padding: 32, margin: 0 },
        }}
      >
        <Divider />
        <Box p={32}>
          <Text sx={{ fontSize: 20 }}>Recipe Importer</Text>
          <Text color='#7E7E7E'>
            Let us do the work of organizing your recipe, paste the recipe URL
            below:
          </Text>
          <form onSubmit={form.onSubmit(useHandleImport)}>
            <Box py={16} sx={{ display: 'flex' }}>
              <Tooltip
                label={
                  <>
                    <div>Sample sites:</div>
                    <div>https://www.allrecipes.com/</div>
                    <div>http://www.cookinglight.com/</div>
                    <div>http://www.eatingwell.com/</div>
                    <div>http://www.foodnetwork.com/</div>
                    <div>https://www.myrecipes.com/</div>
                    <div>https://www.yummly.com/</div>
                  </>
                }
                position='bottom-start'
                withArrow
                sx={{ flex: 1 }}
              >
                <TextInput
                  variant='filled'
                  placeholder='Drop link here'
                  size='md'
                  styles={{
                    input: {
                      color: '#5F666D',
                      fontWeight: 'bold',
                      border: '1px solid #E5ECF2',
                    },
                  }}
                  sx={{ flex: 1 }}
                  {...form.getInputProps('url')}
                />
              </Tooltip>
              <Button ml={16} sx={{ fontSize: 14, height: 42 }} type='submit'>
                Import Recipe
              </Button>
            </Box>
          </form>

          <Text weight='bold'>Tags</Text>
          <TagInput tags={tags} setTags={setTags} />

          <Box mt={32} sx={{ display: 'flex' }}>
            <Text mr={8} color='#7E7E7E'>
              Or
            </Text>
            {/* <Anchor href='/recipes/new/?type=manual' underline={false}> */}
            <Text
              color='green-theme'
              weight='bold'
              onClick={() =>
                router.push({
                  pathname: '/recipes/new',
                  query: { type: 'manual' },
                })
              }
              sx={{ cursor: 'pointer' }}
            >
              Add Recipe Manually
            </Text>
            {/* </Anchor> */}
          </Box>
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SegmentedControl
          value={type}
          onChange={handleType}
          disabled={fetching}
          data={[
            { label: '90/10 Recipes', value: 'ninety-ten' },
            { label: 'Imported', value: 'imported' },
          ]}
          classNames={{
            controlActive: 'custom-segmented-ctrl',
          }}
          styles={{
            label: { padding: '10px' },
            control: {
              minWidth: 120,
            },
          }}
        />
        <Button
          sx={{ fontSize: 14, minWidth: '9%', height: 'auto' }}
          onClick={() => setShowModal(true)}
        >
          Add recipe
        </Button>
      </Box>

      <Center py={26} sx={{ justifyContent: 'space-between' }}>
        <Input
          defaultValue={keyword || ''}
          icon={<Search />}
          placeholder='Search recipe'
          radius='xl'
          onChange={debounce(handleChange, 300)}
          sx={{ minWidth: 330, input: { fontSize: 16 } }}
          size='lg'
        />

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
          <Center ml={18} sx={{ display: 'flex', cursor: 'pointer' }}>
            <Box
              onClick={() => handleViewType('list')}
              sx={{
                padding: 11,
                borderRadius: '8px 0 0 8px',
                background: viewType === 'list' ? '#006C52' : '#EFF5F4',
              }}
            >
              <Filter filled={viewType === 'list' ?? false} />
            </Box>
            <Box
              onClick={() => handleViewType('tile')}
              sx={{
                padding: 11,
                borderRadius: '0 8px 8px 0',
                background: viewType === 'tile' ? '#006C52' : '#EFF5F4',
              }}
            >
              <Category filled={viewType === 'tile' ?? false} />
            </Box>
          </Center>
        </Center>
      </Center>

      {viewType === 'list' ? (
        <RecipeListItem
          recipes={data}
          recipeLast={debounce(lastItem, 300)}
          fetching={fetching}
        />
      ) : (
        <RecipeListItemTiled
          recipes={data}
          recipeLast={debounce(lastItem, 300)}
          fetching={fetching}
        />
      )}
    </Box>
  );
};

export default Index;
