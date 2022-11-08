import { Box, Center, Text } from '@mantine/core';
import Btn from '@/components/molecules/Button';
import React from 'react';
import { PropTypes } from 'prop-types';

const PlainSuccessMessage = ({ saveCaloriesGoal }) => {
  return (
    <Box>
      <Center>
        <Text weight='bold' color='green-theme' style={{ fontSize: 56 }}>
          Congratulations!
        </Text>
      </Center>

      <Box mt={40} style={{ width: 478 }} onClick={() => saveCaloriesGoal()}>
        <Btn size='lg'>
          <Text>Let&apos;s Get Started </Text>
        </Btn>
      </Box>
    </Box>
  );
};

export default PlainSuccessMessage;

PlainSuccessMessage.propTypes = {
  saveCaloriesGoal: PropTypes.func,
};
