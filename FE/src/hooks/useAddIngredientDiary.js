import { useEffect, useState } from 'react';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import { useForm } from '@mantine/form';
import API from '@/api/BaseApi';
import useRecipe from './useRecipe';
import { showNotification } from '@mantine/notifications';
import {
  calculateNutritionPerServing,
} from '@/helpers/ingredientsHelper';

const useAddIngredientDiary = () => {
  const modalDispatch = useModalDispatch();
  const [openAddRecipe, setOpenAddRecipe] = useState(false);
  const [showMain, setShowMain] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [ingrKeyword, setIngrKeyword] = useState(null);
  const [selectedIngrs, setSelectedIngrs] = useState([]);
  const { matchIngredient, searchIngredent } = useRecipe();

  const setDefault = () => {
    setShowMain(true);
    setIngrKeyword(null);
  };

  const form = useForm({
    initialValues: {
      title: '',
      serving: '',
    },

    validate: {
      title: (value) => {
        if (!value) {
          return 'Recipe name is required';
        } else if (value.length < 10) {
          return 'Recipe name must be atleast 10 characters';
        } else {
          return null;
        }
      },
      serving: (value) => (!value ? 'Servings is required' : null),
    },
  });

  // const [searchedIngr, searchedIngrFetching, searchedIngrError] = useApi(
  //   {
  //     method: 'GET',
  //     url: `/analysis/ingredient-search`,
  //     params: { ingredient: ingrKeyword },
  //   },
  //   [ingrKeyword]
  // );

  const [searchedIngr, setSearchedIngr] = useState([]);
  const [searchedIngrFetching, setSearchedIngrFetching] = useState(false);

  useEffect(async () => {

    if (!ingrKeyword) return;

    setSearchedIngrFetching(true);
    const callback = (result) => {
      setSearchedIngr(JSON.parse(result.data.data));
      setSearchedIngrFetching(false);
    }

    await searchIngredent(ingrKeyword, callback);
  }, [ingrKeyword])

  const handleSave = (values) => {
    if (!recipe.ingrWithNutr?.match.length) {
      return showNotification({
        color: 'red',
        message: 'Please add ingredient',
      });
    }
    setIsSaving(true);

    API.post('/recipes', {
      ...recipe,
      nutritions: JSON.stringify(recipe.nutritions),
      ingredients: JSON.stringify(recipe.ingrWithNutr.match),
      directions: null,
      tags: [],
      isTracker: false,
      isMealPlan: false,
    })
      .then(({ data }) => {
        showNotification({
          color: 'green',
          message: data,
        });
        setOpenAddRecipe(false);
      })
      .catch(({ response }) => {
        showNotification({
          autoClose: 5000,
          color: 'red',
          message: response.data.message,
        });
      })
      .finally(() => setIsSaving(false));
  };

  const deleteIngredient = (idx) => {
    const filtered = recipe.ingrWithNutr.match.filter((ingr, i) => i !== idx);

    setRecipe({
      ...recipe,
      ingrWithNutr: {
        match: filtered,
      },
      nutritions: calculateNutritionPerServing(filtered, recipe.serving ?? 0),
    });
  };

  const handleAddIngrs = async (values, setter) => {
    // loader
    modalDispatch({
      type: 'showSpinner',
      payload: {
        label: 'Matching Ingredients...',
      },
    });

    // Constructing Ingredient
    const ingrs = [];
    for (let i = 0; i < 10; i++) {
      if (values[`checkbox${0}${i}`]) {
        ingrs.push(
          // eslint-disable-next-line prettier/prettier
          `${values[`amount${0}${i}`]} ${values[
            `measurement${0}${i}`
          ].substring(2)} ${searchedIngr[i]}`
        );
      }
    }


    const callback = (result) => {
      const ingrs = JSON.parse(result.data.nutritions).match;
      setter(ingrs);

      modalDispatch({ type: 'hideSpinner' });
      setShowMain(true);
    };

    await matchIngredient(ingrs, callback);
  };

  const updateSelectedIngrs = (ingr) => {
    if (ingr.value) {
      setSelectedIngrs([...selectedIngrs, ingr]);
    }
  };

  useEffect(() => {
    setRecipe({
      ...recipe,
      ...form.values,
      nutritions: recipe.ingrWithNutr?.match
        ? calculateNutritionPerServing(
            recipe.ingrWithNutr.match,
            recipe.serving ?? 0
          )
        : {},
    });
  }, [form.values]);

  useEffect(() => {
    if (!openAddRecipe) {
      setDefault();
    }
  }, [openAddRecipe]);

  return {
    openAddRecipe,
    setOpenAddRecipe,
    addCustomRecipeIsSaving: isSaving,
    showMain,
    setShowMain,
    customRecipe: recipe,
    addCustomRecipeForm: form,
    addCustomRecipeHandleSave: handleSave,
    setIngrKeyword,
    ingrKeyword,
    searchedIngr: searchedIngr,
    searchedIngrFetching,
    updateSelectedIngrs,
    addCustomRecipeSetDefault: setDefault,
    handleAddIngrs: handleAddIngrs,
    addCustomRecipeDeleteIngr: deleteIngredient,
  };
};

export default useAddIngredientDiary;
