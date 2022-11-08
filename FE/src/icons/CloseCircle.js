import PropTypes from 'prop-types';

const CloseCircle = ({ height, width, withCircle, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {withCircle && <circle cx='8' cy='8' r='8' fill='#EFF2F4' />}
      <path
        d='M8.19601 8.35663L10.4036 10.5642L10.9554 10.0123L8.7479 7.80474L10.9554 5.59723L10.4035 5.04534L8.19601 7.25285L5.98845 5.04529L5.43656 5.59718L7.64412 7.80474L5.43652 10.0123L5.98841 10.5642L8.19601 8.35663Z'
        fill={color}
      />
    </svg>
  );
};

CloseCircle.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withCircle: PropTypes.bool,
  color: PropTypes.string,
};

CloseCircle.defaultProps = {
  height: 16,
  width: 16,
  withCircle: true,
  color: '#8C97A1',
};

export default CloseCircle;
