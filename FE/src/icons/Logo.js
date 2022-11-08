import PropTypes from 'prop-types';

const Logo = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 37 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M36.435 13.3436C36.0056 11.281 31.7249 10.306 25.7978 10.6004C24.9121 9.63731 23.873 8.82758 22.7227 8.20408C22.9871 8.00719 23.2158 7.82906 23.4446 7.66218C25.2803 6.27464 26.3022 3.45268 25.7059 1.24573C25.6347 0.979474 25.2409 0.619463 24.9878 0.611963C23.769 0.572586 22.5258 0.512584 21.3277 0.701965C19.3926 1.01135 18.3557 1.93013 17.0357 4.07707C16.3625 3.61581 15.7231 3.05329 14.99 2.72515C14.5071 2.52468 14.0043 2.37634 13.4899 2.28264C13.3709 2.25718 13.2477 2.25867 13.1294 2.28701C13.011 2.31534 12.9005 2.3698 12.8059 2.4464C12.7114 2.52299 12.6351 2.61977 12.5828 2.72965C12.5305 2.83953 12.5035 2.95972 12.5036 3.08141C12.5027 3.27127 12.5692 3.45531 12.6911 3.60081C12.8137 3.74646 12.9824 3.84573 13.1693 3.88206C14.9468 4.2177 16.1694 5.22836 16.5444 7.2703C13.2593 7.96782 10.8648 9.93663 9.53542 12.408C9.47542 12.5167 9.41917 12.6236 9.36479 12.7342C9.33666 12.7942 9.30479 12.8542 9.27854 12.9217C9.26001 12.9547 9.24433 12.9892 9.23166 13.0249C9.20353 13.0867 9.17353 13.1467 9.14916 13.2124C9.12478 13.278 9.09103 13.338 9.06478 13.3999C9.01603 13.5217 8.9654 13.6417 8.92228 13.7749C8.8979 13.8443 8.87352 13.9155 8.85102 13.9868C8.82852 14.058 8.81352 14.0936 8.79665 14.1461C8.79665 14.1461 8.79665 14.1461 8.79665 14.1593C3.24085 16.2593 -0.295514 18.8657 0.131999 20.9282C0.559513 22.9908 4.8384 23.9658 10.7598 23.6714C11.1771 24.1646 11.6363 24.6207 12.1324 25.0346L12.1492 25.0477C12.8792 25.62 13.6859 26.0871 14.5456 26.4353C15.7064 26.8869 16.9433 27.1109 18.1888 27.0953H18.2994C20.2376 27.111 22.1376 26.5567 23.7634 25.5015C23.8515 25.4434 23.9377 25.3852 24.024 25.3252C25.4565 24.1852 26.5516 22.9102 27.2678 21.4814C27.2668 21.4783 27.2668 21.475 27.2678 21.472C27.4867 21.0311 27.6698 20.5734 27.8154 20.1032C33.3468 18.0013 36.8625 15.4006 36.435 13.3436ZM23.979 2.30139C24.4084 4.89835 22.7565 6.95904 19.9101 7.16154C20.4726 6.69653 20.9752 6.27839 21.4908 5.849C21.656 5.71125 21.7603 5.51393 21.781 5.29982C21.8017 5.08572 21.7372 4.87208 21.6014 4.70521L21.5845 4.68459C21.4489 4.5196 21.254 4.41426 21.0416 4.39114C20.8293 4.36801 20.6163 4.42892 20.4483 4.56084L18.4326 6.14714C18.1382 3.63456 20.7633 1.8495 23.9771 2.30139H23.979ZM18.2357 25.4115C17.2763 25.4076 16.3249 25.2382 15.4231 24.9108C15.3931 24.9015 15.3631 24.8883 15.335 24.8752C14.4744 24.5516 13.674 24.0864 12.9668 23.4989C15.1299 23.2855 17.2795 22.9525 19.4057 22.5014C21.5335 22.0616 23.6355 21.5051 25.7022 20.8345C25.0092 22.2185 23.9425 23.3808 22.6229 24.1897C21.3033 24.9987 19.7835 25.4219 18.2357 25.4115V25.4115ZM28.1622 18.4738C27.5847 18.7013 26.9753 18.925 26.3341 19.145C23.9689 19.9465 21.556 20.5996 19.1095 21.1007C16.6681 21.617 14.197 21.9815 11.7105 22.192C11.043 22.2483 10.3979 22.2839 9.77918 22.3045C5.45342 22.4583 2.46645 21.8358 2.18894 20.4857C1.91143 19.1357 4.39401 17.3694 8.42726 15.7812C8.98978 15.5543 9.60105 15.3349 10.2292 15.1174C10.3761 14.528 10.5887 13.9569 10.863 13.4149C11.7987 11.5644 13.3904 10.1291 15.3275 9.38911L15.4362 9.34786C15.9397 9.16309 16.4605 9.02929 16.9907 8.94847L17.1519 10.636C17.1734 10.8578 17.2767 11.0637 17.4417 11.2135C17.6067 11.3632 17.8216 11.4462 18.0444 11.4461C18.0731 11.4481 18.102 11.4481 18.1307 11.4461C18.248 11.435 18.362 11.4009 18.4661 11.3457C18.5702 11.2905 18.6623 11.2152 18.7373 11.1242C18.8122 11.0333 18.8684 10.9284 18.9027 10.8157C18.9369 10.7029 18.9486 10.5845 18.937 10.4673L18.7851 8.86784C19.9646 8.94211 21.1149 9.26621 22.1596 9.81866C23.2044 10.3711 24.1198 11.1393 24.8453 12.0723C25.5278 12.0161 26.1859 11.9786 26.8141 11.9579C31.1267 11.8061 34.0968 12.4323 34.3799 13.7786C34.6631 15.1249 32.1805 16.8762 28.1622 18.47V18.4738Z'
        fill={color}
      />
      <path
        d='M19.9083 7.16155C20.4708 6.69653 20.9733 6.27839 21.489 5.849C21.6542 5.71125 21.7584 5.51393 21.7791 5.29983C21.7998 5.08572 21.7353 4.87208 21.5996 4.70522L21.5827 4.68459C21.447 4.5196 21.2522 4.41427 21.0398 4.39114C20.8274 4.36801 20.6145 4.42892 20.4464 4.56084L18.4307 6.14714C18.1382 3.63081 20.7633 1.84575 23.9772 2.29764C24.4066 4.90022 22.7546 6.95904 19.9083 7.16155Z'
        fill={color}
      />
      <path
        d='M10.6117 20.285C9.42291 20.0975 8.66914 19.7225 8.54913 19.1599C8.42913 18.5974 8.9729 17.9562 9.98356 17.3018C10.0072 18.3264 10.2202 19.3378 10.6117 20.285Z'
        fill={color}
      />
      <path
        d='M26.5778 16.9567C26.5576 15.9306 26.3452 14.9175 25.9515 13.9697C27.1422 14.1572 27.8978 14.5435 28.0141 15.0948C28.1304 15.646 27.5885 16.3042 26.5778 16.9567Z'
        fill={color}
      />
    </svg>
  );
};

export default Logo;

Logo.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Logo.defaultProps = {
  width: '37',
  height: '28',
  color: '#006C53',
};
