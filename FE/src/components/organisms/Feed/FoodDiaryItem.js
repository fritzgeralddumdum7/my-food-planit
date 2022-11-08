import PropTypes from 'prop-types';
import { Space, Grid, Text, Box } from '@mantine/core';

const FoodDiaryItem = ({ classes, content, label }) => {
  return (
    <Grid.Col
      span={1}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box className={classes.container}>
        <Text className={label ? classes.headerLabel : classes.header}>
          {content}
        </Text>
        <Space w={8} />
        {label && (
          <>
            <Text sx={{ fontSize: 12, fontWeight: 500, color: '#7A7D82' }}>
              {label}
            </Text>
          </>
        )}
      </Box>
    </Grid.Col>
  );
};

export default FoodDiaryItem;

FoodDiaryItem.propTypes = {
  classes: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
