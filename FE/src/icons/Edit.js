import PropTypes from 'prop-types';

const Edit = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.2924 15.033C16.6374 15.033 16.9174 15.313 16.9174 15.658C16.9174 16.003 16.6374 16.283 16.2924 16.283H10.2482C9.90322 16.283 9.62322 16.003 9.62322 15.658C9.62322 15.313 9.90322 15.033 10.2482 15.033H16.2924ZM12.4306 1.0447C12.4722 1.0772 13.8664 2.16054 13.8664 2.16054C14.3731 2.4622 14.7689 3.00137 14.9189 3.6397C15.0681 4.27137 14.9597 4.92304 14.6122 5.47387C14.6099 5.47754 14.6076 5.48117 14.5996 5.49197L14.5933 5.50032C14.5369 5.57465 14.2917 5.8847 13.0541 7.43519C13.0426 7.45551 13.0296 7.47454 13.0154 7.49304C12.9945 7.5203 12.9718 7.54535 12.9476 7.56817C12.8632 7.67445 12.774 7.78612 12.6803 7.90353L12.4903 8.14142C12.0984 8.63223 11.6335 9.21424 11.082 9.90455L10.799 10.2588C9.73428 11.5914 8.37069 13.2977 6.62389 15.483C6.24139 15.9597 5.66805 16.2372 5.05222 16.2447L2.01972 16.283H2.01139C1.72222 16.283 1.47055 16.0847 1.40305 15.8022L0.720554 12.9097C0.579721 12.3105 0.719721 11.6922 1.10389 11.2122L8.95389 1.39387C8.95722 1.39054 8.95972 1.38637 8.96305 1.38304C9.82389 0.353869 11.3806 0.202202 12.4306 1.0447ZM8.07866 4.48917L2.07972 11.993C1.93722 12.1714 1.88472 12.4014 1.93722 12.6222L2.50472 15.0264L5.03722 14.9947C5.27805 14.9922 5.50055 14.8847 5.64805 14.7014C6.40762 13.751 7.36227 12.5566 8.34377 11.3284L8.69102 10.8938L9.03886 10.4585C9.95934 9.30657 10.8687 8.16839 11.6296 7.21572L8.07866 4.48917ZM9.92555 2.18054L8.85949 3.5125L12.4101 6.23827C13.0936 5.38225 13.5432 4.81845 13.5847 4.7647C13.7214 4.54304 13.7747 4.2297 13.7031 3.92804C13.6297 3.61887 13.4372 3.35637 13.1597 3.18887C13.1006 3.14804 11.6964 2.05804 11.6531 2.02387C11.1247 1.60054 10.3539 1.67387 9.92555 2.18054Z'
        fill={color}
      />
    </svg>
  );
};

export default Edit;

Edit.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Edit.defaultProps = {
  width: '17',
  height: '17',
  color: 'black',
};