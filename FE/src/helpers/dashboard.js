const extractNutritionValues = (trackerData) => {
  return JSON.parse(trackerData?.planable?.nutritions ?? '{}');
}

const getProteinCount = (trackers) => {
  return trackers.reduce((prev, tracker) => {
    return prev + Math.round(extractNutritionValues(tracker).protein) ?? 0;
  }, 0);
}

const getCaloriesTracker = (trackers) => {
  return trackers.reduce((prev, tracker) => {
    return prev + Math.round(extractNutritionValues(tracker).calories) ?? 0;
  }, 0);
}

const getFatCount = (trackers) => {
  return trackers.reduce((prev, tracker) => {
    return prev + Math.round(extractNutritionValues(tracker).fat) ?? 0;
  }, 0);
}

export const summaryDataAdapter = ({
  protein_count,
  calories_tracker,
  fat_count,
  ...otherTypes
}) => {
  return {
    protein_count: {
      value: Math.round(getProteinCount(protein_count?.data ?? [])),
      goal: !!protein_count?.goal?.protein
        ? Math.round(protein_count?.goal?.protein)
        : 0,
    },
    calories_tracker: {
      value: Math.round(getCaloriesTracker(calories_tracker?.data ?? [])),
      goal: !!calories_tracker?.goal?.calories
        ? Math.round(calories_tracker?.goal?.calories)
        : 0,
    },
    fat_count: {
      value: Math.round(getFatCount(fat_count?.data ?? [])),
      goal: !!fat_count?.goal?.fat
        ? Math.round(fat_count?.goal?.fat)
        : 0,
    },
    ...otherTypes,
  };
};
