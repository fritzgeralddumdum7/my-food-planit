import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Box, Center } from '@mantine/core';
import SwapIcon from '@/icons/SwapIcon';

const itemWrapperProps = ({ isDragging }) => ({
  style: {
    height: '98px',
    padding: '24px',
    borderRadius: '15px',
    border: isDragging ? '2px solid #000000' : '2px solid #ECEFF4',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    cursor: 'grab',
    '&:hover': {
      boxShadow: '0px 40px 80px #EEF1F4;',
    },
  },
})

const Item = ({
  itemData,
  icon,
  onDrag,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: itemData,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [itemData]);

  useEffect(() => {
    if (!!onDrag) onDrag(isDragging, itemData);
  }, [isDragging]);

  return (
    <Box ref={drag} {...itemWrapperProps({ isDragging })}>
      <Box style={{ marginRight: '12px' }}>{icon}</Box>
      <Box style={{ marginRight: 'auto', color: '#7A8394', fontWeight: 500 }}>
        {children}
      </Box>
      <Box>
        <Center sx={{ height: '100%' }}>
          <SwapIcon />
        </Center>
      </Box>
    </Box>
  );
};


export default Item;

Item.propTypes = {
  itemData: PropTypes.object,
  icon: PropTypes.node,
  children: PropTypes.node,
};
