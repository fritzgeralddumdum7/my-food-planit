import PropTypes from 'prop-types';

const WaterSummary = ({ backgroundColor, circleSize, strokeColor }) => {
  return <svg width={circleSize} height={circleSize} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="26" fill={backgroundColor} />
    <g clip-path="url(#clip0_269_5947)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1556 11.6847C16.6577 11.6325 17.1071 11.9972 17.1592 12.4994L19.3773 33.8478C19.6515 36.4871 21.8758 38.4923 24.5292 38.4923H27.4709C30.1244 38.4923 32.3487 36.4871 32.6229 33.8478L34.8409 12.4994C34.8931 11.9972 35.3424 11.6325 35.8445 11.6847C36.3467 11.7368 36.7114 12.1862 36.6592 12.6883L34.4412 34.0368C34.0702 37.6075 31.0609 40.3204 27.4709 40.3204H24.5292C20.9393 40.3204 17.9299 37.6075 17.5589 34.0368L15.3409 12.6883C15.2887 12.1862 15.6535 11.7368 16.1556 11.6847Z" fill={strokeColor} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.1175 17.0852C23.4515 16.497 20.9009 15.9871 17.7783 17.1099C17.3032 17.2807 16.7797 17.034 16.6088 16.559C16.438 16.0839 16.6847 15.5604 17.1597 15.3896C20.8164 14.0748 23.8263 14.7075 26.5114 15.3C26.5448 15.3074 26.5782 15.3147 26.6115 15.3221C29.2767 15.9104 31.5581 16.414 34.2034 15.3966C34.6745 15.2154 35.2034 15.4504 35.3846 15.9216C35.5659 16.3928 35.3308 16.9216 34.8596 17.1029C31.6953 18.3199 28.9324 17.7083 26.3582 17.1384C26.2778 17.1206 26.1975 17.1028 26.1175 17.0852Z" fill={strokeColor} />
    </g>
    <defs>
      <clipPath id="clip0_269_5947">
        <rect width="29.25" height="29.25" fill={strokeColor} transform="translate(11.375 11.375)" />
      </clipPath>
    </defs>
  </svg>;

}

WaterSummary.propTypes = {
  backgroundColor: PropTypes.string,
  circleSize: PropTypes.int,
  strokeColor: PropTypes.string,
};

WaterSummary.defaultProps = {
  circleSize: 52,
  backgroundColor: "#006C52",
  strokeColor: 'white'
}

export default WaterSummary;