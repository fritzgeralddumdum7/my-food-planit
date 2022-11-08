import PropTypes from 'prop-types';

const Search = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 8.0887V2.25537H15V8.0887'
        stroke={color}
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.99996 15.5889H3.33329C2.89127 15.5889 2.46734 15.4133 2.15478 15.1007C1.84222 14.7882 1.66663 14.3642 1.66663 13.9222V9.75553C1.66663 9.31351 1.84222 8.88958 2.15478 8.57702C2.46734 8.26446 2.89127 8.08887 3.33329 8.08887H16.6666C17.1087 8.08887 17.5326 8.26446 17.8451 8.57702C18.1577 8.88958 18.3333 9.31351 18.3333 9.75553V13.9222C18.3333 14.3642 18.1577 14.7882 17.8451 15.1007C17.5326 15.4133 17.1087 15.5889 16.6666 15.5889H15'
        stroke={color}
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 12.2554H5V18.922H15V12.2554Z'
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
  height: 21,
  width: 20,
};

export default Search;
