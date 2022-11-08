import { useRef } from 'react';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';

export const dropzoneChildren = () => (
  <Group
    position='center'
    spacing='xl'
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <div>
      <Text align='center' size='xl' color='#868e96' inline>
        Drag images here or click to select files
      </Text>
      <Text align='center' size='sm' color='#868e96' inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

const UploadImageModal = () => {
  const theme = useMantineTheme();
  const openRef = useRef(null);

  return (
    <>
      <Dropzone
        accept={['image/png', 'image/jpeg', 'image/jpg']}
        openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        maxSize={3 * 1024 ** 2}
        onReject={(reason) => {
          let errorMsg = '';
          const errorType = reason[0].errors[0].code;
          if (errorType === 'file-invalid-type') {
            errorMsg = 'Invalid file type';
          } else {
            errorMsg = reason[0].errors[0].message;
          }
          showNotification({
            color: 'red',
            message: errorMsg,
          });
        }}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position='center' mt='md'>
        <Button onClick={() => openRef.current()}>Select files</Button>
      </Group>
    </>
  );
};

export default UploadImageModal;
