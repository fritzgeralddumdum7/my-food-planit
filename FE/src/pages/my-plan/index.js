import MyPlanPage from '@/components/organisms/MyPlan/Page';
import { AddPreMadeMealPlanCTX } from '@/contexts/AddPreMadeMealPlanContext';

const Index = () => {
  return (
    <AddPreMadeMealPlanCTX>
      <MyPlanPage />
    </AddPreMadeMealPlanCTX>
  )
}

export default Index;