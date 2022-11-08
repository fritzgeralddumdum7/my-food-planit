import PropTypes from 'prop-types';

const CaloriesTracker = ({ bgColor }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_346_15585)'>
        <path
          d='M15.0002 20H5.00018C2.24268 20 0.000183105 17.7576 0.000183105 15.0001C0.000183105 12.7026 1.86935 10.8334 4.16685 10.8334C4.62768 10.8334 5.00018 11.2059 5.00018 11.6668C5.00018 12.1276 4.62768 12.5001 4.16685 12.5001C2.78852 12.5001 1.66685 13.6218 1.66685 15.0001C1.66685 16.8384 3.16185 18.3334 5.00018 18.3334H15.0002C16.8385 18.3334 18.3335 16.8384 18.3335 15.0001C18.3335 13.6218 17.2118 12.5001 15.8335 12.5001C15.3727 12.5001 15.0002 12.1276 15.0002 11.6668C15.0002 11.2059 15.3727 10.8334 15.8335 10.8334C18.131 10.8334 20.0002 12.7026 20.0002 15.0001C20.0002 17.7576 17.7577 20 15.0002 20Z'
          fill={bgColor}
        />
        <path
          d='M11.2501 6.66706C11.2426 6.66706 11.2342 6.66706 11.2276 6.66706C10.9201 6.65873 10.6426 6.48123 10.5051 6.20706L8.75008 2.69706L7.82925 4.53956C7.68758 4.82206 7.39925 5.00039 7.08342 5.00039H5.00008C4.53925 5.00039 4.16675 4.62706 4.16675 4.16706C4.16675 3.70706 4.53925 3.33373 5.00008 3.33373H6.56841L8.00508 0.461226C8.28841 -0.103774 9.21258 -0.103774 9.49592 0.461226L11.2992 4.06873L12.1934 2.50456C12.3417 2.24373 12.6184 2.08373 12.9167 2.08373H15.0001C15.4609 2.08373 15.8334 2.45706 15.8334 2.91706C15.8334 3.37706 15.4609 3.75039 15.0001 3.75039H13.4001L11.9734 6.24706C11.8242 6.50706 11.5484 6.66706 11.2501 6.66706Z'
          fill={bgColor}
        />
        <path
          d='M13.3336 8.33344H6.66695C4.82862 8.33344 3.33362 9.82842 3.33362 11.6667C3.33362 13.5051 4.82862 15 6.66695 15H13.3336C15.172 15 16.667 13.5051 16.667 11.6667C16.667 9.82842 15.172 8.33344 13.3336 8.33344ZM7.08362 12.9167C6.39362 12.9167 5.83362 12.3567 5.83362 11.6667C5.83362 10.9767 6.39362 10.4168 7.08362 10.4168C7.77362 10.4168 8.33362 10.9767 8.33362 11.6667C8.33362 12.3567 7.77362 12.9167 7.08362 12.9167ZM12.917 12.9167C12.227 12.9167 11.667 12.3567 11.667 11.6667C11.667 10.9767 12.227 10.4168 12.917 10.4168C13.607 10.4168 14.167 10.9767 14.167 11.6667C14.167 12.3567 13.607 12.9167 12.917 12.9167Z'
          fill={bgColor}
        />
      </g>
      <defs>
        <clipPath id='clip0_346_15585'>
          <rect
            width='20'
            height='20'
            fill={bgColor}
            transform='translate(0.000183105)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CaloriesTracker;

CaloriesTracker.propTypes = {
  bgColor: PropTypes.string,
};

CaloriesTracker.defaultProps = {
  bgColor: '#FFFFFF',
};
