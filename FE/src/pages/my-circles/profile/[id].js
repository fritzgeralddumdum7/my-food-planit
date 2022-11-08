import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import ProfilePage from '@/components/organisms/People/ProfilePage';

const Index = () => {
  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='My Circle'>
        <ProfilePage />
      </DashboardWrapper>
    </Main>
  );
};

export default Index;