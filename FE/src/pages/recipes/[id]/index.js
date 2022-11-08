import { useState } from 'react';
import { RecipeDetailCTX } from '@/contexts/RecipeDetailContext';
import DashboardWrapper from '@/templates/DashboardWrapper';
import Main from '@/templates/Main';
import RecipeDetail from '@/components/organisms/Recipe/RecipeDetail';
import Ingredients from '@/components/organisms/Recipe/Ingredients';
import NutritionServingList from '@/components/organisms/Recipe/NutritionServingList';
import Directions from '@/components/organisms/Recipe/Directions';
import RelatedRecipes from '@/components/organisms/Recipe/RelatedRecipes';
import Breadcrumb from '@/components/organisms/Breadcrumb';
import { Divider } from '@mantine/core';
import { RecipeRelatedCTX } from '@/contexts/RecipeRelatedContext';

const Index = () => {
  const [title, setTitle] = useState(null);
  return (
    <Main>
      <DashboardWrapper label='Recipes'>
        <RecipeDetailCTX>
          <Breadcrumb
            items={[
              { title: 'My Recipes', href: '/recipes', color: '#006C52' },
              {
                title: title,
                href: '#',
                color: '#7E8CA0',
              },
            ]}
          />
          <Divider my='sm' />
          <RecipeDetail setTitle={setTitle} />
          <Ingredients />
          <NutritionServingList />
          <Directions />
          <RecipeRelatedCTX>
            <RelatedRecipes />
          </RecipeRelatedCTX>
        </RecipeDetailCTX>
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
