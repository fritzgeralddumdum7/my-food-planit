import React from 'react';
import PropTypes from 'prop-types';
import { Text, Space, Paper, Box, Center } from '@mantine/core';

const PanelCard = ({ icon, label, value, subLabel }) => {
  return (
    <Paper
      radius='lg'
      p='21px 24px 23px 24px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px solid #ECEFF4', height: '100%' }}
    >
      <Center inline>
        {icon}
        <Space w='sm' />
        <Text weight={500} size='lg' style={{ color: '#7A8394' }}>
          {label}
        </Text>
      </Center>
      <Space h={31} />
      <Box style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Text weight='bold' color='green-theme' style={{ fontSize: 42 }}>
          {value}
        </Text>
        <Text
          pl={8}
          pb={12}
          weight={500}
          size='lg'
          style={{ color: '#7A8394' }}
        >
          {subLabel}
        </Text>
      </Box>
    </Paper>
  );
};

export default PanelCard;

PanelCard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  subLabel: PropTypes.node,
};

PanelCard.defaultProps = {
  value: '0',
};
