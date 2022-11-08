import PropTypes from 'prop-types';

const BellCircle = ({ bgColor, iconColor, withRedDot }) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='24' cy='24' r='24' fill={bgColor} />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24 29.8476C29.6392 29.8476 32.2481 29.1242 32.5 26.2205C32.5 23.3188 30.6812 23.5054 30.6812 19.9451C30.6812 17.1641 28.0452 14 24 14C19.9548 14 17.3188 17.1641 17.3188 19.9451C17.3188 23.5054 15.5 23.3188 15.5 26.2205C15.753 29.1352 18.3618 29.8476 24 29.8476Z'
        stroke={iconColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M26.3888 32.8572C25.0247 34.3719 22.8967 34.3899 21.5195 32.8572'
        stroke={iconColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {withRedDot && (
        <circle
          cx='41'
          cy='7'
          r='6'
          fill='#E73D3D'
          stroke='white'
          strokeWidth='2'
        />
      )}
    </svg>
  );
};

export default BellCircle;

BellCircle.propTypes = {
  withRedDot: PropTypes.bool,
  bgColor: PropTypes.string,
  iconColor: PropTypes.string,
};

BellCircle.defaultProps = {
  withRedDot: false,
  bgColor: '#EFF5F4',
  iconColor: '#087D61',
};
