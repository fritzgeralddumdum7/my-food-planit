import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import {
  Divider,
  Text,
  Space,
  TextInput,
  PasswordInput,
  Anchor,
  Button,
  Box,
} from '@mantine/core';
import Eye from '@/icons/Eye';
import EyeOff from '@/icons/EyeOff';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import GoogleLogin from '@/components/organisms/GoogleLogin';
import API from '@/api/BaseApi';
import Cookies from 'js-cookie';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

const Register = () => {
  const { handleLogin, setIsStep8 } = useContext(AuthContext);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => {
        if (value === '') {
          return 'Email is required';
        } else if (!/^\S+@\S+$/.test(value)) {
          return 'Incorrect email format';
        }
        return null;
      },
      password: (value) =>
        value === ''
          ? 'Password is required'
          : value.length < 10
          ? 'Password must have atleast 10 characters'
          : null,
    },
  });

  const handleSubmit = (values) => {
    let { mfpHelp } = router.query;

    const referralCode = Cookies.get('code');

    form.setFieldValue('password_confirmation', values.password);

    let onBoardingData = JSON.parse(Cookies.get('onboarding'));
    const options = {
      method: 'POST',
      url: '/register',
      data: { ...onBoardingData, ...values, referral_code: referralCode },
    };
    API.request(options)
      .then(({ data }) => {
        if (data) {
          setIsStep8(true);
          handleLogin(data);
          onBoarding(onBoardingData);
          Cookies.remove('code');
          router.push(`/register/onboarding/8?mfpHelp=${mfpHelp}`);
        }
      })
      .catch(({ response }) => {
        form.setErrors({ email: true, password: response.data.message });
      });
  };

  const onBoarding = (data) => {
    const options = {
      method: 'POST',
      url: '/onboarding',
      data: data,
    };
    API.request(options)
      .then(() => {
        Cookies.remove('onboarding');
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Register page' />}>
      <Text style={{ fontSize: 40, color: '#0F1514', fontWeight: '700' }}>
        Almost done! Create your account.
      </Text>
      <Space h={25} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder='Email address'
          size='xl'
          mb={12}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder='Password'
          size='xl'
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <EyeOff size={size} /> : <Eye size={size} />
          }
          style={{ color: '#7A8394' }}
          {...form.getInputProps('password')}
        />
        <Box>
          <Space h={50} />
          <Text
            style={{ color: '#7A8394', textAlign: 'center' }}
            px={35}
            pb={15}
            size={14}
          >
            By signing up for My Food Planit, you are agreeing to our
            <Anchor href='/privacy-policy' size={14}>
              {' '}
              Privacy Policy{' '}
            </Anchor>
            and
            <Anchor href='/terms' size={14}>
              {' '}
              Terms
            </Anchor>
          </Text>
        </Box>
        <Box>
          <Button
            fullWidth
            size='lg'
            type='submit'
            style={{ backgroundColor: '#006C52' }}
          >
            Continue
          </Button>
        </Box>
      </form>
      <Divider label='OR' labelPosition='center' my={24} />
      <GoogleLogin authType='register' />
    </Main>
  );
};

export default Register;
