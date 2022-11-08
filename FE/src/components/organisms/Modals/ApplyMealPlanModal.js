import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CalendarIcon from '@/icons/Calendar';
import Calendar from '@/components/molecules/Calendar';
import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { Text, Center, Box } from '@mantine/core';

const Index = ({ onClose, title, total_recipes, total_days, onClick }) => {
  const [calendarValue, setCalendarValue] = useState(new Date());

  return (
    <ModalContainer
      title='Apply to the meal plan'
      onClose={onClose}
      withSaveBtn
      onClick={() => onClick(calendarValue)}
    >
      <Text color='#0A0F20' weight='bold' size='xl'>
        {title}
      </Text>
      <Box>
        <Text color='#9D9FA6'>
          {total_recipes} {total_days > 1 ? 'Recipes' : 'Recipe'}
          <span
            style={{
              color: 'gray',
              fontSize: '20px',
              top: 10,
              marginTop: '5px',
            }}
          >
            &nbsp;&bull;&nbsp;
          </span>
          {total_days ?? '-'} {total_days > 1 ? 'days' : 'day'}
        </Text>
        <Text weight={500} size='sm' mt={24} mb={8}>
          Start date
        </Text>
        <Calendar
          target={
            <Box
              style={{
                display: 'inline-block',
                border: '1px solid #E7EAEE',
                borderRadius: 8,
                padding: '12px 21px',
                cursor: 'pointer',
              }}
            >
              <Center>
                <CalendarIcon width={16} height={16} />
                <Text ml={15} weight={700} sx={{ display: 'inline-block' }}>
                  {moment(calendarValue ?? new Date()).format('MMM DD, YYYY')}
                </Text>
              </Center>
            </Box>
          }
          value={calendarValue}
          setValue={(value) => {
            setCalendarValue(value);
          }}
        />
      </Box>
    </ModalContainer>
  );
};
export default Index;

Index.propTypes = {
  title: PropTypes.string.isRequired,
  total_recipes: PropTypes.number.isRequired,
  total_days: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onCalendarChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
