import PropTypes from 'prop-types';

const unFilled = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.701 0C15.093 0 17.039 1.679 17.039 4.604V19.14C17.039 19.75 16.725 20.299 16.197 20.606C15.671 20.914 15.037 20.92 14.505 20.62L8.545 17.253L2.53 20.627C2.27 20.773 1.985 20.847 1.699 20.847C1.404 20.847 1.109 20.768 0.841 20.61C0.314 20.303 0 19.754 0 19.145V4.421C0 1.611 1.947 0 5.342 0H11.701ZM11.701 1.5H5.342C2.793 1.5 1.5 2.482 1.5 4.421V19.145C1.5 19.239 1.554 19.29 1.599 19.316C1.644 19.344 1.715 19.364 1.797 19.318L8.179 15.738C8.407 15.611 8.686 15.61 8.915 15.739L15.242 19.313C15.325 19.361 15.396 19.339 15.441 19.312C15.486 19.285 15.539 19.234 15.539 19.14L15.5386 4.49004C15.5311 3.62937 15.3645 1.5 11.701 1.5ZM12.1398 6.7285C12.5538 6.7285 12.8898 7.0645 12.8898 7.4785C12.8898 7.8925 12.5538 8.2285 12.1398 8.2285H4.8218C4.4078 8.2285 4.0718 7.8925 4.0718 7.4785C4.0718 7.0645 4.4078 6.7285 4.8218 6.7285H12.1398Z'
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
      viewBox='0 0 16 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.07 0C13.78 0 15.97 1.07 16 3.79V18.97C16 19.14 15.96 19.31 15.88 19.46C15.75 19.7 15.53 19.88 15.26 19.96C15 20.04 14.71 20 14.47 19.86L7.99 16.62L1.5 19.86C1.351 19.939 1.18 19.99 1.01 19.99C0.45 19.99 0 19.53 0 18.97V3.79C0 1.07 2.2 0 4.9 0H11.07ZM11.75 6.04H4.22C3.79 6.04 3.44 6.39 3.44 6.83C3.44 7.269 3.79 7.62 4.22 7.62H11.75C12.18 7.62 12.53 7.269 12.53 6.83C12.53 6.39 12.18 6.04 11.75 6.04Z'
        fill='#B2D790'
      />
    </svg>
  );
};

const Bookmark = ({ width, height, color, filled }) => {
  return filled
    ? displayFilled({ width, height })
    : unFilled({ width, height, color });
};

Bookmark.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Bookmark.defaultProps = {
  width: '24',
  height: '24',
  color: '#006C52',
};

export default Bookmark;
