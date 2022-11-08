import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import RecipePage from '@/components/organisms/Recipe/RecipePage';

const Index = () => {
  const description = `Ingredients 1/2 kg chicken 1 cup buttermilk 3 tablespoons unsalted butter, melted 1 egg Â½ cup green onions, sliced (optional) 1 jalapeno, stems and seeds removed, chopped (optional) 1 cup yellow cornmeal Â½ cup all-purpose flour 1 teaspoon baking powder Â½ teaspoon baking soda Â½ teaspoon granulated garlic 1 teaspoon ground paprika 1 teaspoon salt`;
  return (
    <Main
      meta={
        <Meta
          title='My Food Plan It'
          description={description}
          canonical='https://myfp-stg.tech/recipes/1/'
        />
      }
    >
      <DashboardWrapper label='Recipes'>
        <RecipePage setTab={0} setRecipeType={1}/>
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
