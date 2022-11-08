import React, { useState, useEffect } from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import FullPageSpinner from '@/components/molecules/FullPageSpinner';
import DashboardWrapper from '@/templates/DashboardWrapper';
import { Divider, Group, Stack } from '@mantine/core';
import Breadcrumb from '@/components/organisms/Breadcrumb';
import { DateRangePicker } from '@mantine/dates';
import List from '@/components/organisms/Shop/List';
import moment from 'moment';
import Calendar from '@/icons/Calendar';
import useApi from '@/hooks/useApi';
import API from '@/api/BaseApi';

const Index = () => {
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [value, setValue] = useState([
    new Date(),
    moment(moment()).add(7, 'days'),
  ]);

  useEffect(() => {
    if (value[0] && value[1]) {
      setTriggerRefetch(!triggerRefetch);
    }
  }, [value[0], value[1]]);

  const [data, fetching] = useApi(
    {
      method: 'GET',
      url: '/shop/',
      params: {
        from: moment(value[0]).format('YYYY-MM-DD'),
        to: moment(value[1]).format('YYYY-MM-DD'),
      },
    },
    [triggerRefetch]
  );

  const [cartItems] = useApi(
    {
      method: 'GET',
      url: '/cart/',
    },
    []
  );
  useEffect(() => setCartList(cartItems), [cartItems]);

  const addToCartHandler = ({ parentKey, childKey }) => {
    const food = data[parentKey][childKey];
    API.post('/cart', { id: food.id }).then(({ data }) => setCartList(data));
    data[parentKey][childKey].inCart = true;
  };

  const removeItemFromCart = (cartId, shopId) => {
    API.delete(`/cart/${cartId}`).then(({ data }) => setCartList(data));
    Object.entries(data).map((date) =>
      date[1].map((plan, i) => {
        if (plan.id === shopId) {
          data[date[0]][i] = { ...plan, inCart: false };
        }
      })
    );
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='My Plan'>
        <Breadcrumb
          items={[
            { title: 'Plan', href: '/shop', color: '#006C52' },
            {
              title: 'Shopping List',
              href: '/shop',
              color: '#7E8CA0',
            },
          ]}
        />
        <Divider mt='md' mb={32} />
        <Group spacing={20} mb={10}>
          <DateRangePicker
            icon={<Calendar width={12} height={12} />}
            styles={() => ({
              input: {
                height: 42,
                border: '1px solid #E7EAEE',
                width: '252px',
              },
            })}
            value={value}
            onChange={setValue}
            radius={8}
            clearable={false}
          />
        </Group>
        {fetching ? (
          <FullPageSpinner />
        ) : (
          <Stack>
            <List
              shopList={data}
              cartList={cartList}
              addToCartHandler={addToCartHandler}
              removeItemFromCart={removeItemFromCart}
            />
          </Stack>
        )}
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
