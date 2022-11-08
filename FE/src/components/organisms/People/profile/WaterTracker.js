import WaterSummary from '@/icons/WaterSummary';
import {
  Space,
  Box,
  Text,
  Divider,
  Button,
  Group,
  Center,
  Skeleton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import ChevronRight from '@/icons/ChevronRight';
import { useState, useEffect } from 'react';
import Calendar from '@/icons/Calendar';
import moment from 'moment';
import WaterTrackRow from '../../Diary/WaterTrackRow';
import useApi from '../../../../hooks/useApi';
import { parseName } from '../../../../helpers/profileNameHelper';

const data = [
  {
    value: 16,
  },
  {
    value: 8,
  },
  {
    value: 16,
  },
  {
    value: 8,
  },
  {
    value: 16,
  },
  {
    value: 8,
  },
  {
    value: 16,
  },
];

const WaterTracker = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalOunce, setTotalOunce] = useState(0);
  const [data, fetching] = useApi(
    {
      method: 'GET',
      url: '/tracked-water',
      params: {
        currentDate: moment(currentDate).utc().format('Y-MM-D'),
        user: user.id,
      },
    },
    [currentDate]
  );

  useEffect(() => {
    if (fetching) return;
    setTotalOunce(data.reduce((sum, i) => sum + i.value, 0));
  }, [fetching]);

  const prevHandler = () => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() - 1)));
  };

  const nextHandler = () => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() + 1)));
  };

  return (
    <>
      <Space h={24} />
      <Group>
        <Text
          sx={{
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          {user.is_current_user
            ? 'Your '
            : `${user.name?.split(' ')[0] || user.user_detail?.username}'s `}
          Water Summary For:
        </Text>
        <Group spacing='xs'>
          <Button
            variant='light'
            color='gray'
            styles={() => ({
              inner: {
                transform: 'rotate(180deg)',
              },
            })}
            onClick={() => prevHandler()}
          >
            <ChevronRight color='#65768E' strokeWidth={2} />
          </Button>
          <DatePicker
            icon={<Calendar width={16} height={16} />}
            value={currentDate}
            onChange={setCurrentDate}
            clearable={false}
            sx={{
              input: {
                fontWeight: 700,
              },
            }}
          />
          <Button variant='light' color='gray' onClick={() => nextHandler()}>
            <ChevronRight color='#65768E' strokeWidth={2} />
          </Button>
        </Group>
      </Group>
      <Space h={42} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '32px 28px',
          width: '100%',
          height: '116px',
          backgroundColor: '#F7F8FB',
          borderRadius: 15,
        }}
      >
        <WaterSummary backgroundColor={'#006C52'} />
        <Space w={22} />
        <Text
          sx={{
            fontSize: 24,
            fontWeight: 700,
            maxWidth: 189,
            overflowWrap: 'anywhere',
          }}
        >
          {`${parseName(user, 15)}`}
          water summary
        </Text>
        <Space w={38} />
        {fetching ? (
          <>
            <Box>
              <Skeleton width={'30vw'} height={48} />
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Text sx={{ fontSize: 24, fontWeight: 700 }}>
                {(totalOunce / 128).toFixed(2)}
              </Text>
              <Space w={6} />
              <Text sx={{ color: '#707070' }}>Gallons</Text>
            </Box>
            <Space w={57} />
            <Divider sx={{ height: 48 }} orientation='vertical' />
            <Space w={57} />
            <Box>
              <Text sx={{ fontSize: 24, fontWeight: 700 }}>
                {totalOunce / 8}
              </Text>
              <Space w={6} />
              <Text sx={{ color: '#707070' }}>Cups</Text>
            </Box>
            <Space w={57} />
            <Divider sx={{ height: 48 }} orientation='vertical' />
            <Space w={57} />
            <Box>
              <Text sx={{ fontSize: 24, fontWeight: 700 }}>{totalOunce}</Text>
              <Space w={6} />
              <Text sx={{ color: '#707070' }}>Fluid Ounces</Text>
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '24px 64px',
          width: '100%',
          height: '64px',
        }}
      >
        <Text sx={{ color: '#707070' }}>
          Total on {moment(new Date(currentDate)).format('dddd, MMMM DD, YYYY')}
        </Text>
        <Space w={12} />
        <Text sx={{ color: '#006C52', fontWeight: 700 }}>
          {totalOunce} Fluid Ounces
        </Text>
      </Box>
      {fetching ? (
        <Box>
          <Center sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton height={48} width='100%' />
            <Skeleton height={48} width='100%' />
            <Skeleton height={48} width='100%' />
            <Skeleton height={48} width='100%' />
          </Center>
        </Box>
      ) : (
        <>
          {data.map((item, i) => (
            <WaterTrackRow value={item.value} i={i + 1} />
          ))}
        </>
      )}
    </>
  );
};

export default WaterTracker;
