import { Stack, Title, Box, Badge, Group, Text, Button } from '@mantine/core';
import Clock from '@/icons/Clock';
import Cart from '@/icons/Cart';
import PropTypes from 'prop-types';
import FoodImage from '@/components/molecules/FoodImage';
import { useRouter } from 'next/router';

const Index = ({ food, addToCartHandler, target }) => {
  const router = useRouter();
  const type =
    food.planable_type === 'App\\Models\\Ingredient'
      ? 'ingredient'
      : food.planable.is_ninety_ten
        ? 'database'
        : 'custom';
  const ingredientContent =
    type === 'ingredient' ? JSON.parse(food.planable.content) : null;
  const nutritions = food.planable?.nutritions
    ? JSON.parse(food.planable?.nutritions)
    : null;
  const config = {
    calories: {
      ingredient: `${ingredientContent?.quantity ?? '-'} 
      ${ingredientContent?.serving.split(' ')[1] ?? '-'}`,
      custom: `${nutritions?.calories ? parseInt(nutritions?.calories) : '-'
        } cal`,
      database: `${nutritions?.calories ? parseInt(nutritions?.calories) : '-'
        } cal`,
    },
    sub: {
      ingredient: 'Serving',
      custom: 'Calories per serving',
      database: 'Calories per serving',
    },
  };
  const time = {
    1: '08:00',
    2: '11:00',
    3: '13:00',
    4: '17:00',
    5: '21:00',
  };

  return (
    <Stack spacing={12}>
      <Stack>
        <Box sx={{ position: 'relative' }}>
          <Badge
            sx={{
              position: 'absolute',
              zIndex: 1,
              top: 10,
              left: 10,
            }}
            size='lg'
            radius='xl'
            leftSection={
              <Box pt={4}>
                <Clock color='#fff' />
              </Box>
            }
            styles={() => ({
              root: {
                background: '#000',
                color: '#fff',
                height: 22,
                width: 'auto',
                fontWeight: 400,
              },
            })}
            px={4}
            pt={4}
          >
            {time[food.meal_type]}
          </Badge>
          <FoodImage
            title={food.planable.title}
            src={food.planable.image}
            height='22vh'
            textSize={70}
          />
        </Box>
      </Stack>
      <Title
        order={6}
        pr='lg'
        sx={{
          background: '#fff',
          color: '#000000',
          cursor: type !== 'ingredient' && 'pointer',
        }}
        onClick={() =>
          type !== 'ingredient' && router.push(`/recipes/${food.planable.id}`)
        }
      >
        {food.planable.title}
      </Title>
      <Group position='apart'>
        <Stack spacing={0}>
          <Text color='#828282' sx={{ fontSize: 10 }}>
            {config.sub[type]}
          </Text>
          <Title order={6} sx={{ color: '#101E51' }}>
            {config.calories[type]}
          </Title>
        </Stack>
        <Button
          disabled={food.inCart}
          px='sm'
          radius={6}
          onClick={() => addToCartHandler(target)}
          sx={{ backgroundColor: food.inCart && '#D0D5E0 !important' }}
        >
          <Cart width={16} height={16} color='#fff' />
        </Button>
      </Group>
    </Stack>
  );
};

Index.propTypes = {
  food: PropTypes.object.isRequired,
  addToCartHandler: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
};

export default Index;
