import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import StandardCalculator from './StandardCalculator';

const NutritionCalculatorPage = ({ setTab }) => {
  const router = useRouter();

  const onTabChange = (key) => {
    if (key === 0) {
      router.push('/nutrition-calculator');
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
      <Tabs.Tab label='STANDARD CALCULATOR'>
        <StandardCalculator />
      </Tabs.Tab>
    </Tabs>
  );
};

export default NutritionCalculatorPage;

NutritionCalculatorPage.propTypes = {
  setTab: PropTypes.number,
};

NutritionCalculatorPage.defaultProps = {
  setTab: 0,
};
