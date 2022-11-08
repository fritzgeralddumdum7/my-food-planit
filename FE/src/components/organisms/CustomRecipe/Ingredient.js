import PropTypes from 'prop-types';
import CircleWithNumber from '@/icons/CircleWithNumber';
import TrashCan from '@/icons/TrashCan';
import { Group, Text, Box, Space } from '@mantine/core';

const Ingredient = ({ ingredient, idx, isLast, deleteIngr }) => {
  const nutritions = {
    calories: ingredient.calories,
    carbs: ingredient.carbs,
    fat: ingredient.fat,
    protein: ingredient.protein,
    sodium: ingredient.sodium,
    sugar: ingredient.sugar,
  };

  return (
    <Group
      py={11}
      sx={{
        borderBottom: !isLast && '1px solid #E6E6E6',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: 142 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => deleteIngr(idx)}>
            <TrashCan width={24} height={24} />
          </Box>
          <Space w={16} />
          <Text
            color='#1C212D'
            size='sm'
            sx={{ maxWidth: 142, fontWeight: 'bold' }}
          >
            {`${ingredient.itemized.ingredient}, ${ingredient.itemized.quantity} ${ingredient.itemized.symbol}`}
          </Text>
        </Box>
      </Box>
      <Group spacing={45}>
        <Group spacing={27} sx={{ paddingLeft: 10, paddingRight: 8 }}>
          {Object.entries(nutritions).map(([key, value]) => (
            <CircleWithNumber
              key={key}
              color='#B2DD91'
              width={42}
              height={42}
              text={parseInt(value)}
              c={21}
              r={19.5}
              fontSize={12}
            />
          ))}
        </Group>
      </Group>
    </Group>
  );
};

Ingredient.propTypes = {
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ingredient: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default Ingredient;
