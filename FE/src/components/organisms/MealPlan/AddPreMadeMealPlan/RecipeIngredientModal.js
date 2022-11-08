import { useEffect } from 'react';
import { Box, Modal, Divider } from "@mantine/core";
import useAddCustomRecipe from '@/hooks/useAddCustomRecipe';
import { useAddPreMadeMealPlanCTX } from '@/contexts/AddPreMadeMealPlanContext';
import AddCustomRecipe from '@/components/organisms/CustomRecipe/AddCustomRecipe';
import AddIngredients from '@/components/organisms/CustomRecipe/AddIngredients';
import ChevronLeft from '@/icons/ChevronLeft';

const RecipeIngredientModal = ({ openAddRecipe, setOpenAddRecipe }) => {
  const {
    triggerRefetch,
    setTriggerRefetch,
  } = useAddPreMadeMealPlanCTX();

  const {
    // openAddRecipe,
    // setOpenAddRecipe,
    addCustomRecipeIsSaving,
    showMain,
    setShowMain,
    customRecipe,
    addCustomRecipeHandleAddIngrs,
    searchedIngr,
    setIngrKeyword,
    searchedIngrFetching,
    addCustomRecipeHandleSave,
    addCustomRecipeForm,
    addCustomRecipeDeleteIngr,
  } = useAddCustomRecipe();

  useEffect(() => {
    if (!openAddRecipe) {
      //refetch custom recipe
      setTriggerRefetch({
        ...triggerRefetch,
        custom: !triggerRefetch.custom,
      });
    }
  }, [openAddRecipe]);

  return (
    <Modal
      size='xl'
      opened={openAddRecipe}
      setOpened={setOpenAddRecipe}
      header={
        showMain ? (
          'Add Custom Recipe'
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: '24px',
                marginRight: '16px',
                cursor: 'pointer',
              }}
              onClick={() => setShowMain(true)}
            >
              <ChevronLeft />
            </Box>
            Add Ingredients
          </Box>
        )
      }
      padding={0}
    >
      <Divider my='sm' />
      {showMain ? (
        <AddCustomRecipe
          data={customRecipe}
          setShowMain={setShowMain}
          form={addCustomRecipeForm}
          handleSave={addCustomRecipeHandleSave}
          deleteIngr={addCustomRecipeDeleteIngr}
          isSaving={addCustomRecipeIsSaving}
        />
      ) : (
        <Box p={32}>
          <AddIngredients
            onHandleSave={(values) => addCustomRecipeHandleAddIngrs(values)}
            list={searchedIngr}
            setKeyword={setIngrKeyword}
            fetching={searchedIngrFetching}
          />
        </Box>
      )}
    </Modal>
  )
}

export default RecipeIngredientModal;