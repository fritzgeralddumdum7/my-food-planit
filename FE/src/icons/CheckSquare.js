import PropTypes from 'prop-types';

const CheckSquare = ({ height, width, strokeColor }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.611 1.29182H5.38685C2.86935 1.29182 1.29102 3.07432 1.29102 5.59682V12.4035C1.29102 14.926 2.86185 16.7085 5.38685 16.7085H12.6102C15.136 16.7085 16.7077 14.926 16.7077 12.4035V5.59682C16.7077 3.07432 15.136 1.29182 12.611 1.29182Z'
        stroke={strokeColor}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.03223 9.00016L8.01056 10.9777L11.9656 7.02266'
        stroke={strokeColor}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

CheckSquare.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeColor: PropTypes.string,
};

CheckSquare.defaultProps = {
  height: 18,
  width: 18,
  strokeColor: '#006C52',
};

export default CheckSquare;
