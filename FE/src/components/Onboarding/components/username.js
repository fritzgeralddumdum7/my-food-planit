import API from '@/api/BaseApi';
import { Text, Space, TextInput, Anchor, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

const Username = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
    },
    validate: {
      username: (value) =>
        value.length === 0 || value === '' ? 'Username is required' : null,
    },
  });

  const handleSubmit = (values) => {
    let { mfpHelp } = router.query;

    const options = {
      method: 'POST',
      url: '/username',
      data: { ...values },
    };
    API.request(options)
      .then(() => {
        router.push(`/register/success?mfpHelp=${mfpHelp}`);
      })
      .catch(({ response }) => {
        form.setErrors({ username: response.data.message });
      });
  };
  return (
    <>
      <Text style={{ fontSize: 40, color: '#0F1514', fontWeight: '700' }}>
        Create your username
      </Text>
      <Space h={25} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          id='input-demo'
          placeholder='Username'
          size='xl'
          styles={{
            error: { fontSize: '12px' },
          }}
          {...form.getInputProps('username')}
        />
        <Space h={40} />
        <Anchor size={14}>
          <Button
            fullWidth
            size='xl'
            type='submit'
            style={{ backgroundColor: '#006C52' }}
          >
            <Text>Continue</Text>
          </Button>
        </Anchor>
      </form>
    </>
  );
};

export default Username;
