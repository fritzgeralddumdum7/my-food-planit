import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Text } from '@mantine/core';

const containerProps = ({ isOver }) => ({
  style: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: isOver ? '#cacaca' : '#e4e4e4',
    borderRadius: '15px',
    height: '48px',
    width: '100%',
  },
});

const ClearOnDrop = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (itemData) => {
      if (!!onDrop) onDrop({ from: itemData });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }), [onDrop]);

  return (
    <Box
      ref={drop}
      {...containerProps({ isOver })}
    >
      <Text align='center'>Drop here to remove from active slot</Text>
    </Box>
  );
};

export default ClearOnDrop;