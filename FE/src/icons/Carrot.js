import PropTypes from 'prop-types';

const Search = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.9665 8.01667C13.1484 9.20613 14.1146 11.1536 13.5615 12.3106C12.0821 15.4049 1.0451 20.8313 0.10744 19.8924C-0.830167 18.9533 4.59236 7.89571 7.68213 6.41414C8.83751 5.86007 10.7824 6.82823 11.9702 8.01206C11.9702 8.01206 11.9689 8.0136 11.9665 8.01667Z'
        fill='#FF8200'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.8137 6.71037C17.8138 6.7103 17.8138 6.7103 17.8138 6.7103C17.6216 5.99857 17.1318 5.27954 16.4006 5.19436C15.0596 5.03814 12.9456 7.41263 13.0964 7.9762C13.2473 8.53983 16.2336 9.53322 17.3493 8.73021C17.9243 8.31632 18.0052 7.42234 17.8163 6.7097L17.8137 6.71037ZM13.6632 0.131688C14.6595 0.401662 15.6658 1.08937 15.7849 2.11593C16.0036 3.99886 12.6795 6.96708 11.8905 6.75535C11.1014 6.54361 9.71077 2.35031 10.8349 0.783817C11.4143 -0.0235693 12.6659 -0.137174 13.6636 0.128078C13.6636 0.128078 13.6634 0.129293 13.6632 0.131688Z'
        fill='#43B02A'
      />
    </svg>
  );
};

Search.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Search.defaultProps = {
  height: 20,
  width: 18,
};

export default Search;
