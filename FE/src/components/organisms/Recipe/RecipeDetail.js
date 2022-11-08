import { useReipeDetailCTX } from '@/contexts/RecipeDetailContext';
import { dummyFoodIcon } from '@/consts/imageUrls';
import {
  Box,
  Space,
  BackgroundImage,
  Group,
  Title,
  Text,
  Badge,
  Stack,
} from '@mantine/core';
import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const RecipeDetail = ({ setTitle }) => {
  const data = useReipeDetailCTX();
  const calories = JSON.parse(data.nutritions).calories;
  const matches = useMediaQuery('(max-width: 1250px)');

  useEffect(() => setTitle(data.title), [data]);

  const Preview = () => {
    return <>
      <BackgroundImage
        style={{ borderRadius: 10, width: 280, height: 280 }}
        src={data?.image ?? dummyFoodIcon}
        alt='Food'
      />
      <Stack sx={{ height: '100%', paddingTop: 20 }}>
        <Title order={1} sx={{ height: '100%', width: !matches && 572, fontSize: 40 }}>
          {data?.title}
        </Title>
        <Stack position='apart' sx={{ height: '100%' }}>
          <Group sx={{ paddingTop: 10 }}>
            <Box sx={{ width: 'auto', paddingRight: 20 }}>
              <Title sx={{ fontSize: 24 }}>
                {calories ? parseInt(calories) : '-'}
              </Title>
              <Text size='sm' color='#757575'>
                calories per serving
              </Text>
            </Box>
            <Box
              sx={{
                width: 'auto',
                borderLeft: '1px solid #E6E9ED',
                paddingLeft: 20,
              }}
            >
              <Title sx={{ fontSize: 24 }}>{data?.serving}</Title>
              <Text size='sm' color='#757575'>
                Serving
              </Text>
            </Box>
          </Group>
          <Group>
            <Text size='sm' color='#757575'>
              Tags:
            </Text>
            {data?.tags?.map((tag) => (
              <Badge
                key={tag.id}
                sx={{
                  background: '#F3F6F9',
                  color: '#006C52',
                  textTransform: 'capitalize',
                  height: 34,
                  borderRadius: 6,
                }}
                size='xl'
              >
                {tag.label}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Stack>
    </>
  }

  return (
    <>
      <Space h={40} />
      {
        matches ? 
        <Stack>
          <Preview />
        </Stack> :
        <Group>
          <Preview />
        </Group>
      }
      <Space h={60} />
    </>
  );
};

export default RecipeDetail;
