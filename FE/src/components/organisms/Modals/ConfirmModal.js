import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { Text } from '@mantine/core';
import PropTypes from 'prop-types';

const Index = ({ title, content, onClose, onClick }) => {
  return (
    <ModalContainer
      title={title}
      onClose={onClose}
      onClick={onClick}
      saveBtnText='Delete'
      withCancelBtn
      withSaveBtn
    >
      <Text mb={30}>{content}</Text>
    </ModalContainer>
  );
};

Index.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Index;
