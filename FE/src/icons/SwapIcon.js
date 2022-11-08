import PropTypes from 'prop-types';

const SwapIcon = ({ bgColor }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='8.00024' cy='4' r='2' fill={bgColor} />
      <circle cx='16.0002' cy='4' r='2' fill={bgColor} />
      <circle cx='8.00024' cy='12' r='2' fill={bgColor} />
      <circle cx='16.0002' cy='12' r='2' fill={bgColor} />
      <circle cx='8.00024' cy='20' r='2' fill={bgColor} />
      <circle cx='16.0002' cy='20' r='2' fill={bgColor} />
    </svg>
  );
};

export default SwapIcon;

SwapIcon.propTypes = {
  bgColor: PropTypes.string,
};

SwapIcon.defaultProps = {
  bgColor: '#006C52',
};
