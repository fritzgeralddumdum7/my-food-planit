import PropTypes from 'prop-types';

const DangerCircle = ({ withRedDot }) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='24' cy='24' r='24' fill='#EFF5F4' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24.0001 14.7501C29.1081 14.7501 33.2501 18.8911 33.2501 24.0001C33.2501 29.1081 29.1081 33.2501 24.0001 33.2501C18.8911 33.2501 14.7501 29.1081 14.7501 24.0001C14.7501 18.8911 18.8911 14.7501 24.0001 14.7501Z'
        stroke='#087D61'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.9952 20.2042V24.6232'
        stroke='#087D61'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.995 27.7961H24.005'
        stroke='#087D61'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {withRedDot && (
        <circle
          cx='41'
          cy='7'
          r='6'
          fill='#E73D3D'
          stroke='white'
          strokeWidth='2'
        />
      )}
    </svg>
  );
};

export default DangerCircle;

DangerCircle.propTypes = {
  withRedDot: PropTypes.bool,
};

DangerCircle.defaultProps = {
  withRedDot: false,
};
