import PropTypes from 'prop-types';

const Search = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.33329 3.3335H16.6666C17.5833 3.3335 18.3333 4.0835 18.3333 5.00016V15.0002C18.3333 15.9168 17.5833 16.6668 16.6666 16.6668H3.33329C2.41663 16.6668 1.66663 15.9168 1.66663 15.0002V5.00016C1.66663 4.0835 2.41663 3.3335 3.33329 3.3335Z'
        stroke={color}
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.3333 5L9.99996 10.8333L1.66663 5'
        stroke={color}
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

Search.propTypes = {
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Search.defaultProps = {
  color: 'white',
  height: 20,
  width: 20,
};

export default Search;
