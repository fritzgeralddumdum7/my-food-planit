import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import FeedPage from '@/components/organisms/Feed/FeedPage';
import { FeedCTX } from '@/contexts/FeedContext';

const Index = () => {
  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Feed'>
        <FeedCTX>
          <FeedPage />
        </FeedCTX>
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
