import React from 'react';
import { Box, Center, Text, Loader } from '@mantine/core';
import Btn from '@/components/molecules/Button';
import { PropTypes } from 'prop-types';

const SuccessWithCalorie = ({
  loading,
  caloriesGoal,
  userDetails,
  messageGoal,
  saveCaloriesGoal,
}) => {
  return (
    <Box>
      <Center>
        <Text weight='bold' color='green-theme' style={{ fontSize: 56 }}>
          Congratulations!
        </Text>
      </Center>
      <Center mt={36} mb={20}>
        <Text weight={600}>Your daily net calorie goal is:</Text>
      </Center>
      {!loading ? (
        <div>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text
              weight={800}
              style={{
                fontSize: 72,
                alignSelf: 'flex-end',
                position: 'relative',
              }}
            >
              {isNaN(Math.round(caloriesGoal(userDetails)))
                ? 0
                : Math.round(caloriesGoal(userDetails))}
              <Text
                pb={22}
                weight={600}
                color='#7A8394'
                style={{
                  fontSize: 24,
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  bottom: 0,
                  right: -50,
                }}
              >
                Cal
              </Text>
            </Text>
          </Box>
          {userDetails && userDetails.nine_to_ten_mode ? (
            <Center>
              <Text color='#7A8394' style={{ fontSize: 14 }}>
                base on 90/10 calculation
              </Text>
            </Center>
          ) : (
            <></>
          )}
          <Center mt={72} mb={6}>
            <Text color='#7A8394' style={{ fontSize: 16 }}>
              With this plan, you should:
            </Text>
          </Center>
          <Center>
            <Text weight={600} style={{ fontSize: 24 }}>
              {messageGoal(userDetails)}
            </Text>
          </Center>
        </div>
      ) : (
        <Center>
          <Loader />
        </Center>
      )}
      <Box mt={40} style={{ width: 478 }} onClick={() => saveCaloriesGoal()}>
        <Btn size='lg'>
          <Text>Go to Dashboard </Text>
        </Btn>
      </Box>
    </Box>
  );
};

export default SuccessWithCalorie;

SuccessWithCalorie.propTypes = {
  loading: PropTypes.boolean,
  caloriesGoal: PropTypes.func,
  userDetails: PropTypes.object,
  messageGoal: PropTypes.func,
  saveCaloriesGoal: PropTypes.func,
};
