import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Text, Avatar, Box, Group, Input, Skeleton } from '@mantine/core';
import Logout from '@/icons/Logout';
import Gear from '@/icons/Gear';
import DangerCircle from '@/icons/DangerCircle';
import Notifications from './Notification';
import Search from '@/icons/Search';
import { useRouter } from 'next/router';
import { useSearchInputCTX } from '@/contexts/SearchInputContext';
import useApi from '@/hooks/useApi';
import { AuthContext } from '@/contexts/AuthProvider';

const Index = ({ label }) => {
  const { isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const [user, fetching] = useApi({ method: 'GET', url: '/users/profile' }, []);
  const { searchHandler } = useSearchInputCTX();

  useEffect(() => {
    if (fetching) {
      return;
    }
    console.log(user);
  }, [fetching]);

  // if (fetching) {
  //   return <>Loading..</>;
  // }

  return (
    <Box
      p='40px 71px 40px 58px'
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Text weight='bold' sx={{ fontSize: 32 }}>
        {label}
      </Text>
      <Group spacing={21}>
        {router.asPath === '/my-plan/' && (
          <Input
            icon={<Search />}
            placeholder='Search'
            radius='xl'
            sx={{ minWidth: 400, input: { fontSize: 16 } }}
            size={48}
            styles={() => ({
              icon: { marginLeft: 5 },
            })}
            onKeyPress={(event) => searchHandler(event)}
          />
        )}
        {/* <Menu
          placement='center'
          control={
            <Box>
              <DangerCircle />
            </Box>
          }
          sx={{ cursor: 'pointer' }}
        >
          <Menu.Item>My Food Plan-it</Menu.Item>
        </Menu> */}
        {/* <Notifications /> */}
        {!fetching ? (
          <Menu
            control={
              <Avatar
                key={user.user_detail?.image}
                src={`${user.user_detail?.image}?cache=none`}
                radius='xl'
                size={48}
              />
            }
            sx={{ cursor: 'pointer' }}
          >
            <Menu.Label sx={{ fontSize: 16 }}>
              {user.user_detail?.username}
            </Menu.Label>
            {!isAdmin && (
              <Menu.Item
                icon={<Gear />}
                onClick={() => {
                  router.push('/profile');
                }}
              >
                Settings
              </Menu.Item>
            )}

            <Menu.Item component='a' href='/logout' icon={<Logout />}>
              Logout
            </Menu.Item>
          </Menu>
        ) : (
          <Skeleton radius='xl' height={48} circle />
        )}
      </Group>
    </Box>
  );
};

export default Index;

Index.propTypes = {
  label: PropTypes.string,
};

Index.defaultProps = {
  label: null,
};
