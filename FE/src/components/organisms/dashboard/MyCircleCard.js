import CustomListItem from '@/components/molecules/CustomListItem';
import ArrowRightCircle from '@/icons/arrowRightCircle';
import {
  Text,
  Space,
  Paper,
  Avatar,
  Loader,
  Center,
  Group,
  Anchor,
  ScrollArea,
} from '@mantine/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const MyCircleCard = ({ follows, loading }) => {
  return (
    <Paper
      radius='lg'
      p={24}
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4', height: '100%' }}
    >
      <Text weight='bold' size='xl'>
        My Circles
      </Text>
      <Space h={12} />

      {loading ? (
        <Center sx={{ height: '80%' }}>
          <Loader />
        </Center>
      ) : follows?.length > 0 ? (
        <ScrollArea style={{ height: 260 }} offsetScrollbars>
          {follows?.map((item, key) => (
            <CustomListItem
              index={key}
              {...item}
              id={item.following_id}
              divider='center'
              title={item.following.name ?? item.following.email}
              details={
                moment(item.following.last_seen).isValid()
                  ? `Last active ${moment
                      .utc(item.following.last_seen)
                      .local()
                      .fromNow()}`
                  : 'New User'
              }
              leftSection={
                <Avatar
                  src={
                    !!item.user_detail.image ??
                    `https://d2tr66j7i5v7og.cloudfront.net/profiles/${item.id}/${item.user_detail?.image}`
                  }
                  radius='xl'
                  size={40}
                />
              }
              rightSection={<ArrowRightCircle />}
            />
          ))}
        </ScrollArea>
      ) : (
        <Center sx={{ height: '80%' }}>
          <Group spacing={4}>
            <Text>No circles yet?</Text>
            <Anchor weight='bold' href='/my-circles'>
              Invite
            </Anchor>
          </Group>
        </Center>
      )}
    </Paper>
  );
};

export default MyCircleCard;

MyCircleCard.propTypes = {
  follows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
