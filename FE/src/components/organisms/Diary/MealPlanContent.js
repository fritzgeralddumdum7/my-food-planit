import {
  Space,
  Text,
  ScrollArea,
  Box,
  Button,
  Grid,
  Center,
} from '@mantine/core';
import IngredientItem from './IngredientItem';
import PropTypes from 'prop-types';
import moment from 'moment';

const Index = ({
  setOpened,
  mealPlanState,
  setMealPlanState,
  currentDate,
  selectHandler,
  addHandler,
  onClose,
}) => {
  const meals = {
    1: 'Breakfast',
    2: 'Snack',
    3: 'Lunch',
    4: 'Snack',
    5: 'Dinner',
  };
  const MealPlanSet = ({ header, mealplan, selectHandler, index }) => {
    return (
      <>
        <Space h={32} />
        <Text sx={{ fontSize: 14, fontWeight: 700 }}>{header}</Text>
        <Space h={16} />
        <Grid>
          <Grid.Col span={6}>
            <IngredientItem
              index={index}
              mealplan={mealplan}
              selectHandler={selectHandler}
            />
          </Grid.Col>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Space h={24} />
      {mealPlanState?.length > 0 ? (
        <Text sx={{ fontSize: 14 }}>
          You have {mealPlanState?.length} recipes on{' '}
          {moment(currentDate).format('MMMM DD, YYYY')}
        </Text>
      ) : (
        <Center>
          <Text sx={{ fontSize: 14 }}>
            You have no recipes on {moment(currentDate).format('MMMM DD, YYYY')}
          </Text>
        </Center>
      )}
      <Space h={12} />
      <ScrollArea
        style={{ width: '650px', height: '300px' }}
        offsetScrollbars
        scrollbarSize={4}
      >
        <Box style={{ width: '600px' }}>
          {mealPlanState?.map((mealplan, iter) => (
            <MealPlanSet
              key={iter}
              index={iter}
              selectHandler={selectHandler}
              header={meals[mealplan?.meal_type]}
              mealplan={mealplan}
            />
          ))}
        </Box>
      </ScrollArea>
      <Space h={12} />
    </>
  );
};

export default Index;

Index.propTypes = {
  setOpened: PropTypes.func.isRequired,
};
