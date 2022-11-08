import { Box, Text, Button, Avatar, Stack } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

const PersonCard = ({
  image,
  name,
  last_seen,
  user_detail,
  id,
  unfollow,
  email,
}) => {
  const { hovered, ref } = useHover();
  const activeTime = moment.utc(last_seen).local();
  const { username } = user_detail ?? 'N/A';
  const router = useRouter();

  return (
    <Box
      sx={{
        boxShadow: '0px 5px 10px #EEF1F4',
        borderRadius: '4px',
        display: 'flex',
        padding: '24px',
        alignItems: 'center',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Box
        onClick={() => {
          router.push(`my-circles/profile/${id}`);
        }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
        }}
      >
        <Avatar
          key={user_detail.image}
          src={user_detail.image}
          radius='xl'
          size={48}
        />
        <Stack spacing='0' sx={{ marginLeft: '16px' }}>
          {/* <Text>{name ? name : username}</Text> */}
          <Text>{email}</Text>
          <Text sx={{ fontSize: 12, color: '#828282' }}>
            {activeTime.isValid() && activeTime.fromNow()}
          </Text>
        </Stack>
      </Box>
      <Button
        size='md'
        variant='outline'
        sx={{
          padding: '0px 40px',
          marginLeft: 'auto',
          transition: '0.2s',
          '&:hover': {
            backgroundColor: '#006C52',
            color: '#fff',
          },
        }}
        ref={ref}
        onClick={() => {
          unfollow(id);
        }}
        onClick={() => {
          unfollow(id);
        }}
      >
        {!hovered ? 'Following' : 'Unfollow'}
      </Button>
    </Box>
  );
};

export default PersonCard;
