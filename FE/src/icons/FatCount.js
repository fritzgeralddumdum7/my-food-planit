import PropTypes from 'prop-types';

const FatCount = ({ bgColor }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.2092 15.1605C19.2092 19.1317 15.99 22.3509 12.0188 22.3509C8.04765 22.3509 4.82837 19.1317 4.82837 15.1605C4.82837 9.65255 12.0188 1.6875 12.0188 1.6875C12.0188 1.6875 19.2092 9.65255 19.2092 15.1605V15.1605Z'
        fill={bgColor}
      />
      <path
        d='M15.243 18.4501C16.3741 17.3191 16.7341 15.8454 16.0473 15.1585C15.3604 14.4716 13.8867 14.8317 12.7557 15.9628C11.6247 17.0938 11.2646 18.5675 11.9514 19.2543C12.6383 19.9412 14.112 19.5811 15.243 18.4501Z'
        fill='#D48C29'
      />
      <path
        d='M12.8967 20.0716C12.3974 20.0716 11.9516 19.9142 11.6235 19.586C10.7402 18.7027 11.0935 16.9655 12.4279 15.631C13.0348 15.0241 13.7568 14.5951 14.4608 14.4231C15.2477 14.2307 15.9304 14.3741 16.383 14.8266C17.2663 15.71 16.913 17.4472 15.5786 18.7816V18.7817C14.7398 19.6204 13.7417 20.0716 12.8967 20.0716V20.0716ZM15.115 15.278C14.9524 15.278 14.7973 15.306 14.6833 15.3338C14.1514 15.4638 13.571 15.8137 13.0908 16.294C12.0791 17.3057 11.8549 18.4916 12.2864 18.9231C12.7179 19.3547 13.9039 19.1306 14.9156 18.1188V18.1188C15.9273 17.107 16.1515 15.9211 15.72 15.4896C15.5573 15.3268 15.3297 15.278 15.115 15.278V15.278ZM15.2471 18.4502H15.2476H15.2471Z'
        fill='#D48C29'
      />
    </svg>
  );
};

export default FatCount;

FatCount.propTypes = {
  bgColor: PropTypes.string,
};

FatCount.defaultProps = {
  bgColor: '#FFFFFF',
};
