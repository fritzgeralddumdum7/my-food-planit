import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import NutritionCalculatorPage from '@/components/organisms/NutritionCalculator/NutritionCalculatorPage';

const NutritionCalculator = () => {
  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Nutrition Calculator'>
        <NutritionCalculatorPage setTab={0} />
      </DashboardWrapper>
    </Main>
  );
};

export default NutritionCalculator;
