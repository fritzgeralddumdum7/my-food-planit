import PropTypes from 'prop-types';

import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { Radio , Stack, RadioGroup, Button, Group, } from '@mantine/core';
import { meal_value, mealView } from '@/consts/select_choices';

const Index = ({ title, target, onClick, onClose, list, monthMealType, setMonthMealType, }) => {

  return (
    <ModalContainer
      title={title}
      onClose={onClose}
      withCloseButton
    >
      <Stack>
        <RadioGroup
          value={monthMealType}
          onChange={e => setMonthMealType(state => ({ ...state, value: e, list, mealValue: meal_value[e] ?? mealView[e] }))}
          orientation='vertical'
        >
          {
            list?.map((value, i) => <Radio value={value} label={value} />)
          }
        </RadioGroup>
        <Group position='right'>
          <Button width='lg' onClick={onClick}>Save</Button>
        </Group>
      </Stack>
    </ModalContainer>
  );
};

export default Index;
