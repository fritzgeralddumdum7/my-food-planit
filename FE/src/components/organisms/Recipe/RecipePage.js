import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import PropTypes from 'prop-types';
import { Tabs } from '@mantine/core';
import RecipeList from '@/components/organisms/Recipe/RecipeList';
import MealPlansList from '@/components/organisms/MealPlan/MealPlansList';
import MealPlanStoreList from '@/components/organisms/MealPlan/MealPlanStoreList';
import { useRouter } from 'next/router';

const RecipePage = ({ setTab, setRecipeType }) => {
  const { isAdmin } = useContext(AuthContext);
  const router = useRouter();

  const onTabChange = (key) => {
    if (key === 0) {
      router.push('/recipes');
    } else if (key === 1) {
      router.push('/meal-plans');
    } else if (key === 2) {
      router.push('/meal-plan-store');
    }
  };

  const adminOnTabChange = (key) => {
    if (key === 0) {
      router.push('/recipes');
    } else if (key === 1) {
      router.push('/meal-plan-store');
    }
  };

  return (
    <Tabs
      active={setTab}
      onTabChange={isAdmin ? adminOnTabChange : onTabChange}
      variant='unstyled'
      tabPadding='lg'
      styles={{
        tabsList: {
          borderBottom: '2px solid #e9ecef',
        },
        tabControl: {
          color: '#9AA5B6',
          fontWeight: 'bold',
          marginBottom: '-2px',
        },
        tabActive: {
          borderBottom: '2px solid #B2DD91',
          color: '#006C52',
        },
      }}
    >
      <Tabs.Tab label='MY RECIPES'>
        <RecipeList recipeType={setRecipeType} />
      </Tabs.Tab>
      {!isAdmin && (
        <Tabs.Tab label='MY MEAL PLANS'>
          <MealPlansList />
        </Tabs.Tab>
      )}
      <Tabs.Tab label='MEAL PLAN STORE'>
        <MealPlanStoreList />
      </Tabs.Tab>
    </Tabs>
  );
};

export default RecipePage;

RecipePage.propTypes = {
  setTab: PropTypes.number,
  setRecipeType: PropTypes.number,
};

RecipePage.defaultProps = {
  setTab: 0,
  setRecipeType: 0,
};
