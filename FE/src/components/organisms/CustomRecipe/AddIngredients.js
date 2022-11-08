import PropTypes from 'prop-types';
import RoundedInputBar from '@/components/molecules/RoundedInputBar';
import Search from '@/icons/Search';
import { useForm } from '@mantine/form';
import {
  Box,
  Text,
  Group,
  Button,
  ScrollArea,
  Loader,
  Center,
  Stack,
} from '@mantine/core';
import { IngredientItem } from './components';

const AddIngredients = ({ onHandleSave, list, setKeyword, fetching }) => {
  const form = useForm({
    initialValues: {},
  });

  const handleAdd = () => {
    const values = form.values;
    let numOfErrors = 0;
    for (let i = 0; i < 10; i++) {
      if (
        values[`checkbox${0}${i}`] &&
        (!values[`amount${0}${i}`] || !values[`measurement${0}${i}`])
      ) {
        !values[`amount${0}${i}`] &&
          form.setFieldError(`amount${0}${i}`, 'Required');
        !values[`measurement${0}${i}`] &&
          form.setFieldError(`measurement${0}${i}`, 'Pick one');
        ++numOfErrors;
      }
    }

    if (!numOfErrors) {
      onHandleSave(values);
    }
  };

  return (
    <>
      <RoundedInputBar
        placeholder={'Search'}
        width={336}
        leftIcon={<Search />}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.target.value === '') {
            setKeyword(e.target.value);
          }
        }}
      />
      <form onSubmit={form.onSubmit(handleAdd)}>
        <ScrollArea sx={{ height: 325, margin: '0 -20px' }}>
          <Box px={25} pb={15}>
            {fetching ? (
              <Center sx={{ height: '30vh' }}>
                <Loader size='md' />
              </Center>
            ) : list.length ? (
              list.map((name, i) => (
                <IngredientItem
                  key={i}
                  parentId={0}
                  name={name}
                  idx={i}
                  form={form}
                />
              ))
            ) : (
              <Center sx={{ height: '30vh', color: 'gray' }}>
                <Stack align='center'>
                  <Text size='md'>No Results found</Text>
                  <Text size='xs'>Try a new keyword</Text>
                </Stack>
              </Center>
            )}
          </Box>
        </ScrollArea>
        <Group sx={{ justifyContent: 'flex-end' }}>
          <Button sx={{ padding: '0px 60px' }} type='submit'>
            Add
          </Button>
        </Group>
      </form>
    </>
  );
};

export default AddIngredients;

AddIngredients.propTypes = {
  onHandleSave: PropTypes.func.isRequired,
  list: PropTypes.array,
  setKeyword: PropTypes.func,
  fetching: PropTypes.bool,
};

AddIngredients.defaultProps = {
  list: [],
  setKeyword: () => null,
  fetching: false,
};
