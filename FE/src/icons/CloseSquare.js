import PropTypes from 'prop-types';

const CloseSquare = ({ height, width, strokeColor }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.9963 6.99574L7.00293 10.9891'
        stroke={strokeColor}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.9976 10.9915L7.00098 6.994'
        stroke={strokeColor}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.612 1.29184H5.38783C2.87033 1.29184 1.29199 3.07434 1.29199 5.59684V12.4035C1.29199 14.926 2.86283 16.7085 5.38783 16.7085H12.6112C15.137 16.7085 16.7087 14.926 16.7087 12.4035V5.59684C16.7087 3.07434 15.137 1.29184 12.612 1.29184Z'
        stroke={strokeColor}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

CloseSquare.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeColor: PropTypes.string,
};

CloseSquare.defaultProps = {
  height: 18,
  width: 18,
  strokeColor: '#C8362E',
};

export default CloseSquare;
