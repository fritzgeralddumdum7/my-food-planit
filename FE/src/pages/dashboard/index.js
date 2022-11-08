import React, { useMemo, useState } from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import { Space, Grid, Center, Loader } from '@mantine/core';
import Graph from '@/components/organisms/dashboard/Graph';
import CircularProgressBar from '@/components/organisms/dashboard/CircularProgressBar';
import MealCard from '@/components/organisms/dashboard/MealCard';
import MyCircleCard from '@/components/organisms/dashboard/MyCircleCard';
import BarChart from '@/components/organisms/dashboard/BarChart';
import useApi from '@/hooks/useApi';
import moment from 'moment';
import DashboardSettingsModal from '@/components/organisms/dashboard/DashboardSettingsModal';
import CustomizeButton from '@/components/organisms/dashboard/CustomizeButton';
import PanelSwitch from '@/components/organisms/dashboard/PanelSwitch';
import { summaryDataAdapter } from '@/helpers/dashboard';

const Index = () => {
  const [showCustomizeModal, updateShowCustomizeModal] = useState(false);
  const [historyType, setHistoryType] = useState('day');

  const [profile, isLoadingProfile] = useApi(
    {
      method: 'GET',
      url: '/users/profile',
    },
    []
  );

  const [trackedWater, isLoadingTrackedWater] = useApi(
    {
      method: 'GET',
      url: '/tracked-water',
      params: {
        order_by: 'asc',
        currentDate: moment().utc().format('Y-MM-D'),
      },
    },
    []
  );

  const [mealsForToday, isMealsForToday] = useApi(
    {
      method: 'GET',
      url: '/my-plan/today',
      params: {
        date: moment().format('Y-MM-D'),
      },
    },
    []
  );

  const [follows, isFollows] = useApi(
    {
      method: 'GET',
      url: '/users/follows/',
    },
    []
  );

  const [dashboardSettings, isLoadingSettings, settingsError, fetchSettings] =
    useApi(
      {
        method: 'GET',
        url: '/dashboard-settings',
      },
      []
    );

  const [panelTypes] = useApi(
    {
      method: 'GET',
      url: '/dashboard-settings/panel-types',
    },
    []
  );

  const [resSummary] = useApi(
    {
      method: 'GET',
      url: '/dashboard/get-summary',
      params: { today: moment().format('Y-MM-DD') }
    },
    []
  );

  const summaryData = useMemo(() => {
    return summaryDataAdapter(resSummary ?? {});
  }, [resSummary]);

  const mParams = (type) => {
    if (type === 'day') {
      return {
        date: moment().format('YYYY-MM-DD'),
      };
    } else if (type === 'week') {
      return {
        date: moment().startOf('week').format('YYYY-MM-DD'),
        limit: 7,
      };
    } else {
      return {
        date: moment().startOf('month').format('YYYY-MM-DD'),
        limit: moment().daysInMonth(),
      };
    }
  };

  const [calorieHistory] = useApi(
    {
      method: 'GET',
      url: '/dashboard/calorie-history',
      params: {
        type: historyType,
        ...mParams(historyType),
      },
    },
    [historyType]
  );

  const haveMFPHelper = useMemo(() => {
    return !!profile?.user_detail?.mfp_help;
  }, [profile]);

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Overview'>
        {isLoadingProfile ? (
          <Center style={{ paddingTop: '300px' }}>
            <Loader />
          </Center>
        ) : (
          <>
            {haveMFPHelper && (
              <>
                <DashboardSettingsModal
                  panelSlot1={dashboardSettings?.panel_1_type ?? ''}
                  panelSlot2={dashboardSettings?.panel_2_type ?? ''}
                  panelSlot3={dashboardSettings?.panel_3_type ?? ''}
                  panelTypes={panelTypes}
                  visible={showCustomizeModal}
                  onSubmit={() => {
                    fetchSettings();
                    updateShowCustomizeModal(false);
                  }}
                  onClose={() => updateShowCustomizeModal(false)}
                />
                <CustomizeButton onClick={() => updateShowCustomizeModal(true)} />
                <Space h={27} />
              </>
            )}
            <Grid gutter={33} style={{ minHeight: '393px' }}>
              {haveMFPHelper ? (
                <>
                  <Grid.Col span={4}>
                    <PanelSwitch
                      type={dashboardSettings?.panel_1_type}
                      isLoading={isLoadingSettings}
                      data={summaryData}
                      onClickCustomWidget={() => updateShowCustomizeModal(true)}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <PanelSwitch
                      type={dashboardSettings?.panel_2_type}
                      isLoading={isLoadingSettings}
                      data={summaryData}
                      onClickCustomWidget={() => updateShowCustomizeModal(true)}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <PanelSwitch
                      type={dashboardSettings?.panel_3_type}
                      isLoading={isLoadingSettings}
                      data={summaryData}
                      onClickCustomWidget={() => updateShowCustomizeModal(true)}
                    />
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Graph
                      historyType={historyType}
                      setHistoryType={setHistoryType}
                      calorieHistory={calorieHistory}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <CircularProgressBar
                      limit={resSummary?.progress.aim}
                      progress={resSummary?.progress.consumed}
                    />
                  </Grid.Col>
                </>
              ) : (
                <>
                  <Grid.Col span={4}>
                    <PanelSwitch
                      type="total_recipes"
                      isLoading={isLoadingSettings}
                      data={summaryData}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}></Grid.Col>
                  <Grid.Col span={4}></Grid.Col>
                </>
              )}
              <Grid.Col span={4} style={{ minHeight: '393px' }}>
                <MealCard mealsForToday={mealsForToday} loading={isMealsForToday} />
              </Grid.Col>
              <Grid.Col span={4} style={{ minHeight: '393px' }}>
                <MyCircleCard follows={follows} loading={isFollows} />
              </Grid.Col>
              {haveMFPHelper && (
                <>
                  <Grid.Col span={4}>
                    <BarChart
                      trackedWater={trackedWater ?? []}
                      loading={isLoadingTrackedWater}
                    />
                  </Grid.Col>
                </>
              )}
            </Grid>
          </>
        )}
      </DashboardWrapper>
    </Main>
  );
};

export default Index;
