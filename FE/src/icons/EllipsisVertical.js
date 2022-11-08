import PropTypes from 'prop-types';

const EllipsisVertical = ({ color, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 4 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 11C3.10457 11 4 10.1046 4 9C4 7.89543 3.10457 7 2 7C0.89543 7 0 7.89543 0 9C0 10.1046 0.89543 11 2 11Z'
        fill={color}
      />
      <path
        d='M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z'
        fill={color}
      />
      <path
        d='M2 18C3.10457 18 4 17.1046 4 16C4 14.8954 3.10457 14 2 14C0.89543 14 0 14.8954 0 16C0 17.1046 0.89543 18 2 18Z'
        fill={color}
      />
    </svg>
  );
};

EllipsisVertical.propTypes = {
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

EllipsisVertical.defaultProps = {
  color: '#9D9FA6',
  height: 18,
  width: 4,
};

export default EllipsisVertical;
