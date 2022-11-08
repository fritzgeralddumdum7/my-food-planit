import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import useApi from '@/hooks/useApi';
import useRecipe from '@/hooks/useRecipe';
import API from '@/api/BaseApi';
import PropTypes from 'prop-types';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import { showNotification } from '@mantine/notifications';
import { meal_value } from '@/consts/select_choices';
import {
  parseIngredients,
  calculateNutritionPerServing,
} from '@/helpers/ingredientsHelper';

const Context = createContext();

export function AddPreMadeMealPlanCTX({
  children,
  setIsPreMadeOpen,
  myMealPlan,
  setMyMealPlan,
  planDayView,
  isStore,
  myPlanStore,
  setMyPlanStore,
}) {
  const modalDispatch = useModalDispatch();
  const { matchIngredient, searchIngredent } = useRecipe();
  const [keywords, setKeywords] = useState({
    database: null,
    custom: null,
    ingredient: null,
    dbWithTag: {
      tag: null,
      keyword: null,
    },
  });
  const [triggerRefetch, setTriggerRefetch] = useState({
    database: false,
    custom: false,
    ingredient: false,
    dbWithTag: false,
  });
  const [droppedData, setDroppedData] = useState(null);
  const meals = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];
  const [arrayOfTags, setArrayOfTags] = useState([]);
  const [planName, setPlanName] = useState('');
  const [dayView, setDayView] = useState(planDayView?.toString() ?? '1');
  const [mealPlanView, setMealPlanView] = useState(
    [...new Array(planDayView)].map(() => [
      { breakfast: null },
      { snack: null },
      { lunch: null },
      { snack: null },
      { dinner: null },
    ])
  );
  const [currentWeek, setCurrentWeek] = useState(0);
  const [planType, setPlanType] = useState('Premium');
  const [planPrice, setPlanPrice] = useState(null);
  const handlePlanType = (e) => {
    setPlanType(e);
  };
  const [myCalendar, setMyCalendar] = useState([]);
  const [startDateFromCalendar, setStartDateFromCalendar] = useState(null);

  const getNutriion = async (payload) => {
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
      setDroppedData(payload);
      modalDispatch({ type: 'hideSpinner' });
      modalDispatch({
        type: 'hideIngredientModal',
      });
    };

    await matchIngredient([ingr], callback);
  };

  const showIngredientModal = useCallback(
    ({ title, target }) =>
      modalDispatch({
        type: 'showIngredientModal',
        payload: {
          title,
          target,
          onClick: async (payload) => {
            getNutriion(payload);
          },
        },
      }),
    []
  );

  const addRecipeToBoard = (item) => {
    if (item.item.type === 'ingredient') {
      showIngredientModal({
        title: item.item.food,
        target: item.target,
      });
    }
    setDroppedData(item);
  };

  const removeRecipeToBoard = (target) => {
    setMealPlanView((state) => {
      return state.map((mealType, i) => {
        const index = [14, 30].includes(dayView)
          ? target.week * 7 + target.x
          : target.x;
        if (i === index) {
          return mealType.map((meals, j) => {
            if (j === target.y) {
              return {
                [target.mealType]: null,
              };
            }
            return meals;
          });
        }
        return mealType;
      });
    });
  };

  const currentWeekHandler = (num) => {
    setCurrentWeek((v) => (v += num));
  };

  useEffect(() => {
    if (droppedData) {
      const meal = droppedData?.item;
      mealPlanView[currentWeek * 7 + droppedData?.target.xIndex][
        droppedData?.target.yIndex
      ][meals[droppedData?.target.yIndex].toLowerCase()] = meal;
      setDroppedData(null);
    }
  }, [droppedData, currentWeek]);

  const [customRecipes, customRecipesFetching] = useApi(
    {
      method: 'GET',
      url: `/recipes`,
      params: {
        sort: 'created_at',
        type: 'imported',
        keyword: keywords.custom,
      },
    },
    [keywords.custom, triggerRefetch.custom]
  );

  //dont remove yet
  // const [ingredients, ingredientsFetching, ingrFetchingError] = useApi(
  //   {
  //     method: 'GET',
  //     url: `/analysis/ingredient-search`,
  //     params: { ingredient: keywords.ingredient },
  //   },
  //   [keywords.ingredient]
  // );

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsFetching, setIngredientsFetching] = useState(false);

  useEffect(async () => {
    if (!keywords.ingredient) {
      return;
    }

    setIngredientsFetching(true);
    const callback = (result) => {
      setIngredients(JSON.parse(result.data.data));
      setIngredientsFetching(false);
    };

    await searchIngredent(keywords.ingredient, callback);
  }, [keywords.ingredient]);

  const [dbList, dbListFetching] = useApi(
    {
      method: 'GET',
      url: `/recipes/db-by-tags`,
      params: { keyword: keywords.database },
    },
    [keywords.database]
  );

  const [dbListWithTag, dbListWithTagFetching] = useApi(
    {
      method: 'GET',
      url: `/recipes/db-by-tags`,
      params: {
        keyword: keywords.dbWithTag.keyword,
        tag: keywords.dbWithTag.tag,
      },
    },
    [keywords.dbWithTag]
  );

  const parseItems = (data) => {
    const recipePlans = [];
    const newIngredients = [];
    const dataset = data.length === 5 ? [data] : data;

    dataset.forEach((meals, i) => {
      const nth_day = i + 1;
      meals.forEach((mealType, j) => {
        const meal_type = j + 1;
        const item = Object.values(mealType)[0];
        if (!item) {
          return;
        }

        if (item.type !== 'ingredient') {
          const plan = {
            recipe_id: item.food.id,
            meal_type,
            nth_day,
          };

          if (item.new) {
            recipePlans.push(plan);
          } else {
            if (!myCalendar.length) {
              recipePlans.push(plan);
            }
          }
        } else {
          newIngredients.push({
            title: item.food.title,
            content: JSON.stringify({
              ...item.food.content,
              title: item.food.title,
            }),
            nutritions: JSON.stringify(item.food.nutritions),
            ingredients: JSON.stringify(item.food.ingredients),
            recipePlans: {
              meal_type,
              nth_day,
            },
            id: item.food.id,
          });
        }
      });
    });

    return { recipePlans, newIngredients };
  };

  const handleSave = async () => {
    const { recipePlans, newIngredients } = parseItems(mealPlanView);

    const storePayload = {
      plan: planType,
      price: planType === 'Free' ? 0 : parseFloat(planPrice),
    };

    const payload = {
      tags: arrayOfTags,
      title: planName,
      recipePlans,
      newIngredients,
      days: dayView,
      id: isStore ? myPlanStore : myMealPlan,
      startDate: myCalendar.length ? startDateFromCalendar : null,
    };

    let error = 0;
    if (!payload.title) {
      error += 1;
      showNotification({ color: 'red', message: 'Plan name is required' });
    }
    if (!(payload.recipePlans.length + payload.newIngredients.length)) {
      error += 1;
      showNotification({ color: 'red', message: 'Atleast 1 meal is required' });
    }
    if (isStore && planType === 'Premium' && !planPrice) {
      error += 1;
      showNotification({ color: 'red', message: 'Price is Required' });
    }

    if (!error) {
      modalDispatch({ type: 'showSpinner' });

      if (!myMealPlan && !myPlanStore) {
        return await API.post(
          isStore ? '/store/' : '/my-meal-plan/',
          isStore ? { ...payload, ...storePayload } : payload
        )
          .then((res) => {
            showNotification({
              color: 'green',
              message: 'Saved successfully.',
            });
            return res;
          })
          .catch(() => {
            showNotification({
              color: 'red',
              message: 'Something went wrong.',
            });
          })
          .finally(() => modalDispatch({ type: 'hideSpinner' }));
      } else {
        API.put(
          isStore ? '/store/' : '/my-meal-plan/',
          isStore ? { ...payload, ...storePayload } : payload
        )
          .then(() => {
            showNotification({
              color: 'green',
              message: 'Updated successfully.',
            });
            setIsPreMadeOpen(false);
            setMyMealPlan(null);
            setMyPlanStore(null);
          })
          .catch(() => {
            showNotification({
              color: 'red',
              message: 'Something went wrong.',
            });
          })
          .finally(() => modalDispatch({ type: 'hideSpinner' }));
      }
    }
  };

  useEffect(() => {
    setMealPlanView((state) => {
      const boardState = [...new Array(dayView - state?.length)].map(() => [
        { breakfast: null },
        { snack: null },
        { lunch: null },
        { snack: null },
        { dinner: null },
      ]);
      return [...state, ...boardState];
    });
  }, [dayView]);

  useEffect(() => {
    if (myMealPlan || myPlanStore) {
      const url = isStore
        ? `/store/${myPlanStore}`
        : `/my-meal-plan/${myMealPlan}`;
      API.get(url).then(({ data }) => {
        const { days, title, byDays, tags, price, plan } = data;
        const planTags = tags.map((tag) => tag.label);

        setPlanName(title);
        setDayView(days);
        setArrayOfTags((tags) => [...tags, ...planTags]);
        if (isStore) {
          setPlanPrice(price);
          setPlanType(plan);
        }

        const boardState = [...new Array(days)].map(() => [
          { breakfast: null },
          { snack: null },
          { lunch: null },
          { snack: null },
          { dinner: null },
        ]);

        const plans = boardState.map((_, i) => {
          let mealTypes = [
            { breakfast: null },
            { snack: null },
            { lunch: null },
            { snack: null },
            { dinner: null },
          ];

          if (byDays[i + 1]) {
            let index = 0;
            Object.keys(meal_value).forEach((key) => {
              const obj = byDays[i + 1][index];
              let label = key.toLowerCase();

              if (label.includes('snack')) {
                label = label.split(' ')[0];
              }

              const type = {
                'App\\Models\\Recipe': 'recipe',
                'App\\Models\\Ingredient': 'ingredient',
              };

              if (obj) {
                let f = {};
                const mType = isStore
                  ? obj.planable_type
                  : obj.recipe_plannable_type;
                const mObj = isStore ? obj.planable : obj.recipe_plannable;

                if (type[mType] === 'ingredient') {
                  const content = JSON.parse(mObj.content);
                  f = {
                    food: {
                      title: mObj.title,
                      quantity: content.quantity,
                      serving: content.serving,
                      id: mObj.id,
                      ...mObj,
                    },
                    type: 'ingredient',
                  };
                } else {
                  f = {
                    food: mObj,
                    type: mObj.is_ninety_ten ? 'database' : 'custom',
                  };
                }
                mealTypes[obj.meal_type - 1] = {
                  [Object.keys(mealTypes[obj.meal_type - 1])[0]]: f,
                };
              }
              index++;
            });
          }
          return mealTypes;
        });

        setMealPlanView(plans);
      });
    }
  }, [myMealPlan, myPlanStore]);

  return (
    <Context.Provider
      value={{
        mealPlanView,
        addRecipeToBoard,
        removeRecipeToBoard,
        meals,
        ingredients,
        keywords,
        setKeywords,
        arrayOfTags,
        setArrayOfTags,
        setPlanName,
        planName,
        handleSave,
        foodList: {
          database: {
            list: dbList,
            fetching: dbListFetching,
          },
          custom: {
            list: customRecipes,
            fetching: customRecipesFetching,
          },
          ingredient: {
            list: ingredients,
            fetching: ingredientsFetching,
          },
          dbWithTag: {
            list: dbListWithTag,
            fetching: dbListWithTagFetching,
          },
        },
        triggerRefetch,
        setTriggerRefetch,
        setDayView,
        dayView,
        currentWeekHandler,
        currentWeek,
        setMealPlanView,
        setCurrentWeek,
        handlePlanType,
        planType,
        setPlanPrice,
        planPrice,
        setMyCalendar,
        setStartDateFromCalendar,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAddPreMadeMealPlanCTX() {
  return useContext(Context);
}

AddPreMadeMealPlanCTX.propTypes = {
  children: PropTypes.node.isRequired,
  setIsPreMadeOpen: PropTypes.func.isRequired,
  myMealPlan: PropTypes.number,
  setMyMealPlan: PropTypes.func,
  planDayView: PropTypes.string,
  isStore: PropTypes.bool,
  myPlanStore: PropTypes.number,
  setMyPlanStore: PropTypes.func,
};

AddPreMadeMealPlanCTX.defaultProps = {
  myMealPlan: null,
  setMyMealPlan: () => null,
  planDayView: '1',
  isStore: false,
  myPlanStore: null,
  setMyPlanStore: () => null,
};
