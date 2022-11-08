import PropTypes from 'prop-types';

const ChevronRight = ({ width, height, color, strokeWidth, minX, minY }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L6.65685 6.65685L1 12.3137'
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default ChevronRight;

ChevronRight.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minX: PropTypes.number,
  minY: PropTypes.number,
};

ChevronRight.defaultProps = {
  width: '8',
  height: '13',
  color: '#747A8B',
  strokeWidth: 0.5,
  minX: 0,
  minY: 0,
};
