import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center } from '@mantine/core';4

const iconWrapperProps = ({ bgColor }) => ({
  style: {
    width: '42px',
    height: '42px',
    background: bgColor,
    borderRadius: '42px',
  },
})

const ItemIcon = ({ children, bgColor }) => {
  return (
    <Box {...iconWrapperProps({ bgColor })}>
      <Center style={{ height: '100%' }}>{children}</Center>
    </Box>
  );
};

export default ItemIcon;

ItemIcon.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
};

ItemIcon.defaultProps = {
  bgColor: 'unset',
};
