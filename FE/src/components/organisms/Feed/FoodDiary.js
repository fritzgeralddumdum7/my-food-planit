import { useState } from 'react';
import PropTypes from 'prop-types';
import FoodDiaryHeader from './FoodDiaryHeader';
import FoodDiaryContent from './FoodDiaryContent';
import { Space, Accordion, Grid, createStyles } from '@mantine/core';

const FoodDiary = ({ foods, checkList, setCheckList, meals, isCheckList }) => {
  const [accordionState, setAccordionState] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const useStyles = createStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column-reverse',
    },
    headerLabel: {
      fontSize: 12,
      fontWeight: 700,
      color: '#006C52',
    },
    header: {
      fontSize: 14,
      fontWeight: 500,
      color: '#006C52',
    },
  }));

  const { classes } = useStyles();

  const changeAccordionState = (key) => {
    setAccordionState({
      0: !accordionState[0] && key === 0,
      1: !accordionState[1] && key === 1,
      2: !accordionState[2] && key === 2,
      3: !accordionState[3] && key === 3,
    });
  };

  return (
    <>
      <Space h={24} />
      <Accordion
        initialItem={0}
        icon={<></>}
        styles={() => ({
          itemTitle: {
            backgroundColor: '#F2F5F9',
            borderRadius: '8px',
            margin: '16px 0px',
          },
          item: {
            borderBottom: 0,
          },
          contentInner: {
            padding: 0,
          },
        })}
        offsetIcon={false}
        disableIconRotation={true}
        state={accordionState}
      >
        {meals.map((item, index) => (
          <Accordion.Item
            key={index}
            label={
              <FoodDiaryHeader
                index={index}
                changeAccordionState={changeAccordionState}
                classes={classes}
                meal={item}
                foods={foods}
                checkList={checkList}
                setCheckList={setCheckList}
                isCheckList={isCheckList}
              />
            }
          >
            <Grid>
              <Grid.Col span={12}>
                {foods.map((food, i) => {
                  if (item.types.includes(food.meal_type)) {
                    return (
                      <FoodDiaryContent
                        key={i}
                        classes={classes}
                        {...(i === 1 && 'lastItem')}
                        food={food}
                      />
                    );
                  }
                })}
              </Grid.Col>
            </Grid>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default FoodDiary;

FoodDiary.propTypes = {
  foods: PropTypes.object.isRequired,
  checkList: PropTypes.object.isRequired,
  meals: PropTypes.object.isRequired,
  setCheckList: PropTypes.func.isRequired,
  isCheckList: PropTypes.bool,
};

FoodDiary.defaultProps = {
  isCheckList: false,
};
