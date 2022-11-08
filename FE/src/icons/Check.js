import PropTypes from 'prop-types';

const Check = ({ height, width, strokeColor }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d="M10 3L4.5 8.5L2 6" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

Check.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeColor: PropTypes.string,
};

Check.defaultProps = {
  height: 18,
  width: 18,
  strokeColor: 'white',
};

export default Check;
