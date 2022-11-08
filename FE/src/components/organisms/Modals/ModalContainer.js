import PropTypes from 'prop-types';
import Main from '@/templates/Main';
import { Modal, Text, Group, Button } from '@mantine/core';

const Index = ({
  children,
  onClose,
  title,
  onClick,
  saveBtnText,
  withSaveBtn,
  withCloseButton,
  subTitle,
  width,
  overflow,
  withCancelBtn,
}) => {
  return (
    <Main>
      <Modal
        title={
          title && (
            <Text
              sx={{ fontSize: 28, position: 'relative' }}
              weight='bold'
              color='#1C212D'
            >
              {title}
              {subTitle && (
                <Text
                  size='sm'
                  sx={{ position: 'absolute', whiteSpace: 'pre' }}
                  weight='300'
                  color='#6B6D86'
                >
                  {subTitle}
                </Text>
              )}
            </Text>
          )
        }
        withCloseButton={withCloseButton}
        closeOnClickOutside={withCloseButton}
        closeOnEscape={withCloseButton}
        onClose={onClose}
        overflow={overflow}
        centered
        size='lg'
        opened={true}
        styles={() => ({
          header: {
            padding: 32,
            width: 'inherit',
            marginBottom: 0,
            borderBottom: '1px solid #E6E6E6',
          },
          modal: {
            padding: '0 !important',
            width,
          },
          body: {
            padding: 32,
          },
          close: {
            background: '#EFF2F4',
            height: 40,
            width: 40,
            borderRadius: 9999,
          },
        })}
      >
        {children}
        <Group sx={{ width: '100%' }} position='right'>
          {withCancelBtn && (
            <Button size='md' px={53} variant='outline' onClick={onClose}>
              Cancel
            </Button>
          )}
          {withSaveBtn && (
            <Button size='md' px={53} onClick={onClick}>
              {saveBtnText}
            </Button>
          )}
        </Group>
      </Modal>
    </Main>
  );
};
export default Index;

Index.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  saveBtnText: PropTypes.string,
  withSaveBtn: PropTypes.bool,
  withCloseButton: PropTypes.bool,
  description: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  overflow: PropTypes.string,
  withCancelBtn: PropTypes.bool,
};

Index.defaultProps = {
  title: null,
  subTitle: null,
  saveBtnText: 'Save',
  withSaveBtn: false,
  withCancelBtn: false,
  withCloseButton: true,
  onClick: () => null,
  description: null,
  overflow: null,
};
