import {
  Text,
  Stack,
  Anchor,
  Group,
  Title,
  Card,
  ScrollArea,
  Box,
} from '@mantine/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import FoodImage from '@/components/molecules/FoodImage';
import CloseCircle from '@/icons/CloseCircle';
import { useClickOutside } from '@mantine/hooks';
import {
  meal_value,
  meal_plan_options,
  timeline_options,
} from '@/consts/select_choices';
import { useHover } from '@mantine/hooks';

export const Date = ({ date, isToday, dayIndex }) => {
  const days = () => {
    if (dayIndex < 7) {
      return (
        <Stack spacing={4}>
          <Text>{moment(date).format('ddd')}</Text>
          <Text sx={{ whiteSpace: 'pre' }}>
            {moment(date).date() === 1
              ? `${moment(date).format('MMM')} ${moment(date).date()}`
              : moment(date).date()}
          </Text>
        </Stack>
      );
    } else {
      if (moment(date).date() === 1) {
        return `${moment(date).format('MMM')} ${moment(date).date()}`;
      }
      return moment(date).date();
    }
  };

  return (
    <Text
      mx='auto'
      align='center'
      sx={{
        width: 40,
        height: 50,
        background: isToday ? '#B2DD91' : 'transparent',
        color: isToday ? '#fff' : '#101E51',
        borderRadius: isToday && 9999,
        paddingTop: isToday && 7,
      }}
    >
      {days()}
    </Text>
  );
};

Date.propTypes = {
  date: PropTypes.string.isRequired,
  isToday: PropTypes.bool,
  dayIndex: PropTypes.number.isRequired,
};

Date.defaultProps = {
  isToday: false,
};

export const Preview = ({ recipe, mealType, view, removeRecipeToBoard, target, }) => {
  const { hovered, ref } = useHover();
  
  const renderView = () => {
    if (view === 'default') {
      const keys = Object.keys(meal_value);
      return keys[mealType - 1];
    } else if (view === 'meal') {
      return meal_plan_options[mealType - 1];
    } else {
      return timeline_options[mealType - 1];
    }
  };

  return (
    recipe && (
      <Group ref={ref} sx={{ position: 'relative' }}>
        {
          (removeRecipeToBoard && hovered) && (
            <Box
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                right: 5,
              }}
              onClick={(e) => {
                e.preventDefault();
                removeRecipeToBoard(target)
              }}
            >
              <CloseCircle />
            </Box>
          )
        }
        <Anchor
          href={
            recipe.is_ninety_ten !== undefined ? `/recipes/${recipe?.id}` : '#'
          }
          p={5}
          underline={false}
          sx={() => ({
            '&:hover': {
              backgroundColor: '#F8F9FA',
              borderRadius: 5,
              width: '100%',
            },
          })}
        >
          <Group spacing={10}>
            <FoodImage
              title={recipe?.title}
              src={recipe?.image ?? null}
              width={25}
              height={25}
              radius='sm'
            />
            {mealType && <Text size='sm'>{renderView()}</Text>}
            <Text size='sm' lineClamp={1} sx={{ flex: 1, fontWeight: 600 }}>
              {recipe?.title}
            </Text>
          </Group>
        </Anchor>
      </Group>
    )
  );
};

Preview.propTypes = {
  recipe: PropTypes.object.isRequired,
  mealType: PropTypes.string,
  view: PropTypes.string,
};

Preview.defaultProps = {
  mealType: null,
  view: 'default',
};

export const ShowMoreRecipes = ({
  recipes,
  date,
  selectedDay,
  showMoreRecipeHandler,
  view,
  removeRecipeToBoard,
  i,
  targetDate,
}) => {
  const onClickOutsideHandler = () => showMoreRecipeHandler(selectedDay);
  const ref = useClickOutside(onClickOutsideHandler);

  return (
    <Card
      ref={ref}
      shadow='md'
      p='lg'
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: [6, 13, 20, 27, 34].includes(selectedDay) ? '12vw' : '-12vw',
        width: 300,
      }}
    >
      {
        recipes.length > 0 && (
          <Stack>
            <Stack spacing={8} sx={{ position: 'relative' }}>
              <Text align='center'>
                {moment(targetDate).format('ddd')}
              </Text>
              <Title align='center' order={2}>
                {moment(targetDate).date()}
              </Title>
              <Box
                sx={{ position: 'absolute', right: 0, cursor: 'pointer' }}
                onClick={() => showMoreRecipeHandler(selectedDay)}
              >
                <CloseCircle withCircle={false} width={25} height={25} />
              </Box>
            </Stack>
            <ScrollArea sx={{ height: recipes.length > 5 ? 180 : 'auto' }}>
              {recipes?.map((recipe, j) => (
                <Preview
                  recipe={recipe.food}
                  mealType={recipe.meal_type}
                  key={j}
                  view={view}
                  removeRecipeToBoard={removeRecipeToBoard}
                  target={{ index: i, mealType: recipe.meal_type, targetDate, id: recipe?.id }}
                />
              ))}
            </ScrollArea>
          </Stack>
        )
      }
    </Card>
  );
};

ShowMoreRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  date: PropTypes.object.isRequired,
  selectedDay: PropTypes.number.isRequired,
  showMoreRecipeHandler: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};
