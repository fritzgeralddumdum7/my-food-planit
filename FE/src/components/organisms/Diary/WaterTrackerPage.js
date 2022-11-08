import WaterSummary from '@/icons/WaterSummary';
import {
  Space,
  Box,
  Text,
  Divider,
  Button,
  Grid,
  Group,
  Checkbox,
  NumberInput,
  Loader,
  Center,
  Skeleton,
  keyframes,
} from '@mantine/core';
import Modal from '@/components/organisms/Modal';
import { useState, useEffect, useRef } from 'react';
import WaterSummaryFilled from '@/icons/WaterSummaryFilled';
import WaterTrackRow from './WaterTrackRow';
import useApi from '@/hooks/useApi';
import moment from 'moment';
import API from '../../../api/BaseApi';

const Index = () => {
  const TRANSITION_DELAY = 250;
  const currentTime = moment();
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(currentTime);
  const dayOfMonthOffset = moment().startOf('month').day() - 1;
  const [waterSize, setWaterSize] = useState(8);
  const [updateId, setUpdateId] = useState(-1);
  const [updated, setUpdated] = useState(false);
  const [totalOunce, setTotalOunce] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [transition, setTransition] = useState('');
  const [isCustomWaterValue, setIsCustomWaterValue] = useState(false);
  const submitTypes = {
    CREATE: 'create',
    UPDATE: 'update',
  };
  const [submitType, setSubmitType] = useState(submitTypes.CREATE);

  const displayDates = () => {
    return [...Array(21)].map((item, i) => {
      return moment(currentDate).subtract(9 - i, 'days');
    });
  };

  const [data, fetching, error] = useApi(
    {
      method: 'GET',
      url: '/tracked-water',
      params: {
        currentDate: moment(currentDate).utc().format('Y-MM-D'),
      },
    },
    [currentDate, updated]
  );

  useEffect(() => {
    if (transition == '') return;
    const timeout = setTimeout(() => {
      setTransition('');
    }, TRANSITION_DELAY);

    return () => {
      clearTimeout(timeout);
    };
  }, [transition]);

  useEffect(() => {
    if (fetching) return;
    setTotalOunce(data.reduce((sum, i) => sum + i.value, 0));
  }, [fetching]);

  useEffect(() => {
    if (updateId > 0)
      setIsCustomWaterValue(
        !!data?.find((item) => item.id === updateId)?.is_custom
      );
    else setIsCustomWaterValue(false);
  }, [updateId, opened]);

  const DayCard = ({ day, date, muted, selected, cardDate }) => {
    return (
      <Box
        onClick={async () => {
          if (muted) return;
          setTransition(
            cardDate.isAfter(moment(currentDate), 'days') ? 'right' : 'left'
          );
          await new Promise((r) => setTimeout(r, TRANSITION_DELAY));
          setCurrentDate(cardDate + 1);
        }}
        sx={{
          width: '42px',
          height: '54px',
          borderRadius: 2,
          animation:
            transition != '' &&
            `${transition == 'left' ? moveLeft : moveRight} 0.25s ease-in-out`,
          '&:hover': {
            cursor: muted ? 'not-allowed' : 'pointer',
          },
        }}
      >
        <Text
          align='center'
          sx={{
            fontSize: 20,
            color: (muted && '#707070') || (selected && '#006C52'),
            transition: 'color 0.25s ease 0.25s',
          }}
        >
          {date}
        </Text>
        <Text align='center' sx={{ fontSize: 12, color: muted && '#707070' }}>
          {day}
        </Text>
      </Box>
    );
  };

  const ChevronLeft = () => {
    return (
      <svg
        width='6'
        height='12'
        viewBox='0 0 6 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.68705 11.0205C5.86456 10.843 5.8807 10.5653 5.73546 10.3695L5.68705 10.3134L1.37416 6.00033L5.68705 1.68721C5.86456 1.5097 5.8807 1.23193 5.73546 1.03619L5.68705 0.980106C5.50954 0.802595 5.23176 0.786458 5.03602 0.931694L4.97994 0.980106L0.313277 5.64677C0.135766 5.82428 0.119628 6.10206 0.264864 6.2978L0.313277 6.35388L4.97994 11.0205C5.1752 11.2158 5.49179 11.2158 5.68705 11.0205Z'
          fill='black'
        />
      </svg>
    );
  };

  const ChevronRight = () => {
    return (
      <svg
        width='6'
        height='12'
        viewBox='0 0 6 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.313439 11.0205C0.135928 10.843 0.11979 10.5653 0.265027 10.3695L0.313439 10.3134L4.62633 6.00033L0.313439 1.68721C0.135928 1.5097 0.11979 1.23193 0.265027 1.03619L0.313439 0.980106C0.49095 0.802595 0.768726 0.786458 0.964467 0.931694L1.02055 0.980106L5.68721 5.64677C5.86472 5.82428 5.88086 6.10206 5.73562 6.2978L5.68721 6.35388L1.02055 11.0205C0.825283 11.2158 0.508701 11.2158 0.313439 11.0205Z'
          fill='black'
        />
      </svg>
    );
  };

  const WaterTrackCard = ({ selected, value }) => {
    return (
      <Box
        sx={{
          border: selected ? '2px solid #B2DD91' : '1px solid #DDDDDD',
          borderRadius: '4px',
          width: 102,
          height: 128,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        onClick={() => {
          setWaterSize(value);
          setIsCustomWaterValue(false);
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!selected ? (
            <WaterSummary
              size={32}
              backgroundColor={'white'}
              strokeColor={'#1C212D'}
            />
          ) : (
            <Box
              sx={{
                width: 52,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WaterSummaryFilled size={32} />
            </Box>
          )}
        </Box>
        <Space h={24} />
        <Text align='center'>{value} Fl Oz</Text>
      </Box>
    );
  };

  const WaterSummaryPanel = () => {
    return (
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
        <Text sx={{ fontSize: 24, fontWeight: 700, maxWidth: 159 }}>
          Your water summary
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
        <Button
          sx={{ padding: '12px 47px', marginLeft: 'auto' }}
          size='md'
          onClick={() => {
            setSubmitType(submitTypes.CREATE);
            setUpdateId(-1);
            setOpened(true);
          }}
        >
          <Text>Add Water</Text>
        </Button>
      </Box>
    );
  };

  const Calendar = () => {
    return (
      <Grid columns={21}>
        <Grid.Col
          span={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 24,
              border: '1px solid #DBDEE9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={async () => {
              setTransition('left');
              await new Promise((r) => setTimeout(r, TRANSITION_DELAY));
              setCurrentDate(moment(currentDate).subtract(1, 'days'));
            }}
          >
            <ChevronLeft width={10} height={10} color={'black'} />
          </Box>
        </Grid.Col>
        {displayDates().map((item, i) => (
          <Grid.Col
            span={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              display: i == 0 || i == 20 ? 'none' : '',
            }}
          >
            {i == 9 && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 10,
                  width: '42px',
                  height: '54px',
                  border: '1px solid #006C52',
                }}
              ></Box>
            )}
            <DayCard
              date={
                item.get('date') < 10
                  ? `0${item.get('date')}`
                  : item.get('date')
              }
              day={days[(item.get('date') + dayOfMonthOffset) % 7]}
              selected={item.isSame(moment(currentDate), 'day')}
              muted={item.isAfter(moment(), 'day')}
              cardDate={item}
            />
          </Grid.Col>
        ))}
        <Grid.Col
          span={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 24,
              border: '1px solid #DBDEE9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={async () => {
              const tomorrow = moment(currentDate).add(1, 'days');
              if (tomorrow.isAfter(moment(), 'day')) return;
              setTransition('right');
              await new Promise((r) => setTimeout(r, TRANSITION_DELAY));
              setCurrentDate(tomorrow);
            }}
          >
            <ChevronRight width={10} height={10} color={'black'} />
          </Box>
        </Grid.Col>
      </Grid>
    );
  };

  const moveLeft = keyframes`
    from {
      transform: translateX(0);
      filter: blur(0);
    }

    25%, 75% {
      filter: blur(1px);
    }

    50% {
      filter: blur(3px);
    }

    to {
      transform: translateX(59px);
      filter: blur(0);
    }
  `;

  const moveRight = keyframes`
    from {
      transform: translateX(0);
      filter: blur(0);
    }

    25%, 75% {
      filter: blur(1px);
    }

    50% {
      filter: blur(3px);
    }

    to {
      transform: translateX(-59px);
      filter: blur(0);
    }
  `;

  const handleSubmit = () => {
    setSubmitting(true);
    API.request({
      method: 'POST',
      url:
        submitType === submitTypes.CREATE
          ? '/tracked-water'
          : `/tracked-water/${updateId}/update`,
      data: {
        value: waterSize,
        is_custom: !!isCustomWaterValue,
        date: moment(currentDate).utc(),
      },
    }).then(({ data }) => {
      setOpened(false);
      setUpdateId(-1);
      setUpdated(!updated);
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    });
  };

  const handleDeleteEntry = (id) => {
    API.request({ method: 'DELETE', url: `/tracked-water/${id}` }).then(() =>
      setUpdated(!updated)
    );
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Space h={24} />
      <>
        <WaterSummaryPanel />
        <Space h={38} />
        <Calendar />
        <Space h={36} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '24px 64px',
            width: '100%',
            height: '64px',
          }}
        >
          <Text sx={{ color: '#707070' }}>Today's total</Text>
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
              <WaterTrackRow
                i={i + 1}
                id={item.id}
                value={item.value}
                date={item.created_at}
                setOpened={setOpened}
                onEdit={(id) => {
                  setSubmitType(submitTypes.UPDATE);
                  setUpdateId(id);
                  setWaterSize(data.find((_item) => _item.id === id).value);
                  setOpened(true);
                }}
                onDelete={handleDeleteEntry}
              />
            ))}
          </>
        )}
      </>
      {fetching && (
        <Box>
          <Center sx={{ height: '100vh' }}>
            <Skeleton />
          </Center>
        </Box>
      )}
      <Modal
        opened={opened}
        setOpened={setOpened}
        header={
          submitType === submitTypes.CREATE ? 'Add water' : 'Update Water'
        }
        padding={0}
        size={'40%'}
        width={'395px'}
        height={'535px'}
      >
        <Divider />
        <Box sx={{ padding: '32px' }}>
          <Text sx={{ fontSize: 20 }}>Choose size</Text>
          <Space h={12} />
          <Grid>
            <Grid.Col span={4}>
              <WaterTrackCard
                value={16}
                selected={!isCustomWaterValue && waterSize == 16}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <WaterTrackCard
                value={12}
                selected={!isCustomWaterValue && waterSize == 12}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <WaterTrackCard
                value={8}
                selected={!isCustomWaterValue && waterSize == 8}
              />
            </Grid.Col>
          </Grid>
          <Space h={42} />
          <Group>
            <Checkbox
              sx={{
                label: { color: '#1C212D', cursor: 'pointer', fontSize: 16 },
              }}
              label='Enter custom value'
              checked={isCustomWaterValue}
              onChange={(e) => {
                setIsCustomWaterValue(e.currentTarget.checked);
                setWaterSize(undefined);
              }}
            />
          </Group>
          <Space h={12} />
          <NumberInput
            hideControls
            variant='filled'
            size='md'
            sx={{
              input: { width: '100%' },
            }}
            rightSection={
              <Text sx={{ color: '#5F666D', fontWeight: 700 }}>Fl Oz</Text>
            }
            value={isCustomWaterValue ? waterSize : undefined}
            onChange={setWaterSize}
            disabled={!isCustomWaterValue || submitting}
          />
          <Space h={32} />
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Button
              size='md'
              sx={{ marginLeft: 'auto' }}
              onClick={() => handleSubmit()}
              disabled={submitting}
            >
              {submitType === submitTypes.CREATE ? 'Add' : 'Update'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
