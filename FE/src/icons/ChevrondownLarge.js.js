import PropTypes from 'prop-types';

const ChevrondownLarge = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  );
};

export default ChevrondownLarge;

ChevrondownLarge.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

ChevrondownLarge.defaultProps = {
  width: '20',
  height: '20',
  color: '#7A8394',
};
