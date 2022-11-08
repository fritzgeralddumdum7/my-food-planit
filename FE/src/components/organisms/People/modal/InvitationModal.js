import {
  Box,
  Text,
  Button,
  Divider,
  TextInput,
  Loader,
  Center,
} from '@mantine/core';
import Modal from '@/components/organisms/Modal';
import { useClipboard } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import API from '@/api/BaseApi';
import useApi from '@/hooks/useApi';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';

const InvitationModal = ({ opened, setOpened, setSubmitted, submitted }) => {
  const clipboard = useClipboard({ timeout: 500 });
  const [submitting, setSubmitting] = useState(false);

  const [inviteData, fetching] = useApi(
    {
      method: 'POST',
      url: `/friend/code`,
    },
    []
  );

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = (values) => {
    setSubmitting(true);

    const options = {
      method: 'POST',
      url: '/friend/invite',
      data: { ...values, url: inviteData.url, name: inviteData.name },
    };
    API.request(options)
      .then(({ response }) => {
        setSubmitting(false);
        showNotification({
          color: 'green',
          message: 'Email sent.',
        });
        // setOpened(false);
        setSubmitted(!submitted);
        form.setFieldValue('email', '');
      })
      .catch(({ response }) => {
        setSubmitting(false);
        form.setErrors({ email: response.data.message });
      });
  };

  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      header={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>Invite Friend</Box>
      }
      padding={0}
      size={'40%'}
      width={'703px'}
      height={'535px'}
    >
      {fetching && (
        <Center>
          <Loader />
        </Center>
      )}
      {!fetching && (
        <>
          <Divider />
          <Box sx={{ padding: 32, height: '100%' }}>
            <Text sx={{ fontSize: 20, fontWeight: 400 }}>Invite by link</Text>
            <Text sx={{ fontSize: 16, fontWeight: 400, color: '#7E7E7E' }}>
              Copy and share this link your friend. You can post this on your
              social media to boost your friend list.
            </Text>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginTop: 25,
              }}
            >
              <Box
                sx={{
                  width: 518,
                  height: 40,
                  marginRight: 16,
                  backgroundColor: '#F3F6F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  padding: '10px 21px',
                }}
              >
                <Text
                  sx={{
                    color: '#1A1C1F',
                    fontWeight: 700,
                    fontSize: 16,
                    verticalAlign: 'center',
                  }}
                >
                  {inviteData && inviteData.url}
                </Text>
              </Box>
              <Button
                variant='outline'
                color='006C52'
                sx={{ width: 105 }}
                onClick={() => clipboard.copy(inviteData && inviteData.url)}
              >
                <Text sx={{ fontSize: 14 }}>
                  {clipboard.copied ? 'Copied' : 'Copy'}
                </Text>
              </Button>
            </Box>
            <Divider sx={{ margin: 32 }} />
            <Text sx={{ fontSize: 20, fontWeight: 400 }}>Invite by email</Text>
            <Text sx={{ fontSize: 16, fontWeight: 400, color: '#7E7E7E' }}>
              Enter your friend’s email address
            </Text>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'start',
                  width: '100%',
                  marginTop: 25,
                }}
              >
                <TextInput
                  placeholder="Enter your friend's email"
                  sx={{ width: '518px' }}
                  disabled={submitting}
                  {...form.getInputProps('email')}
                />
                <Button
                  disabled={submitting}
                  variant='filled'
                  color='#006C52'
                  sx={{ width: 105, marginLeft: 16 }}
                  type='submit'
                >
                  <Text sx={{ fontSize: 14 }}>Invite</Text>
                </Button>
              </Box>
            </form>
          </Box>
        </>
      )}
    </Modal>
  );
};

export default InvitationModal;
