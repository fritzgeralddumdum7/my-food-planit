import PropTypes from 'prop-types';

const Info = ({ width, height, color }) => {
  return (  
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M8.00016 14.6666C11.6668 14.6666 14.6668 11.6666 14.6668 7.99992C14.6668 4.33325 11.6668 1.33325 8.00016 1.33325C4.3335 1.33325 1.3335 4.33325 1.3335 7.99992C1.3335 11.6666 4.3335 14.6666 8.00016 14.6666Z" 
        stroke={color} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 5.33325V8.66659" 
        stroke={color} strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path d="M7.99658 10.6667H8.00257" 
        stroke={color} 
        strokeWidth="1.33333" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Info;

Info.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
}


Info.defaultProps = {
  width: '16',
  height: '16',
  color: '#292D32',
};
