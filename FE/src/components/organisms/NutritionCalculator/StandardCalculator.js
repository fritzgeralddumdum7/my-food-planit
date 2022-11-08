import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Grid,
  Text,
  Tabs,
  Group,
  Radio,
  Button,
  Select,
  Switch,
  NumberInput,
  RadioGroup,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import CounterInput from './CounterInput.js';
import Link from 'next/link.js';

const numberInputProps = {
  style: { width: '100%' },
  variant: 'filled',
  size: 'md',
  hideControls: true,
};
const fieldLabelProps = {
  style: {
    fontSize: '16px',
    fontWeight: '700',
  },
};
const fieldUnitLabelProps = {
  style: {
    fontSize: '16px',
    color: '#969BA0',
  },
};
const goalTabGroupContainerProps = {
  style: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
};
// const resultValueProps = {
//   style: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//   },
// };
const resultLabelProps = {
  style: {
    fontSize: '20px',
    color: '#FFFFFFB2',
  },
};
const resultContainerProps = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    height: '309px',
    borderRadius: '8px',
    backgroundColor: '#006C52',
    padding: '32px',
  },
};
const resultGroupContainerProps = {
  style: {
    flex: 1,
    height: '100%',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF33',
    padding: '32px',
    minHeight: '193px',
  },
  position: 'center',
  spacing: 'sm',
  grow: true,
};
const resultTitleWrapperProps = {
  style: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
};

