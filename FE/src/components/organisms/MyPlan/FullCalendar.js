import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Group, Stack, Button } from '@mantine/core';
import { Date, Preview, ShowMoreRecipes } from './components';
import moment from 'moment';
import PropTypes from 'prop-types';
import CellGrid from '@/components/organisms/MealPlan/AddPreMadeMealPlan/CellGrid';

const FullCalendar = ({ view, monthItems, addRecipeToBoard, removeRecipeToBoard, monthMealType, }) => {
  const [showMoreRecipes, setShowMoreRecipes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const showMoreRecipeHandler = useCallback((i, recipes) => {
    const toggle = !monthItems[i].showMoreVisibility;
    monthItems[i].showMoreVisibility = toggle;
    setShowMoreRecipes(recipes);
    setSelectedDay(i);
  });

  const render = (data) => {
    return (
      data.length > 0 &&
      data?.map((d, i) => {
        const mDate = Object.keys(d)[0];
        return (
          <Grid.Col
            span={5}
            key={i}
            styles={() => ({
              root: {
                borderRight: '1px solid #E1E7F1',
                borderBottom: '1px solid #E1E7F1',
                position: 'relative',
              },
            })}
          >
            <CellGrid
              yIndex={i}
              xIndex={0}
              isBoard={true}
              isFullCalendar={true}
              addRecipeToBoard={addRecipeToBoard}
              date={mDate}
              list={d[mDate]}
              monthMealType={monthMealType}
            >
              {
                d[mDate].length > 2 && d.showMoreVisibility && (
                  <ShowMoreRecipes
                    recipes={d[mDate]}
                    date={monthItems[selectedDay]}
                    selectedDay={i}
                    showMoreRecipeHandler={showMoreRecipeHandler}
                    view={view}
                    removeRecipeToBoard={removeRecipeToBoard}
                    i={i}
                    targetDate={mDate}
                  />
                )
              }
              {
                (
                  <Stack spacing={0} sx={{ height: '100%' }}>
                <Date
                  dayIndex={i}
                  date={mDate}
                  isToday={
                    moment(mDate).date() === moment().date() &&
                    moment(mDate).month() === moment().month()
                  }
                />
                <Stack
                  spacing={0}
                  sx={{ height: '100%' }}
                  justify='space-between'
                  mt={i < 7 && 12}
                >
                  <Stack spacing={0}>
                    {d[mDate]?.length > 0 &&
                      d[mDate]
                        .slice(0, i < 7 ? 2 : 3)
                        .map((recipe, j) => (
                          <Preview
                            recipe={recipe.food}
                            key={j}
                            removeRecipeToBoard={removeRecipeToBoard}
                            target={{ index: i, mealType: recipe.meal_type, targetDate: mDate, id: recipe?.id }}
                          />
                        ))}
                  </Stack>
                  {(((d[mDate]?.length > 3 && i > 6) || (d[mDate]?.length > 2 && i < 7))) && (
                    <Group position='right'>
                      <Button
                        onClick={() => showMoreRecipeHandler(i, d[mDate])}
                        styles={() => ({
                          root: {
                            width: 50,
                            fontSize: 10,
                            padding: 5,
                            height: 20,
                          },
                        })}
                      >
                        More
                      </Button>
                    </Group>
                  )}
                </Stack>
              </Stack>
                )
              }
            </CellGrid>
          </Grid.Col>
        );
      })
    );
  };

  return (
    <Grid
      columns={35}
      gutter={0}
      styles={() => ({
        root: {
          borderLeft: '1px solid #E1E7F1',
          borderTop: '1px solid #E1E7F1',
        },
      })}
    >
      {render(monthItems)}
    </Grid>
  );
};

FullCalendar.propTypes = {
  view: PropTypes.string,
  monthItems: PropTypes.array.isRequired,
  addRecipeToBoard: PropTypes.func.isRequired,
};

FullCalendar.defaultProps = {
  view: 'default',
};

export default FullCalendar;
