import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import RecipePage from '@/components/organisms/Recipe/RecipePage';

const Index = () => {

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Recipes'>
        <RecipePage setTab={1} />
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
