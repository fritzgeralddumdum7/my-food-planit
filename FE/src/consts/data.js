export const data = [
  {
    id: 1,
    question:
      ' Do you want to use MyFoodPlanIt to help you reach a health and fitness goal?',
    description:
      'Just few quick questions so we can customize My Food Plan It for you!',
    type: 'choices',
    key: 'mfpHelp',
    choices: [
      {
        id: 1,
        item: 'Yes',
        name: 'mfpHelp',
        value: true,
      },
      {
        id: 2,
        item: 'No',
        name: 'mfpHelp',
        value: false,
      },
    ],
  },
  {
    id: 2,
    question: 'What is your weight goal?',
    description:
      'Just few quick questions so we can customize My Food Plan It for you!',
    type: 'choices',
    key: 'weightGoalLevel',
    choices: [
      {
        id: 3,
        item: 'Lose Weight',
        name: 'weightGoalLevel',
        value: 'lose',
      },
      {
        id: 4,
        item: 'Maintenance Weight',
        name: 'weightGoalLevel',
        value: 'maintain',
      },
      {
        id: 5,
        item: 'Gain Weight',
        name: 'weightGoalLevel',
        value: 'gain',
      },
    ],
  },
  {
    id: 3,
    question: 'What is your baseline activity level?',
    description: 'Not including workouts–we count that separately',
    type: 'choices',
    key: 'activityLevel',
    longChoicesText: true,
    choices: [
      {
        id: 6,
        item: 'Not Very Active',
        longChoicesText: true,
        description:
          'Spend most of the day sitting (i.e., bankteller, desk job)',
        name: 'activityLevel',
        value: '1',
      },
      {
        id: 7,
        item: 'Lightly Active',
        longChoicesText: true,
        description:
          'Spend a good part of the day on your feet (i.e., teacher, salesperson)',
        name: 'activityLevel',
        value: '1.2',
      },
      {
        id: 8,
        item: 'Active',
        longChoicesText: true,
        description:
          'Spend a good part of the day doing some physical activity (i.e., food server, postal carrier)',
        name: 'activityLevel',
        value: '1.5',
      },
      {
        id: 9,
        item: 'Very Active',
        longChoicesText: true,
        description:
          'Spend a good part of the day doing heavy physical activity (i.e., bike messenger, carpenter)',
        name: 'activityLevel',
        value: '1.7',
      },
    ],
  },
  {
    id: 4,
    question: 'Please fill out the information needed below',
    description: '',
    type: 'input',
    additionalInfo:
      'We use this information to calculate an accurate calorie goal for you.',
    fields: [
      {
        id: 1,
        placeholder: 'Age',
        name: 'age',
        type: 'number',
      },
      {
        id: 2,
        placeholder: 'Gender',
        name: 'gender',
        type: 'select',
        options: [
          {
            value: '1',
            label: 'Male',
          },
          {
            value: '2',
            label: 'Female',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    question:
      'Please fill out these information to calculate your calories needs',
    type: 'select',
    additionalInfo:
      'We use this information to calculate an accurate calorie goal for you ',
    fields: [
      {
        id: 1,
        placeholder: 'Height',
        label: 'How tall are you?',
        selectPlaceholder: 'cm',
        name: 'height',
        optionName: 'heightUnit',
        options: [
          {
            value: 'cm',
            label: 'cm',
          },
          {
            value: 'inch',
            label: 'in',
          },
        ],
      },
      {
        id: 2,
        placeholder: 'Current weight',
        label: 'How much do you weigh?',
        name: 'currentWeight',
        selectPlaceholder: 'kg',
        subLabel: `It's ok to estimate. You can update this later`,
        optionName: 'currentWeightUnit',
        options: [
          {
            value: 'kg',
            label: 'kg',
          },
          {
            value: 'lbs',
            label: 'lbs',
          },
        ],
      },
      {
        id: 2,
        placeholder: 'Goal weight',
        label: `What’s your weight goal?`,
        name: 'goalWeight',
        subLabel:
          'Don’t worry. This doesn’t affect your daily calorie goal and you can always change it later.',
        selectPlaceholder: 'kg',
        optionName: 'goalWeightUnit',
        options: [
          {
            value: 'kg',
            label: 'kg',
          },
          {
            value: 'lbs',
            label: 'lbs',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    question: 'Do you want to use 90/10 mode?',
    description: 'What is 90/10 mode? Click on ',
    type: 'choices',
    key: 'nineToTenMode',
    tier: true,
    choices: [
      {
        id: 10,
        item: 'Yes',
        name: 'nineToTenMode',
        value: true,
      },
      {
        id: 11,
        item: 'No',
        name: 'nineToTenMode',
        value: false,
      },
    ],
  },
];
