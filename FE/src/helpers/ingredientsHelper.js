import parse from 'parse-ingredients';

export const parseIngredients = (data) => {
  const parsed = Object.entries(data).map(([key, value]) => {
    return {
      [key]: value.map((ingredient) => {
        let itemized = {};
        try {
          itemized = parse(ingredient.ingr);
        } catch (error) {
          itemized = {
            article: null,
            maxQty: 0,
            minQty: 0,
            quantity: 0,
            symbol: null,
            unit: null,
            ingredient: ingredient.ingr,
          };
        }
  
        return {
          ...ingredient,
          itemized,
        };
      }),
    };
  });

  const matchIngrs = parsed.filter((data) => Object.keys(data)[0] === 'match');
  const unMatchIngrs = parsed.filter(
    (data) => Object.keys(data)[0] === 'unmatch'
  );

  return {
    match: matchIngrs.length ? matchIngrs[0].match : null,
    unmatch: unMatchIngrs.length ? unMatchIngrs[0].unmatch : null,
  };
};

export const calculateNutritionPerServing = (ingredients, serving) => {
  let totalNutrition = {
    calories: 0,
    fat: 0,
    carbs: 0,
    cholesterol: 0,
    sodium: 0,
    protein: 0,
    sugar: 0,
  };

  ingredients.forEach((ingredient) => {
    totalNutrition = {
      calories: totalNutrition.calories + ingredient.calories,
      fat: totalNutrition.fat + ingredient.fat,
      carbs: totalNutrition.carbs + ingredient.carbs,
      cholesterol: totalNutrition.cholesterol + ingredient.cholesterol,
      sodium: totalNutrition.sodium + ingredient.sodium,
      protein: totalNutrition.protein + ingredient.protein,
      sugar: totalNutrition.sugar + ingredient.sugar,
    };
  });

  const nutritionsPerServing = {
    calories: !Number.isFinite(totalNutrition.calories / serving)
      ? 0
      : totalNutrition.calories / serving,
    fat: !Number.isFinite(totalNutrition.fat / serving)
      ? 0
      : totalNutrition.fat / serving,
    carbs: !Number.isFinite(totalNutrition.carbs / serving)
      ? 0
      : totalNutrition.carbs / serving,
    cholesterol: !Number.isFinite(totalNutrition.cholesterol / serving)
      ? 0
      : totalNutrition.cholesterol / serving,
    sodium: !Number.isFinite(totalNutrition.sodium / serving)
      ? 0
      : totalNutrition.sodium / serving,
    protein: !Number.isFinite(totalNutrition.protein / serving)
      ? 0
      : totalNutrition.protein / serving,
    sugar: !Number.isFinite(totalNutrition.sugar / serving)
      ? 0
      : totalNutrition.sugar / serving,
    totalNutrition,
  };
  return nutritionsPerServing;
};
