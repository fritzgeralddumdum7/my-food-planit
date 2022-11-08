import { useEffect, useRef, useState } from 'react';
import { useFeedCTX } from '@/contexts/FeedContext';
import AttachPhoto from '@/icons/AttachPhoto';
import AttachDiary from '@/icons/AttachDiary';
import { Box, Space, Textarea, Button, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import API from '@/api/BaseApi';
import Trash from '@/icons/Trash';
import PostFormImage from './PostFormImage';
import PostSkeleton from './Post/PostSkeleton';
import FoodDiary from './FoodDiary';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import axios from 'axios';

const PostForm = () => {
  const modalDispatch = useModalDispatch();
  const {
    setPostFocus,
    hasFoodDiarySelected,
    setHasFoodDiarySelected,
    setHasNewData,
    showMoreRef,
    setOpened,
    getAddedData,
    foodDiary,
    foodDiaryCheckList,
    setFoodDiaryCheckList,
    mealsConfig,
  } = useFeedCTX();
  const inputFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState([]);

  const availableMeals = mealsConfig.filter((meal) =>
    Object.entries(foodDiaryCheckList).some(
      (checklist) => checklist[0] === meal.title && checklist[1]
    )
  );

  const form = useForm({
    initialValues: { feedText: '', images: [] },

    validate: {
      feedText: (value) => (value === '' ? 'Feed Text is required' : null),
    },
  });

  const selectedFoodDiary = availableMeals.map((meal) => {
    return foodDiary
      .map((food) => {
        if (meal.types.includes(food.meal_type)) {
          return {
            meal_type: food.meal_type,
            planable_type: food.planable_type,
            planable_id: food.planable_id,
          };
        }
      })
      .filter((item) => item !== undefined);
  });

  const [newPost, setNewPost] = useState(null);
  const [uploadingImgLength, setUploadingImgLength] = useState(null);

  const processData = async (data, images) => {
    setUploadingImgLength(data.urls.length ?? 0);
    data.urls?.forEach((url) => {
      const fileName = url.split('?')[0].split('/').pop();
      const file = images.filter((image) => image.name === fileName);
      modalDispatch({
        type: 'showSpinner',
        payload: {
          label: `Uploading ...`,
        },
      });
      axios
        .request({
          headers: {
            'Content-Type': file.type,
          },
          method: 'PUT',
          data: file[0],
          url: url,
        })
        .then(() => {
          setUploadingImgLength((oldData) => oldData - 1);
        })
        .catch((error) => {
          console.log({ error });
        });
    });
  };

  useEffect(() => {
    if (uploadingImgLength === 0) {
      getAddedData(newPost);

      //reset form
      setPostFocus(false);
      form.reset();
      setHasNewData(true);
      setHasFoodDiarySelected(false);
      setFoodDiaryCheckList({
        Breakfast: false,
        Lunch: false,
        Dinner: false,
        Snacks: false,
      });
      setNewPost(null);
      setUploadingImgLength(null);
      modalDispatch({ type: 'hideSpinner' });
    }
  }, [uploadingImgLength]);

  const handleSubmit = (values) => {
    if (loading) {
      return;
    }
    setLoading(true);
    let formData = new FormData();
    formData.append('feedText', values.feedText);
    const files = [];
    for (let i = 0; i < values.images.length; i++) {
      // formData.append('images[]', values.images[i]);
      files.push(values.images[i].name);
    }
    const foodDiaries = [];
    selectedFoodDiary.forEach((meals) =>
      meals.forEach((food) =>
        // formData.append(`foodDiaries[]`, JSON.stringify(food))
        foodDiaries.push(JSON.stringify(food))
      )
    );
    API.request({
      method: 'POST',
      url: '/feed/create',
      data: {
        feedText: values.feedText,
        files,
        foodDiaries,
      },
    })
      .then(({ data }) => {
        processData(data, values.images);
        setNewPost(data.feedData);
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => setLoading(false));
  };

  const onAttachPhoto = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const imageArray = [];
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFileUrl((prevFileUrl) => prevFileUrl.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      for (let i = 0; i < e.target.files.length; i++) {
        imageArray.push(e.target.files[i]);
      }
      form.setFieldValue('images', imageArray);
    }
  };

  const removePreview = (e) => {
    let removeFile = fileUrl.filter((item, index) => index !== e);
    setFileUrl(removeFile);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderRadius: 3,
          padding: '12px 16px',
          backgroundColor: '#F3F6F9',
          minHeight: '151px',
          width: '100%',
        }}
      >
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          encType='multipart/form-data'
        >
          <Textarea
            ref={showMoreRef}
            focus
            radius='xs'
            autosize
            required
            variant='filled'
            minRows={2}
            maxRows={6}
            styles={{
              input: {
                backgroundColor: '#F3F6F9',
                fontSize: 16,
                fontWeight: 450,
                border: 0,
                '&:focused': {
                  border: '0',
                },
              },
            }}
            {...form.getInputProps('feedText')}
          />
          <Space h={8} />

          {true && (
            <>
              <Box sx={{ display: 'flex' }}>
                {fileUrl.map((val, i) => (
                  <PostFormImage
                    imageUrl={val}
                    key={i}
                    handleRemovePreview={() => removePreview(i)}
                  />
                ))}
              </Box>
            </>
          )}
          {hasFoodDiarySelected && availableMeals.length ? (
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 20,
                marginBottom: 36,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text sx={{ fontWeight: 500 }}>My Food Diary</Text>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setHasFoodDiarySelected(false)}
                >
                  <Trash width={24} height={24} color={'#C8362E'} />
                </Box>
              </Box>
              <FoodDiary
                foods={foodDiary}
                checkList={foodDiaryCheckList}
                setCheckList={setFoodDiaryCheckList}
                meals={availableMeals}
              />
            </Box>
          ) : null}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'end',
                }}
              >
                <Group sx={{ cursor: 'pointer' }}>
                  <input
                    type='file'
                    ref={inputFileRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    multiple
                  />
                  <Group
                    onClick={() => {
                      onAttachPhoto();
                    }}
                  >
                    <AttachPhoto width={24} height={24} />
                  </Group>
                </Group>
                <Space w={12} />
                <Group
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setOpened(true)}
                >
                  <AttachDiary width={24} height={24} />
                </Group>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'end',
                }}
              >
                <Button
                  sx={{ padding: '12px 58px' }}
                  size='md'
                  type='submit'
                  loading={loading}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
      {loading ? (
        <Box mt={56}>
          <PostSkeleton />
        </Box>
      ) : (
        <> </>
      )}
    </Box>
  );
};

export default PostForm;
