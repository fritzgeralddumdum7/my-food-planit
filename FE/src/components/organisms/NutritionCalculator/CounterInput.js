import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, NumberInput, Group, ActionIcon } from '@mantine/core';

const numberUnitWrapperProps = {
  style: {
    fontSize: '32px',
    fontWeight: '400',
    color: '#969BA0'
  },
};
const actionIconProps = {
  style: {
    borderRadius: '25px',
    fontWeight: 700,
  },
  variant: 'default',
}
const inputProps = {
  variety: 'unstyled',
  min: 0,
  precision: 1,
  step: 0.1,
  styles: {
    input: {
      width: '132px',
      height: '42px',
      fontSize: '30px',
      border: 'unset',
      borderRadius: 0,
      borderBottom: '2px solid #000000',
      paddingLeft: 0,
      paddingRight: '48px',
    },
    rightSection: {
      paddingRight: 0,
    },
  },
  hideControls: true,
}

const CounterInput = ({ unitLabel, disabled, ...props }) => {
  const handlers = useRef();

  return (
    <Group style={{ height: '189px', }} spacing={5} position="center">
      <ActionIcon
        {...actionIconProps}
        onClick={() => handlers.current.decrement()}
        disabled={disabled}
      >–</ActionIcon>
      <NumberInput
        {...props}
        {...inputProps}
        className="counter-input"
        handlersRef={handlers}
        rightSection={<Text {...numberUnitWrapperProps}>{unitLabel}</Text>}
        disabled={disabled}
      />
      <ActionIcon
        {...actionIconProps}
        onClick={() => handlers.current.increment()}
        disabled={disabled}
      >+</ActionIcon>
    </Group>
  )
};

export default CounterInput;

CounterInput.propTypes = {
  unitLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

CounterInput.defaultProps = {
  unitLabel: '',
  disabled: false,
};
