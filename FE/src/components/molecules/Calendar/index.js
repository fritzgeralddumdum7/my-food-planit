import { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@mantine/core';
import { Calendar } from '@mantine/dates';

const Index = ({ target, value, setValue }) => {
  const [calendarOpen, setcalendarOpen] = useState(false);
  return (
    <Popover
      opened={calendarOpen}
      onClose={() => setcalendarOpen(false)}
      target={<span onClick={() => setcalendarOpen(true)}>{target}</span>}
      position='bottom'
      withArrow
    >
      <div style={{ display: 'flex' }}>
        <Calendar value={value} onChange={setValue} />
      </div>
    </Popover>
  );
};

export default Index;

Index.propTypes = {
  target: PropTypes.node.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};
