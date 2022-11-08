import Check from '@/icons/Check';
import PropTypes from 'prop-types';
import { Box, Image, Space, Text } from '@mantine/core';
import FoodImage from '@/components/molecules/FoodImage';

const Index = ({  mealplan, selectHandler, index }) => {
  return <Box onClick={() => selectHandler(index)}sx={{ cursor: 'pointer', maxwidth: 257, display: 'flex', border: `1px solid ${mealplan?.selected ? '#006C52' : '#FFF'}` , borderRadius: 6, padding: 6 }}>
    <FoodImage src={mealplan?.planable.image} title={mealplan?.planable.title} height={50} width={66} />
    <Space w={8} />
    <Text sx={{ fontsize: 14, maxWidth: 168 }}>
      {mealplan?.planable.title}
    </Text>
    {mealplan?.selected && (
      <Box sx={{ display: 'flex', alignItems: 'end', marginLeft: 'auto' }}>
        <Box sx={{ backgroundColor: '#006C52', width: 20, height: 20, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check width={12} height={12} />
        </Box>
      </Box>
    )}
  </Box>
};

Index.propTypes = {
  selected: PropTypes.bool
};

Index.defaultProps = {
  selected: false
};

export default Index;
