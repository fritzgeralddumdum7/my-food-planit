import { Box, Divider, Tabs, Group, Button, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import Modal from '@/components/organisms/Modal';
import MealPlanContent from './MealPlanContent';
import AddIngredients from './AddIngredients';
import ChevronLeft from '@/icons/ChevronLeft';
import useApi from '@/hooks/useApi';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import useAddIngredientDiary from '@/hooks/useAddIngredientDiary';
import API from '@/api/BaseApi';

const AddFoodModal = ({
  opened,
  setOpened,
  currentDate,
  selectedMeal,
  setUpdated,
  updated,
}) => {
  const { handleAddIngrs, searchedIngr, setIngrKeyword, searchedIngrFetching } =
    useAddIngredientDiary();

  const modalDispatch = useModalDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [mealPlanState, setMealPlanState] = useState(null);
  const [parsedIngredients, setParsedIngredients] = useState([]);
  const [matching, setMatching] = useState(false);

  const form = useForm({
    initialValues: {},
  });

  const [scheduledPlans, fetching] = useApi(
    opened && {
      method: 'GET',
      url: '/my-plan/today',
      params: { date: moment(currentDate).format('Y-MM-D') },
    },
    [opened]
  );

  const saveRecipes = async (recipes, callback) => {
    if (matching) {
      return;
    }
    await setMatching(true);
    const options = {
      method: 'POST',
      url: '/tracker',
      data: {
        data: recipes,
        mealType: selectedMeal,
        currentDate: moment(currentDate).format('Y-MM-D'),
      },
    };

    return API.request(options)
      .then(({ data }) => {
        setTimeout(() => setMatching(false), 7000);
        if (callback) {
          callback();
        }
        return data;
      })
      .catch(({ response }) => {});
  };

  const prepEntries = async () => {
    const { values, numOfErrors } = handleAddIngredients();

    if (numOfErrors) {
      return;
    }

    modalDispatch({
      type: 'showSpinner',
      payload: {
        label: 'Saving',
      },
    });

    const recipes = mealPlanState.filter((mealplan) => mealplan.selected);

    const refetch = () => {
      setUpdated(!updated);
      modalDispatch({ type: 'hideSpinner' });
    };

    if (recipes.length && Object.keys(values).length) {
      saveRecipes(recipes).then((res) => handleAddIngrs(values, setters));
    } else if (!numOfErrors && Object.keys(values).length) {
      handleAddIngrs(values, setters);
    } else {
      saveRecipes(recipes, refetch);
    }

    onClose();
    setOpened(false);
  };

  useEffect(() => {
    setMealPlanState(scheduledPlans);
  }, [scheduledPlans]);

  const selectHandler = (index) => {
    setMealPlanState((item) =>
      item.map((mealplan, iter) => {
        if (iter === index) {
          return { ...mealplan, selected: !mealplan.selected };
        }

        return mealplan;
      })
    );
  };

  const onClose = () => {
    setMealPlanState([]);
    setParsedIngredients([]);
  };

  const setters = async (ingrs) => {
    const parsedIngrs = [];

    ingrs.map((ingredient) => {
      let ing = ingredient.ingr;
      let nutritions = {
        calories: ingredient.calories,
        carbs: ingredient.carbs,
        cholesterol: ingredient.cholesterol,
        fat: ingredient.fat,
        protein: ingredient.protein,
        sodium: ingredient.sodium,
        sugar: ingredient.sugar,
      };

      const splittedIngr = ing.split(' ');
      parsedIngrs.push({
        planable: {
          title: ing,
          content: JSON.stringify({
            serving: `1 ${splittedIngr[1]}`,
            quantity: splittedIngr[0],
          }),
          nutritions: JSON.stringify(nutritions),
        },
        isNew: true,
        type: 'ingredients',
        selected: true,
      });
    });

    const options = {
      method: 'POST',
      url: '/tracker',
      data: {
        data: parsedIngrs,
        mealType: selectedMeal,
        currentDate: moment(currentDate).format('Y-MM-D'),
      },
    };
    return await API.request(options)
      .then(({ data }) => {
        setUpdated(!updated);
      })
      .catch(({ response }) => {});
  };

  useEffect(() => {
    if (!matching) {
      modalDispatch({ type: 'hideSpinner' });
    }
  }, [matching]);

  const handleAddIngredients = () => {
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
      form.reset();
    }

    return { values, numOfErrors };
  };

  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      callback={() => {
        onClose();
      }}
      header={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ width: '24px', marginRight: '16px', cursor: 'pointer' }}
            onClick={() => setOpened(false)}
          >
            <ChevronLeft />
          </Box>
          Add Food
        </Box>
      }
      padding={0}
      size={'40%'}
      width={'700px'}
      height={'622px'}
    >
      <Divider />
      <Box sx={{ padding: '32px', height: '100%' }}>
        <Tabs active={activeTab} onTabChange={setActiveTab}>
          <Tabs.Tab label='Meal Plan'>
            <MealPlanContent
              selectHandler={selectHandler}
              currentDate={currentDate}
              mealPlanState={mealPlanState}
              setMealPlanState={setMealPlanState}
              setOpened={setOpened}
              onClose={onClose}
            />
          </Tabs.Tab>
          <Tabs.Tab label='Ingredients'>
            <AddIngredients
              form={form}
              list={searchedIngr}
              setKeyword={setIngrKeyword}
              fetching={searchedIngrFetching}
            />
          </Tabs.Tab>
        </Tabs>
        <Space h={12} />
        <Group sx={{ justifyContent: 'flex-end' }}>
          <Button sx={{ padding: '0px 60px' }} onClick={() => prepEntries()}>
            Add
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default AddFoodModal;
