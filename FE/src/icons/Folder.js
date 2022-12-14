import PropTypes from 'prop-types';

const Folder = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.5'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.58579 3.58579C2 4.17157 2 5.11438 2 7V9.25H12.1716C12.3869 9.25 12.5073 9.2495 12.5975 9.24264C12.6377 9.23959 12.6597 9.23599 12.671 9.23365C12.6763 9.23254 12.6791 9.23172 12.6802 9.2314L12.6815 9.23097L12.6827 9.23037L12.6853 9.22887L12.6908 9.22544C12.7004 9.21915 12.7185 9.20615 12.7491 9.17988C12.8177 9.12091 12.9032 9.03617 13.0555 8.88388L14.9393 7H14.2361C13.6347 7 13.334 7 13.0923 6.85065C12.8507 6.7013 12.7162 6.43234 12.4472 5.89443L12.1056 5.21115C11.5677 4.13531 11.2987 3.5974 10.8154 3.2987C10.3321 3 9.73068 3 8.52786 3H6C4.11438 3 3.17157 3 2.58579 3.58579ZM17.0586 7.00209L14.1161 9.94454L14.0596 10.0013C13.83 10.2322 13.5822 10.4815 13.2555 10.6168C12.9288 10.7521 12.5773 10.7511 12.2516 10.7502L12.1716 10.75H2V15C2 17.8284 2 19.2426 2.87868 20.1213C3.75736 21 5.17157 21 8 21H16C18.8284 21 20.2426 21 21.1213 20.1213C22 19.2426 22 17.8284 22 15V13C22 10.1716 22 8.75736 21.1213 7.87868C20.3599 7.11722 19.1962 7.01564 17.0586 7.00209Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default Folder;

Folder.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Folder.defaultProps = {
  width: '24',
  height: '24',
  color: '#778CA3',
};
