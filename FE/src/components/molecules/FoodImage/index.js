import PropTypes from 'prop-types';
import { Image, Center, Text } from '@mantine/core';

const Index = ({ src, title, width, height, textSize, radius }) => {
  const acronym =
    title &&
    title
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), '')
      .substring(0, 2)
      .toUpperCase();

  const getRadius = () => {
    switch (radius) {
      case 'xs':
        return 2;
      case 'sm':
        return 4;
      case 'md':
        return 8;
      case 'lg':
        return 16;
      case 'xl':
        return 32;
      default:
        return radius;
    }
  };

  return src ? (
    <Image
      width={width}
      height={height}
      fit='cover'
      radius={radius}
      src={src}
      alt='Food Image'
    />
  ) : (
    <Center
      sx={{
        minWidth: width,
        height: height,
        background: '#B2DD91',
        color: '#FFF',
        borderRadius: getRadius(),
      }}
    >
      <Text sx={{ fontSize: textSize }}>{acronym}</Text>
    </Center>
  );
};

Index.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  radius: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Index.defaultProps = {
  src: null,
  width: '100%',
  height: null,
  textSize: null,
  radius: 'md',
};

export default Index;
