import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { Box, Center, Text, Button, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useApi from '@/hooks/useApi';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  const { code } = router.query;

  const [data, fetching, error] = useApi(
    {
      method: 'GET',
      url: `/friend/${code}`
    },
    []
  );
  
  
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
  
  const handleSubmit = () => {
    Cookies.set('code', data.referral_code);

    router.push('/register/welcome/');
  };
  
  return <>
  <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
    <Center style={{ height: '100vh' }}>
      {fetching ? <Loader/> : <>
        {!error && 
          <Box>
            <Text sx={{ fontSize: 24, fontWeight: 700 }}>You have been invited by {data.name || data.email || data.userDetail.username}</Text>
            <Center>
              <Button onClick={handleSubmit} size="md" sx={{ marginTop: '32px'}}>Click here to register</Button>
            </Center>
          </Box>
        }
        {error && 
          <Box>
            <Text sx={{ fontSize: 24, fontWeight: 700 }}>Invalid Invitation Code</Text>
          </Box>
        }
      </>}
    </Center>
  </Main>
  </>;
};

export default Index;