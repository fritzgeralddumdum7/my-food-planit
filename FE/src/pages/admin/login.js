import React, { useContext, useState } from 'react';
import API from '@/api/BaseApi';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import GoogleLogin from '@/components/organisms/GoogleLogin';
import Eye from '@/icons/Eye';
import EyeOff from '@/icons/EyeOff';
import { useForm } from '@mantine/form';
import {
  Box,
  Center,
  Text,
  Divider,
  TextInput,
  Button,
  PasswordInput,
} from '@mantine/core';
import { AuthContext } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { handleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { email: '', password: '', remember: false },

    validate: {
      email: (value) => {
        if (value === '') {
          return 'Email is required';
        } else if (!/^\S+@\S+$/.test(value)) {
          return 'Incorrect email format';
        }
        return null;
      },
      password: (value) => (value === '' ? 'Password is required' : null),
    },
  });

  const handleSubmit = (values) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const options = {
      method: 'POST',
      url: 'admin/login',
      params: { ...values },
    };

    API.request(options)
      .then(({ data }) => {
        handleLogin(data);
        router.push('/meal-plan-store');
      })
      .catch(({ response }) => {
        if (response.status === 422 || response.status === 401) {
          form.setErrors({ email: true, password: response.data.message });
        }
        setLoading(false);
      });
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Login page' />}>
      <HeaderLogo />
      <Center style={{ height: '75vh' }}>
        <Box style={{ minWidth: 478 }}>
          <Text weight={700} style={{ fontSize: '35px' }}>
            Admin Login
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              placeholder='Email address'
              mt={24}
              size='lg'
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt={12}
              size='lg'
              placeholder='Password'
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <EyeOff size={size} /> : <Eye size={size} />
              }
              {...form.getInputProps('password')}
            />

            <Box mt={24}>
              <Button
                size='lg'
                type='submit'
                sx={{ width: '100%' }}
                loading={loading}
              >
                Login
              </Button>
            </Box>
          </form>
          {/* <Divider label='OR' labelPosition='center' my={24} />

          <GoogleLogin authType='login' isAdmin={true} /> */}
        </Box>
      </Center>
    </Main>
  );
};

export default Login;
