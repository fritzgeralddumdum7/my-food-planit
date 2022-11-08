import PropTypes from 'prop-types';

const ChevronLeft = ({ width, height, color, strokeWidth, minX, minY }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.68457 1.4266e-07L0.684564 7L7.68457 14L9.31641 12.3659L3.95049 7L9.31641 1.63408L7.68457 1.4266e-07Z'
        fill={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default ChevronLeft;

ChevronLeft.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minX: PropTypes.number,
  minY: PropTypes.number,
};

ChevronLeft.defaultProps = {
  width: '8',
  height: '13',
  color: '#747A8B',
  strokeWidth: 0.5,
  minX: 0,
  minY: 0,
};
