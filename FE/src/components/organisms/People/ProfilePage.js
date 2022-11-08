import {
  Box,
  Text,
  Button,
  Avatar,
  Stack,
  Grid,
  Space,
  Tabs,
  Center,
  Tooltip,
} from '@mantine/core';
import Breadcrumb from '@/components/organisms/Breadcrumb';
import FoodDiary from './profile/FoodDiary';
import WaterTracker from './profile/WaterTracker';
import RecipePage from './profile/RecipePage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import moment from 'moment';
import API from '../../../api/BaseApi';
import { parseName } from '../../../helpers/profileNameHelper';

const person = {
  image:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
  name: 'Eleanor Pena',
  status: 'Last active 1 min ago',
};

const ProfilePage = () => {
  const router = useRouter();
  const userId = router.query.id;
  const [following, setFollowing] = useState(false);
  const [circleSettings, circleSettingsFetching] = useApi(
    { method: 'GET', url: `/circle_settings/${userId}` },
    []
  );
  const [showTabs, setShowTabs] = useState(0);

  const [user, fetching, errors] = useApi(
    {
      method: 'GET',
      url: `/users/profile/${userId}`,
    },
    []
  );

  const [followingData, followingFetching] = useApi(
    {
      method: 'GET',
      url: `/users/follows`,
    },
    []
  );

  useEffect(() => {
    if (circleSettingsFetching) {
      return;
    }

    const show =
      circleSettings.food_diary * 100 +
      circleSettings.recipes * 10 +
      circleSettings.water_tracker;

    setShowTabs(show);
  }, [circleSettingsFetching]);

  useEffect(() => {
    if (!followingData) {
      return;
    }
    setFollowing(
      followingData.map((item) => item.following_id).includes(Number(userId))
    );
  }, [followingFetching]);

  const followUser = () => {
    API.request({
      method: 'POST',
      url: `/relationships/follow/${userId}`,
    }).then(({ data }) => {
      setFollowing(!following);
    });
  };

  const unfollowUser = () => {
    API.request({
      method: 'POST',
      url: `/relationships/unfollow/${userId}`,
    }).then(({ data }) => {
      setFollowing(!following);
    });
  };

  return (
    <>
      {!fetching && !followingFetching && !circleSettingsFetching && (
        <>
          <Breadcrumb
            items={[
              { title: 'My Circle', href: '/my-circles', color: '#006C52' },
              {
                title: user.name || user.user_detail?.username,
                href: '#',
                color: '#7E8CA0',
              },
            ]}
          />
          <Space h={32} />
          <Grid>
            <Grid.Col span={6}>
              <Box
                sx={{
                  display: 'flex',
                  padding: '24px',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  key={user.user_detail.image}
                  src={user.user_detail.image}
                  radius={90}
                  size={90}
                />
                <Stack spacing='0' sx={{ marginLeft: '16px' }}>
                  <Tooltip
                    label={user.name || user.user_detail.username}
                    withArrow
                  >
                    <Text sx={{ fontSize: 24, fontWeight: 700 }}>
                      {parseName(user, 20, false)}
                    </Text>
                  </Tooltip>
                  <Text sx={{ fontSize: 14, color: '#828282' }}>
                    {moment(user.last_seen).isValid()
                      ? moment.utc(user.last_seen).local().fromNow()
                      : 'New User'}
                  </Text>
                </Stack>
                {!user.is_current_user && (
                  <Button
                    variant={following ? 'outline' : 'filled'}
                    sx={{ marginLeft: 'auto', padding: '0px 40px' }}
                    onClick={() => {
                      following ? unfollowUser() : followUser();
                    }}
                  >
                    {following ? 'Following' : 'Follow'}
                  </Button>
                )}
              </Box>
            </Grid.Col>
          </Grid>
          <Space h={40} />
          {(showTabs == 0 || (showTabs == 1 && !following)) &&
          !user.is_current_user ? (
            <Box>
              <Center sx={{ color: '#828282', fontSize: 25 }}>
                This user has chosen to hide their data
              </Center>
            </Box>
          ) : (
            <Tabs
              variant='unstyled'
              tabPadding='lg'
              styles={{
                tabsList: {
                  borderBottom: '2px solid #e9ecef',
                },
                tabControl: {
                  color: '#9AA5B6',
                  fontWeight: 'bold',
                  marginBottom: '-2px',
                },
                tabActive: {
                  borderBottom: '2px solid #B2DD91',
                  color: '#006C52',
                },
              }}
            >
              {(circleSettings.food_diary == 1 || user.is_current_user) && (
                <Tabs.Tab label='FOOD DIARY'>
                  <FoodDiary user={user} />
                </Tabs.Tab>
              )}
              {(circleSettings.recipes == 1 || user.is_current_user) && (
                <Tabs.Tab label='RECIPE'>
                  <RecipePage />
                </Tabs.Tab>
              )}
              {((circleSettings.water_tracker == 1 && following) ||
                user.is_current_user) && (
                <Tabs.Tab label='WATER TRACKER'>
                  <WaterTracker user={user} />
                </Tabs.Tab>
              )}
            </Tabs>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
