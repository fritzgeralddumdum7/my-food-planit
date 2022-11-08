import PropTypes from 'prop-types';

const WaterTracker = ({ bgColor }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_346_15358)'>
        <path
          d='M17.339 0.20625C17.2203 0.075 17.0528 0 16.8753 0H3.1253C2.94905 0 2.7803 0.075 2.66155 0.20625C2.54405 0.33625 2.4853 0.51125 2.5028 0.6875L4.3778 19.4375C4.4103 19.7575 4.67904 20 5.00029 20H15.0003C15.3215 20 15.5903 19.7575 15.6215 19.4375L17.4965 0.6875C17.5153 0.51125 17.4578 0.33625 17.339 0.20625ZM15.6753 6.3475C14.0865 6.86125 12.019 7.09875 10.3965 5.7675C8.3628 4.09875 5.8703 4.38625 4.1803 4.88875L3.81655 1.25H16.184L15.6753 6.3475Z'
          fill={bgColor}
        />
      </g>
      <defs>
        <clipPath id='clip0_346_15358'>
          <rect
            width='20'
            height='20'
            fill={bgColor}
            transform='translate(-0.00012207)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WaterTracker;

WaterTracker.propTypes = {
  bgColor: PropTypes.string,
};

WaterTracker.defaultProps = {
  bgColor: '#FFFFFF',
};
