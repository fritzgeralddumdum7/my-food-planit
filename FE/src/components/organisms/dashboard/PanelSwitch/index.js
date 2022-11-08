import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text, Skeleton, Paper } from '@mantine/core';
import { panelList } from '@/consts/dashboard';
import PanelCard from '../PanelCard';


const PanelSwitch = ({ type, isLoading, data, onClickCustomWidget = () => {} }) => {
  const hasGoal = type === 'protein_count'
    || type === 'calories_tracker'
    || type === 'fat_count';
  const panelData = panelList.find(item => item.id === type);
  const subLabel = useMemo(() => {
    if (!panelData || !data) return;
    if (hasGoal) {
      if (!!data[type].goal) return `/ ${data[type].goal} (Goal)`;
      else return 'Please set Calorie Goal';
    }
    return panelData.subLabel;
  }, [panelData, hasGoal, data, type]);

  return (isLoading
    ? (
      <Skeleton
        visible={isLoading}
        style={{ height: '195px', borderRadius: '15px' }}
      />
    ) : panelData ? (
        <PanelCard
          {...panelData}
          subLabel={subLabel}
          value={hasGoal ? data[type].value : data[type]}
        />
      ) : (
        <Paper
          radius='lg'
          p='21px 24px 23px 24px'
          shadow='0px 40px 80px #EEF1F4'
          style={{
            border: '1px solid #ECEFF4',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text
            size='sm'
            sx={{
              color: '#006C52',
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
            align='center'
            onClick={onClickCustomWidget}
          >
            Customize Widget
          </Text>
        </Paper>
      )
  )
};

export default PanelSwitch;

PanelCard.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
};