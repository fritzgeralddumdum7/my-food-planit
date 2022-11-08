import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '@mantine/core';
import FriendsList from '@/components/organisms/People/FriendsList';
import { useRouter } from 'next/router';
import MyCircles from './MyCircles';
import { useState, useEffect } from 'react';
import API from '@/api/BaseApi';
const PeoplePage = ({ setTab }) => {
  const router = useRouter();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    API.request({
      method: 'GET',
      url: '/users/follows',
    }).then(({ data }) => {
      setPeople(data);
    });
  }, []);

  const onTabChange = (key) => {
    if (key === 0) {
      router.push('/people');
    } else if (key === 1) {
      router.push('/my-circles');
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
      <Tabs.Tab label='FRIENDS'>
        <FriendsList />
      </Tabs.Tab>
      <Tabs.Tab label={`MY CIRCLES (${people.length})`}>
        <MyCircles people={people} setPeople={setPeople} />
      </Tabs.Tab>
    </Tabs>
  );
};

export default PeoplePage;

PeoplePage.propTypes = {
  setTab: PropTypes.number,
};

PeoplePage.defaultProps = {
  setTab: 0,
};
