import PropTypes from 'prop-types';

const CircleWithNumber = ({ width, height, color, text, c, r, fontSize }) => {
  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx={c}
          cy={c}
          r={r}
          fill={color}
          stroke='#ECFCE1'
          strokeWidth='3'
        />
      </svg>
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '47%',
          color: '#fff',
          fontWeight: 'bold',
          transform: 'translate(-50%, -50%)',
          fontSize: text.toString().split('').length < 4 ? fontSize : 9,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default CircleWithNumber;

CircleWithNumber.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  c: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  r: PropTypes.number.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CircleWithNumber.defaultProps = {
  width: '30',
  height: '30',
  color: '#006C52',
  c: 15,
  r: 13.5,
  fontSize: 16,
};
