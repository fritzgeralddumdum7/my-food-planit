import PropTypes from 'prop-types';
import CalendarIcon from '@/icons/Calendar';
import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { Button, Text, Center, Stack } from '@mantine/core';

const Index = ({ onClose, onClick }) => {
  return (
    <ModalContainer onClose={onClose}>
      <Center>
        <Stack>
          <Center>
            <CalendarIcon width={75} height={75} />
          </Center>
          <Text sx={{ fontSize: 28 }} weight='bold' color='#1C212D'>
            This conflicts with an existing plan.
          </Text>
          <Button size='md' px={53} onClick={onClick}>
            Check Calendar
          </Button>
        </Stack>
      </Center>
    </ModalContainer>
  );
};
export default Index;

Index.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
