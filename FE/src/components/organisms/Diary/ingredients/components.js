import {
  Box,
  Group,
  Text,
  Select,
  NumberInput,
  Checkbox,
  TextInput,
} from '@mantine/core';
import ChevronDown from '@/icons/Chevrondown';
import { ingredient_measurements_data } from '@/consts/select_choices';
import { styles } from './styles';
import PropTypes from 'prop-types';

const ingredientMeasurements = () => {
  return Object.entries(ingredient_measurements_data).map((d) => ({
    label: `1 ${d[0]}`,
    value: `1 ${d[1][0]}`,
  }));
};

export const IngredientItem = ({ name, form, parentId, idx }) => {
  const isChecked = form.values[`checkbox${parentId}${idx}`];

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #E6E6E6' }}>
        <Group
          py={20}
          position='apart'
          sx={{
            position: 'relative',
          }}
        >
          <Text sx={{ fontSize: 14, flex: 1 }} weight={400}>
            {name}
          </Text>
          {isChecked && (
            <Group
              sx={{
                position: 'absolute',
                right: 40,
              }}
            >
              <TextInput
                {...form.getInputProps(`name${parentId}${idx}`)}
                sx={{ display: 'none' }}
              />
              <NumberInput
                sx={{ maxWidth: '67px' }}
                variant='filled'
                placeholder='1.0'
                hideControls={true}
                {...form.getInputProps(`amount${parentId}${idx}`)}
              />
              <Text sx={{ fontSize: '14px' }}>serving of</Text>

              <Select
                data={ingredientMeasurements()}
                placeholder='measurement'
                rightSection={<ChevronDown width={40} height={40} />}
                maxDropdownHeight={400}
                sx={{ width: 183 }}
                styles={() => ({
                  label: styles.label,
                  input: {
                    ...styles.disabled,
                    ...styles.input,
                  },
                  root: {
                    whiteSpace: 'nowrap',
                  },
                  rightSection: { pointerEvents: 'none' },
                })}
                {...form.getInputProps(`measurement${parentId}${idx}`)}
              />
            </Group>
          )}
          <Checkbox
            {...form.getInputProps(`checkbox${parentId}${idx}`, {
              type: 'checkbox',
            })}
          />
        </Group>
      </Box>
    </>
  );
};

IngredientItem.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
