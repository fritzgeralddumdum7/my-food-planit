import PropTypes from 'prop-types';

const FileText = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.33366 1.33325H4.00033C3.6467 1.33325 3.30756 1.47373 3.05752 1.72378C2.80747 1.97382 2.66699 2.31296 2.66699 2.66659V13.3333C2.66699 13.6869 2.80747 14.026 3.05752 14.2761C3.30756 14.5261 3.6467 14.6666 4.00033 14.6666H12.0003C12.3539 14.6666 12.6931 14.5261 12.9431 14.2761C13.1932 14.026 13.3337 13.6869 13.3337 13.3333V5.33325L9.33366 1.33325Z'
        stroke={color}
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.33301 1.33325V5.33325H13.333'
        stroke='#665C5C'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.6663 8.66675H5.33301'
        stroke='#665C5C'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.6663 11.3333H5.33301'
        stroke='#665C5C'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66634 6H5.99967H5.33301'
        stroke='#665C5C'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FileText;

FileText.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

FileText.defaultProps = {
  width: '16',
  height: '16',
  color: '#665C5C',
};
