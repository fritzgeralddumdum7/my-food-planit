import { Text, Space, Paper, Center, Loader, ScrollArea } from '@mantine/core';
import { useMemo } from 'react';
import CustomListItem from '@/components/molecules/CustomListItem';
import BreadCircle from '@/icons/breadCircle';
import PizzaCircle from '@/icons/pizzaCircle';
import DinnerCircle from '@/icons/dinnerCircle';
import SpoonForkCrossed from '@/icons/spoonForkCrossed';
import PropTypes from 'prop-types';
import Link from 'next/link';

const MealCard = ({ mealsForToday, loading }) => {
  const iconType = (type) => {
    switch (type) {
      case 'bread':
        return <BreadCircle />;
      case 'pizza':
        return <PizzaCircle />;
      case 'dinner':
        return <DinnerCircle />;
      default:
        return <SpoonForkCrossed />;
    }
  };

  const meals = {
    1: 'Breakfast',
    2: 'Snack',
    3: 'Lunch',
    4: 'Snack',
    5: 'Dinner',
  };

  return (
    <Paper
      radius='lg'
      p={24}
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4', height: '100%' }}
    >
      <Text weight='bold' size='xl'>
        Meals For Today
      </Text>
      <Space h={12} />

      {loading ? (
        <Center sx={{ height: '80%' }}>
          <Loader />
        </Center>
      ) : mealsForToday?.length > 0 ? (
        <ScrollArea style={{ height: 260 }} offsetScrollbars>
          {mealsForToday?.map((item, key) => (
            <CustomListItem
              key={key}
              index={key}
              {...item}
              divider='center'
              leftSection={iconType(item.meal_type)}
              title={item.planable.title}
              details={meals[item.meal_type]}
              isMyCircle={false}
              rightSection={
                <Link href={`/recipes/${item.planable_id}`} passHref>
                  <Text weight='bold' color='green-theme'>
                    View More
                  </Text>
                </Link>
              }
            />
          ))}
        </ScrollArea>
      ) : (
        <Center sx={{ height: '80%' }}>
          {/* <Loader /> */}
          <Text>No meals for today!</Text>
        </Center>
      )}
    </Paper>
  );
};

export default MealCard;

MealCard.propTypes = {
  mealsForToday: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
