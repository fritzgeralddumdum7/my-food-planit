import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import FoodDiary from '@/components/organisms/Diary/FoodDiary';
import WaterTrackerPage from './WaterTrackerPage';

const DiaryPage = ({ setTab }) => {
  const router = useRouter();

  const onTabChange = (key) => {
    if (key === 0) {
      router.push('/food-diary');
    } else if (key === 1) {
      router.push('/water-tracker');
    }
  };

  return (
    <Tabs
      active={setTab}
      onTabChange={onTabChange}
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
      <Tabs.Tab label='FOOD DIARY'>
        <FoodDiary />
      </Tabs.Tab>
      <Tabs.Tab label='WATER TRACKER'>
        <WaterTrackerPage />
      </Tabs.Tab>
    </Tabs>
  );
};

export default DiaryPage;

DiaryPage.propTypes = {
  setTab: PropTypes.number,
};

DiaryPage.defaultProps = {
  setTab: 0,
};
