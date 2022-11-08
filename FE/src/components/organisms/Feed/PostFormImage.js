import { Box, BackgroundImage, Overlay } from '@mantine/core';
import Trash from '@/icons/Trash';
import { useHover } from '@mantine/hooks';

const PostFormImage = ({imageUrl, handleRemovePreview}) => {
  const { hovered, ref } = useHover();
  return <Box
    sx={{ width: '150px', height: '150px', marginRight: '8px' }}
    ref={ref}
  >
    <BackgroundImage
      sx={{
        height: '100%',
        display: 'grid',
        position: 'relative'
      }}
      radius={6}
      src={imageUrl}
    >
      {hovered && <>
        <Box sx={{ width: '100%', height: '100%', zIndex: 2, color: 'white', position: 'absolute', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
          <Box sx={{ margin: 8, cursor: 'pointer' }}>
            <Trash width={24} height={24} color={'#fff'} onClick={handleRemovePreview}/>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
          <Overlay sx={{
            borderRadius: '6px'
          }} opacity={0.6} color="#000" zIndex={5} />
        </Box>
      </>}
    </BackgroundImage>
  </Box>
};

export default PostFormImage;
