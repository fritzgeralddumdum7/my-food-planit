import { Grid, Anchor, Box } from '@mantine/core';
import CellGrid from '@/components/organisms/MealPlan/AddPreMadeMealPlan/CellGrid';
import { Preview } from '@/components/organisms/MealPlan/AddPreMadeMealPlan/Preview';
import PropTypes from 'prop-types';

const Index = ({ meals, type, mealTypes, addRecipeToBoard, removeRecipeToBoard }) => {
  const day = () => {
    return [...Array(1)].map((row, i) => {
      return (
        <Grid.Col key={i}>
          {meals &&
            mealTypes.map((it, j) => (
              <CellGrid 
                addRecipeToBoard={addRecipeToBoard}
                key={j}
                yIndex={j}
                xIndex={i}
                isBoard={true}
              >
                {meals[j][it] && (
                  <Anchor
                    href={
                      meals[j][it].type !== 'ingredient'
                        ? `/recipes/${meals[j][it].food?.id}`
                        : '#'
                    }
                    underline={false}
                  >
                    <Preview
                      target={{
                        x: i,
                        y: j,
                        id: meals[j][it]?.id,
                      }}
                      item={meals[j][it]}
                      fullWidth
                      removeRecipeToBoard={removeRecipeToBoard}
                    />
                  </Anchor>
                )}
              </CellGrid>
            ))}
        </Grid.Col>
      );
    });
  };

  const week = () => {
    return (
      meals &&
      [...Array(meals?.length)].map((row, i) => {
        return (
          <Grid.Col span={5} key={i}>
            {meals &&
              [...Array(5)].map((col, j) => (
                <Box key={j} sx={{ position: 'relative' }}>
                  <CellGrid
                    addRecipeToBoard={addRecipeToBoard}
                    yIndex={j}
                    xIndex={i}
                    isRow={false}
                    isBoard={true}
                  >
                    {meals[i] && meals[i][j] && meals[i][j][mealTypes[j]] && (
                      <Anchor
                        href={
                          meals[i][j][mealTypes[j]].type !== 'ingredient'
                            ? `/recipes/${meals[i][j][mealTypes[j]].food?.id}`
                            : '#'
                        }
                        underline={false}
                      >
                        <Preview
                          item={meals[i][j][mealTypes[j]]}
                          target={{
                            x: i,
                            y: j,
                            id: meals[i][j][mealTypes[j]]?.id,
                          }}
                          removeRecipeToBoard={removeRecipeToBoard}
                        />
                      </Anchor>
                    )}
                  </CellGrid>
                </Box>
              ))}
          </Grid.Col>
        );
      })
    );
  };

  const renderGrids = () => {
    if (type === 'day') {
      return day();
    } else if (type === 'week') {
      return week();
    }
  };

  return (
    <Grid ml={138} columns={35} gutter={0} sx={{ width: '100%' }}>
      {renderGrids()}
    </Grid>
  );
};

Index.propTypes = {
  meals: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  mealTypes: PropTypes.array.isRequired,
  addRecipeToBoard: PropTypes.func.isRequired,
  removeRecipeToBoard: PropTypes.func.isRequired,
};

export default Index;
