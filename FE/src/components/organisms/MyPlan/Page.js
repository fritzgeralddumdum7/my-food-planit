import React, { useState, useEffect, useCallback, } from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import ChevronRight from '@/icons/ChevronRight';
import { showNotification } from '@mantine/notifications';
import {
  Box,
  SegmentedControl,
  Group,
  Button,
  Text,
  Select,
  Divider,
  Title,
  Stack,
  Grid,
} from '@mantine/core';
import ChevronDown from '@/icons/Chevrondown';
import { DatePicker } from '@mantine/dates';
import moment from 'moment';
import CellGrid from '@/components/organisms/MealPlan/AddPreMadeMealPlan/CellGrid';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {
  meal_value,
  view_options,
  meal_plan_options,
  mealView,
} from '@/consts/select_choices';
import DayWeekCalendar from '@/components/organisms/MyPlan/DayWeekCalendar';
import FullCalendar from '@/components/organisms/MyPlan/FullCalendar';
import API from '@/api/BaseApi';
import { useSearchInputCTX } from '@/contexts/SearchInputContext';
import { useAddPreMadeMealPlanCTX } from '@/contexts/AddPreMadeMealPlanContext';
import DataSource from '../MealPlan/AddPreMadeMealPlan/DataSource';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import {
  parseIngredients,
  calculateNutritionPerServing,
} from '@/helpers/ingredientsHelper';
import useRecipe from '@/hooks/useRecipe';

