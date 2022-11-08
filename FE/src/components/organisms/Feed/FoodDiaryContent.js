import PropTypes from 'prop-types';
import FoodDiaryItem from './FoodDiaryItem';
import FoodImage from '@/components/molecules/FoodImage';
import { Space, Grid, Divider, Text, Box } from '@mantine/core';

const FoodDiaryContent = ({ food, classes, lastItem }) => {
  const nutrPerServing =
    food?.planable?.nutritions && JSON.parse(food.planable.nutritions);
  const nutritions = [
    {
      nutrition: 'calories',
      value: nutrPerServing?.calories ? parseInt(nutrPerServing.calories) : '-',
      unit: 'kcal',
    },
    {
      nutrition: 'carbs',
      value: nutrPerServing?.carbs ? parseInt(nutrPerServing.carbs) : '-',
      unit: 'g',
    },
    {
      nutrition: 'fat',
      value: nutrPerServing?.fat ? parseInt(nutrPerServing.fat) : '-',
      unit: 'g',
    },
    {
      nutrition: 'protein',
      value: nutrPerServing?.protein ? parseInt(nutrPerServing.protein) : '-',
      unit: 'g',
    },
    {
      nutrition: 'sodium',
      value: nutrPerServing?.sodium ? parseInt(nutrPerServing.sodium) : '-',
      unit: 'mg',
    },
    {
      nutrition: 'cholesterol',
      value: nutrPerServing?.cholesterol
        ? parseInt(nutrPerServing.cholesterol)
        : '-',
      unit: 'mg',
    },
  ];

  return (
    <Box>
      <Box sx={{ padding: '16px 12px 16px 16px' }}>
        <Grid grow gutter={0}>
          <Grid.Col span={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <FoodImage
              src={food.planable.image}
              title={food.planable.title}
              width={80}
              height={67}
              textSize={30}
            />
            <Space w={16} />
            <Text sx={{ fontSize: 14, fontWeight: 500, color: '#101E51' }}>
              {food.planable.title}
            </Text>
          </Grid.Col>
          {nutritions.map((item, i) => (
            <FoodDiaryItem
              key={i}
              classes={classes}
              content={`${item.value} ${item.unit}`}
            />
          ))}
        </Grid>
      </Box>
      {!lastItem && <Divider />}
    </Box>
  );
};

export default FoodDiaryContent;

FoodDiaryContent.propTypes = {
  food: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  lastItem: PropTypes.bool.isRequired,
};
