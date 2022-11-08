import { Image } from '@mantine/core';
import WaterTracker from '@/icons/WaterTracker';
import CaloriesTracker from '@/icons/CaloriesTracker';
import FatCount from '@/icons/FatCount';
import DaysTracked from '@/icons/DaysTracked';
import SpoonForkCrossed from '@/icons/spoonForkCrossed';
import ItemIcon from '@/components/organisms/dashboard/DashboardSettingsModal/ItemIcon';

export const panelList = [
  {
    id: 'green_tier',
    label: 'Green Tier',
    subLabel: 'Food Eaten',
    icon: <SpoonForkCrossed />,
  },
  {
    id: 'yellow_tier',
    label: 'Yellow Tier',
    subLabel: 'Food Eaten',
    icon: <SpoonForkCrossed bgColor={'#F7C925'} />,
  },
  {
    id: 'red_tier',
    label: 'Red Tier',
    subLabel: 'Food Eaten',
    icon: <SpoonForkCrossed bgColor={'#D50808'} />,
  },
  {
    id: 'protein_count',
    label: 'Protein Count',
    subLabel: '',
    icon: (
      <ItemIcon bgColor={'#D50808'}>
        <Image
          alt='molecular logo'
          src='/images/icons/molecular-structure.png'
          width={20}
          height={20}
        />
      </ItemIcon>
    ),
  },
  {
    id: 'total_recipes',
    label: 'Total Recipes',
    subLabel: 'Imported Recipes',
    icon: (
      <ItemIcon bgColor={'#D48C29'}>
        <Image
          alt='recipe logo'
          src='/images/icons/recipe.png'
          width={20}
          height={20}
        />
      </ItemIcon>
    ),
  },
  {
    id: 'water_tracked',
    label: 'Water Tracked',
    subLabel: 'Total Water Intake for the day',
    icon: (
      <ItemIcon bgColor={'#47A2D6'}>
        <WaterTracker />
      </ItemIcon>
    ),
  },
  {
    id: 'calories_tracker',
    label: 'Calories Tracker',
    subLabel: '',
    icon: (
      <ItemIcon bgColor={'#D50808'}>
        <CaloriesTracker />
      </ItemIcon>
    ),
  },
  {
    id: 'fat_count',
    label: 'Fat Count',
    subLabel: '',
    icon: (
      <ItemIcon bgColor={'#D48C29'}>
        <FatCount />
      </ItemIcon>
    ),
  },
  {
    id: 'total_days_tracked',
    label: 'Total Days Tracked',
    subLabel: 'Total No. of days that has entries',
    icon: (
      <ItemIcon bgColor={'#D7998E'}>
        <DaysTracked />
      </ItemIcon>
    ),
  },
];