const StandardCalculator = () => {
  // calorie goal
  const [calorieGoal, setCalorieGoal] = useState({
    standard: 0,
    ninetyTen: 0,
  });
  const [isNinetyTen, setIsNinetyTen] = useState(false);
  const form = useForm({
    initialValues: {
      weight: 0,
      height: 0,
      age: 0,
      gender: 'male',
      activityLevel: '1',
      goalType: 'lose_weight',
      goalWeight: 0,
    },
  });

  // events
  const calculateCalorieGoal = ({
    weight,
    height,
    age,
    gender,
    activityLevel,
    goalType,
    goalWeight,
  }) => {
    const ninetyTenFactor = 0.1;
    const genderFactor = { male: 5, female: -161 };
    const goalWeightInKG = goalWeight * 0.45359237 * 7700; // lbs -> kg -> cal
    const goalTypeFactor = {
      lose_weight: -goalWeightInKG,
      gain_weight: goalWeightInKG,
      maintain: 0,
    };
    const weightInKG = weight * 0.45359237; // lbs -> kg
    const standartResult =
      10 * weightInKG +
      6.25 * height -
      5 * age +
      genderFactor[gender] * activityLevel +
      goalTypeFactor[goalType];
    const ninetyTenResult = standartResult * ninetyTenFactor;
    return {
      standard: _.round(standartResult, 1),
      ninetyTen: _.round(ninetyTenResult, 1),
    };
  };

  const handleOnSubmit = (values) =>
    setCalorieGoal(calculateCalorieGoal(values));

  // renders
  const resultGroup = ({ label, value }) => {
    return (
      <Group direction='column' position='center'>
        <Text
          style={{
            color: isNinetyTen ? '#F7C925' : '#FFFFFF',
            fontSize: '32px',
            fontWeight: 'bold',
          }}
        >
          {value}
        </Text>
        <Text {...resultLabelProps}>{label}</Text>
      </Group>
    );
  };

  const goalTabGroup = () => {
    return (
      <Box {...goalTabGroupContainerProps}>
        <CounterInput
          {...form.getInputProps('goalWeight')}
          unitLabel='lbs'
          disabled={form.values.goalType === 'maintain'}
          required
        />
      </Box>
    );
  };

  return (
    <Grid gutter='xl'>
      <Grid.Col span={6}>
        <form onSubmit={form.onSubmit(handleOnSubmit)}>
          <Group direction='column'>
            <NumberInput
              {...numberInputProps}
              {...form.getInputProps('weight')}
              label={<span {...fieldLabelProps}>Weight</span>}
              rightSection={<Text {...fieldUnitLabelProps}>lbs</Text>}
              precision={2}
              required
            />
            <NumberInput
              {...numberInputProps}
              {...form.getInputProps('height')}
              label={<span {...fieldLabelProps}>Height</span>}
              rightSection={<Text {...fieldUnitLabelProps}>cm</Text>}
              precision={2}
              required
            />
            <NumberInput
              {...numberInputProps}
              {...form.getInputProps('age')}
              label={<span {...fieldLabelProps}>Age</span>}
              required
            />
            <RadioGroup
              {...form.getInputProps('gender')}
              label={<span {...fieldLabelProps}>Gender</span>}
              required
            >
              <Radio value='male' label='Male' />
              <Radio value='female' label='Female' />
            </RadioGroup>
            <Select
              {...form.getInputProps('activityLevel')}
              style={{ width: '100%' }}
              size='sm'
              variant='filled'
              label={<span {...fieldLabelProps}>Activity Level</span>}
              data={[
                { label: 'Not Very Active', value: '1' },
                { label: 'Lightly Active', value: '1.2' },
                { label: 'Active', value: '1.5' },
                { label: 'Very Active', value: '1.7' },
              ]}
              required
            />
            <Group style={{ width: '100%' }}>
              <Text {...fieldLabelProps}>
                Choose your goal
                <span
                  style={{
                    color: '#F03E3E',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginLeft: '4px',
                  }}
                >
                  *
                </span>
              </Text>
              <Box
                style={{
                  backgroundColor: '#E5ECF2',
                  border: '2px solid #E5ECF2',
                  borderRadius: '3px',
                  width: '100%',
                }}
              >
                <Tabs
                  onTabChange={(_, tabKey) => {
                    if (tabKey === 'maintain') {
                      {
                        form.setFieldValue('goalWeight', 0);
                      }
                      form.setFieldValue('goalType', tabKey);
                    }
                  }}
                  variant='outline'
                  tabPadding={0}
                  grow
                >
                  <Tabs.Tab tabKey='lose_weight' label='Lose Weight'>
                    {goalTabGroup()}
                  </Tabs.Tab>
                  <Tabs.Tab tabKey='gain_weight' label='Gain Weight'>
                    {goalTabGroup()}
                  </Tabs.Tab>
                  <Tabs.Tab tabKey='maintain' label='Maintain'>
                    {goalTabGroup()}
                  </Tabs.Tab>
                </Tabs>
              </Box>
            </Group>
            <Group
              style={{ width: '100%', marginTop: '55px' }}
              position='right'
            >
              <Button type='submit' variant='filled' color='#006C52'>
                Calculate
              </Button>
            </Group>
          </Group>
        </form>
      </Grid.Col>
      <Grid.Col span={6}>
        <Box {...resultContainerProps}>
          <Group position='apart'>
            <Text {...resultTitleWrapperProps}>Result</Text>
            <Switch
              label={<span style={{ color: '#FFFFFF' }}>90/10</span>}
              checked={isNinetyTen}
              onChange={(e) => setIsNinetyTen(e.currentTarget.checked)}
              color='yellow'
              size='md'
            />
          </Group>
          <Group {...resultGroupContainerProps}>
            {resultGroup({
              label: isNinetyTen ? 'Calories (or less)' : 'Calories',
              value: isNinetyTen
                ? calorieGoal?.ninetyTen
                : calorieGoal?.standard,
            })}
            {isNinetyTen && (
              <Text style={{ maxWidth: '100%', color: '#FFFFFF' }}>
                Here you the amount that you should eat from{' '}
                <span style={{ color: '#F7C925', fontWeight: '900' }}>
                  yellow tier
                </span>{' '}
                on a daily basis.
              </Text>
            )}
          </Group>
          <Link href={`/tier`} passHref>
            <Text
              color='#FFFFFF'
              weight='700'
              style={{ marginTop: '10px', cursor: 'pointer' }}
            >
              Learn more about tier
            </Text>
          </Link>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default StandardCalculator;
