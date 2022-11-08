import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ModalFoodDiaryItemColumn from './FoodDiaryItem';
import { Grid, Text, Checkbox, Box } from '@mantine/core';

const FoodDiaryHeader = ({
  classes,
  index,
  meal,
  changeAccordionState,
  foods,
  checkList,
  setCheckList,
  isCheckList,
}) => {
  const [totalNutritions, setTotalNutritions] = useState({
    Calories: 0,
    Carbs: 0,
    Fat: 0,
    Protein: 0,
    Sodium: 0,
    Sugar: 0,
  });
  const unit = {
    Calories: 'kcal',
    Carbs: 'g',
    Fat: 'g',
    Protein: 'g',
    Sodium: 'mg',
    Sugar: 'mg',
  };

  useEffect(() => {
    // calculate total nutritions at header
    foods?.map((food) => {
      if (meal.types.includes(food.meal_type)) {
        const nutrPerServing = food.planable.nutritions
          ? JSON.parse(food.planable.nutritions)
          : {};
        Object.entries(totalNutritions).map((nutr) => {
          Object.entries(nutrPerServing).map((perServing) => {
            if (nutr[0].toLocaleLowerCase() === perServing[0]) {
              setTotalNutritions({
                ...totalNutritions,
                [nutr[0]]: (totalNutritions[nutr[0]] += parseInt(
                  perServing[1]
                )),
              });
            }
          });
        });
      }
    });
  }, [foods]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isCheckList && (
        <Box sx={{ marginRight: '16px' }}>
          <Checkbox
            checked={checkList[meal.title]}
            onChange={(event) =>
              setCheckList({
                ...checkList,
                [meal.title]: event.currentTarget.checked,
              })
            }
          />
        </Box>
      )}

      <Box sx={{ width: '100%' }} onClick={() => changeAccordionState(index)}>
        <Grid grow gutter={0}>
          <Grid.Col span={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              <Text sx={{ fontWeight: 500 }}>{meal.title}</Text>
            </Box>
          </Grid.Col>
          {Object.entries(totalNutritions).map((nutr, i) => (
            <ModalFoodDiaryItemColumn
              key={i}
              classes={classes}
              content={`${nutr[1] ? nutr[1] : '-'} ${unit[nutr[0]]}`}
              label={nutr[0]}
              isCheckList={isCheckList}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FoodDiaryHeader;

FoodDiaryHeader.propTypes = {
  foods: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  lastItem: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  meal: PropTypes.object.isRequired,
  changeAccordionState: PropTypes.func.isRequired,
  checkList: PropTypes.object.isRequired,
  setCheckList: PropTypes.func.isRequired,
  isCheckList: PropTypes.bool.isRequired,
};
