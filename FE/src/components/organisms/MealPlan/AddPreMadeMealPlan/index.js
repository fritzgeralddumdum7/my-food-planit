import { useEffect, useState } from 'react';
import { useAddPreMadeMealPlanCTX } from '@/contexts/AddPreMadeMealPlanContext';
import {
  Drawer,
  Alert,
  TextInput,
  Grid,
  Stack,
  Box,
  Group,
  Button,
  Text,
  Divider,
  Select,
  SegmentedControl,
} from '@mantine/core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Bulb from '@/icons/Bulb';
import ChevronRight from '@/icons/ChevronRight';
import CellGrid from './CellGrid';
import MealPlanBoard from './MealPlanBoard';
import PropTypes from 'prop-types';
import TagInput from '@/components/molecules/TagInput';
import Modal from '@/components/organisms/Modal';
import AddCustomRecipe from '@/components/organisms/CustomRecipe/AddCustomRecipe';
import ChevronLeft from '@/icons/ChevronLeft';
import AddIngredients from '@/components/organisms/CustomRecipe/AddIngredients';
import useAddCustomRecipe from '@/hooks/useAddCustomRecipe';
import ChevronDown from '@/icons/Chevrondown';
import { day_views } from '@/consts/select_choices';
import DataSource from './DataSource';

