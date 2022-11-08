import { useCallback, useState, useEffect } from 'react';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import { useRouter } from 'next/router';
import { AddPreMadeMealPlanCTX } from '@/contexts/AddPreMadeMealPlanContext';
import { showNotification } from '@mantine/notifications';
import API from '@/api/BaseApi';
import Funnel from '@/icons/Funnel';
import MealPlanListItem from '@/components/organisms/MealPlan/MealPlanListItem';
import Drawer from '@/components/organisms/Drawer';
import TagSearchInput from '@/components/molecules/TagSearchInput';
import Badge from '@/components/molecules/Badge';
import AddPreMadeMealPlan from '@/components/organisms/MealPlan/AddPreMadeMealPlan';
import { Box, Button, Center, Text, Grid, Loader } from '@mantine/core';
import useApi from '@/hooks/useApi';
import { useForm } from '@mantine/form';
import moment from 'moment';

const Index = () => {
  const modalDispatch = useModalDispatch();
  const router = useRouter();
  const query = router.query;
  const {
    sort,
    tags: queryTags,
    total_recipe_min,
    total_recipe_max,
    total_days_min,
    total_days_max,
  } = query;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isPreMadeOpen, setIsPreMadeOpen] = useState(false);
  const [myMealPlan, setMyMealPlan] = useState(null);
  const [planDayView, setPlanDayView] = useState(null);
  const [filters, setFilters] = useState([]);
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const [arrayOfTags, setArrayOfTags] = useState(
    queryTags ? JSON.parse(queryTags) : []
  );

  const [meal_data, fetching] = useApi(
    {
      method: 'GET',
      url: '/my-meal-plan',
      params: {
        sort,
        tags: queryTags ? JSON.parse(queryTags) : [],
        total_recipe_min,
        total_recipe_max,
        total_days_min,
        total_days_max,
      },
    },
    [query, isPreMadeOpen, triggerRefetch]
  );

  const form = useForm({
    initialValues: {
      total_recipe_min: total_recipe_min || '',
      total_recipe_max: total_recipe_max || '',
      total_days_min: total_days_min || '',
      total_days_max: total_days_max || '',
    },
  });

  const handleSort = (e) => {
    const sort = e.target.value;
    router.query.sort = sort;
    router.push(router);
  };

  const deleteFilter = (filter) => {
    switch (filter) {
      case 'recipe':
        delete query.total_recipe_min;
        delete query.total_recipe_max;
        break;
      case 'days':
        delete query.total_days_min;
        delete query.total_days_max;
        break;

      default:
        break;
    }

    router.push({
      pathname: router.pathname,
      query,
    });
    form.setValues(query);
  };

  const handleResetFilter = () => {
    form.setValues({
      total_recipe_min: '',
      total_recipe_max: '',
      total_days_min: '',
      total_days_max: '',
    });
    router.replace('/meal-plans');
    setOpenDrawer(false);
  };

  const addFilterToRoute = (key, value) => {
    if (!value) {
      return delete query[key];
    }
    query[key] = value;
  };

  const handleFilter = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      addFilterToRoute(key, value);
    });
    router.push(router);
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (arrayOfTags.length) {
      query.tags = JSON.stringify(arrayOfTags);
    } else {
      delete query.tags;
    }

    router.push(router);
  }, [arrayOfTags]);

  useEffect(() => {
    const filters = [];
    if (total_recipe_min || total_recipe_max) {
      const min = total_recipe_min || 0;
      const max = total_recipe_max || '';
      filters.push({
        recipe: `${min} - ${max} recipes`,
      });
    }
    if (total_days_min || total_days_max) {
      const min = total_days_min || 0;
      const max = total_days_max || '';
      filters.push({
        days: `${min} - ${max} total days`,
      });
    }
    setFilters(filters);
  }, [query]);

  const applyToMeaPlan = (id, startDate) => {
    modalDispatch({ type: 'showSpinner' });

    API.post('/my-plan/', {
      myMealPlanId: id,
      startDate: moment(startDate).format('YYYY-MM-DD'),
    })
      .then(() => {
        showNotification({ color: 'green', message: 'Applied to meal plan.' });
      })
      .catch(() => {
        modalDispatch({ type: 'showApplyMealPlanConflictModal' });
      })
      .finally(() => {
        modalDispatch({ type: 'hideApplyMealPlanModal' });
        modalDispatch({ type: 'hideSpinner' });
      });
  };

  const showApplyMealPlanModal = useCallback(
    (id, title, total_recipes, total_days) =>
      modalDispatch({
        type: 'showApplyMealPlanModal',
        payload: {
          title,
          total_recipes,
          total_days,
          onClick: (startDate) => applyToMeaPlan(id, startDate),
        },
      }),
    []
  );

  const onDelete = (id) => {
    modalDispatch({
      type: 'showConfirmModal',
      payload: {
        onClick: () => {
          modalDispatch({ type: 'showSpinner' });
          API.delete(`/my-meal-plan/${id}`).then(() => {
            setTriggerRefetch(!triggerRefetch);
            modalDispatch({ type: 'hideSpinner' });
            showNotification({
              color: 'green',
              message: 'Deleted Successfully',
            });
            modalDispatch({ type: 'hideConfirmModal' });
          });
        },
      },
    });
  };

  useEffect(() => {
    if (myMealPlan) {
      setIsPreMadeOpen(true);
    }
  }, [myMealPlan]);

  return (
    <Box>
      <Drawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        form={form}
        isStore={false}
        handleForm={handleFilter}
        handleResetFilter={handleResetFilter}
      />
      {isPreMadeOpen && (
        <AddPreMadeMealPlanCTX
          setIsPreMadeOpen={setIsPreMadeOpen}
          myMealPlan={myMealPlan}
          setMyMealPlan={setMyMealPlan}
          planDayView={planDayView}
        >
          <AddPreMadeMealPlan
            isPreMadeOpen={isPreMadeOpen}
            setIsPreMadeOpen={setIsPreMadeOpen}
            myMealPlan={myMealPlan}
            planDayView={planDayView}
            setMyMealPlan={setMyMealPlan}
            setPlanDayView={setPlanDayView}
          />
        </AddPreMadeMealPlanCTX>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button size='md' onClick={() => setIsPreMadeOpen(true)}>
          Add Pre-made Meal Plan
        </Button>
      </Box>
      <Center py={26} sx={{ justifyContent: 'space-between' }}>
        <TagSearchInput
          tags={arrayOfTags}
          setTags={setArrayOfTags}
          radius={32}
        />
        <Center>
          <Text color='#0B2C2A' size='md' mr='xs'>
            Sort by:
          </Text>
          {router.isReady && (
            <select
              defaultValue={sort || ''}
              onChange={handleSort}
              style={{
                border: 'none',
                minWidth: 70,
                outline: 'none',
                cursor: 'pointer',
                lineHeight: 1.2,
                fontSize: 16,
              }}
            >
              <option value='oldest'>Oldest</option>
              <option value='newest'>Newest</option>
              <option value='title'>Title</option>
            </select>
          )}
          <Box
            onClick={() => setOpenDrawer(true)}
            sx={{
              background: '#EFF2F4',
              padding: '13px 15px',
              borderRadius: '8px',
              marginLeft: '30px',
              cursor: 'pointer',
            }}
          >
            <Funnel />
          </Box>
        </Center>
      </Center>

      {filters.length ? (
        <Box
          mb={30}
          sx={{
            display: 'flex',
          }}
        >
          {filters?.map((filter) =>
            Object.entries(filter)?.map(([key, value]) => (
              <Badge
                key={key}
                filter={key}
                label={value}
                remove={deleteFilter}
              />
            ))
          )}
          <Text
            color='green-theme'
            weight='bold'
            ml={12}
            sx={{ alignSelf: 'center', cursor: 'pointer' }}
            onClick={handleResetFilter}
          >
            Reset all
          </Text>
        </Box>
      ) : null}

      <Grid>
        {fetching ? (
          <Center style={{ height: '50vh', width: '100%' }}>
            <Loader />
          </Center>
        ) : (
          <>
            {meal_data.map((plan, key) => (
              <Grid.Col key={key} span={3}>
                <MealPlanListItem
                  id={plan.id}
                  title={plan.title}
                  type={plan.meal_plan_type}
                  plan={plan.meal_plan_type == 'premium' ? 'Premium' : 'Free'}
                  total_recipes={plan.recipe_plans_count}
                  total_days={plan.days}
                  onClickBtn={showApplyMealPlanModal}
                  onDelete={onDelete}
                  setMyMealPlan={setMyMealPlan}
                  setPlanDayView={setPlanDayView}
                  myMealPlan
                />
              </Grid.Col>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Index;