const Index = () => {
  moment.locale('en', {
    week: {
      dow: 1,
    },
  });
  
  const {
    keywords,
    foodList,
  } = useAddPreMadeMealPlanCTX();
  const modalDispatch = useModalDispatch();
  const { matchIngredient } = useRecipe();

  const TOTAL_DAYS = 7;
  const [type, setType] = useState('week');
  const [view, setView] = useState('default');
  const [calendar, setCalendar] = useState(null);
  const [dayItems, setDayItems] = useState(null);
  const [weekItems, setWeekItems] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [ingredient, setIngredient] = useState(null);

  const [searchByTitle, setSearchByTitle] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayInWeek, setSelectedDayInWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [monthMealType, setMonthMealType] = useState(null);
  const [monthList, setMonthList] = useState([]);
  const [monthPayload, setMonthPayload] = useState(null);
  const [monthPrevState, setMonthPrevState] = useState(null);
  const [weekInitState] = useState(
    [...new Array(7)].map(() =>
      Object.keys(meal_value).map((value, i) => ({ [value]: null }))
    )
  );
  const [items, setItems] = useState({ default: weekInitState });
  const { query } = useSearchInputCTX();

  const showIngredientModal = useCallback(
    async ({ title, target }) =>
      modalDispatch({
        type: 'showIngredientModal',
        payload: {
          title,
          target,
          onClick: async (payload) => {
            getNutrition(payload);
          },
        },
      }),
    []
  );

  const showSelectMealTypeModal = useCallback(
    ({ title, list, monthMealType, setMonthMealType, }) =>
      modalDispatch({
        type: 'showSelectMealTypeModal',
        payload: {
          title,
          list,
          monthMealType,
          setMonthMealType,
          onClick: async () => {
            monthSaveHandler();
          },
        },
      }),
    []
  );

  const getFirstDayOfTheWeek = () => {
    let current = new Date(selectedDayInWeek);
    const dayIndex = current.getDay();
    let firstDayOfWeek = new Date(
      current.setDate(current.getDate() - dayIndex)
    );

    return firstDayOfWeek;
  };

  const datesInAWeek = () => {
    let dates = [];

    if (type === 'week') {
      dates = [...Array(TOTAL_DAYS)].map((d, i) => {
        let firstDayOfWeek = getFirstDayOfTheWeek();
        return new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + i));
      });
    } else if (type === 'day') {
      dates = [currentDate];
    }

    const days = dates.map((day, i) => (
      <CellGrid
        key={i}
        yIndex={i}
        xIndex={0}
        sx={{ position: 'relative' }}
        isDaysRow={true}
        isCalendar={true}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: i === 0 ? -4 : 0,
            zIndex: 2,
            left: type === 'week' ? '50%' : '7%',
            transform: 'translate(-50%, -80px)',
          }}
        >
          <Text
            size='sm'
            color='#778CA3'
            weight='bold'
            sx={{ textAlign: 'center' }}
          >
            {moment(day).format('ddd')}
          </Text>
          <Text pt={10} size='xl' color='#101E51' sx={{ textAlign: 'center' }}>
            {moment(day).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD') ? (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    background: '#B2DD91',
                    color: '#fff',
                    borderRadius: 9999,
                    paddingTop: 6,
                    marginTop: -5,
                  }}
                >
                  {moment(day).date()}
                </Box>
              ) : (
                moment(day).date()
              )}
          </Text>
        </Box>
      </CellGrid>
    ));

    return days;
  };

  const renderDaysRow = () => {
    return [...Array(1)].map((row, i) => {
      return (
        <Group
          key={i}
          spacing={0}
          sx={{ flexWrap: 'nowrap', position: 'relative' }}
        >
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
          {datesInAWeek()}
        </Group>
      );
    });
  };

  const renderLabelsColumn = () => {
    let labels = Object.keys(meal_value);
    if (view === 'meal') {
      labels = meal_plan_options;
    }

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
          {[...Array(labels.length)].map((col, j) => {
            return (
              <CellGrid
                key={j}
                yIndex={j}
                xIndex={i}
                isRow={false}
                sx={{ position: 'relative' }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 2,
                    left: '50%',
                    transform: 'translate(-50%, -9vh)',
                  }}
                >
                  <Text
                    size='sm'
                    color='#778CA3'
                    weight='bold'
                    sx={{ textAlign: 'center' }}
                  >
                    {labels[j]}
                  </Text>
                </Box>
              </CellGrid>
            );
          })}
        </Stack>
      );
    });
  };

  const customDayHandler = (date) => {
    setSelectedDayInWeek(date);
  };

  const renderTypeOfCalendar = () => {
    if (type === 'week') {
      return (
        <DatePicker
          value={selectedDayInWeek}
          clearable={false}
          firstDayOfWeek='sunday'
          renderDay={(date) => {
            const day = date.getDate();
            return <Box onClick={() => customDayHandler(date)}>{day}</Box>;
          }}
        />
      );
    } else if (type === 'day') {
      return (
        <DatePicker
          value={currentDate}
          onChange={setCurrentDate}
          clearable={false}
        />
      );
    }

    return (
      <Title sx={{ minWidth: 194 }} align='center' order={3}>
        {moment(currentMonth).format('MMMM YYYY')}
      </Title>
    );
  };

  const todayHandler = () => {
    if (type === 'day') {
      setCurrentDate(new Date());
    } else if (type === 'week') {
      setSelectedDayInWeek(new Date());
    } else {
      setCurrentMonth(moment());
    }
  };

  const nextPrevDayHandler = (ctr = 1) => {
    let current = new Date(currentDate);
    setCurrentDate(new Date(current.setDate(current.getDate() + ctr)));
  };

  const nextPrevWeekHandler = (ctr = 1) => {
    setSelectedDayInWeek(
      new Date(
        moment(moment(selectedDayInWeek).add(ctr, 'weeks'))
          .startOf('week')
          .year(),
        moment(moment(selectedDayInWeek).add(ctr, 'weeks'))
          .startOf('week')
          .month(),
        moment(moment(selectedDayInWeek).add(ctr, 'weeks'))
          .startOf('week')
          .date()
      )
    );
  };

  const nextPrevMonthHandler = (ctr = 1) => {
    setCurrentMonth(moment(currentMonth).add(ctr, 'months'));
  };

  const prevHandler = () => {
    if (type === 'day') {
      nextPrevDayHandler(-1);
    } else if (type === 'week') {
      nextPrevWeekHandler(-1);
    } else {
      nextPrevMonthHandler(-1);
    }
  };

  const nextHandler = () => {
    if (type === 'day') {
      nextPrevDayHandler();
    } else if (type === 'week') {
      nextPrevWeekHandler();
    } else {
      nextPrevMonthHandler();
    }
  };

  useEffect(() => {
    if (items) {
      if (type === 'day') {
        if (items.default) {
          setDayItems(items.default);
        } else {
          let meals = [];

          meals = Object.keys(meal_value).map((key) => ({
            [key]: null,
          }));

          setDayItems(dayWeekFormatter(meals, items));
        }
      } else if (type === 'week') {
        // load tiles
        if (items.default) {
          const result = Object.values(items.default).map(() => {
            return Object.keys(meal_value).map((key) => ({
              [key]: null,
            }));
          });
          setWeekItems(result);
        } else {
          const result = Object.values(items).map((date) => {
            let meals = [];

            meals = Object.keys(meal_value).map((key) => ({
              [key]: null,
            }));

            return dayWeekFormatter(meals, date);
          });
          setWeekItems(result);
        }
      } else {
        let daysInMonth = [];
        for (const [key, value] of Object.entries(items)) {
          let list = [];
          if (value?.length) {
            list = value?.map((it) => ({
              meal_type: it.meal_type,
              food: it.planable,
              id: it.id,
            }));
          }
          daysInMonth.push({ [key]: list, showMoreVisibility: false, list });
        }
        setCalendar(daysInMonth);
      }
    }
  }, [items]);

  const dayWeekFormatter = (meals, data) => {
    const badgeType = {
      'App\\Models\\Recipe': 'recipe',
      'App\\Models\\Ingredient': 'ingredient',
    };
    const mealTypes = Object.keys(meal_value);
    meals.forEach((d, i) => {
      if (data[i]) {
        const meal_type = data[i]?.meal_type;
        const mealIndex = meal_type - 1;
        const badge = badgeType[data[i]?.planable_type];

        if (meals[mealIndex]) {
          const type =
            badge !== 'recipe'
              ? badge
              : data[i]?.planable?.is_ninety_ten
                ? 'database'
                : 'custom';
          const food = {
            ...data[i].planable,
            content: data[i].planable?.content && JSON.parse(data[i].planable.content)
          }

          meals[mealIndex][mealTypes[mealIndex]] = {
            meal_type,
            type,
            food,
            id: data[i].id
          };
        }
      }
    });

    return meals;
  };

  useEffect(() => {
    if (type === 'day') {
      setCalendar(dayItems);
    } else if (type === 'week') {
      setCalendar(weekItems);
    } else {
      moment.locale('en', {
        week: {
          dow: 0,
        },
      });
      setCurrentMonth(moment());
    }
  }, [type, dayItems, weekItems]);

  const monthDetails = () => {
    const start = moment(currentMonth).startOf('month').startOf('week');
    let days = [...Array(35)].map((d, i) => ({
      [moment(start).add(i, 'days').format('YYYY-MM-DD')]: [],
      showMoreVisibility: false,
    }));

    const lastWeek = days.slice(days.length - 7, days.length);
    const has30thDay = lastWeek.some((obj) => {
      const has30 = Object.keys(obj).some((key) => {
        if (key !== 'showMoreVisibility') {
          return moment(key).date() === currentMonth.daysInMonth();
        }
      });
      return has30;
    });

    if (!has30thDay) {
      const lastDay = Object.keys(days[days.length - 1])[0];
      const last7Days = [...Array(7)].map((_, i) => ({
        [moment(lastDay)
          .add(i + 1, 'days')
          .format('YYYY-MM-DD')]: [],
        showMoreVisibility: false,
      }));
      days = [...days, ...last7Days];
    }

    return { days, start };
  }

  useEffect(() => {
    if (type === 'month') {
      const { start, days } = monthDetails(currentMonth);
      setCalendar(days);
      fetchMyMealPlans(type, start, days.length);
    }
  }, [currentMonth, searchByTitle]);

  useEffect(() => {
    setMonthPrevState(calendar);
  }, [type, calendar]);

  useEffect(() => {
    if (type !== 'month') {
      fetchMyMealPlans(type);
    }
  }, [currentDate, type, selectedDayInWeek, searchByTitle]);

  useEffect(() => {
    if (query?.key === 'Enter') {
      setSearchByTitle(query.target.value);
    }
  }, [query]);

  const fetchMyMealPlans = async (
    selectedType,
    dateMonth = null,
    daysInMonth = 0
  ) => {
    let date = null;
    setIsFetching(true);
    if (selectedType === 'week') {
      setItems({ default: weekInitState });
      date = moment(new Date(getFirstDayOfTheWeek())).format('YYYY-MM-DD');
    } else if (selectedType === 'day') {
      setItems({
        default: Object.keys(meal_value).map((key) => ({
          [key]: null,
        })),
      });
      date = moment(new Date(currentDate)).format('YYYY-MM-DD');
    } else {
      date = dateMonth?.format('YYYY-MM-DD');
    }

    let params = { type: selectedType, date };
    if (searchByTitle) {
      params = { ...params, search: searchByTitle };
    }
    if (type === 'month') {
      params = { ...params, daysInMonth };
    }

    API.request({
      method: 'GET',
      url: '/my-plan',
      params,
    })
      .then(({ data }) => {
        setItems(data);
        setIsFetching(false);
        if (type === 'month') {
          setMonthPayload(null);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setSearchByTitle(null);
  }, []);

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

  const getNutrition = async (payload) => {
    const food = payload.item.food;
    const ingr = `${food.content.quantity} ${
      food.content.serving.split(' ')[1]
    } ${food.title}`;
    modalDispatch({
      type: 'showSpinner',
      payload: {
        label: 'Matching Ingredients...',
      },
    });

    const callback = (result) => {
      const nutritions = JSON.parse(result.data.nutritions);
      payload.item.food = {
        ...food,
        ingredients: parseIngredients(nutritions).match,
        nutritions: calculateNutritionPerServing(nutritions.match, 1),
      };
      setIngredient(payload);
      modalDispatch({ type: 'hideSpinner' });
      modalDispatch({
        type: 'hideIngredientModal',
      });
    };

    await matchIngredient([ingr], callback);
  };

  const mealTypeView = (list) => {
    const existingMealTypes = list?.map(l => l.meal_type);
    const mealTypes = Object.values(meal_value);
    const defaultView = {
      1: 'Breakfast',
      2: 'Snack AM',
      3: 'Lunch',
      4: 'Snack PM',
      5: 'Dinner',
    }

    const rem = mealTypes.map(m => {
      if (existingMealTypes.includes(m)) {
        return null;
      }
      return m;
    }).filter(m => m);

    if (view === 'default') {
      return rem.map(r => {
        return defaultView[r];
      });
    } else {
      return rem.map(r => {
        return `Meal ${r}`;
      });
    }
  }

  const addRecipeToBoard = (data) => {
    const { target, item } = data;
    const food = {
      food: item.food,
      meal_type: target.yIndex + 1,
      type: item.type,
      new: true,
    };

    let date = moment(currentDate).format('YYYY-MM-DD');

    if (type === 'day') {
      setCalendar(values => setCalendarDay(values, food, target.yIndex));
    } else if (type === 'week') {
      let firstDayOfWeek = getFirstDayOfTheWeek();
      date = moment(firstDayOfWeek).add(target.xIndex, 'days').format('YYYY-MM-DD');

      if (item.type !== 'ingredient') {
        setCalendar((values) => setCalendarWeek(values, target, food));
      }
    } else {
      if (data.item.type === 'ingredient') {
        setMonthList(data.list);
        setMonthMealType({
          ingredient: true,
        });
      } else {
        if (!mealTypeView(data.list).length) {
          return showNotification({ color: 'red', message: `No available meal on ${data.targetDate}` });
        }
        setMonthMealType({
          value: mealTypeView(data.list)[0],
          list: mealTypeView(data.list),
          mealValue: meal_value[mealTypeView(data.list)[0]] ?? mealView[mealTypeView(data.list)[0]],
          data,
        });
      }
    }
    
    if (item.type === 'ingredient') {
      if (type !== 'month') {
        showIngredientModal({
          title: item.food,
          target,
        });
      }
    } else {
      if (type !== 'month') {
        addToMyPlan(food, date, target);
      }
    }
  }

  useEffect(() => {
    if (monthMealType) {
      if (monthMealType.ingredient) {
        setMonthMealType({
          value: mealTypeView(monthList)[0],
          list: mealTypeView(monthList),
          mealValue: meal_value[mealTypeView(monthList)[0]] ?? mealView[mealTypeView(monthList)[0]],
        });
      }

      showSelectMealTypeModal({
        list: monthMealType.list,
        monthMealType: monthMealType.value,
        setMonthMealType,
      });
    }
  }, [monthMealType, monthList])

  const monthSaveHandler = async () => {
    modalDispatch({
      type: 'hideSelectMealTypeModal',
    });
    setMonthList([]);
    setMonthMealType(value => {
      if (value.data) {
        const data = {
          ...value.data,
          mealValue: value.mealValue,
        }
        const food = {
          ...value.data.item,
          meal_type: value.mealValue,
          type: value.data.item.type,
        }

        setMonthPayload({ food, date: value.data.targetDate });
        setCalendar((values) => setCalendarMonth(values, data));
      }
      
      return null;
    });
  }

  useEffect(async () => {
    if (monthPayload) {
      if (!monthPayload.save) {
        const { food, date } =  monthPayload;
        addToMyPlan(food, date);
      } else {
        const { start, days } = monthDetails(currentMonth);
        fetchMyMealPlans(type, start, days.length);
      }
    }
  }, [monthPayload, currentMonth, searchByTitle])

  const addToMyPlan = (food, date, target) => {
    API.post('/my-plan/create', { food, date })
      .then(({ data }) => {
        showNotification({ color: 'green', message: data.message });

        const { plan } = data;
        let addedFood = {
          ...food,
          id: plan.id
        }

        if (type === 'day') {
          setCalendar(values => setCalendarDay(values, addedFood, target.yIndex));
        } else if (type === 'week') {
          if (addedFood.type === 'ingredient') {
            addedFood = {
              ...addedFood,
              food: {
                ...addedFood.food,
                content: addedFood.food.content && JSON.parse(addedFood.food.content)
              }
            }
          }
          
          setCalendar((values) => setCalendarWeek(values, target, addedFood));
        } else {
          setMonthPayload({ save: true });
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (ingredient) {
      let date = moment(currentDate).format('YYYY-MM-DD');
      
      if (type === 'week') {
        let firstDayOfWeek = getFirstDayOfTheWeek();
        date = moment(firstDayOfWeek).add(ingredient.target.xIndex, 'days').format('YYYY-MM-DD');
        setCalendar((values) => setCalendarWeek(values, ingredient.target, ingredient.item));
      } else if (type === 'day') {
        setCalendar(values => setCalendarDay(values, ingredient.item, ingredient.target.yIndex));
      } else {
        setCalendar((values) => setCalendarMonth(values, { item: { food: ingredient.item }}));
      }

      const ingr = {
        food: {
          ...ingredient.item.food,
          content: JSON.stringify({
            ...ingredient.item.food.content,
            title: ingredient.item.food.title
          }),
          ingredients: JSON.stringify(ingredient.item.food.ingredients),
          nutritions: JSON.stringify(ingredient.item.food.nutritions),
          item: ingredient.item
        }
      }
      const food = { ...ingr, meal_type: ingredient.target.yIndex + 1, type: 'ingredient' };
      addToMyPlan(food, date, ingredient.target);
    }
  }, [ingredient])

  const removeRecipeToBoard = (target) => {
    if (type === 'day') {
      setCalendar(values => setCalendarDay(values, null, target.y));
    } else if (type === 'week') {
      const targ = {
        xIndex: target.x,
        yIndex: target.y
      }
      setCalendar((values) => setCalendarWeek(values, targ, null));
    } else {
      setCalendar((values) => setCalendarMonth(values, target, true));
    }

    if (target.id) {
      API.delete(`/my-plan/${target.id}`)
        .then(({ data }) => {
          showNotification({ color: 'green', message: data.message });
        })
        .catch((error) => console.error(error));
    }
  }

  const setCalendarDay = (state, data, target) => {
    return state.map((value, i) => {
      if (i === target) {
        return {
          [Object.keys(value)[0]]: data
        }
      }
      return value;
    });
  }

  const setCalendarWeek = (values, target, data) => {
    return values.map((days, i) => {
      if (i === target.xIndex) {
        return setCalendarDay(days, data, target.yIndex);
      }
      return days;
    })
  }

  const setCalendarMonth = (values, data, isRemove = false) => {
    return values.map(v => {
      if (v[data.targetDate]) {
        let items = [];

        if (!isRemove) {
          items = [...v[data.targetDate], { food: data.item.type !== 'ingredient' ? data.item.food : { title: data.item.food }, meal_type: data.mealValue }]
        } else {
          items = v[data.targetDate].filter(item => item.meal_type !== data.mealType);
        }

        return {
          ...v,
          [data.targetDate]: items,
        }
      }
      return v;
    })
  }

  const Calendar = () => {
    return <>
      {type !== 'month' ? (
        type === 'week' ? (
          <ViewWrapper>
            <Day />
          </ViewWrapper>
        ) : <Day />
      ) : (
        <ViewWrapper>
          <FullCalendar
            view={view}
            monthItems={calendar}
            addRecipeToBoard={addRecipeToBoard}
            removeRecipeToBoard={removeRecipeToBoard}
            monthMealType={monthMealType}
          />
        </ViewWrapper>
      )}
    </>
  }

  const Day = () => {
    return (
      <Stack spacing={0} sx={{ position: 'relative', width: '100%' }}>
        {['week', 'day'].includes(type) && (
          <Box ml={138} sx={{ position: 'relative' }}>
            {renderDaysRow()}
          </Box>
        )}
        <Box sx={{ position: 'relative' }}>
          <Group>
            <DayWeekCalendar
              meals={calendar}
              type={type}
              mealTypes={Object.keys(meal_value)}
              addRecipeToBoard={addRecipeToBoard}
              removeRecipeToBoard={removeRecipeToBoard}
            />
          </Group>
          {
            (type !== 'month') && (
              <ShowDataSource />
            )
          }
        </Box>
        <Box ml={139} sx={{ position: 'absolute' }}>
          {renderLabelsColumn()}
        </Box>
      </Stack>
    )
  }

  const ViewWrapper = ({ children }) => {
    return (
      <Box sx={{ width: '84.6vw'}}>
        {children}
      </Box>
    );
  }

  const ShowDataSource = () => {
    const setPosition = () => {
      if (!isContainerToggled) {
        return {
          right: 20
        }
      } else {
        return {
          left: '-12%'
        }
      }
    }

    return (
      <Button
        variant='light'
        styles={() => ({
          // inner: {
          //   transform: !isContainerToggled && 'rotate(180deg)',
          // },
          root: {
            // backgroundColor: !isContainerToggled && 'transparent',
            borderRadius: '50%'
          }
        })}
        sx={{
          position: 'absolute',
          top: '55%',
          left: '-12%',
          // ...setPosition()
        }}
        px={13}
        onClick={() => toggleRecipeContainer()}
      >
        <ChevronRight color={'#fff' } strokeWidth={2} />
      </Button>
    );
  }

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='My Plan'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Group>
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
                disabled={isFetching}
              >
                <ChevronRight color='#65768E' strokeWidth={2} />
              </Button>
              {renderTypeOfCalendar()}
              <Button
                variant='light'
                color='gray'
                onClick={() => nextHandler()}
                disabled={isFetching}
              >
                <ChevronRight color='#65768E' strokeWidth={2} />
              </Button>
            </Group>
            <Button variant='filled' onClick={() => todayHandler()}>
              Today
            </Button>
          </Group>

          <Group>
            <Text color='#778CA3' weight='bold'>
              View
            </Text>
            <Select
              value={view}
              onChange={setView}
              data={view_options}
              rightSection={<ChevronDown />}
              styles={{
                rightSection: { pointerEvents: 'none' },
                input: {
                  height: 45,
                  width: 150,
                },
              }}
            />
            <SegmentedControl
              value={type}
              onChange={(e) => {
                setType(e);
                // if (isContainerToggled) {
                //   toggleRecipeContainer();
                // }
              }}
              data={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
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
          </Group>
        </Box>

        <Divider my='sm' />
        <DndProvider backend={HTML5Backend}>
          <Grid gutter={type !== 'month' ? 0 : 'lg'}>
            <Grid.Col span={3} mt={type !== 'month' && '1.9%'} sx={{ zIndex: 10, background: '#fff', position: 'relative', boxShadow: '10px 0px 10px 1px #f5f5f5' }}>
              <Box sx={{ position: 'absolute', height: 20, width: '100%', zIndex: 1, background: '#fff', top: -20  }} />
              <Box sx={{ position: 'absolute', height: 20, width: '100%', zIndex: 1, background: '#fff', bottom: -20  }} />
              <DataSource
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                customHeight='112.5vh'
                customPadding='22px'
                customPl={28}
                customPr={20}
                customScrollHeight='105vh'
              />
            </Grid.Col>
            <Grid.Col span={9} sx={{ overflow: 'auto' }}>
              <Calendar />
            </Grid.Col>
          </Grid>
        </DndProvider>
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
