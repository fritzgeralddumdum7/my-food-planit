import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Tag from '@/components/molecules/Tag';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import API from '@/api/BaseApi';
import { showNotification } from '@mantine/notifications';
import DashboardWrapper from '@/templates/DashboardWrapper';
import {
  Divider,
  Group,
  Box,
  Stack,
  Title,
  Text,
  Button,
  Grid,
  Badge,
} from '@mantine/core';
import CellGrid from '@/components/organisms/MealPlan/AddPreMadeMealPlan/CellGrid';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Preview } from '@/components/organisms/MealPlan/AddPreMadeMealPlan/Preview';
import Breadcrumb from '@/components/organisms/Breadcrumb';
import { meal_value } from '@/consts/select_choices';
import useApi from '@/hooks/useApi';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const modalDispatch = useModalDispatch();
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [weekInitState] = useState(
    [...new Array(30)].map(() =>
      Object.keys(meal_value).map((value) => ({ [value]: null }))
    )
  );
  const [calendar] = useState({ default: weekInitState });

  const [meal_data] = useApi(
    {
      method: 'GET',
      url: `/store/${id}`,
    },
    [triggerRefetch]
  );

  const onClickBuy = () => {
    modalDispatch({
      type: 'showStorePlanPaypal',
      payload: {
        id: meal_data.id,
        title: meal_data.title,
        total_recipes: meal_data.recipe_store_plans.length,
        price: meal_data.price,
        total_days: meal_data.days,
        onSuccess: () => {
          setTriggerRefetch(!triggerRefetch);
          showNotification({
            color: 'green',
            message: 'Purchased Successfully.',
          });
        },
        onClick: () => {
          API.post(`/plan-purchase/`, {
            id: meal_data.id,
          })
            .then(() => {
              setTriggerRefetch(!triggerRefetch);
              modalDispatch({ type: 'hideStorePlanPaypal' });
              showNotification({
                color: 'green',
                message: 'Purchased Successfully.',
              });
            })
            .catch(() => {
              showNotification({
                color: 'red',
                message: 'Something went wrong.',
              });
            });
        },
      },
    });
  };

  const renderDaysRow = () => {
    return (
      <Group
        spacing={0}
        sx={{ flexWrap: 'nowrap', position: 'relative', width: '307vw' }}
      >
        {datesInAWeek()}
      </Group>
    );
  };

  const datesInAWeek = () => {
    const days = [...Array(30)].map((day, i) => (
      <Grid.Col
        span={5}
        key={i}
        sx={{
          borderLeft: '1px solid #E1E7F1',
          borderRight: i === 29 && '1px solid #E1E7F1',
        }}
      >
        <Box sx={{ position: 'relative', height: '20vh' }}>
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
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
              {i + 1}
            </Text>
          </Box>
        </Box>
      </Grid.Col>
    ));

    return days;
  };

  const renderLabelsColumn = () => {
    let labels = Object.keys(meal_value);

    return [...Array(1)].map((row, i) => {
      return (
        <Stack
          key={i}
          spacing={0}
          sx={{ flexWrap: 'nowrap', position: 'relative' }}
          ml={-137}
          mt='10.2vh'
        >
          <Box
            sx={{
              background: '#fff',
              width: 136,
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

  const renderMeals = () => {
    return (
      calendar.default &&
      [...Array(calendar.default?.length)].map((row, i) => {
        return (
          <Grid.Col span={5} key={i}>
            {[...Array(5)].map((col, j) => (
              <Box key={j} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    height: '20vh',
                    borderLeft: '1px solid #E1E7F1',
                    borderRight: i === 29 && '1px solid #E1E7F1',
                    borderBottom: '1px solid #E1E7F1',
                    borderTop: j === 0 && '1px solid #E1E7F1',
                  }}
                >
                  {meal_data?.byDays[i + 1]?.map((meal) => {
                    if (meal.meal_type === j + 1) {
                      const type = {
                        'App\\Models\\Recipe': 'recipe',
                        'App\\Models\\Ingredient': 'ingredient',
                      };
                      const content =
                        type[meal.planable_type] === 'ingredient'
                          ? JSON.parse(meal.planable.content)
                          : '';
                      return (
                        <Box
                          onClick={() =>
                            type[meal.planable_type] === 'recipe' &&
                            router.push(`/recipes/${meal.planable.id}`)
                          }
                          sx={{
                            cursor:
                              type[meal.planable_type] === 'recipe' &&
                              'pointer',
                          }}
                          p={10}
                        >
                          <Preview
                            item={{
                              meal_type: meal.meal_type,
                              type:
                                type[meal.planable_type] === 'ingredient'
                                  ? 'ingredient'
                                  : meal.planable.is_ninety_ten
                                  ? 'database'
                                  : 'custom',
                              food: {
                                ...meal.planable,
                                serving:
                                  type[meal.planable_type] === 'recipe'
                                    ? meal.planable.serving
                                    : `
                                      ${content.quantity} 
                                      ${content.serving?.split(' ')[1]}`,
                              },
                            }}
                            fullWidth
                          />
                        </Box>
                      );
                    }
                  })}
                </Box>
              </Box>
            ))}
          </Grid.Col>
        );
      })
    );
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='My Plan'>
        <Breadcrumb
          items={[
            {
              title: 'Meal Plan Store',
              href: '/meal-plan-store',
              color: '#006C52',
            },
            {
              title: 'Diet Plan',
              href: '#',
              color: '#7E8CA0',
            },
          ]}
        />
        <Divider mt='md' mb={32} />
        <Group position='apart' align='start'>
          <Box>
            <Stack spacing={10}>
              <Title order={5}>{meal_data?.title}</Title>
              <Text color='#9D9FA6'>
                {meal_data?.recipe_store_plans.length} Recipes -{' '}
                {meal_data?.days ?? '-'} Days
              </Text>
            </Stack>
          </Box>
          <Group mt={6}>
            <Button
              size='md'
              sx={{ width: 200, fontSize: 14 }}
              variant='outline'
              onClick={onClickBuy}
              disabled={meal_data?.purchased_completed.length}
            >
              {meal_data?.purchased_completed_count ? 'Purchased' : 'Buy'}
            </Button>
          </Group>
        </Group>
        <Group position='apart' mt={16}>
          <Text weight='bold' size='xl'>
            $0
          </Text>
          <Group spacing='xs'>
            <Text color='#757575'>Tags:</Text>
            {meal_data?.tags?.map((tag) => (
              <Badge
                key={tag.id}
                sx={{
                  background: '#F3F6F9',
                  color: '#006C52',
                  textTransform: 'capitalize',
                  height: 34,
                  borderRadius: 6,
                }}
                size='xl'
              >
                {tag.label}
              </Badge>
            ))}
            {!meal_data?.tags.length && <Text color='#757575'>--</Text>}
          </Group>
        </Group>
        <Divider mt={32} mb='md' />
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              background: '#fff',
              width: '100%',
              height: '12vh',
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          />
          <DndProvider backend={HTML5Backend}>
            <Stack
              mt={-16}
              spacing={0}
              sx={{
                position: 'relative',
                height: '121.5vh',
                overflowY: 'hidden',
                overflowX: 'auto',
              }}
            >
              <Grid
                ml={138}
                columns={150}
                gutter={0}
                sx={{
                  width: '307vw',
                }}
              >
                {renderDaysRow()}
              </Grid>
              <Grid
                ml={138}
                columns={150}
                gutter={0}
                sx={{
                  width: '307vw',
                }}
              >
                {renderMeals()}
              </Grid>
              <Box ml={139} sx={{ position: 'absolute' }}>
                {renderLabelsColumn()}
              </Box>
            </Stack>
          </DndProvider>
        </Box>
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
