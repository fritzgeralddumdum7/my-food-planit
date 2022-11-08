import {
  Group,
  Button,
  Text,
  Space,
  Grid,
  Box,
  Center,
  Divider,
  Loader,
  Skeleton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import ChevronRight from '@/icons/ChevronRight';
import { useState, useEffect } from 'react';
import Calendar from '@/icons/Calendar';
import FoodImage from '@/components/molecules/FoodImage';
import CloseSquare from '@/icons/CloseSquare';
import PieChart from './PieChart';
import HealthVitals from './HealthVitals';
import AddFoodModal from './AddFoodModal';
import API from '@/api/BaseApi';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import moment from 'moment';
import useApi from '@/hooks/useApi';
import { showNotification } from '@mantine/notifications';

const FoodDiary = () => {
  const modalDispatch = useModalDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [opened, setOpened] = useState(false);
  const [foodDiaryEntries, setFoodDiaryEntries] = useState([]);
  const [mealSets, setMealSets] = useState([[], [], [], [], []]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [savingEntry, setSavingEntry] = useState(false);

  const [data, fetching, error] = useApi(
    {
      method: 'GET',
      url: '/tracker',
      params: {
        date: moment(currentDate).format('Y-MM-D'),
      },
    },
    [updated]
  );

  const [diaryEntry, entryFetching] = useApi(
    {
      method: 'GET',
      url: '/entry',
      params: {
        date: moment(currentDate).format('Y-MM-D'),
      },
    },
    [updated]
  );

  const DEFAULT_CALCULATIONS = {
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    sodium: 0,
    sugar: 0,
  };

  const DEFAULT_DAILY_GOALS = {
    calories: 150,
    carbs: 150,
    fat: 150,
    protein: 150,
    sodium: 150,
    sugar: 150,
  };

  const DEFAULT_TOTALS = {
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    sodium: 0,
    sugar: 0,
  };

  const [calculations, setCalculations] = useState(DEFAULT_CALCULATIONS);

  const [dailyGoal, setDailyGoal] = useState(DEFAULT_DAILY_GOALS);

  const [totals, setTotals] = useState(DEFAULT_TOTALS);

  const headers = [
    ['Calories', 'kcal'],
    ['Carbs', 'g'],
    ['Fat', 'g'],
    ['Protein', 'g'],
    ['Sodium', 'mg'],
    ['Sugar', 'g'],
  ];

  const meals = {
    1: 'Breakfast',
    2: 'Snack',
    3: 'Lunch',
    4: 'Snack',
    5: 'Dinner',
  };

  const [userProfile, profileFetching] = useApi(
    {
      method: 'GET',
      url: '/users/profile',
    },
    []
  )

  useEffect(() => {
    if (!profileFetching && userProfile != null) {
      if (userProfile.user_detail.calorie_goal != null) {
        let calorie_goal = userProfile.user_detail.calorie_goal;
        let carbs = (calorie_goal * 0.5) / 4;
        let fat = (calorie_goal * 0.3) / 4;
        let protein = (calorie_goal * 0.2) / 4;
        let sodium = 2300;
        let sugar = 72;

        setDailyGoal({
          calories: calorie_goal,
          carbs: carbs,
          fat: fat,
          protein: protein,
          sodium: sodium,
          sugar: sugar,
        })
      }
    }
  }, [profileFetching]);

  useEffect(() => {
    setCanAdd(moment(currentDate).isSameOrBefore(moment(), 'day'));
    setUpdated(!updated);
  }, [currentDate]);

  useEffect(() => {
    if (foodDiaryEntries.length) {
      setMealSets((sets) => 
        sets.map((set, i) => {
          if (i === selectedMeal) {
            return [...set, ...foodDiaryEntries];
          }
          return set;
        })
      );
      if (foodDiaryEntries.length) {
        setFoodDiaryEntries([]);
      }
    }
  }, [foodDiaryEntries, selectedMeal]);

  useEffect(() => {
    let temp = calculations;

    setTotals({
      calories: temp.calories > 0 ? Math.round((dailyGoal.calories - temp.calories).toFixed(2)) : 0,
      carbs: temp.carbs > 0 ? Math.round((dailyGoal.carbs - temp.carbs).toFixed(2)) : 0,
      fat: temp.fat > 0 ? Math.round((dailyGoal.fat - temp.fat).toFixed(2)) : 0,
      protein: temp.protein > 0 ? Math.round((dailyGoal.protein - temp.protein).toFixed(2)) : 0,
      sodium: temp.sodium > 0 ? Math.round((dailyGoal.sodium - temp.sodium).toFixed(2)) : 0,
      sugar: temp.sugar > 0 ? Math.round((dailyGoal.sugar - temp.sugar).toFixed(2)) : 0,
    });
  }, [calculations, dailyGoal]);

  const addHandler = (data) => {
    setFoodDiaryEntries((foodEntry) => [...foodEntry, ...data]);
  };

  const handleSaveEntry = () => {
    setSavingEntry(true);

    let nutritions = JSON.stringify(calculations);
    
    const options = {
      method: 'post',
      url: `/entry/`,
      data: {
        nutritions: nutritions,
        date: moment(currentDate).format('Y-MM-D'),
      }
    };

    API.request(options)
      .then(({ data }) => {
        if (data) {
          setSavingEntry(false);
          showNotification({ color: 'green', message: 'Entry Saved' });
          setUpdated(!updated);
        }
      })
      .catch(({ response }) => {
        setSavingEntry(false);
        showNotification({ color: 'red', message: 'Something went wrong' });
      });
  }

  useEffect(() => {
    setTotals(DEFAULT_TOTALS);
    setMealSets([[], [], [], [], []]);
  }, [currentDate]);

  const prevHandler = () => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() - 1)));
  };

  const nextHandler = () => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() + 1)));
  };

  const removeHandler = (targetMeal, targetIndex) => {
    setMealSets((state) => {
      return state.map((sets, i) => {
        if (i === targetMeal) {
          return sets.filter((s, j) => j !== targetIndex);
        }
        return sets;
      });
    });

    let tracker = mealSets[targetMeal][targetIndex].id;

    const options = {
      method: 'post',
      url: `/tracker/${tracker}/delete`,
    };

    API.request(options)
      .then(({ data }) => {
        setUpdated(!updated);
      })
      .catch(({ response }) => {});
  };

  useEffect(() => {
    let mealEntries = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    let calories = 0;
    let carbs = 0;
    let fat = 0;
    let protein = 0;
    let sodium = 0;
    let sugar = 0;

    data?.forEach((entry) => {
      const nutritions = JSON.parse(entry.planable?.nutritions);
      
      calories += Math.round(nutritions.calories);
      carbs += Math.round(nutritions.carbs);
      fat += Math.round(nutritions.fat);
      protein += Math.round(nutritions.protein);
      sodium += Math.round(nutritions.sodium);
      sugar += Math.round(nutritions.sugar);

      mealEntries[entry.meal_type].push(entry);
    });
    
    setMealSets(Object.values(mealEntries));
    setCalculations({ calories, carbs, fat, protein, sodium, sugar });
  }, [data]);

  const updateView = () => {
    setUpdated(!updated);
  };

  const DiaryHeader = ({ title, hasHeaders }) => {
    return (
      <>
        <Grid gutter={0} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid.Col span={hasHeaders ? 5 : 12}>
            <Text sx={{ fontWeight: 700, fontSize: 24 }}>{title}</Text>
          </Grid.Col>
          {hasHeaders && (
            <>
              {headers.map((header_item, i) => (
                <Grid.Col span={1} key={i}>
                  <Box
                    sx={{
                      backgroundColor: '#006C52',
                      borderRadius: '4px 4px 0px 0px',
                      minWidth: 91,
                      height: 67,
                      display: 'flex',
                      margin: '0px 1px',
                    }}
                  >
                    <Box sx={{ width: '100%', paddingTop: '13px' }}>
                      <Center>
                        <Grid gutter={0}>
                          <Grid.Col span={12}>
                            <Text
                              align={'center'}
                              sx={{
                                fontSize: 14,
                                color: 'white',
                                fontWeight: 700,
                              }}
                            >
                              {header_item[0]}
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Text
                              align={'center'}
                              sx={{ fontSize: 12, color: '#78A99D' }}
                            >
                              {header_item[1]}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Center>
                    </Box>
                  </Box>
                </Grid.Col>
              ))}
              <Grid.Col span={1}></Grid.Col>
            </>
          )}
        </Grid>
      </>
    );
  };

  const DiaryEntry = ({ entry, id, index, removeHandler }) => {
    return (
      <>
        <Box
          sx={{
            height: 97,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: id % 2 != 0 && '#F8F9FD',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Grid gutter='sm' sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid.Col span={1}>
                <Box sx={{ paddingLeft: 16, minWidth: 50 }}>
                  <FoodImage
                    src={entry?.image ?? ''}
                    title={entry?.title}
                    height={50}
                  />
                </Box>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text sx={{ fontSize: 14 }}>{entry?.title}</Text>
              </Grid.Col>
              {headers.map((header_item, i) => (
                <>
                  <Grid.Col span={1} key={i} key={id}>
                    <Box sx={{ minWidth: 91 }}>
                      <Text align={'center'} sx={{ fontSize: 14 }}>
                        {entry?.nutritions &&
                          Math.round(JSON.parse(entry?.nutritions)[
                            header_item[0].toLowerCase()
                          ])}
                      </Text>
                    </Box>
                  </Grid.Col>
                </>
              ))}
              <Grid.Col span={1}>
                <Center>
                  <Box
                    onClick={() => removeHandler(id, index)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <CloseSquare />
                  </Box>
                </Center>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
      </>
    );
  };

  const AddFood = ({ setSelectedMeal, mealValue }) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '8%' }}>
          <Text
            sx={{ color: '#006C52', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => {
              setOpened(true);
              setSelectedMeal(mealValue);
            }}
          >
            + Add Food
          </Text>
        </Box>
        <Box sx={{ width: '92%', marginLeft: 'auto' }}>
          <Divider my='sm' />
        </Box>
      </Box>
    );
  };

  const SummaryRow = ({ header, children }) => {
    return (
      <>
        <Grid.Col span={5} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Box
            sx={{
              width: 148,
              backgroundColor: '#006C52',
              padding: '10px 16px',
            }}
          >
            <Text
              align={'right'}
              sx={{ fontSize: 14, fontWeight: 700, color: 'white' }}
            >
              {header}
            </Text>
          </Box>
        </Grid.Col>
        {children}
        <Grid.Col span={1}></Grid.Col>
      </>
    );
  };

  return (
    <>
      <Group>
        <Text
          sx={{
            fontSize: '14px',
          }}
        >
          Your Food Diary For:
        </Text>
        <Group spacing='xs'>
          <Button
            variant='light'
            color='gray'
            styles={() => ({
              inner: {
                transform: 'rotate(180deg)',
              },
            })}
            disabled={fetching}
            onClick={() => prevHandler()}
          >
            <ChevronRight color='#65768E' strokeWidth={2} />
          </Button>
          <DatePicker
            icon={<Calendar width={16} height={16} />}
            value={currentDate}
            onChange={setCurrentDate}
            clearable={false}
          />
          <Button
            disabled={fetching}
            variant='light'
            color='gray'
            onClick={() => nextHandler()}
          >
            <ChevronRight color='#65768E' strokeWidth={2} />
          </Button>
        </Group>
      </Group>
      <Space h={42} />

      <Box>
        {mealSets?.map((set, id) => (
          <>
            <DiaryHeader title={meals[id + 1]} hasHeaders={id === 0} />
            {!fetching || savingEntry ? (
              <>
                {set.length > 0 ? (
                  set.map((mealplan, i) => (
                    <>
                      <DiaryEntry
                        key={id}
                        entry={mealplan.planable}
                        id={id}
                        index={i}
                        removeHandler={removeHandler}
                      />
                    </>
                  ))
                ) : (
                  <>
                    <Box
                      sx={{
                        marginTop: 16,
                        width: '100%',
                        height: '50px',
                        backgroundColor: '#F7F8FB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text sx={{ fontSize: 24 }}>No Entries</Text>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <Skeleton height={50} sx={{ marginTop: 16 }} />
            )}
            <Space h={24} />
            {canAdd && (
              <AddFood mealValue={id} setSelectedMeal={setSelectedMeal} />
            )}
            {id != 4 && <Space h={48} />}
          </>
        ))}
      </Box>
      <Space h={24} />
      <Box>
        <Grid gutter={1}>
          <SummaryRow header={'Totals'}>
            {Object?.values(calculations).map((val, i) => (
              <Grid.Col span={1} key={i}>
                <Box sx={{ width: 91, padding: '10px 16px' }}>
                  <Text align={'center'} sx={{ fontSize: 14 }}>
                    <Center>{Math.floor(val) ?? 0}</Center>
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </SummaryRow>
          <SummaryRow header={'Your Daily Goal'}>
            {Object?.values(dailyGoal).map((val, i) => (
              <Grid.Col span={1} key={i}>
                <Box sx={{ width: 91, padding: '10px 16px' }}>
                  <Text align={'center'} sx={{ fontSize: 14 }}>
                    <Center>{Math.abs(val.toFixed(0)) ?? 0}</Center>
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </SummaryRow>
          <SummaryRow header={'Remaining'}>
            {Object?.values(totals).map((val, i) => (
              <Grid.Col span={1} key={i}>
                <Box sx={{ width: 91, padding: '10px 16px' }}>
                  <Text align={'center'} sx={{ fontSize: 14 }}>
                    <Center>{val ?? 0}</Center>
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </SummaryRow>
        </Grid>
      </Box>
      <Space h={90} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 365, height: 365 }}>
          <PieChart
            pie_data={{
              carbs: calculations.carbs,
              fat: calculations.fat,
              protein: calculations.protein,
            }}
          />
        </Box>
      </Box>
      <Space h={60} />
      <Box>
        <Center>
          <Text sx={{ fontWeight: 700 }}>
            When you're finished logging all foods and exercise for this day,
            click here:
          </Text>
        </Center>
        <Space h={32} />
        <Center>
          <Button 
            sx={{
              transition: '0.2s',
              '&:hover': {
                backgroundColor: '#006C52',
                color: '#fff',
              }
            }}
            size='md'
            onClick={() => handleSaveEntry()}
            {...diaryEntry && diaryEntry.id && {variant: 'outline'}}
            disabled={savingEntry}
          >
            {savingEntry ? <Loader/> :
              <>
                {diaryEntry && diaryEntry.id ? <Text>Update This Entry</Text> : <Text>Complete This Entry</Text>}
              </>
            }
          </Button>
        </Center>
      </Box>
      <Space h={154} />
      <HealthVitals />
      <AddFoodModal
        selectedMeal={selectedMeal}
        addHandler={addHandler}
        opened={opened}
        setOpened={setOpened}
        currentDate={currentDate}
        // updateView={updateView}
        updated={updated}
        setUpdated={setUpdated}
      />
    </>
  );
};

export default FoodDiary;
