import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import PeoplePage from '@/components/organisms/People/PeoplePage';

const Index = () => {

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Friends'>
        <PeoplePage setTab={1} />
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
