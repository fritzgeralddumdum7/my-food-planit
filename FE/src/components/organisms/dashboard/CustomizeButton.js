import React from 'react';
import PropTypes from 'prop-types';
import { Box, Space, Text } from '@mantine/core';
import FilterIcon from '@/icons/filter';

const buttonContainerProps = {
  style: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'end',
    cursor: 'pointer',
  },
};
const buttonWrapperProps = {
  color: 'green-theme',
  size: 'sm',
  weight: 'bold',
  style:{ alignSelf: 'center' },
};

const CustomizeButton = ({ onClick }) => {
  return (
    <Box {...buttonContainerProps} onClick={onClick}>
      <FilterIcon />
      <Space w='xs' />
      <Text {...buttonWrapperProps}>Customize</Text>
    </Box>
  );
};

export default CustomizeButton;

CustomizeButton.propTypes = {
  onClick: PropTypes.func,
};

CustomizeButton.defaultProps = {
  onClick: () => {},
};
