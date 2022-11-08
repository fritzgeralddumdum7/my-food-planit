import PropTypes from 'prop-types';

const Eye = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 16.3299C9.61 16.3299 7.67 14.3899 7.67 11.9999C7.67 9.60992 9.61 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17 10.4399 9.17 11.9999C9.17 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z'
        fill={color}
      />
      <path
        d='M12 21.02C8.24 21.02 4.69 18.82 2.25 15C1.19 13.35 1.19 10.66 2.25 8.99998C4.7 5.17998 8.25 2.97998 12 2.97998C15.75 2.97998 19.3 5.17998 21.74 8.99998C22.8 10.65 22.8 13.34 21.74 15C19.3 18.82 15.75 21.02 12 21.02ZM12 4.47998C8.77 4.47998 5.68 6.41998 3.52 9.80998C2.77 10.98 2.77 13.02 3.52 14.19C5.68 17.58 8.77 19.52 12 19.52C15.23 19.52 18.32 17.58 20.48 14.19C21.23 13.02 21.23 10.98 20.48 9.80998C18.32 6.41998 15.23 4.47998 12 4.47998Z'
        fill={color}
      />
    </svg>
  );
};

export default Eye;

Eye.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Eye.defaultProps = {
  width: '24',
  height: '24',
  color: '#7A8394',
};
