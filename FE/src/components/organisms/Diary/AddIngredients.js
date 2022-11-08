import PropTypes from 'prop-types';
import RoundedInputBar from '@/components/molecules/RoundedInputBar';
import Search from '@/icons/Search';
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
import { IngredientItem } from './ingredients/components';

const AddIngredients = ({ form, list, setKeyword, fetching }) => {

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
      <form>
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
