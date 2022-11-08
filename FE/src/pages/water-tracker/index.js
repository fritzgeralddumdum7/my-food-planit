import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import DiaryPage from '@/components/organisms/Diary/DiaryPage';

const Index = () => {

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Food Diary'>
        <DiaryPage setTab={1} />
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
