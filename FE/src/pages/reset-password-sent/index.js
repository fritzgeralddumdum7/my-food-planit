import Link from 'next/link';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import { Box, Center, Text, Button } from '@mantine/core';

const Index = () => {
  return (
    <Main meta={<Meta title='My Food Plan It' description='Login page' />}>
      <HeaderLogo />
      <Center style={{ height: '75vh' }}>
        <Box style={{ width: 478 }}>
          <Text weight={700} style={{ fontSize: '35px' }}>
            Email Sent
          </Text>
          <Text color='#7A8394'>
            An email has been sent with instructions for resetting your password
            Please check your email and try logging back in
          </Text>

          <Link href='/login' passHref>
            <Button fullWidth size='lg' mt={40}>
              Ok
            </Button>
          </Link>
        </Box>
      </Center>
    </Main>
  );
};

export default Index;
