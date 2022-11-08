import { Grid } from '@mantine/core';
import CellGrid from './CellGrid';
import PropTypes from 'prop-types';
import { Preview } from './Preview';

const Index = ({
  week,
  meals,
  addRecipeToBoard,
  removeRecipeToBoard,
  display,
  board,
}) => {
  const render = () => {
    return board?.map((row, i) => {
      return (
        <Grid.Col span={display.span} key={i}>
          {row?.map((col, j) => (
            <CellGrid
              key={j}
              yIndex={j}
              xIndex={i}
              isBoard={true}
              addRecipeToBoard={addRecipeToBoard}
              gridHeight='18vh'
            >
              {board[i][j][meals[j].toLowerCase()] && (
                <Preview
                  target={{
                    x: i,
                    y: j,
                    mealType: meals[j].toLowerCase(),
                    week,
                  }}
                  item={board[i][j][meals[j].toLowerCase()]}
                  removeRecipeToBoard={removeRecipeToBoard}
                  customHeight='15vh'
                  fullWidth
                  isBoard={true}
                />
              )}
            </CellGrid>
          ))}
        </Grid.Col>
      );
    });
  };

  return (
    <Grid pl={138} gutter={0} columns={display.column}>
      {render()}
    </Grid>
  );
};

Index.propTypes = {
  week: PropTypes.number.isRequired,
  meals: PropTypes.array.isRequired,
  board: PropTypes.array.isRequired,
  addRecipeToBoard: PropTypes.func,
  removeRecipeToBoard: PropTypes.func,
  display: PropTypes.func.isRequired,
};

Index.defaultProps = {
  addRecipeToBoard: () => null,
  removeRecipeToBoard: () => null,
};

export default Index;
