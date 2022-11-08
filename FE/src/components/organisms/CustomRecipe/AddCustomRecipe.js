import PropTypes from 'prop-types';
import Ingredients from './Ingredients';
import { styles } from './styles.js';
import {
  Box,
  Text,
  TextInput,
  Group,
  InputWrapper,
  NumberInput,
  Space,
  Button,
} from '@mantine/core';
import isEmpty from 'lodash/isEmpty';

const AddCustomRecipe = ({
  data,
  setShowMain,
  form,
  handleSave,
  deleteIngr,
  isSaving,
}) => {
  const nutrArrangement = [
    'calories',
    'carbs',
    'fat',
    'protein',
    'sodium',
    'sugar',
  ];

  return (
    <>
      <form onSubmit={form.onSubmit(handleSave)}>
        <Box style={{ padding: '24px 32px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <InputWrapper
              label='Recipe Name'
              sx={{ flex: 1 }}
              styles={() => ({
                label: styles.label,
              })}
            >
              <TextInput
                variant='filled'
                styles={() => ({
                  input: styles.input,
                })}
                {...form.getInputProps('title')}
              />
            </InputWrapper>
            <Space w={32} />
            <InputWrapper
              label='Number of Serving'
              sx={{ width: '30%', minWidth: 236 }}
              styles={() => ({
                label: styles.label,
              })}
            >
              <NumberInput
                variant='filled'
                styles={() => ({
                  input: styles.input,
                })}
                hideControls
                rightSection={
                  <Text
                    style={{
                      fontSize: '14px',
                      color: '#88949E',
                    }}
                  >
                    people
                  </Text>
                }
                {...form.getInputProps('serving')}
              />
            </InputWrapper>
          </Box>
          <Space h='32px' />
          <Box sx={{ height: 180 }}>
            <Ingredients data={data} deleteIngr={deleteIngr} />
          </Box>
          <Space h='16px' />
          <Group
            spacing={27}
            my={20}
            mt={14}
            mb={10}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Group
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text
                onClick={() => setShowMain(false)}
                style={{
                  margin: '8px 16px',
                  color: '#006C52',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                + Add
              </Text>
              <Text
                style={{
                  width: '82px',
                  margin: '8px 16px',
                  color: '#757575',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                TOTAL
              </Text>
            </Group>
            <Group
              spacing={0}
              sx={{
                width: 400,
                backgroundColor: '#E5E8EC',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 13px',
              }}
            >
              {nutrArrangement.map((nutr, i) => {
                return (
                  <Text key={i} size='xs' color='#1C212D'>
                    {isEmpty(data.nutritions)
                      ? '-'
                      : parseInt(data.nutritions.totalNutrition[nutr])}
                  </Text>
                );
              })}
            </Group>
          </Group>
          <Group
            spacing={27}
            my={20}
            mt={14}
            mb={10}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                flex: 1,
                margin: '8px 16px',
                color: '#757575',
                fontSize: '12px',
                fontWeight: '700',
                textAlign: 'end',
              }}
            >
              PER SERVING
            </Text>
            <Group
              spacing={0}
              sx={{
                width: 400,
                backgroundColor: '#E5E8EC',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 13px',
              }}
            >
              {nutrArrangement.map((nutr, i) => {
                return (
                  <Text key={i} size='xs' color='#1C212D'>
                    {isEmpty(data.nutritions)
                      ? '-'
                      : data.nutritions[nutr] === 0
                        ? '-'
                        : Math.round(data.nutritions[nutr])}
                  </Text>
                );
              })}
            </Group>
          </Group>
          <Group mt={40} sx={{ justifyContent: 'flex-end' }}>
            <Button
              sx={{ padding: '0px 60px' }}
              type='submit'
              loading={isSaving}
            >
              Save
            </Button>
          </Group>
        </Box>
      </form>
    </>
  );
};

export default AddCustomRecipe;

AddCustomRecipe.propTypes = {
  data: PropTypes.object.isRequired,
  setShowMain: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  deleteIngr: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};
