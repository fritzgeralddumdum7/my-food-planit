import PropTypes from 'prop-types';

const ChevronDown = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.0001 12.5082C9.8418 12.5082 9.68346 12.4499 9.55846 12.3249L6.6168 9.38319C6.37513 9.14152 6.37513 8.74152 6.6168 8.49985C6.85846 8.25819 7.25846 8.25819 7.50013 8.49985L10.0001 10.9999L12.5001 8.49985C12.7418 8.25819 13.1418 8.25819 13.3835 8.49985C13.6251 8.74152 13.6251 9.14152 13.3835 9.38319L10.4418 12.3249C10.3168 12.4499 10.1585 12.5082 10.0001 12.5082Z'
        fill={color}
      />
    </svg>
  );
};

export default ChevronDown;

ChevronDown.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

ChevronDown.defaultProps = {
  width: '20',
  height: '20',
  color: '#7A8394',
};
