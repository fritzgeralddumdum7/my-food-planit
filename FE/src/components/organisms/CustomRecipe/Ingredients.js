import Ingredient from '@/components/organisms/CustomRecipe/Ingredient';
import { Box, Text, Group, Title, ScrollArea } from '@mantine/core';
const Ingredients = ({ data, deleteIngr }) => {
  // const ingredient_sample = {
  //   calories: 83,
  //   carbs: 11,
  //   cholesterol: 10,
  //   fat: 18,
  //   ingr: '1 package of sliced cheese',
  //   itemized: {
  //     article: null,
  //     ingredient: 'cheese slice',
  //     maxQty: '1',
  //     minQty: '1',
  //     quantity: '1',
  //     symbol: null,
  //     unit: 'package',
  //   },
  //   sodium: 35,
  // };

  return (
    <Box spacing={32} sx={{ height: 146 }}>
      <Group
        spacing={27}
        my={20}
        mt={14}
        mb={10}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Title order={3} sx={{ minWidth: 185 }}>
          Ingredients
        </Title>
        <Group spacing={0}>
          <Text align='center' size='xs' color='#757575' sx={{ width: 67 }}>
            Calories
          </Text>
          <Text align='center' size='xs' color='#757575' sx={{ width: 67 }}>
            Carbs
          </Text>
          <Text align='center' size='xs' color='#757575' sx={{ width: 67 }}>
            Fat
          </Text>
          <Text align='center' size='xs' color='#757575' sx={{ width: 67 }}>
            Protein
          </Text>
          <Text align='center' size='xs' color='#757575' sx={{ width: 67 }}>
            Sodium
          </Text>
          <Text align='center' size='xs' color='#757575' sx={{ width: 67 }}>
            Sugar
          </Text>
        </Group>
      </Group>
      <Box pb={150}>
        <ScrollArea sx={{ height: 140 }}>
          {data?.ingrWithNutr?.match.map((obj, i) => (
            <Ingredient
              key={i}
              idx={i}
              deleteIngr={deleteIngr}
              ingredient={obj}
              isLast={i === [...Array(3)].length - 1}
            />
          ))}
        </ScrollArea>
      </Box>
    </Box>
  );
};

export default Ingredients;
