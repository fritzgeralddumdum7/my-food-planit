
import PropTypes from 'prop-types';

const Dot = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill={color}/>
    </svg>
  )
}

export default Dot;

Dot.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
}

Dot.defaultProps = {
  width: '4',
  height: '4',
  color: '#777777'
}
