import PropTypes from 'prop-types';

const Bell = ({ outline, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 14 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.00001 11.8985C10.7595 11.8985 12.4987 11.4162 12.6667 9.48038C12.6667 7.54591 11.4541 7.6703 11.4541 5.29678C11.4541 3.4428 9.69683 1.33337 7.00001 1.33337C4.30319 1.33337 2.54591 3.4428 2.54591 5.29678C2.54591 7.6703 1.33334 7.54591 1.33334 9.48038C1.50198 11.4235 3.24119 11.8985 7.00001 11.8985Z'
        stroke={outline}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.59253 13.9048C7.68311 14.9146 6.26444 14.9266 5.34631 13.9048'
        stroke={outline}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

Bell.propTypes = {
  outline: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Bell.defaultProps = {
  outline: '#FFF',
  height: 14,
  width: 10,
};

export default Bell;
