import PropTypes from 'prop-types';

const unFilled = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.0004 6C10.9575 6.00132 9.95759 6.41622 9.22011 7.1537C8.48263 7.89118 8.06773 8.89104 8.06641 9.934H10.0664C10.0664 8.867 10.9344 8 12.0004 8C13.0664 8 13.9344 8.867 13.9344 9.934C13.9344 10.532 13.4534 10.966 12.7184 11.56C12.4783 11.7481 12.2477 11.948 12.0274 12.159C11.0294 13.156 11.0004 14.215 11.0004 14.333V15H13.0004L12.9994 14.367C13.0004 14.351 13.0324 13.981 13.4404 13.574C13.5904 13.424 13.7794 13.274 13.9754 13.116C14.7544 12.485 15.9334 11.532 15.9334 9.934C15.9326 8.89106 15.518 7.89104 14.7806 7.15347C14.0433 6.41591 13.0434 6.00106 12.0004 6ZM11.0004 16H13.0004V18H11.0004V16Z'
        fill='#006C52'
      />
      <path
        d='M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z'
        fill={color}
      />
    </svg>
  );
};

const displayFilled = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM11 16H9V14H11V16ZM11.976 11.115C11.78 11.273 11.591 11.424 11.441 11.574C11.033 11.981 11.001 12.351 11 12.367V12.5H9V12.333C9 12.215 9.029 11.156 10.026 10.159C10.221 9.964 10.463 9.766 10.717 9.56C11.451 8.965 11.933 8.531 11.933 7.933C11.9214 7.42782 11.7125 6.94725 11.3511 6.59412C10.9896 6.24099 10.5043 6.04334 9.99901 6.04347C9.4937 6.0436 9.0085 6.2415 8.64725 6.59482C8.28599 6.94814 8.07736 7.42881 8.066 7.934H6.066C6.066 5.765 7.831 4 10 4C12.169 4 13.934 5.765 13.934 7.934C13.934 9.531 12.755 10.484 11.976 11.115Z'
        fill='#B2DD91'
      />
    </svg>
  );
};

const Help = ({ width, height, color, filled }) => {
  return filled
    ? displayFilled({ width, height })
    : unFilled({ width, height, color });
};

Help.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  filled: PropTypes.bool,
};

Help.defaultProps = {
  width: '24',
  height: '24',
  color: '#006C52',
  filled: false,
};

export default Help;
