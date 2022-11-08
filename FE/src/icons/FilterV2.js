import PropTypes from 'prop-types';

const unFilled = ({ width, height, color }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20.0566 16.5929H13.7559" 
        stroke={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.1404 6.90042H19.4411" 
        stroke={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M8.72629 6.84625C8.72629 5.5506 7.66813 4.5 6.36314 4.5C5.05816 4.5 4 5.5506 4 6.84625C4 8.14191 5.05816 9.19251 6.36314 9.19251C7.66813 9.19251 8.72629 8.14191 8.72629 6.84625Z" 
        stroke={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M8.75583 16.5538C8.75583 15.2581 7.69848 14.2075 6.3935 14.2075C5.0877 14.2075 4.02954 15.2581 4.02954 16.5538C4.02954 17.8494 5.0877 18.9 6.3935 18.9C7.69848 18.9 8.75583 17.8494 8.75583 16.5538Z" 
        stroke={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
};

const displayFilled = ({ width, height }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20.0566 16.5929H13.7559" 
        stroke='#B2DD91'
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.1404 6.90042H19.4411" 
        stroke='#B2DD91'
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M8.72629 6.84625C8.72629 5.5506 7.66813 4.5 6.36314 4.5C5.05816 4.5 4 5.5506 4 6.84625C4 8.14191 5.05816 9.19251 6.36314 9.19251C7.66813 9.19251 8.72629 8.14191 8.72629 6.84625Z" 
        stroke='#B2DD91'
        fill='#B2DD91'
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M8.75583 16.5538C8.75583 15.2581 7.69848 14.2075 6.3935 14.2075C5.0877 14.2075 4.02954 15.2581 4.02954 16.5538C4.02954 17.8494 5.0877 18.9 6.3935 18.9C7.69848 18.9 8.75583 17.8494 8.75583 16.5538Z" 
        stroke='#B2DD91'
        fill='#B2DD91'
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
};

const FilterV2 = ({ width, height, color, filled }) => {
  return filled
    ? displayFilled({ width, height })
    : unFilled({ width, height, color });
};

FilterV2.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  filled: PropTypes.bool,
};

FilterV2.defaultProps = {
  width: '24',
  height: '24',
  color: '#006C52',
  filled: false,
};

export default FilterV2;
