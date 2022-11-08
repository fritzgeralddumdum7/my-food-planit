import PropTypes from 'prop-types';

const Search = ({ outline, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='11.7666'
        cy='11.7666'
        r='8.98856'
        stroke={outline}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.0183 18.4852L21.5423 22.0001'
        stroke={outline}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

Search.propTypes = {
  outline: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Search.defaultProps = {
  outline: '#006C52',
  height: 24,
  width: 24,
};

export default Search;
