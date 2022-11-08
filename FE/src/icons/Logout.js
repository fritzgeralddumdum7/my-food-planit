import PropTypes from 'prop-types';

const Logout = ({ width, height, color }) => {
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
        d='M8 0H10V10H8V0ZM13.41 3.59L14.83 2.17C16.77 3.82 18 6.26 18 9C18 13.97 13.97 18 9 18C4.03 18 0 13.97 0 9C0 6.26 1.23 3.82 3.17 2.17L4.58 3.58C3.01 4.86 2 6.81 2 9C2 12.87 5.13 16 9 16C12.87 16 16 12.87 16 9C16 6.81 14.99 4.86 13.41 3.59Z'
        fill={color}
      />
    </svg>
  );
};

export default Logout;

Logout.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Logout.defaultProps = {
  width: '14',
  height: '14',
  color: 'black',
};
