import { memo } from 'react';
import PropTypes from 'prop-types';
import FoodImage from '@/components/molecules/FoodImage';
import CloseCircle from '@/icons/CloseCircle';
import { useHover } from '@mantine/hooks';
import { Group, Card, Text, Stack, Badge, Box } from '@mantine/core';
import isEmpty from 'lodash/isEmpty';

export const Preview = memo(
  ({ item, fullWidth, target, removeRecipeToBoard, customHeight }) => {
    const { hovered, ref } = useHover();
    const { food, type } = item;
    const nutritions =
      food?.nutritions && type !== 'ingredient'
        ? JSON.parse(food?.nutritions)
        : null;
    const data = {
      badge: {
        ingredient: 'Ingredient',
        custom: 'Custom Recipe',
        database: 'Recipe',
      },
      badgeBg: {
        ingredient: '#E6FFF9',
        custom: '#F5FFEE',
        database: '#EFF2F4',
      },
      badgeColor: {
        ingredient: '#087D61',
        custom: '#B2DD91',
        database: '#65768E',
      },
      sub: {
        ingredient: 'Serving',
        custom: 'Calories per serving',
        database: 'Calories per serving',
      },
      subValue: {
        ingredient: food?.content ? `${parseInt(food.content.quantity)} ${food.content?.serving?.split(' ')[1]}` || JSON.parse(food.content)?.serving : food?.serving ?? '-',
        custom: `${
          nutritions?.calories ? parseInt(nutritions?.calories) : '- '
        }cal`,
        database: `${
          nutritions?.calories ? parseInt(nutritions?.calories) : '- '
        }cal`,
      },
    };

    return (
      <Card
        ref={ref}
        shadow='lg'
        p='xs'
        radius={0}
        styles={() => ({
          root: {
            width: fullWidth ? '100%' : '10vw',
            height: customHeight,
            borderTop: '3px solid #006C52',
            position: 'relative',
          },
        })}
      >
        {hovered && !isEmpty(target) && (
          <Box
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              zIndex: 100,
              right: 10,
            }}
            onClick={(e) => {
              e.preventDefault();
              removeRecipeToBoard(target)
            }}
          >
            <CloseCircle />
          </Box>
        )}
        <Stack sx={{ height: '100%' }} justify='space-between'>
          <Box sx={{ display: 'flex' }}>
            <FoodImage
              title={food?.title ?? food}
              src={food?.image ?? null}
              width={36}
              height={36}
              radius='sm'
            />

            <Box pl={8} justify='flex-start' sx={{ flex: 1 }}>
              <Text
                lineClamp={2}
                sx={{ flex: 1 }}
                color='#101E51'
                size='xs'
                weight='bold'
              >
                {food?.title ?? food}
              </Text>
              <Badge
                styles={() => ({
                  root: {
                    backgroundColor: data.badgeBg[type],
                    color: data.badgeColor[type],
                    width: 'max-content',
                    height: 20,
                    textTransform: 'capitalize',
                  },
                })}
                radius='xs'
              >
                {data.badge[type]}
              </Badge>
            </Box>
          </Box>
          <Box>
            <Text color='#828282' sx={{ fontSize: 10 }}>
              {data.sub[type]}
            </Text>
            <Group position='apart'>
              <Text color='#101E51' size='xs' weight='bold'>
                {data.subValue[type]}
              </Text>
            </Group>
          </Box>
        </Stack>
      </Card>
    );
  }
);

Preview.propTypes = {
  item: PropTypes.objectOf({
    food: PropTypes.object,
    type: PropTypes.string,
  }).isRequired,
  fullWidth: PropTypes.bool,
  customHeight: PropTypes.string,
  target: PropTypes.object,
  removeRecipeToBoard: PropTypes.func,
};

Preview.defaultProps = {
  fullWidth: false,
  target: {},
  removeRecipeToBoard: () => null,
  customHeight: '17vh',
};
