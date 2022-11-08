import PropTypes from 'prop-types';
import { Text, Group, Input } from '@mantine/core';

const Index = ({ label, form, name, icon }) => {
  return (
    <>
      <Text weight='bold'>
        {label}
      </Text>
      <Group position='apart' spacing='xs'>
        <Input
          icon={icon}
          type='number'
          variant='filled'
          sx={{ width: '45%' }}
          {...form.getInputProps(name?.min)}
        />
        <Text>-</Text>
        <Input
          icon={icon}
          type='number'
          variant='filled'
          sx={{ width: '45%' }}
          {...form.getInputProps(name?.max)}
        />
      </Group>
    </>
  );
};

export default Index;

Index.propTypes = {
  label: PropTypes.string,
  form: PropTypes.object,
  name: PropTypes.exact({
    min: PropTypes.string,
    max: PropTypes.string,
  }),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Index.defaultProps = {
  label: null,
  form: { onSubmit: () => null, getInputProps: () => null },
  name: {},
  icon: '',
};
