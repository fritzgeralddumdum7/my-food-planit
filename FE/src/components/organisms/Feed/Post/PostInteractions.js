import MessageCircle from '@/icons/MessageCircle';
import ThumbsUp from '@/icons/ThumbsUp';
import {
  Space,
  Divider,
  Box,
  Text,
  Avatar,
  Textarea,
  Button,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import API from '@/api/BaseApi';

const PostInteractions = ({
  likes,
  commentCount,
  userHasLike,
  postId,
  dataComments,
}) => {
  const [viewComments, setViewComments] = useState(false);
  const [comments, setComments] = useState(dataComments);
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [userLike, setUserLike] = useState(userHasLike);
  const form = useForm({
    initialValues: {
      feedComment: '',
      postId: postId,
    },
    validate: {
      feedComment: (value) =>
        value.length === 0 || value === '' ? 'Feed Comment is required' : null,
    },
  });

  const handleComment = (values) => {
    const options = {
      method: 'POST',
      url: '/feed-comment/store',
      data: { ...values },
    };
    API.request(options).then(({ data }) => {
      setViewComments(false);
      form.reset();
      console.log(data);
      setComments(data);
    });
  };

  const handleLike = (postId) => {
    setLoading(true);
    const options = {
      method: 'POST',
      url: '/feed-like/like',
      params: { postId },
    };
    API.request(options).then(({ data }) => {
      if (data) {
        setLoading(false);
        setLikeCount(data.likeCount);
        setUserLike(data.liked.length > 0 ? true : false);
      }
      console.log(data);
    });
  };

  return (
    <>
      <Space h={24} />
      <Divider size='sm' />
      <Space h={16} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <span onClick={() => handleLike(postId)} style={{ cursor: 'pointer' }}>
          <ThumbsUp
            width={24}
            height={24}
            color={userLike ? 'green' : '#101E51'}
          />
        </span>
        <Space w={14} />
        <Text sx={{ fontSize: 14, fontWeight: 500 }}>
          {likeCount} {likeCount <= 1 ? 'Like' : 'Likes'}
        </Text>
        <Space w={40} />
        <Group
          sx={{ cursor: 'pointer' }}
          onClick={() => setViewComments(!viewComments)}
        >
          <MessageCircle width={24} height={24} />
          <Text sx={{ fontSize: 14, fontWeight: 500 }}>
            {comments.length} Comments
          </Text>
        </Group>
      </Box>
      {viewComments && (
        <>
          <Space h={16} />
          <form onSubmit={form.onSubmit(handleComment)}>
            <Textarea
              placeholder='Write down your comment'
              autosize
              minRows={1}
              maxRows={3}
              {...form.getInputProps('feedComment')}
            />
            <Button sx={{ marginTop: 16, justifySelf: 'end' }} type='submit'>
              Comment
            </Button>
          </form>
          <Space h={16} />
          <Divider />
        </>
      )}
      <Space h={16} />
      {comments.map((comment, index) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }} mt={10} key={index}>
          <Avatar
            src={`${comment.user.user_detail.image}?cache=none`}
            radius='xl'
            size={32}
          />
          <Space w={16} />
          <Box>
            <Text sx={{ fontWeight: '500' }}>
              {comment.user.name
                ? comment.user.name
                : comment.user.user_detail.username}
            </Text>
            <Text sx={{ fontSize: 12, color: '#6B6D86', fontWeight: '450' }}>
              {comment.comment_text}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PostInteractions;
