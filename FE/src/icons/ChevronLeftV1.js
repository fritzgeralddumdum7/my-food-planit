import PropTypes from 'prop-types';

const ChevronLeftV1 = ({ width, height, color, strokeWidth, minX, minY }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.24059 9.11255L8.24662 9.11954L8.25212 9.12695C8.4338 9.37181 8.41387 9.71892 8.19182 9.94097C7.94774 10.185 7.55201 10.185 7.30794 9.94097L3.80794 6.44096L3.80146 6.43449L3.79548 6.42756L3.75917 6.3855L3.75313 6.37851L3.74763 6.3711C3.56595 6.12624 3.58589 5.77913 3.80794 5.55708L7.30794 2.05708L7.31441 2.0506L7.32135 2.04462L7.3634 2.00831L7.37039 2.00228L7.3778 1.99678C7.62266 1.8151 7.96977 1.83504 8.19182 2.05708L8.1983 2.06356L8.20428 2.07049L8.24059 2.11255L8.24662 2.11954L8.25212 2.12695C8.4338 2.37181 8.41387 2.71891 8.19182 2.94096C8.19182 2.94096 8.19182 2.94096 8.19182 2.94096L5.13392 5.99902L8.19182 9.05709L8.1983 9.06356L8.20428 9.07049L8.24059 9.11255Z'
        fill={color}
        stroke={color}
        stroke-width={strokeWidth}
      />
    </svg>
  );
};

export default ChevronLeftV1;

ChevronLeftV1.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minX: PropTypes.number,
  minY: PropTypes.number,
};

ChevronLeftV1.defaultProps = {
  width: '8',
  height: '13',
  color: '#747A8B',
  strokeWidth: 0.5,
  minX: 0,
  minY: 0,
};
