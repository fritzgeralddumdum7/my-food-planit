import { RecipeImportCTX } from '@/contexts/RecipeImportContext';
import Import from '@/components/organisms/Recipe/Import/';

const Index = () => {
  return (
    <RecipeImportCTX>
      <Import />
    </RecipeImportCTX>
  );
};

export default Index;
