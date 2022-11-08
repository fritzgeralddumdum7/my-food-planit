import { TextInput } from '@mantine/core';
import PropTypes from 'prop-types';

const Index = ({
  placeholder,
  width,
  leftIcon,
  onChange,
  onKeyUp,
  defaultValue,
}) => {
  return (
    <TextInput
      defaultValue={defaultValue}
      size='lg'
      radius='xl'
      placeholder={placeholder}
      required
      styles={() => ({
        input: {
          width: width,
        },
      })}
      icon={leftIcon}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};

export default Index;

Index.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  leftIcon: PropTypes.node,
};

Index.defaultProps = {
  defaultValue: '',
  leftIcon: '',
  width: null,
  onChange: () => null,
  onKeyUp: () => null,
};
