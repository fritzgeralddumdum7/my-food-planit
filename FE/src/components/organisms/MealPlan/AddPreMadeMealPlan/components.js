import { forwardRef, memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import Folder from '@/icons/Folder';
import ChevronRight from '@/icons/ChevronRight';
import FoodImage from '@/components/molecules/FoodImage';
import { Group, Text, Grid, Stack, Divider } from '@mantine/core';

export const CustomSelectItem = forwardRef(
  ({ label, isNew, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group
          noWrap
          position='apart'
          sx={{
            borderBottom: !isNew && '1px solid #E7E7E9',
            height: 44,
            padding: 0,
          }}
          pr={20}
        >
          <Text size='sm'># {label}</Text>
          {isNew && (
            <Text size='xs' color='dimmed'>
              New tag
            </Text>
          )}
        </Group>
      </div>
    );
  }
);

export const FileTreeItem = ({ text, recipe, setSelectedItem }) => {
  return (
    <Grid.Col
      span={1}
      sx={{
        height: 56,
        border: '2px solid #EDF3FC',
        borderRadius: 4,
        display: 'flex',
        padding: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() =>
        setSelectedItem({ title: text, recipes: { list: recipe } })
      }
    >
      <Group>
        <Folder />
        <Text pt={4} color='#445670' weight='bold' size='sm'>
          {text}
        </Text>
        <Text pt={4} color='#445670' weight='bold' size='sm'>
          ({recipe.length})
        </Text>
      </Group>
      <ChevronRight color='#778CA3' strokeWidth={2} />
    </Grid.Col>
  );
};

CustomSelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
};

FileTreeItem.propTypes = {
  text: PropTypes.string.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export const Draggable = memo(({ food, type }) => {
  const isIngredient = !food.title;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'div',
      item: { food, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [food]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return isIngredient ? (
    <Stack ref={drag} spacing={16} role='DraggableRecipe'>
      <Text>{food}</Text>
      <Divider />
    </Stack>
  ) : (
    <Stack ref={drag} spacing={16} role='DraggableRecipe'>
      <Group>
        <FoodImage
          src={food.image}
          title={food.title}
          width={36}
          height={36}
          radius='sm'
        />
        <Stack align='start' spacing={0} mt={6} sx={{ flex: 1 }}>
          <Text lineClamp={1} color='#101E51' size='sm' weight='bold'>
            {food.title}
          </Text>
          <Group spacing={10}>
            <Group spacing={6}>
              <Text weight='bold' color='#000000' size='xs'>
                {JSON.parse(food.nutritions).calories
                  ? parseInt(JSON.parse(food.nutritions).calories)
                  : '-'}
              </Text>
              <Text color='#000000' size='xs'>
                calories per serving
              </Text>
            </Group>
            <Group spacing={6}>
              <Text weight='bold' color='#000000' size='xs'>
                {food.serving}
              </Text>
              <Text color='#000000' size='xs'>
                serving
              </Text>
            </Group>
          </Group>
        </Stack>
      </Group>
      <Divider />
    </Stack>
  );
});

Draggable.propTypes = {
  food: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
