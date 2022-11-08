import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { Box } from '@mantine/core';
import Item from './Item';

const containerProps = ({ isOver }) => ({
  style: {
    backgroundColor: isOver ? '#cacaca' : '#e4e4e4',
    borderRadius: '15px',
    height: '98px',
    width: '100%',
  },
});

const SingleBoard = ({ index, item, onDrop, onDrag }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (itemData) => {
      if (!!onDrop) onDrop({from: itemData, to: { item, index }});
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }), [onDrop, item, index]);

  return (
    <Box
      ref={drop}
      {...containerProps({ isOver })}
    > 
      {!!item ? (
        <Item icon={item.icon} itemData={{item, index}} onDrag={onDrag}>
          {item.label}
        </Item>
      ) : <></>}
    </Box>
  );
};

export default SingleBoard;

SingleBoard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  onDrop: PropTypes.func,
};

SingleBoard.defaultProps = {
  onDrop: () => {},
};
