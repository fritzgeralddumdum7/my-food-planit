import { useFeedCTX } from '@/contexts/FeedContext';
import Modal from '@/components/organisms/Modal';
import Post from './Post';
import PostForm from './PostForm';
import FoodDiaryModal from './Modal/AddFoodDiaryModal';
import UploadImageModal from './UploadImageModal';
import {
  Avatar,
  Box,
  Space,
  Text,
  Divider,
  Button,
  Skeleton,
} from '@mantine/core';
import useApi from '../../../hooks/useApi';

const FeedPage = () => {
  const {
    postFocus,
    setPostFocus,
    setHasImages,
    opened,
    setOpened,
    uploadModalOpened,
    setUploadModalOpened,
  } = useFeedCTX();

  const [user, fetching] = useApi({ method: 'GET', url: 'users/profile/' }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {!fetching ? (
          <Avatar
            key={user.user_detail.image}
            src={user.user_detail.image}
            radius='xl'
            size={48}
          />
        ) : (
          <Skeleton radius='xl' size={48} />
        )}
        <Space w={16} />
        {!postFocus && (
          <Box
            onClick={() => setPostFocus(true)}
            sx={{
              cursor: 'pointer',
              borderRadius: 3,
              padding: '0px 16px',
              backgroundColor: '#F3F6F9',
              height: '44px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text sx={{ color: '#6B6D86', fontWeight: '450' }}>
              Let's share your activity!
            </Text>
          </Box>
        )}
        {postFocus && <PostForm />}
      </Box>
      <Space h={42} />
      <Post />
      <Modal
        opened={opened}
        setOpened={setOpened}
        header={'Add Food Diary'}
        padding={0}
        size={'40%'}
        width={'700px'}
      >
        <FoodDiaryModal />
      </Modal>
      <Modal
        opened={uploadModalOpened}
        setOpened={setUploadModalOpened}
        header={'Upload Images'}
        padding={0}
        size={'40%'}
        width={'700px'}
      >
        <Divider />
        <Box sx={{ padding: '32px' }}>
          <UploadImageModal />
          <Space h={32} />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              onClick={() => {
                setUploadModalOpened(false);
                setHasImages(true);
              }}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FeedPage;
