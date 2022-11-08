import { Box, Tabs, Grid, Text, Stack, Anchor, Group, Center, Loader, ScrollArea, } from "@mantine/core";
import RoundedInputBar from '@/components/molecules/RoundedInputBar';
import Search from '@/icons/Search';
import { CustomDragLayer } from './CustomDragLayer';
import ChevronRight from '@/icons/ChevronRight';
import { useAddPreMadeMealPlanCTX } from '@/contexts/AddPreMadeMealPlanContext';
import { FileTreeItem, Draggable } from './components';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const DataSource = ({ selectedItem, setSelectedItem, customHeight, customPadding, customPl, customPr, customScrollHeight, setOpenAddRecipe }) => {
  const {
    keywords,
    setKeywords,
    foodList,
  } = useAddPreMadeMealPlanCTX();

  const renderFileTreeItems = () => {
    return foodList?.database.fetching ? (
      <Center sx={{ width: '100%' }}>
        <Loader size='xs' />
      </Center>
    ) : isEmpty(foodList.database.list) ? (
      <Center sx={{ width: '100%' }}>No Result Found</Center>
    ) : (
      Object.entries(foodList.database.list).map((item, i) => {
        return (
          <FileTreeItem
            key={i}
            text={item[0]}
            recipe={item[1]}
            setSelectedItem={setSelectedItem}
          />
        );
      })
    );
  };

  const renderFood = (foods, type) => {
    return foods.fetching ? (
      <Center>
        <Loader size='xs' />
      </Center>
    ) : foods?.list?.length ? (
      foods?.list?.map((food, i) => (
        <Draggable food={food} key={i} type={type} />
      ))
    ) : (
      <Center>No Result Found</Center>
    );
  };

  return (
    <Stack>
      {Object.keys(selectedItem).length === 0 ? (
        <Tabs
          position='center'
          color='#006C52'
          sx={() => ({
            '.mantine-Tabs-tabActive': {
              fontWeight: 'bold',
            },
            '.mantine-Tabs-tabControl:not(.mantine-Tabs-tabActive)': {
              color: '#65768E',
            },
          })}
          styles={() => ({
            body: {
              padding: customPadding,
              maxHeight: customHeight,
              overflow: 'auto',
              paddingBottom: 100,
            },
          })}
        >
          <Tabs.Tab label='Database'>
            <RoundedInputBar
              defaultValue={keywords.database}
              placeholder='Search'
              leftIcon={<Search />}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.target.value === '') {
                  setKeywords({
                    ...keywords,
                    database: e.target.value,
                  });
                }
              }}
            />
            <Grid grow mt='xl' columns={1} sx={{ rowGap: 12 }}>
              {renderFileTreeItems()}
            </Grid>
          </Tabs.Tab>
          <Tabs.Tab label='Custom Recipe'>
            {
              setOpenAddRecipe && (
                <Box style={{ display: 'flex', justifyContent: 'end' }}>
                  <Text
                    sx={{ cursor: 'pointer' }}
                    color='green-theme'
                    weight='bold'
                    align='right'
                    mr={8}
                    onClick={() => setOpenAddRecipe(true)}
                  >
                    + Add
                  </Text>
                </Box>
              )
            }
            <RoundedInputBar
              icon={<Search />}
              placeholder='Search'
              leftIcon={<Search />}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.target.value === '') {
                  setKeywords({
                    ...keywords,
                    custom: e.target.value,
                  });
                }
              }}
            />
            <Stack pt={24} mb='10vh'>
              {renderFood(foodList.custom, 'custom')}
              <CustomDragLayer />
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab label='Ingredients'>
            <RoundedInputBar
              placeholder='Search'
              leftIcon={<Search />}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setKeywords({
                    ...keywords,
                    ingredient: e.target.value,
                  });
                }
              }}
            />
            <Stack pt={16} mb='10vh'>
              {renderFood(foodList.ingredient, 'ingredient')}
              <CustomDragLayer />
            </Stack>
          </Tabs.Tab>
        </Tabs>
      ) : (
        <Stack pl={customPl} pr={customPr}>
          <Anchor onClick={() => setSelectedItem({})}>
            <Group>
              <Text
                mt={-8}
                styles={() => ({
                  root: { transform: 'rotate(180deg)' },
                })}
              >
                <ChevronRight color='#778CA3' strokeWidth={3} />
              </Text>
              <Text color='#445670' order={4} size='xl' weight='bold'>
                {selectedItem.title}
              </Text>
            </Group>
          </Anchor>
          <RoundedInputBar
            defaultValue={keywords.database}
            placeholder='Search'
            leftIcon={<Search />}
            onKeyUp={(e) => {
              if (e.key === 'Enter' || e.target.value === '') {
                setKeywords({
                  ...keywords,
                  dbWithTag: {
                    tag: selectedItem.title,
                    keyword: e.target.value,
                  },
                });
              }
            }}
          />
          {foodList.dbWithTag.fetching ? (
            <Center>
              <Loader size='xs' />
            </Center>
          ) : (
            <ScrollArea sx={{ height: customScrollHeight }} offsetScrollbars>
              <Stack mb='10vh'>
                {renderFood(selectedItem.recipes, 'database')}
                <CustomDragLayer />
              </Stack>
            </ScrollArea>
          )}
        </Stack>
      )}
    </Stack>
  )
}

DataSource.propTypes = {
  customScrollHeight: PropTypes.string,
};

DataSource.defaultProps = {
  customScrollHeight: '59vh',
};

export default DataSource;