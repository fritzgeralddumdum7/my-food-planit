import { Space, Box, Text, Group } from '@mantine/core';
import Edit from '@/icons/Edit';
import Trash from '@/icons/Trash';
import WaterSummary from '@/icons/WaterSummary';
import moment from 'moment';
import { useHover } from '@mantine/hooks';
import API from '../../../api/BaseApi';
import { useEffect } from 'react';

const WaterTrackRow = ({
  i,
  id,
  value,
  date,
  showEditDelete = true,
  onEdit = (id) => {},
  onDelete = (id) => {},
}) => {
  const { hovered, ref } = useHover();

  return (
    <>
      <Box
        ref={ref}
        sx={{
          backgroundColor: i % 2 != 0 ? '#F8F9FD' : 'white',
          marginBottom: '16px',
          padding: '8px 20px',
          width: '100%',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <WaterSummary backgroundColor='#D48C29' circleSize={32} />
        <Space w={12} />
        <Text sx={{ fontSize: 14, fontWeight: 700 }}>{value} Fluid Oz</Text>
        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          {!hovered || !showEditDelete ? (
            <Text sx={{ fontSize: 14, fontWeight: 700 }}>
              {date ? moment.utc(date).local().fromNow() : '1 min ago'}
            </Text>
          ) : (
            <>
              <Group
                spacing={7}
                sx={{ cursor: 'pointer' }}
                onClick={() => onEdit(id)}
              >
                <Edit />
                <Text size='sm' pt={5}>
                  Edit
                </Text>
              </Group>
              <Space w={24} />
              <Group
                spacing={7}
                sx={{ cursor: 'pointer' }}
                onClick={() => onDelete(id)}
              >
                <Trash />
                <Text size='sm' color='#C8362E' pt={5}>
                  Delete
                </Text>
              </Group>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default WaterTrackRow;
