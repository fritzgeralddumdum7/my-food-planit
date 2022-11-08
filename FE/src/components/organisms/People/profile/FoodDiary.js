import {
  Group,
  Button,
  Text,
  Space,
  Grid,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import ChevronRight from '@/icons/ChevronRight';
import { useState, useEffect } from 'react';
import Calendar from '@/icons/Calendar';
import FoodImage from '@/components/molecules/FoodImage';
import { dummyFoodIcon } from '@/consts/imageUrls';
import PieChart from '../../Diary/PieChart';
import useApi from '@/hooks/useApi';
import moment from 'moment';
import { useRouter } from 'next/router';

const FoodDiary = ({ user }) => {
  const router = useRouter();
  const utcOffset = new Date().getTimezoneOffset() / 60;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealSets, setMealSets] = useState([[], [], [], [], []]);

  const [data, fetching, error] = useApi(
    {
      method: 'GET',
      url: '/tracker',
      params: {
        user: router.query.id,
        date: moment(currentDate).format('Y-MM-DD'),
      },
    },
    [currentDate]
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
  }, [calculations]);

  useEffect(() => {
    if (fetching) {
      return;
    }
    console.log(
      [...new Array(5).keys()].map((item) => {
        return data
          .filter((i) => i.meal_type - 1 == item)
          .map((j) => {
            return {
              recipe: j,
              nutritions:
                j.planable_type == 'App\\Models\\Recipe'
                  ? JSON.parse(j.planable.nutritions)
                  : JSON.parse(j.planable.content),
            };
          });
      })
    );
    let calories = 0;
    let carbs = 0;
    let fat = 0;
    let protein = 0;
    let sodium = 0;
    let sugar = 0;
    let empty = true;

    setMealSets(
      [...new Array(5).keys()].map((item) => {
        return data
          .filter((i) => i.meal_type - 1 == item)
          .map((entry) => {
            empty = false;
            const nutritions =
                entry.planable?.nutritions &&
                JSON.parse(entry.planable?.nutritions);
            calories += parseFloat(nutritions?.calories.toFixed(2));
            carbs += parseFloat(nutritions?.carbs.toFixed(2));
            fat += parseFloat(nutritions?.fat.toFixed(2));
            protein += parseFloat(nutritions?.protein.toFixed(2));
            sodium += parseFloat(nutritions?.sodium.toFixed(2));
            sugar += parseFloat(nutritions?.sugar.toFixed(2));
            setCalculations({ calories, carbs, fat, protein, sodium, sugar });
            return entry;
          });
      })
    );

    if (empty) {
      setCalculations(DEFAULT_CALCULATIONS);
    }
  }, [fetching]);

  useEffect(() => {
    setTotals(DEFAULT_TOTALS);
    setCalculations(DEFAULT_CALCULATIONS);
  }, [currentDate]);

  const prevHandler = () => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() - 1)));
  };

  const nextHandler = () => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() + 1)));
  };

  const headers = [
    ['Calories', 'kcal'],
    ['Carbs', 'g'],
    ['Fat', 'g'],
    ['Protein', 'g'],
    ['Sodium', 'mg'],
    ['Sugar', 'g'],
  ];

  const [userProfile, profileFetching] = useApi(
    {
      method: 'GET',
      url: `/users/profile/${router.query.id}`
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

  const meal_types = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];

  const measurements = ['BP', 'A1C', 'Neck', 'Waist', 'Hips'];

  const DiaryHeader = ({ title, hasHeaders }) => {
    return (
      <>
        <Grid gutter={0} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid.Col span={hasHeaders ? 5 : 12}>
            <Text sx={{ fontWeight: 700, fontSize: 24 }}>{title}</Text>
          </Grid.Col>
          {hasHeaders && (
            <>
              {headers.map((header_item) => (
                <Grid.Col span={1}>
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

  const DiaryEntry = ({ entry, id }) => {
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
                    src={entry.image ?? ''}
                    title={entry.title}
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
                        {entry.nutritions &&
                          Math.round(JSON.parse(entry?.nutritions)[
                            header_item[0].toLowerCase()
                          ])}
                        {entry.content &&
                          Math.round(JSON.parse(entry?.content)[
                            header_item[0].toLowerCase()
                          ])}
                      </Text>
                    </Box>
                  </Grid.Col>
                </>
              ))}
              <Grid.Col span={1}>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
      </>
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
      {!fetching ? (
        <>
          <Group>
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {user.is_current_user
                ? 'Your '
                : `${
                    user.name?.split(' ')[0] || user.user_detail?.username
                  }'s `}
              Food Diary For:
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
                onClick={() => prevHandler()}
              >
                <ChevronRight color='#65768E' strokeWidth={2} />
              </Button>
              <DatePicker
                icon={<Calendar width={16} height={16} />}
                value={currentDate}
                onChange={setCurrentDate}
                clearable={false}
                sx={{
                  input: {
                    fontWeight: 700,
                  },
                }}
              />
              <Button
                variant='light'
                color='gray'
                onClick={() => nextHandler()}
              >
                <ChevronRight color='#65768E' strokeWidth={2} />
              </Button>
            </Group>
          </Group>
          <Space h={42} />
          {!fetching &&
            meal_types.map((item, i) => {
              return (
                <>
                  <DiaryHeader title={item} hasHeaders={i == 0} />
                  {mealSets[i].length > 0 ? (
                    <>
                      {mealSets[i].map((mealSet, id) => (
                        <DiaryEntry
                          key={id}
                          entry={mealSet.planable}
                          id={id}
                          index={i}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <Center>
                        <Text sx={{ color: 'gray' }}>No Entries</Text>
                      </Center>
                    </>
                  )}
                  <Space h={48} />
                </>
              );
            })}
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
        </>
      ) : (
        <>
          <Center>
            <Loader />
          </Center>
        </>
      )}
    </>
  );
};

export default FoodDiary;
