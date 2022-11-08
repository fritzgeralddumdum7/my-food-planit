export const serving_select_data = [...Array(50)].map((_, idx) =>
  (idx + 1).toString()
);

export const meal_select_data = [
  'Breakfast',
  'Snack AM',
  'Lunch',
  'Snack PM',
  'Dinner',
];

export const meal_value = {
  Breakfast: 1,
  'Snack AM': 2,
  Lunch: 3,
  'Snack PM': 4,
  Dinner: 5,
};

export const mealView = {
  'Meal 1': 1,
  'Meal 2': 2,
  'Meal 3': 3,
  'Meal 4': 4,
  'Meal 5': 5,
}

export const recipe_import_choices = [
  {
    value: 'tracker',
    text: 'Add to tracker',
  },
  {
    value: 'mealplan',
    text: 'Add to meal plan',
  },
  {
    value: 'tracker_mealplan',
    text: 'Add to tracker and meal plan',
  },
];

export const tracker_plan_value = [0, 2]; //radio value

export const meal_plan_value = [1, 2]; //radio value

export const ingredient_measurements = [
  'tbsp',
  'tsp',
  'Oz',
  'cup',
  'quart',
  'pint',
  'gal',
  'lb',
  'mL',
  'g',
  'kg',
  'ltr',
  'pcs',
];

export const ingredient_measurements_data = {
  tbsp: ['tbsp', 'tablespoon', 'tablespoons'],
  tsp: ['tsp', 'teaspoon', 'teaspoons'],
  Oz: ['oz', 'ounce'],
  cup: ['cup', 'cups'],
  quart: ['quart', 'quarts', 'qt'],
  pint: ['pint', 'pt'],
  gal: ['gal', 'galloon', 'galloons'],
  lb: ['lb', 'pound', 'pounds'],
  mL: ['ml', 'milliliter'],
  g: ['g', 'gram', 'grams'],
  kg: ['kg', 'kilogram', 'kilograms', 'kilo'],
  ltr: ['l', 'ltr', 'liter', 'liters'],
  pcs: ['pc', 'pcs', 'piece', 'pieces'],
};

export const view_options = [
  { value: 'default', label: 'Default' },
  { value: 'meal', label: 'Meal' },
];

export const meal_plan_options = [
  'Meal 1',
  'Meal 2',
  'Meal 3',
  'Meal 4',
  'Meal 5',
];

export const timeline_options = ['07:00', '09:00', '11:00', '15:00', '19:00'];

export const day_views = [
  {
    value: '1',
    label: '1 day',
  },
  {
    value: '3',
    label: '3 days',
  },
  {
    value: '7',
    label: '7 days',
  },
  {
    value: '14',
    label: '14 days',
  },
  {
    value: '30',
    label: '30 days',
  },
];
