import PropTypes from 'prop-types';

import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { Stack, Group, TextInput, Select } from '@mantine/core';
import ChevronDown from '@/icons/Chevrondown';
import { ingredient_measurements_data } from '@/consts/select_choices';
import { useForm } from '@mantine/form';
import isEmpty from 'lodash/isEmpty';

const Index = ({ title, target, onClick, onClose }) => {
  const ingredientMeasurements = () => {
    return Object.entries(ingredient_measurements_data).map((d) => ({
      label: `1 ${d[0]}`,
      value: `1 ${d[0]}`,
    }));
  };

  const form = useForm({
    initialValues: {
      quantity: '1.0',
      serving: ingredientMeasurements()[0].value,
    },

    validate: {
      quantity: (value) => (!value ? 'Required' : null),
    },
  });

  const handleSave = () => {
    form.validate();

    if (isEmpty(form.errors)) {
      const ingredient = {
        item: {
          food: {
            content: form.values,
            title,
          },
          type: 'ingredient',
        },
        target,
      };
      onClick(ingredient);
    }
  };

  return (
    <ModalContainer
      withSaveBtn
      title={title}
      onClose={onClose}
      onClick={handleSave}
      withCloseButton={false}
    >
      <Stack pb={32}>
        <form onSubmit={form.onSubmit(handleSave)}>
          <Group spacing={24} sx={{ alignItems: 'flex-start' }}>
            <TextInput
              type='number'
              label='Qty'
              styles={() => ({
                input: {
                  background: '#F3F6F9',
                  border: '1px solid #E5ECF2',
                  maxWidth: 67,
                  height: 40,
                },
                label: {
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1C212D',
                },
              })}
              radius={3}
              {...form.getInputProps('quantity')}
            />
            <Select
              rightSection={<ChevronDown width={40} height={40} />}
              styles={() => ({
                input: {
                  background: '#F3F6F9',
                  border: '1px solid #E5ECF2',
                  maxWidth: 183,
                  height: 40,
                },
                label: {
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1C212D',
                },
                rightSection: { pointerEvents: 'none' },
              })}
              label='Serving of'
              data={ingredientMeasurements()}
              radius={3}
              {...form.getInputProps('serving')}
            />
          </Group>
        </form>
      </Stack>
    </ModalContainer>
  );
};

export default Index;

Index.propTypes = {
  title: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
