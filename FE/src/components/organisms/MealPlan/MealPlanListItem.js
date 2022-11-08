import PropTypes from 'prop-types';
import { useContext } from 'react';
import EllipsisVertical from '@/icons/EllipsisVertical';
import { AuthContext } from '@/contexts/AuthProvider';
import {
  Box,
  Text,
  Menu,
  Divider,
  Button,
  Center,
  Anchor,
} from '@mantine/core';

const Index = ({
  id,
  plan,
  title,
  total_recipes,
  total_days,
  price,
  isStore,
  onClickBtn,
  onDelete,
  setMyMealPlan,
  setPlanDayView,
  purchased,
  setMyPlanStore,
  myMealPlan,
  type
}) => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <Box sx={{ borderRadius: 8, border: '2px solid #E7E7E9' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px 26px 17px 14px',
        }}
      >
        {plan === 'Free' ? (
          <Box
            px={32}
            sx={{
              background: '#D8F9F1',
              borderRadius: 4,
            }}
          >
            <Text color='green-theme' weight='bold' size='xs' p={8}>
              Free
            </Text>
          </Box>
        ) : (
          <Box
            px={32}
            sx={{
              background: '#F9EBD8',
              color: '#D48C29',
              borderRadius: 4,
            }}
          >
            <Text weight='bold' size='xs' p={8}>
              Premium
            </Text>
          </Box>
        )}

        {((!isStore && type === 'personal' ) || isAdmin ) && (
          <Menu
            placement='center'
            control={
              <Box p={5} sx={{ cursor: 'pointer' }}>
                <EllipsisVertical />
              </Box>
            }
          >
            <Menu.Item
              onClick={() => {
                if (isStore) {
                  setMyPlanStore(id);
                } else {
                  setMyMealPlan(id);
                }
                setPlanDayView(total_days);
              }}
            >
              <Text weight={600}>Edit</Text>
            </Menu.Item>
            <Menu.Item onClick={() => onDelete(id)}>
              <Text weight={600} color='#C8362E'>
                Delete
              </Text>
            </Menu.Item>
          </Menu>
        )}
      </Box>

      <Box
        sx={{
          height: 116,
          padding: 18,
          background: '#006C52',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
        }}
      >
        <Text color='white' weight='bold'>
          Pre-made Plan
        </Text>
      </Box>

      <Box
        px={14}
        py={16}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Anchor
            href={isStore ? `/meal-plan-store/${id}` : `/meal-plans/${id}`}
            underline={false}
          >
            <Text weight='bold'>{title}</Text>
          </Anchor>
          <Text color='#9D9FA6'>
            {total_recipes} {total_recipes >= 2 ? 'Recipes' : 'Recipe'}
            <span
              style={{
                color: 'gray',
                fontSize: '20px',
                top: 10,
                marginTop: '5px',
              }}
            >
              &nbsp;&bull;&nbsp;
            </span>
            {total_days ?? '-'} days
          </Text>
        </Box>
        {isStore && (
          <Center>
            <Text weight='bold' sx={{ fontSize: 20 }}>
              ${price}
            </Text>
          </Center>
        )}
      </Box>

      <Divider />

      {!isAdmin && (
        <Box p={12}>
          <Button
            variant='outline'
            weight='bold'
            fullWidth
            onClick={() => onClickBtn(id, title, total_recipes, total_days)}
            disabled={purchased}
          >
            {isStore ? (
              <Text weight='bold'>{purchased ? 'Purchased' : 'Buy'}</Text>
            ) : (
              <Text weight='bold'>Apply to the meal plan</Text>
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;

Index.propTypes = {
  id: PropTypes.number.isRequired,
  plan: PropTypes.oneOf(['Free', 'Premium']),
  title: PropTypes.string.isRequired,
  total_recipes: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  total_days: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isStore: PropTypes.bool,
  setModalOpen: PropTypes.func.isRequired,
  onClickBtn: PropTypes.func,
  onDelete: PropTypes.func,
  setMyMealPlan: PropTypes.func,
  setPlanDayView: PropTypes.func,
  purchased: PropTypes.bool,
  setMyPlanStore: PropTypes.func,
};

Index.defaultProps = {
  plan: 'Free',
  isStore: false,
  onClickBtn: () => null,
  onDelete: () => null,
  setMyMealPlan: () => null,
  setPlanDayView: () => null,
  purchased: false,
  setMyPlanStore: () => null,
};
