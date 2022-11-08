import PropTypes from 'prop-types';
import { Box, Space, Center } from '@mantine/core';
import Logo from '@/icons/Logo';
import MFP from '@/icons/MFP';
import { NextLink } from '@mantine/next';

const Index = ({ logoColor, mfpColor }) => {
  return (
    <Box px={40} py={37} style={{ display: 'flex' }}>
      <NextLink href='/' passHref>
        <Center>
          <Logo color={logoColor} />
          <Space w={8} />
          <MFP color={mfpColor} />
        </Center>
      </NextLink>
    </Box>
  );
};

export default Index;

Index.propTypes = {
  logoColor: PropTypes.string,
  mfpColor: PropTypes.string,
};

Index.defaultProps = {
  logoColor: '#006C53',
  mfpColor: 'black',
};
