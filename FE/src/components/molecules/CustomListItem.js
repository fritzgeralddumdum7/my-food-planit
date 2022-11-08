import { Text, Box, Anchor } from '@mantine/core';
import PropTypes from 'prop-types';

const CustomListItem = ({
  index,
  title,
  details,
  leftSection,
  rightSection,
  divider,
  bgColor,
  id,
  isMyCircle,
}) => {
  return (
    <Box
      inline
      style={{
        background: bgColor,
        width: '100%',
        display: 'flex',
        borderTop:
          divider === 'full' ? (index === 0 ? 0 : '1px solid #ECECF0') : 0,
      }}
    >
      {!!leftSection && (
        <Box py={12} mr={12}>
          {leftSection}
        </Box>
      )}
      <Box
        py={12}
        style={{
          width: 'inherit',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop:
            divider === 'center' ? (index === 0 ? 0 : '1px solid #ECECF0') : 0,
        }}
      >
        <Box>
          <Text size='sm' color='#1C212D' weight={600}>
            {title}
          </Text>
          <Text size='xs' color='#7A7D82'>
            {details}
          </Text>
        </Box>
        {!!rightSection && (
          <Anchor href={isMyCircle && `/my-circles/profile/${id}`}>
            <Box>{rightSection}</Box>
          </Anchor>
        )}
      </Box>
    </Box>
  );
};

export default CustomListItem;

CustomListItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  leftSection: PropTypes.element,
  rightSection: PropTypes.element,
  bgColor: PropTypes.string,
  divider: PropTypes.oneOf[('full', 'center')],
  isMyCircle: PropTypes.bool,
};

CustomListItem.defaultProps = {
  leftSection: null,
  rightSection: null,
  divider: 'full',
  bgColor: '#FFF',
  isMyCircle: true,
};
