import PropTypes from 'prop-types';

const ChevronRightV1 = ({ width, height, color, strokeWidth, minX, minY }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.75929 9.11255L3.75326 9.11954L3.74776 9.12695C3.56607 9.37181 3.58601 9.71892 3.80806 9.94097C4.05214 10.185 4.44786 10.185 4.69194 9.94097L8.19194 6.44096L8.19842 6.43449L8.2044 6.42756L8.24071 6.3855L8.24674 6.37851L8.25224 6.3711C8.43393 6.12624 8.41399 5.77913 8.19194 5.55708L4.69194 2.05708L4.68547 2.0506L4.67853 2.04462L4.63647 2.00831L4.62949 2.00228L4.62207 1.99678C4.37721 1.8151 4.0301 1.83504 3.80806 2.05708L3.80158 2.06356L3.7956 2.07049L3.75929 2.11255L3.75326 2.11954L3.74776 2.12695C3.56608 2.37181 3.58601 2.71891 3.80805 2.94096C3.80806 2.94096 3.80806 2.94096 3.80806 2.94096L6.86596 5.99902L3.80805 9.05709L3.80158 9.06356L3.7956 9.07049L3.75929 9.11255Z'
        fill={color}
        stroke={color}
        stroke-width={strokeWidth}
      />
    </svg>
  );
};

export default ChevronRightV1;

ChevronRightV1.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minX: PropTypes.number,
  minY: PropTypes.number,
};

ChevronRightV1.defaultProps = {
  width: '8',
  height: '13',
  color: '#747A8B',
  strokeWidth: 0.5,
  minX: 0,
  minY: 0,
};
