import {
  Space,
  BackgroundImage,
  Box,
  Text,
  Center,
  Overlay,
  Image,
  Grid,
} from '@mantine/core';
import PropTypes from 'prop-types';

const PostImages = ({ feedImages }) => {
  return (
    <>
      <Space h={24} />
      <Grid>
        {/* <Box sx={{ display: 'flex', justifyContent: 'start' }}> */}
        <Grid.Col span={2} sx={{ maxWidth: 268, padding: 0, display: 'flex' }}>
          {feedImages.slice(0, 3).map((item, index) => (
            <div style={{ marginRight: 16, marginBottom: 16 }} key={index}>
              <Image
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                width={268}
                radius={6}
                height={250}
                src={item.image}
              />
            </div>
          ))}
          {feedImages.length > 3 && (
            <Box sx={{ width: '268px', height: '250px' }}>
              <BackgroundImage
                sx={{
                  height: '100%',
                  display: 'grid',
                  position: 'relative',
                }}
                radius={6}
                src={feedImages[3].image}
              >
                <Box
                  sx={{
                    width: '268px',
                    height: '100%',
                    zIndex: 2,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Center>
                    <Text
                      sx={{ color: 'white', fontSize: 24, fontWeight: 500 }}
                    >
                      {feedImages.length - 3} +
                    </Text>
                  </Center>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                  }}
                >
                  <Overlay
                    sx={{
                      borderRadius: '6px',
                    }}
                    opacity={0.6}
                    color='#000'
                    zIndex={5}
                  />
                </Box>
              </BackgroundImage>
            </Box>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

PostImages.propTypes = {
  feedImages: PropTypes.arrayOf(
    PropTypes.exact({
      user: PropTypes.object,
      feed_text: PropTypes.string,
      feed_images: PropTypes.array,
    })
  ),
};
export default PostImages;
