import PropTypes from 'prop-types';
import { Modal } from '@mantine/core';
import ModalHeader from '@/components/molecules/ModalHeader/index';

const Index = ({
  children,
  opened,
  setOpened,
  header,
  compact,
  size,
  padding,
  width,
  height,
  callback,
}) => {
  return (
    <Modal
      // zIndex={500}
      centered
      opened={opened}
      size={size}
      onClose={() => {
        setOpened(false);
        if (callback) {
          callback();
        }
      }}
      withCloseButton={false}
      title={
        <ModalHeader
          setOpened={setOpened}
          compact={compact}
          callback={callback}
        >
          {header}
        </ModalHeader>
      }
      trapFocus={false}
      styles={{
        title: { width: '100%', margin: 0 },
        header: { margin: 0 },
        modal: { width: width, height: height },
      }}
      padding={padding}
    >
      {children}
    </Modal>
  );
};

export default Index;

Index.propTypes = {
  opened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setOpened: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  size: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Index.defaultProps = {
  size: '85%',
};
