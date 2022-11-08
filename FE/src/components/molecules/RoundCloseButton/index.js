import PropTypes from 'prop-types';
import { UnstyledButton } from '@mantine/core';

const Index = ({ radius }) => {
  return (
    <UnstyledButton style={{ radius: radius }}>
      <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M24 44C35 44 44 35 44 24C44 13 35 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44Z'
          stroke='#7A8394'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.3401 29.6598L29.6601 18.3398'
          stroke='#7A8394'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M29.6601 29.6598L18.3401 18.3398'
          stroke='#7A8394'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </UnstyledButton>
  );
};

export default Index;

Index.propTypes = {
  radius: PropTypes.number,
};

Index.defaultProps = {
  radius: 41,
};
