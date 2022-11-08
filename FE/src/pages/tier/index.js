import React, { useState } from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import DashboardWrapper from '@/templates/DashboardWrapper';
import { ScrollArea, Space, Tabs, Text, Box, Anchor } from '@mantine/core';
import RoundedInputBar from '@/components/molecules/RoundedInputBar';
import { tier_data } from '@/consts/tier_data';
import Search from '@/icons/Search';
import Card from '@/components/molecules/Card';
import Breadcrumb from '@/components/organisms/Breadcrumb';

const Tier = () => {
  const [activeTab, setActiveTab] = useState(0);
  // const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (active) => {
    setActiveTab(active);
    setSearchTerm('');
  };
  const handleChange = (e) => setSearchTerm(e.target.value);

  const TierCard = ({ children, title }) => {
    return (
      <>
        <Card
          sx={{
            marginBottom: '32px',
            boxShadow: '0px 5px 10px #EEF1F4',
          }}
        >
          <Text sx={{ fontWeight: 700, fontSize: 16 }}>{title}</Text>
          <Space h={12} />
          <Text
            sx={{ fontWeight: 500, fontSize: 16, color: '#6B6D86' }}
            dangerouslySetInnerHTML={{ __html: children }}
          ></Text>
        </Card>
      </>
    );
  };

  const TierList = ({ tier_content }) => {
    return (
      <>
        {tier_content
          .filter((item) => {
            return (
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((item, key) => (
            <>
              <TierCard title={item.title} key={key} index={key}>
                {item.description}
              </TierCard>
              <Space h={32} />
            </>
          ))}
      </>
    );
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Nutrition Calculator'>
        <Breadcrumb
          items={[
            {
              title: 'Nutritional calculator',
              href: '/nutrition-calculator',
              color: '#006C52',
            },
            {
              title: 'Tier',
              color: '#7E8CA0',
            },
          ]}
        />
        <Space h={32} />
        <Text size='xl'>What is 90/10 Mode?</Text>
        <Text sx={{ color: '#6B6D86', marginTop: '20px' }}>
          90/10 Nutrition is a system of clean eating created by the very same
          people that created MyFoodPlanIt!
          <br />
          90/10 is based on three simple tiers. You eat 90% of your daily intake
          from the green tier (the cleanest foods), no more than 10% from the
          yellow tier, and nothing from the red tier. It’s that simple. You can
          see the tiers below.
          <br />
          <br />
          You can choose to turn on “90/10 mode” in MyFoodPlanIt and the system
          will help you track based on the tiers rather than calories and
          macronutrients. It’s great for those that want to eat the 90/10 way.
          Give it a try!
          <br />
          <br />
          You can learn more about 90/10 and how the system works at the{' '}
          <Anchor
            style={{
              color: '#006C52',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            href='https://www.9010nutrition.com/'
            target='_blank'
          >
            90/10 website
          </Anchor>
          .
        </Text>
        <Space h={32} />
        <Tabs
          tabPadding={'xl'}
          active={activeTab}
          onTabChange={onChange}
          sx={(theme) => ({
            '.mantine-Tabs-tabActive': {
              fontWeight: 700,
            },
            '.mantine-Tabs-tabControl:not(.mantine-Tabs-tabActive)': {
              color: '#9AA5B6',
              borderColor: '#D1DCE4',
            },
            '.mantine-Tabs-tabsListWrapper': {
              borderColor: '#D1DCE4',
            },
          })}
        >
          <Tabs.Tab
            tabKey={'green'}
            label='GREEN TIER'
            color='green'
            icon={
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'green',
                  borderRadius: '12px',
                }}
              ></Box>
            }
          >
            <RoundedInputBar
              onChange={handleChange}
              placeholder={'Search Food'}
              width={'400px'}
              leftIcon={<Search />}
            />
            <Space h={32} />
            <ScrollArea
              styles={() => ({ viewport: { padding: '0px 16px' } })}
              style={{ height: '40vh' }}
              type='always'
            >
              <TierList tier_content={tier_data.green_tier} />
            </ScrollArea>
          </Tabs.Tab>
          <Tabs.Tab
            tabKey={'yellow'}
            label='YELLOW TIER'
            color='yellow'
            icon={
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'yellow',
                  borderRadius: '12px',
                }}
              ></Box>
            }
          >
            <RoundedInputBar
              onChange={handleChange}
              placeholder={'Search Food'}
              width={'400px'}
              leftIcon={<Search />}
            />
            <Space h={32} />
            <ScrollArea
              styles={() => ({ viewport: { padding: '0px 16px' } })}
              style={{ height: '40vh' }}
              type='always'
            >
              <TierList tier_content={tier_data.yellow_tier} />
            </ScrollArea>
          </Tabs.Tab>
          <Tabs.Tab
            tabKey={'red'}
            label='RED TIER'
            color='red'
            icon={
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'red',
                  borderRadius: '12px',
                }}
              ></Box>
            }
          >
            <RoundedInputBar
              onChange={handleChange}
              placeholder={'Search Food'}
              width={'400px'}
              leftIcon={<Search />}
            />
            <Space h={32} />
            <ScrollArea
              styles={() => ({ viewport: { padding: '0px 16px' } })}
              style={{ height: '40vh' }}
              type='always'
            >
              <TierList tier_content={tier_data.red_tier} />
            </ScrollArea>
          </Tabs.Tab>
        </Tabs>
      </DashboardWrapper>
    </Main>
  );
};

export default Tier;
