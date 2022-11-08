import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useFeedCTX } from '@/contexts/FeedContext';
import PostImages from './Post/PostImages';
import PostInteractions from './Post/PostInteractions';
import API from '@/api/BaseApi';
import moment from 'moment';
import PostSkeleton from './Post/PostSkeleton';
import { Avatar, Box, Space, Text } from '@mantine/core';
import FoodDiary from './FoodDiary';

const Post = () => {
  const {
    feeds,
    loading: fetching,
    setHasLike: feedLike,
    lastItem: lastFeed,
    mealsConfig,
  } = useFeedCTX();
  const [loading, setLoading] = useState(false);
  const handleLike = (postId) => {
    setLoading(true);
    feedLike(false);
    const options = {
      method: 'POST',
      url: '/feed-like/like',
      params: { postId },
    };
    API.request(options).then(() => {
      setLoading(false);
      feedLike(true);
    });
  };

  const getAvailableMeals = (foodDiary) => {
    return mealsConfig.filter((meal) =>
      foodDiary.some(({ meal_type }) => meal.types.includes(meal_type))
    );
  };

  return (
    <>
      {loading || fetching ? (
        <Box mt={32}>
          <PostSkeleton />
        </Box>
      ) : (
        <> </>
      )}
      {feeds.map((feed, index) =>
        feeds.length == index + 1 ? (
          <Box
            sx={{
              boxShadow: '0px 5px 10px #EEF1F4',
              borderRadius: 15,
              padding: '24px',
              marginBottom: '24px',
            }}
            key={feed.id}
            ref={lastFeed}
          >
            <div>
              <Box sx={{ display: 'flex' }}>
                <Avatar
                  key={feed.user.user_detail.image}
                  src={feed.user.user_detail.image}
                  radius='xl'
                  size={48}
                />
                <Space w={16} />
                <Box>
                  <Text sx={{ fontWeight: 500 }}>
                    {feed.user.name
                      ? feed.user.name
                      : feed.user.user_detail?.username}
                  </Text>
                  <Space w={6} />
                  <Text sx={{ color: '#828282', fontSize: 12 }}>
                    {moment(feed.created_at).fromNow()}
                  </Text>
                </Box>
              </Box>
              <Space h={24} />
            </div>
            <Text
              sx={{
                color: '#6B6D86',
                fontWeight: 500,
                wordBreak: 'break-word',
              }}
            >
              {feed.feed_text}
            </Text>
            {feed.feed_images.length > 0 && (
              <PostImages feedImages={feed.feed_images} />
            )}
            {feed.feed_food_diares.length > 0 && (
              <FoodDiary
                foods={feed.feed_food_diares}
                checkList={{}}
                setCheckList={() => null}
                meals={getAvailableMeals(feed.feed_food_diares)}
              />
            )}
            <PostInteractions
              handleClick={() => handleLike(feed.id)}
              likes={feed.feed_likes_count}
              commentCount={feed.feed_comments_count}
              dataComments={feed.feed_comments && feed.feed_comments}
              userHasLike={feed.user_feed_like && feed.user_feed_like.liked}
              postId={feed.id}
            />
          </Box>
        ) : (
          <Box
            sx={{
              boxShadow: '0px 5px 10px #EEF1F4',
              borderRadius: 15,
              padding: '24px',
              marginBottom: '24px',
            }}
            key={feed.id}
          >
            <div>
              <Box sx={{ display: 'flex' }}>
              <Avatar
                  key={feed.user.user_detail.image}
                  src={feed.user.user_detail.image}
                  radius='xl'
                  size={48}
                />
                <Space w={16} />
                <Box>
                  <Text sx={{ fontWeight: 500 }}>
                    {feed.user.name
                      ? feed.user.name
                      : feed.user.user_detail?.username}
                  </Text>
                  <Space w={6} />
                  <Text sx={{ color: '#828282', fontSize: 12 }}>
                    {moment(feed.created_at).fromNow()}
                  </Text>
                </Box>
              </Box>
              <Space h={24} />
            </div>
            <Text
              sx={{
                color: '#6B6D86',
                fontWeight: 500,
                wordBreak: 'break-word',
              }}
            >
              {feed.feed_text}
            </Text>
            {feed.feed_images.length > 0 && (
              <PostImages feedImages={feed.feed_images} />
            )}
            {feed.feed_food_diares.length > 0 && (
              <FoodDiary
                foods={feed.feed_food_diares}
                checkList={{}}
                setCheckList={() => null}
                meals={getAvailableMeals(feed.feed_food_diares)}
              />
            )}
            <PostInteractions
              handleClick={() => handleLike(feed.id)}
              postId={feed.id}
              likes={feed.feed_likes_count}
              commentCount={feed.feed_comments_count}
              dataComments={feed.feed_comments && feed.feed_comments}
              userHasLike={feed.user_feed_like && feed.user_feed_like.liked}
            />
          </Box>
        )
      )}
      {!fetching && feeds.length == 0 ? (
        <Text align='center' size='xl' color='gray'>
          No Post Yet
        </Text>
      ) : (
        <> </>
      )}
    </>
  );
};

Post.propTypes = {
  feeds: PropTypes.arrayOf(
    PropTypes.exact({
      user: PropTypes.object,
      feed_text: PropTypes.string,
      feed_images: PropTypes.array,
      feed_comments: PropTypes.array,
      feed_likes_count: PropTypes.number,
    })
  ),
};

Post.defaultProps = {
  feeds: [],
};
export default Post;
