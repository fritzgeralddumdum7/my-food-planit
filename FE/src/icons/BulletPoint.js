import PropTypes from 'prop-types';

const BulletPoint = ({ width, height, color, children }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <svg
        width={width}
        height={height}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.334 0C17.723 0 20 2.378 20 5.916V14.084C20 17.622 17.723 20 14.333 20H5.665C2.276 20 0 17.622 0 14.084V5.916C0 2.378 2.276 0 5.665 0H14.334ZM14.334 1.5H5.665C3.135 1.5 1.5 3.233 1.5 5.916V14.084C1.5 16.767 3.135 18.5 5.665 18.5H14.333C16.864 18.5 18.5 16.767 18.5 14.084V5.916C18.5 3.233 16.864 1.5 14.334 1.5ZM14.0895 7.097C14.3825 7.39 14.3825 7.864 14.0895 8.157L9.3435 12.903C9.1975 13.05 9.0055 13.123 8.8135 13.123C8.6225 13.123 8.4295 13.05 8.2835 12.903L5.9095 10.53C5.6165 10.237 5.6165 9.763 5.9095 9.47C6.2025 9.177 6.6765 9.177 6.9695 9.47L8.8135 11.312L13.0295 7.097C13.3225 6.804 13.7965 6.804 14.0895 7.097Z'
          fill={color}
        />
      </svg>
      {children}
    </div>
  );
};

export default BulletPoint;

BulletPoint.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

BulletPoint.defaultProps = {
  width: '20',
  height: '20',
  color: '#006C52',
};
