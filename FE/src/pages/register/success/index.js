import { Grid, Center } from '@mantine/core';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import WelcomeCard from '@/components/molecules/WelcomeCard';
import { useEffect, useState } from 'react';
import API from '@/api/BaseApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SuccessWithCalorie from '../../../components/Onboarding/components/SuccessWithCalorie';
import PlainSuccessMessage from '../../../components/Onboarding/components/PlainSuccessMessage';

const Index = () => {
  const router = useRouter();
  let { mfpHelp } = router.query;
  const [userDetails, setUserDetails] = useState({});
  const userId = Cookies.get('userId');
  const [loading, setLoading] = useState(false);
  const [goalWeightKg, setGoalWeightKg] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  useEffect(() => {
    getUserDetails();
  }, []);

  const goalWeightConvertion = (data) => {
    if (data.goal_weight_unit === 'lbs') {
      setGoalWeightKg(data.goal_weight * 0.45359237);
    } else {
      setGoalWeightKg(data.goal_weight);
    }
  };
  const heightCmConvertion = (data) => {
    if (data.height_unit === "2") {
      setHeightCm(data.height * 2.54);
    } else {
      setHeightCm(data.height);
    }
  };

  const caloriesGoal = (user) => {
    if (user.gender == 1) {
      let bmrMen =
        (10 * goalWeightKg + 6.25 * heightCm - 5 * user.age + 5) *
        user.activity_level;
      if (user.weight_goal_level == 'lose') {
        return user.nine_to_ten_mode ? (bmrMen - 350) * 0.1 : bmrMen - 350;
      } else if (user.weight_goal_level == 'maintain') {
        return user.nine_to_ten_mode ? bmrMen * 0.1 : bmrMen;
      } else if (user.weight_goal_level == 'gain') {
        return user.nine_to_ten_mode ? (bmrMen + 350) * 0.1 : bmrMen + 350;
      }
    } else {
      let bmrWomen =
        10 * goalWeightKg +
        6.25 * heightCm -
        5 * user.age -
        161 * user.activity_level;
      if (user.weight_goal_level == 'lose') {
        return user.nine_to_ten_mode ? (bmrWomen - 350) * 0.1 : bmrWomen - 350;
      } else if (user.weight_goal_level == 'maintain') {
        return user.nine_to_ten_mode ? bmrWomen * 0.1 : bmrWomen;
      } else if (user.weight_goal_level == 'gain') {
        return user.nine_to_ten_mode ? (bmrWomen + 350) * 0.1 : bmrWomen + 350;
      }
    }
  };

  const messageGoal = (user) => {
    if (user.weight_goal_level == 'lose') {
      return 'Lose from your current weight';
    } else if (user.weight_goal_level == 'maintain') {
      return 'Maintain your current weight';
    } else if (user.weight_goal_level == 'gain') {
      return 'Gain from your current weight';
    }
  };

  const saveCaloriesGoal = () => {
    const options = {
      method: 'POST',
      url: '/calorie-goal',
      data: {
        userId: userId,
        calorieGoal: Math.round(caloriesGoal(userDetails) * 100) / 100,
      },
    };
    API.request(options)
      .then(() => {
        const redirectRoute = mfpHelp === 'true' ? '/profile' : '/dashboard';
        router.push(redirectRoute);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const getUserDetails = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const options = {
      methods: 'GET',
      url: `/userdetail?userId=${userId}`,
    };
    API.request(options)
      .then(({ data }) => {
        setUserDetails(data);
        goalWeightConvertion(data);
        heightCmConvertion(data);
        setLoading(false);
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
      });
  };

  return (
    <Main
      meta={
        <Meta title='My Food Plan It' description='Register Success Page' />
      }
    >
      <Grid>
        <Grid.Col span={4} style={{ height: '100%', padding: 0 }}>
          <WelcomeCard />
        </Grid.Col>
        <Grid.Col span={8}>
          <Center style={{ height: '100vh' }}>
            {mfpHelp === 'true' ? (
              <SuccessWithCalorie
                loading={loading}
                caloriesGoal={caloriesGoal}
                userDetails={userDetails}
                messageGoal={messageGoal}
                saveCaloriesGoal={saveCaloriesGoal}
              />
            ) : (
              <PlainSuccessMessage saveCaloriesGoal={saveCaloriesGoal} />
            )}
          </Center>
        </Grid.Col>
      </Grid>
    </Main>
  );
};

export default Index;