const Index = ({
  isPreMadeOpen,
  setIsPreMadeOpen,
  planDayView,
  setMyMealPlan,
  setPlanDayView,
  isStore,
  setMyPlanStore,
  myPlanStore,
  myMealPlan,
}) => {
  const {
    triggerRefetch,
    setTriggerRefetch,
    arrayOfTags,
    setArrayOfTags,
    addRecipeToBoard,
    meals,
    keywords,
    foodList,
    setPlanName,
    handleSave,
    removeRecipeToBoard,
    setDayView,
    dayView,
    currentWeekHandler,
    currentWeek,
    setMealPlanView,
    setCurrentWeek,
    planName,
    mealPlanView,
    handlePlanType,
    planType,
    setPlanPrice,
    planPrice,
  } = useAddPreMadeMealPlanCTX();
  const {
    openAddRecipe,
    setOpenAddRecipe,
    addCustomRecipeIsSaving,
    showMain,
    setShowMain,
    customRecipe,
    addCustomRecipeHandleAddIngrs,
    searchedIngr,
    setIngrKeyword,
    searchedIngrFetching,
    addCustomRecipeHandleSave,
    addCustomRecipeForm,
    addCustomRecipeDeleteIngr,
  } = useAddCustomRecipe();
  const [selectedItem, setSelectedItem] = useState({});

  const dayViewIdentifier = () => {
    switch (parseInt(dayView)) {
      case 1:
        return {
          column: 12,
          span: 12,
        };
      case 3:
        return {
          column: 12,
          span: 4,
        };
      case 7:
      case 14:
      case 30:
        return {
          column: 21,
          span: 3,
        };
      default:
        return 12;
    }
  };

  const renderDayView = () => {
    const start = currentWeek * 7;
    return mealPlanView.slice(start, start + 7)?.map((_, i) => (
      <Grid.Col span={dayViewIdentifier().span} key={i} px={0} spacing={0}>
        <Box
          sx={{
            background: '#fff',
            width: '100%',
            height: 69,
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
          }}
        />
        <CellGrid
          key={i}
          yIndex={i}
          xIndex={0}
          sx={{ position: 'relative' }}
          isDaysRow={true}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
              left: '50%',
              transform: 'translate(-50%, -80px)',
            }}
          >
            <Text
              size='sm'
              color='#778CA3'
              weight='bold'
              sx={{ textAlign: 'center' }}
            >
              Day
            </Text>
            <Text
              pt={10}
              size='xl'
              color='#101E51'
              sx={{ textAlign: 'center' }}
            >
              {start + 1 + i}
            </Text>
          </Box>
        </CellGrid>
      </Grid.Col>
    ));
  };

  const renderLabelsColumn = () => {
    return [...Array(1)].map((row, i) => {
      return (
        <Stack
          key={i}
          spacing={0}
          sx={{ flexWrap: 'nowrap', position: 'relative' }}
          ml={-137}
          mt='20vh'
        >
          <Box
            sx={{
              background: '#fff',
              width: 120,
              height: '100%',
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          />
          {[...Array(meals.length)].map((col, j) => {
            return (
              <CellGrid
                key={j}
                yIndex={j}
                xIndex={i}
                isRow={false}
                sx={{ position: 'relative' }}
                gridHeight='18vh'
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 2,
                    left: '50%',
                    transform: 'translate(-50%, -8vh)',
                  }}
                >
                  <Text
                    size='sm'
                    color='#778CA3'
                    weight='bold'
                    sx={{ textAlign: 'center' }}
                  >
                    {meals[j]}
                  </Text>
                </Box>
              </CellGrid>
            );
          })}
        </Stack>
      );
    });
  };

  useEffect(() => {
    if (keywords.dbWithTag.keyword === null) {
      setSelectedItem({});
    } else {
      setSelectedItem({
        ...selectedItem,
        recipes: {
          list: foodList.dbWithTag.list[
            Object.keys(foodList.dbWithTag.list)[0]
          ],
        },
      });
    }
  }, [foodList.dbWithTag.list]);

  useEffect(() => {
    if (!openAddRecipe) {
      //refetch custom recipe
      setTriggerRefetch({
        ...triggerRefetch,
        custom: !triggerRefetch.custom,
      });
    }
  }, [openAddRecipe]);

  return (
    <Drawer
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={isPreMadeOpen}
      onClose={() => {
        setIsPreMadeOpen(false);
        setMyMealPlan(null);
        setCurrentWeek(0);
        setDayView('1');
        setPlanDayView(null);
        setMyPlanStore(null);
      }}
      title={isStore ? 'Add meal plan product' : 'Add pre-made meal plan'}
      styles={() => ({
        header: {
          padding: '31px 48px',
          borderBottom: '1px solid #E6E6E6',
          margin: 0,
        },
        drawer: {
          width: '100%',
        },
        title: {
          color: '#445670',
          fontWeight: 700,
          fontSize: 20,
        },
        closeButton: {
          background: '#EFF2F4',
          height: 41,
          width: 41,
          borderRadius: 9999,
        },
      })}
    >
      <DndProvider backend={HTML5Backend}>
        <Grid columns={24} pt={8}>
          <Grid.Col span={6} py={32} px={0} sx={{ height: '100vh' }}>
            <Stack>
              <Box px={48}>
                <TextInput
                  placeholder='e.g. OCD diet plan'
                  label='Plan Name'
                  styles={() => ({
                    label: {
                      fontWeight: 'bold',
                      color: '#1C212D',
                    },
                    input: {
                      borderColor: '#E5ECF2',
                    },
                  })}
                  size='md'
                  variant='filled'
                  onChange={(e) => setPlanName(e.target.value)}
                  value={planName}
                />
                <Text color='#1C212D' size='md' weight={700} pt={16}>
                  Tags
                </Text>
                <TagInput tags={arrayOfTags} setTags={setArrayOfTags} />
              </Box>
              <DataSource
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                customHeight='60vh'
                customPadding='32px 48px'
                customPl={48}
                customPr={40}
                setOpenAddRecipe={setOpenAddRecipe}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={18} sx={{ borderLeft: '1px solid #D1DCE4' }} p={0}>
            <Alert
              sx={{ backgroundColor: '#F1FBDD' }}
              p='xl'
              radius={8}
              icon={<Bulb />}
              mb={40}
              my='xl'
              mx={48}
              styles={() => ({
                icon: {
                  marginTop: -3,
                },
              })}
            >
              <Text size='sm' color='#4F4F4F'>
                Drag your recipes/custome recipes/ingredient from left panel and
                drop to the calendar on ther right
              </Text>
            </Alert>
            <Box mr={50}>
              <Group ml={48} mb={20} position='apart'>
                <Group>
                  <Select
                    size='md'
                    rightSection={<ChevronDown width={40} height={40} />}
                    styles={() => ({
                      input: {
                        background: '#F3F6F9',
                        border: '1px solid #E5ECF2',
                        maxWidth: 183,
                      },
                      label: {
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1C212D',
                      },
                      rightSection: { pointerEvents: 'none' },
                    })}
                    data={day_views}
                    radius={3}
                    defaultValue={(planDayView ?? dayView).toString()}
                    onChange={(v) => {
                      setDayView((state) => {
                        setCurrentWeek(0);
                        if (v < state) {
                          const confirmed = confirm(
                            'Switching to this view will reset all your data, do you like to continue?'
                          );
                          if (confirmed) {
                            setMealPlanView(
                              [...new Array(parseInt(v))].map(() => [
                                { breakfast: null },
                                { snack: null },
                                { lunch: null },
                                { snack: null },
                                { dinner: null },
                              ])
                            );
                            return parseInt(v);
                          } else {
                            return state;
                          }
                        } else {
                          return parseInt(v);
                        }
                      });
                    }}
                    value={dayView.toString()}
                  />
                  {[14, 30].includes(parseInt(dayView)) && (
                    <Group>
                      <Button
                        size='md'
                        disabled={
                          [14, 30].includes(parseInt(dayView)) &&
                          currentWeek === 0
                        }
                        variant='outline'
                        onClick={() => currentWeekHandler(-1)}
                        styles={() => ({
                          inner: {
                            transform: 'rotate(180deg)',
                          },
                        })}
                      >
                        <ChevronRight color='#778CA3' strokeWidth={2} />
                      </Button>
                      <Text>Week {currentWeek + 1}</Text>
                      <Button
                        size='md'
                        disabled={
                          (dayView === 30 && currentWeek === 4) ||
                          (dayView === 14 && currentWeek === 1)
                        }
                        variant='outline'
                        onClick={() => currentWeekHandler(1)}
                      >
                        <ChevronRight color='#778CA3' strokeWidth={2} />
                      </Button>
                    </Group>
                  )}

                  {isStore && (
                    <>
                      <SegmentedControl
                        value={planType}
                        onChange={handlePlanType}
                        data={[
                          { label: 'Premium', value: 'Premium' },
                          { label: 'Free', value: 'Free' },
                        ]}
                        classNames={{
                          controlActive: 'custom-segmented-ctrl',
                        }}
                        styles={{
                          label: { padding: '10px' },
                          control: {
                            minWidth: 120,
                          },
                        }}
                      />
                      {planType === 'Premium' && (
                        <TextInput
                          icon='$'
                          size='md'
                          type='number'
                          sx={{ maxWidth: 120 }}
                          variant='filled'
                          placeholder='Price'
                          hideControls={true}
                          onChange={(e) => setPlanPrice(e.target.value)}
                          value={planPrice}
                        />
                      )}
                    </>
                  )}
                </Group>
                <Button size='md' sx={{ width: '20vh' }} onClick={handleSave}>
                  {myMealPlan || myPlanStore ? 'Update' : 'Save'}
                </Button>
              </Group>
              <Stack
                sx={{ height: '65vh', overflow: 'auto', overflowX: 'hidden' }}
              >
                <Stack spacing={0} sx={{ position: 'relative' }}>
                  <Grid
                    columns={dayViewIdentifier().column}
                    pl={138}
                    sx={{ position: 'relative' }}
                    gutter={0}
                  >
                    {renderDayView()}
                  </Grid>
                  <MealPlanBoard
                    week={currentWeek}
                    meals={meals}
                    addRecipeToBoard={addRecipeToBoard}
                    removeRecipeToBoard={removeRecipeToBoard}
                    display={dayViewIdentifier()}
                    board={mealPlanView.slice(
                      currentWeek * 7,
                      currentWeek * 7 + 7
                    )}
                  />
                  <Box ml={139} sx={{ position: 'absolute' }}>
                    {renderLabelsColumn()}
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </DndProvider>
      <Modal
        size='xl'
        opened={openAddRecipe}
        setOpened={setOpenAddRecipe}
        header={
          showMain ? (
            'Add Custom Recipe'
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '24px',
                  marginRight: '16px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowMain(true)}
              >
                <ChevronLeft />
              </Box>
              Add Ingredients
            </Box>
          )
        }
        padding={0}
      >
        <Divider my='sm' />
        {showMain ? (
          <AddCustomRecipe
            data={customRecipe}
            setShowMain={setShowMain}
            form={addCustomRecipeForm}
            handleSave={addCustomRecipeHandleSave}
            deleteIngr={addCustomRecipeDeleteIngr}
            isSaving={addCustomRecipeIsSaving}
          />
        ) : (
          <Box p={32}>
            <AddIngredients
              onHandleSave={(values) => addCustomRecipeHandleAddIngrs(values)}
              list={searchedIngr}
              setKeyword={setIngrKeyword}
              fetching={searchedIngrFetching}
            />
          </Box>
        )}
      </Modal>
    </Drawer>
  );
};

Index.propTypes = {
  isPreMadeOpen: PropTypes.bool,
  setIsPreMadeOpen: PropTypes.func.isRequired,
  setMyMealPlan: PropTypes.func,
  planDayView: PropTypes.string,
  setPlanDayView: PropTypes.func,
  isStore: PropTypes.bool,
  setMyPlanStore: PropTypes.func,
  myMealPlan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  myPlanStore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Index.defaultProps = {
  isPreMadeOpen: false,
  planDayView: '1',
  setMyMealPlan: () => null,
  setPlanDayView: () => null,
  isStore: false,
  setMyPlanStore: () => null,
  myMealPlan: null,
  myPlanStore: null,
};

export default Index;
