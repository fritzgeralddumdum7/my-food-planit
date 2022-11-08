import { Box } from '@mantine/core';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const Index = ({
  children,
  yIndex,
  xIndex,
  isRow,
  isDaysRow,
  isBoard,
  addRecipeToBoard,
  isCalendar,
  gridHeight,
  isFullCalendar,
  date,
  list,
  monthMealType,
}) => {
  let styles = {
    height: gridHeight,
    width: '100%',
    border: '1px solid #E1E7F1',
    position: 'relative',
    borderLeft: 0,
  };

  if (yIndex !== 0) {
    styles = { ...styles, borderLeft: 0 };
  }

  if (isDaysRow && ![0, 12, 18, 24].includes(yIndex)) {
    styles = { ...styles, borderLeftColor: '#fff' };
  } else {
    if (isCalendar && yIndex === 6) {
      styles = { ...styles, borderLeftColor: '#fff' };
    } else {
      styles = { ...styles, borderLeftColor: '#E1E7F1' };
    }
  }

  if (isBoard) {
    if (yIndex < 4) {
      styles = { ...styles, borderBottom: 0 };
    }
  }

  if (!isRow && yIndex !== 4) {
    styles = { ...styles, borderBottom: 0 };
  }

  if (isDaysRow) {
    styles = { ...styles, borderBottom: 0 };
    if (!xIndex) {
      styles = { ...styles, borderLeft: '1px solid #E1E7F1' };
    }
  }

  if (isFullCalendar) {
    styles = { ...styles, border: 0 };
  }

  const [{ isOver, target }, drop] = useDrop(() => ({
    accept: 'div',
    drop: (item) => {
      if (isFullCalendar) {
        return addRecipeToBoard({
          item,
          target,
          targetDate: date,
          list,
          mealType: monthMealType
        });
      }
      return addRecipeToBoard({ item, target, })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      target: { xIndex, yIndex },
    }),
  }));

  const onHoverStyles = {
    height: '100%',
    background: isOver ? '#F1FBDD !important' : '#fff',
    border: isOver && '1px solid #B2DD91 !important',
    borderLeftStyle: isOver && 'solid',
  };

  return (
    <Box style={styles}>
      <Box
        ref={isBoard ? drop : null}
        sx={onHoverStyles}
        ml={isOver && xIndex > 0 ? -1 : 1}
        p={10}
      >
        {children}
      </Box>
    </Box>
  );
};

Index.propTypes = {
  children: PropTypes.node,
  yIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  xIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isRow: PropTypes.bool,
  isDaysRow: PropTypes.bool,
  isBoard: PropTypes.bool,
  addRecipeToBoard: PropTypes.func.isRequired,
  isCalendar: PropTypes.bool,
  gridHeight: PropTypes.string,
  isFullCalendar: PropTypes.bool,
  date: PropTypes.string,
  list: PropTypes.array,
};

Index.defaultProps = {
  children: null,
  isRow: true,
  isDaysRow: false,
  isBoard: false,
  isCalendar: false,
  gridHeight: '20vh',
  addRecipeToBoard: () => null,
  isFullCalendar: false,
  date: null,
  list: [],
};

export default Index;
