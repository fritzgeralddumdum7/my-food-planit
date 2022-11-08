import {
  Box,
  Center,
  Text,
  Button,
  Space,
  Grid,
  Divider,
  Switch,
  Input,
} from '@mantine/core';
import Search from '@/icons/Search';
import FilterV3 from '@/icons/FilterV3';
import PersonCard from './PersonCard';
import { useState, useEffect } from 'react';
import Modal from '@/components/organisms/Modal';
import API from '@/api/BaseApi';
import InvitationModal from './modal/InvitationModal';
import { useSearchInputCTX } from '@/contexts/SearchInputContext';

const MyCircles = ({ people, setPeople }) => {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [myCircleSetting, setMyCircleSetting] = useState({
    food_diary: false,
    recipes: false,
    water_tracker: false,
  });
  const { searchHandler, query } = useSearchInputCTX();

  useEffect(() => {
    fetchFollowers();
    API.request({
      method: 'GET',
      url: '/circle_settings',
    }).then(({ data: { food_diary, recipes, water_tracker } }) => {
      setMyCircleSetting({ food_diary, recipes, water_tracker });
    });
  }, []);

  const fetchFollowers = (params) => {
    API.request({
      method: 'GET',
      url: '/users/follows',
      params,
    }).then(({ data }) => {
      setPeople(data);
    });
  };

  const saveSettings = () => {
    API.request({
      method: 'POST',
      url: '/circle_settings',
      data: {
        ...myCircleSetting,
      },
    }).then(({ data }) => {});
    setOpened(false);
  };

  const unfollow = (id) => {
    API.request({
      method: 'POST',
      url: `/relationships/unfollow/${id}`,
    }).then(() => {
      fetchFollowers({ search: query?.target.value });
    });
  };

  useEffect(() => {
    if (query?.key === 'Enter') {
      fetchFollowers({ search: query.target.value });
    }
  }, [query]);

  return (
    <>
      <Center py={26} sx={{ justifyContent: 'space-between' }}>
        <Input
          icon={<Search />}
          placeholder='Search People'
          radius='xl'
          sx={{ minWidth: 400, input: { fontSize: 16 } }}
          size={48}
          styles={() => ({
            icon: { marginLeft: 5 },
          })}
          onKeyPress={(event) => searchHandler(event)}
        />
        <Center>
          <Box
            sx={{
              padding: 11,
              borderRadius: '8px',
              background: '#EFF5F4',
              width: 48,
              height: 48,
              marginRight: 20,
              cursor: 'pointer',
            }}
            onClick={() => setOpened(true)}
          >
            <Center>
              <FilterV3 />
            </Center>
          </Box>
          <Button onClick={() => setInvitationOpened(true)}>
            <Text sx={{ fontWeight: 700, fontSize: 14 }}>Invite Friends</Text>
          </Button>
        </Center>
      </Center>
      <Space h={32} />
      <Grid gutter={32}>
        {people?.map((person) => (
          <Grid.Col span={6}>
            <PersonCard {...person.following} unfollow={unfollow} />
          </Grid.Col>
        ))}
      </Grid>
      <Modal
        opened={opened}
        setOpened={setOpened}
        header={
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Text sx={{ fontSize: 28, fontWeight: 700 }}>
              My Circle Setting
            </Text>
            <Text sx={{ fontSize: 14, fontWeight: 400, color: '#6B6D86' }}>
              Set which data you want to share with your circle
            </Text>
          </Box>
        }
        padding={0}
        size={'40%'}
        width={'700px'}
        height={'622px'}
      >
        <Divider />
        <Box
          sx={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Text sx={{ fontSize: 18, color: '#1C212D' }}>Food diary</Text>
              <Text sx={{ fontSize: 14, color: '#6B6D86' }}>
                Your circle’s visibility to daily logs of what you eat and drink
                each day.
              </Text>
            </Box>
            <Switch
              checked={myCircleSetting.food_diary}
              onChange={(e) =>
                setMyCircleSetting((setting) => ({
                  ...setting,
                  food_diary: !setting.food_diary,
                }))
              }
              color='green-theme'
              styles={{
                input: {
                  cursor: 'pointer',
                  background: '#EFF2F4',
                  borderColor: '#EFF2F4',
                  ':checked': {
                    background: '#EFF2F4',
                    borderColor: '#EFF2F4',
                    '::before': {
                      background: '#006C52',
                      borderColor: '#006C52',
                    },
                  },
                  '::before': {
                    background: '#9C9C9C',
                    borderColor: '#9C9C9C',
                  },
                },
              }}
            />
          </Box>
          <Space h={16} />
          <Divider />
          <Space h={16} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Text sx={{ fontSize: 18, color: '#1C212D' }}>Recipes</Text>
              <Text sx={{ fontSize: 14, color: '#6B6D86' }}>
                Your circle’s visibility to the recipes included in your meal
                plan.
              </Text>
            </Box>
            <Switch
              checked={myCircleSetting.recipes}
              onChange={(e) =>
                setMyCircleSetting((setting) => ({
                  ...setting,
                  recipes: !setting.recipes,
                }))
              }
              color='green-theme'
              styles={{
                input: {
                  cursor: 'pointer',
                  background: '#EFF2F4',
                  borderColor: '#EFF2F4',
                  ':checked': {
                    background: '#EFF2F4',
                    borderColor: '#EFF2F4',
                    '::before': {
                      background: '#006C52',
                      borderColor: '#006C52',
                    },
                  },
                  '::before': {
                    background: '#9C9C9C',
                    borderColor: '#9C9C9C',
                  },
                },
              }}
            />
          </Box>
          <Space h={16} />
          <Divider />
          <Space h={16} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Text sx={{ fontSize: 18, color: '#1C212D' }}>Water tracker</Text>
              <Text sx={{ fontSize: 14, color: '#6B6D86' }}>
                Your circle’s visibility to your water intake
              </Text>
            </Box>
            <Switch
              checked={myCircleSetting.water_tracker}
              onChange={(e) =>
                setMyCircleSetting((setting) => ({
                  ...setting,
                  water_tracker: !setting.water_tracker,
                }))
              }
              color='green-theme'
              styles={{
                input: {
                  cursor: 'pointer',
                  background: '#EFF2F4',
                  borderColor: '#EFF2F4',
                  ':checked': {
                    background: '#EFF2F4',
                    borderColor: '#EFF2F4',
                    '::before': {
                      background: '#006C52',
                      borderColor: '#006C52',
                    },
                  },
                  '::before': {
                    background: '#9C9C9C',
                    borderColor: '#9C9C9C',
                  },
                },
              }}
            />
          </Box>
          <Space h={16} />
          <Divider />
          <Space h={132} />
          <Box sx={{ display: 'flex' }}>
            <Button
              size='md'
              sx={{ padding: '0px 56px', marginLeft: 'auto' }}
              onClick={() => saveSettings()}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
      <InvitationModal
        opened={invitationOpened}
        setOpened={setInvitationOpened}
      />
    </>
  );
};

export default MyCircles;
