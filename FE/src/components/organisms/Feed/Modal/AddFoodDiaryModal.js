import { Box, Space, Text, Divider, Button } from '@mantine/core';
import { useFeedCTX } from '@/contexts/FeedContext';
import FoodDiary from '@/components/organisms/Feed/FoodDiary';
import moment from 'moment';

const AddFoodDiaryModal = () => {
  const {
    setOpened,
    setHasFoodDiarySelected,
    foodDiaryCheckList,
    setFoodDiaryCheckList,
    foodDiary,
    mealsConfig,
  } = useFeedCTX();

  const availableMeals = mealsConfig.filter((meal) =>
    foodDiary.some(({ meal_type }) => meal.types.includes(meal_type))
  );
  return (
    <>
      <Divider />
      <Box sx={{ padding: '32px', height: '100%' }}>
        {availableMeals.length ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
              }}
            >
              <Text sx={{ fontSize: 20, fontWeight: 500 }}>
                Select food diary to post
              </Text>
              <Text
                sx={{ color: '#006C52', cursor: 'pointer' }}
                onClick={() =>
                  setFoodDiaryCheckList({
                    Breakfast: true,
                    Lunch: true,
                    Dinner: true,
                    Snacks: true,
                  })
                }
              >
                Select All
              </Text>
            </Box>
            <Box>
              <FoodDiary
                foods={foodDiary}
                checkList={foodDiaryCheckList}
                setCheckList={setFoodDiaryCheckList}
                meals={availableMeals}
                isCheckList
              />
            </Box>
            <Space h={16} />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                onClick={() => {
                  setOpened(false);
                  setHasFoodDiarySelected(true);
                }}
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <Text size='xl' color='gray' align='center' py={20}>
            You have no recipes on {moment(moment()).format('MMMM DD, YYYY')}
          </Text>
        )}
      </Box>
    </>
  );
};

export default AddFoodDiaryModal;
