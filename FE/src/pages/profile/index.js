import PropTypes from 'prop-types';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import RoundCloseButton from '@/components/molecules/RoundCloseButton';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import {
  Center,
  Text,
  Grid,
  Card,
  Avatar,
  Group,
  Box,
  Container,
  Tooltip,
  Transition,
  TextInput,
  PasswordInput,
  Button,
  Select,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { parseUsername } from '../../helpers/profileNameHelper';
import API from '@/api/BaseApi';
import Edit from '@/icons/Edit';
import useApi from '@/hooks/useApi';
import { Dropzone } from '@mantine/dropzone';
import { useRouter } from 'next/router';
import moment from 'moment';
import axios from 'axios';
import { useModalDispatch } from '@/contexts/ModalContextProvider';

const DisplayField = ({ field, value, span }) => {
  return (
    <Grid.Col span={span}>
      <Group direction={'column'} spacing={4}>
        <Text style={{ fontSize: '24px' }}>{value}</Text>
        <Text style={{ color: '#7A8394' }}>{field}</Text>
      </Group>
    </Grid.Col>
  );
};

const Index = () => {
  const modalDispatch = useModalDispatch();
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState('');
  const [droppedImage, setDroppedImage] = useState('');
  const [user, fetching] = useApi({ method: 'GET', url: 'users/profile' }, [
    edit,
    updated,
  ]);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: user?.name,
      email: user?.email,
      username: user?.user_detail?.username,
      password: null,
      new_password: null,
      confirm_password: null,
      gender: String(user?.user_detail?.gender),
      height: Number(user?.user_detail?.height),
      height_unit: String(user?.user_detail?.height_unit),
      DOB: moment.utc(user?.user_detail?.DOB),
      calorie_goal: user?.user_detail?.calorie_goal,
      goal_weight: Number(user?.user_detail?.goal_weight),
      weight_unit: user?.user_detail?.goal_weight_unit,
    },

    validate: {
      email: (value) =>
        value?.length > 0
          ? /^\S+@\S+$/.test(value)
            ? null
            : 'Invalid email'
          : null,
      password: (value) =>
        editPassword && value?.length == 0 ? 'Required' : null,
      new_password: (value) =>
        !editPassword
          ? null
          : value?.length == 0
          ? 'Required'
          : value != form.values.confirm_password
          ? ' '
          : value?.length < 10
          ? 'Password must be at least 10 characters'
          : null,
      confirm_password: (value) =>
        !editPassword
          ? null
          : value?.length == 0
          ? 'Required'
          : value != form.values.new_password
          ? 'Passwords do not match'
          : null,
    },
  });

  // useEffect(() => {
  //   if (fetching || edit) {
  //     return;
  //   }
  //   if (form.validate().hasErrors) {
  //     return setEdit(true);
  //   }

  //   // const h = parseHeight(form.values.height);
  //   // form.setFieldValue('DOB', moment.utc(form.values.DOB).valueOf());
  //   API.request({
  //     method: 'POST',
  //     url: '/users/profile',
  //     enctype: 'multipart/form-data',
  //     data: { ...form.values },
  //   })
  //     .then(({ data }) => {
  //       setUpdated(!updated);
  //       form.clearErrors();
  //       form.reset();
  //       setError('');
  //     })
  //     .catch(($e) => {
  //       setEdit(true);
  //       setError($e.response.data);
  //     });
  // }, [edit]);

  const handleUpdate = (values) => {
    API.request({
      method: 'POST',
      url: '/users/profile',
      enctype: 'multipart/form-data',
      data: { ...values },
    })
      .then(({ data }) => {
        setUpdated(!updated);
        form.clearErrors();
        form.reset();
        setError('');

        showNotification({
          color: 'green',
          message: 'Updated Successfully',
        });
      })
      .catch(($e) => {
        setEdit(true);
        setError('Something Went Wrong!');
        console.error($e.response.data);
      });
  };

  // useEffect(() => {
  //   if (fetching) {
  //     return;
  //   }
  //   form.setFieldValue(
  //     'height',
  //     form.values.height_unit == 'cm'
  //       ? user?.user_detail?.height * 2.54
  //       : user?.user_detail?.height / 2.54
  //   );
  // }, [form.values.height_unit]);

  // const parseHeight = (height) => {
  //   if (form.values.height_unit == 1) {
  //     return height;
  //   }
  //   let base = Math.floor(height);
  //   let decimals = (height - base).toFixed(2) * 100;
  //   let dec = (decimals % 12).toFixed(2);
  //   let addBase = Math.floor(decimals / 12);
  //   return base + addBase + dec / 100;
  // };

  const inchToFt = (height) => {
    const h = height / 12;
    return h;
  };

  const ProfileCard = ({ styles }) => {
    return (
      <>
        <Container sx={{ ...styles }}>
          <Center style={{ height: '75vh' }}>
            <Grid>
              <Grid.Col span={4}>
                <Card
                  style={{
                    color: 'white',
                    maxWidth: '412px',
                    textAlign: 'center',
                    borderRadius: '25px',
                    backgroundColor: '#006C52',
                    padding: '64px 64px 128px 64px',
                  }}
                >
                  <Center>
                    <Grid>
                      <Grid.Col style={{ padding: '0' }} span={12}>
                        <Center>
                          <AvatarContainer />
                        </Center>
                      </Grid.Col>
                      <Grid.Col style={{ padding: '0' }} span={12}>
                        <Tooltip label={user.user_detail?.username}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: '32px',
                            }}
                          >
                            {user.user_detail?.username
                              ? parseUsername(user, 15)
                              : '-'}
                          </Text>
                        </Tooltip>
                      </Grid.Col>
                      <Grid.Col
                        span={12}
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '256px',
                          padding: '0',
                        }}
                      >
                        <Tooltip
                          wrapLines
                          withArrow
                          transition='fade'
                          transitionDuration={200}
                          label={user.email}
                        >
                          <Text
                            style={{
                              color: 'white',
                              opacity: '50%',
                              fontSize: '14px',
                              textAlign: 'center',
                            }}
                          >
                            {user.email}
                          </Text>
                        </Tooltip>
                      </Grid.Col>
                    </Grid>
                  </Center>
                </Card>
              </Grid.Col>
              <Grid.Col
                span={8}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Grid style={{ padding: '0px 32px' }}>
                  <DisplayField
                    span={4}
                    value={
                      user.user_detail && user.user_detail?.gender == 1
                        ? 'Male'
                        : user.user_detail && user.user_detail?.gender == 2
                        ? 'Female'
                        : '-'
                    }
                    field={'Gender'}
                  />
                  {/* <DisplayField
                  span={8}
                  value={'35553 KENAI SPUR HIGHWAY'}
                  field={'Location'}
                /> */}
                  {/* <DisplayField span={4} value={'99669'} field={'Zip Code'} />
                <DisplayField span={8} value={'PST'} field={'Timezone'} /> */}
                  <DisplayField
                    span={4}
                    value={user.user_detail?.height}
                    field={'Height'}
                  />
                  <DisplayField
                    span={8}
                    value={
                      user.user_detail?.height_unit == 'cm'
                        ? 'Centimeters(cm)'
                        : 'Inches (in)'
                    }
                    field={'Preferred unit system'}
                  />
                  {/* <DisplayField
                    span={4}
                    value={user.user_detail?.DOB}
                    field={'DOB'}
                  /> */}
                  <DisplayField
                    span={8}
                    value={
                      user.user_detail
                        ? `${Math.round(user.user_detail?.calorie_goal)} kcal`
                        : '-'
                    }
                    field={'Calorie Goal'}
                  />

                  <DisplayField
                    span={8}
                    value={
                      user.user_detail
                        ? `${Math.round(user.user_detail?.goal_weight)} ${
                            user.user_detail?.goal_weight_unit == 'kg'
                              ? 'kg'
                              : 'lbs'
                          }`
                        : '-'
                    }
                    field={'Goal(weight, nutrition goals)'}
                  />

                  <Grid.Col span={8}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        border: `${!edit ? '#7A8394' : 'white'} 3px solid`,
                        backgroundColor: `${!edit ? 'white' : 'green'}`,
                        borderRadius: '12px',
                        padding: '6px',
                        transition: 'all 0.25s ease-in-out 0.25s',
                        width: '40%',
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                      onClick={() => setEdit(!edit)}
                    >
                      <Text>Edit Profile</Text>
                      {/* <Edit
                        width={18}
                        height={18}
                        color={`${!edit ? '#7A8394' : 'white'}`}
                      /> */}
                    </Box>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Center>
        </Container>
      </>
    );
  };

  const ErrorMessage = () => {
    return (
      <Text sx={{ color: '#f0483c', margin: 'auto', marginTop: 5 }}>
        {error}
      </Text>
    );
  };

  useEffect(() => {
    if (fetching) {
      return;
    }
    setDroppedImage(user.user_detail?.image);
    form.reset();
    // setGender(user.user_detail?.gender);
    // setUnitSystem(user.user_detail?.height_unit);
    // setHeight(user.user_detail?.height);
    // setCalorieGoal(user.user_detail?.calorie_goal);
  }, [fetching]);

  const dropzoneChildren = (status) => (
    <Group position='center' spacing='xl' style={{ pointerEvents: 'none' }}>
      <Center>
        <Avatar key={droppedImage} size={143} radius={143} src={droppedImage} />
      </Center>
    </Group>
  );

  const handleDropzoneOnDrop = async (files) => {
    modalDispatch({ type: 'showSpinner' });
    const file = files[0];
    setDroppedImage(URL.createObjectURL(file));
    const signedUrl = await API.get('/users/signed-url');

    axios
      .request({
        headers: {
          'Content-Type': file.type,
        },
        method: 'PUT',
        data: file,
        url: signedUrl.data,
        onUploadProgress: (progressEvent) => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          modalDispatch({
            type: 'showSpinner',
            payload: {
              label: `Uploading ${percent}%`,
            },
          });
        },
      })
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        modalDispatch({
          type: 'hideSpinner',
        });
      });
  };
  const AvatarContainer = () => {
    return (
      <Dropzone
        accept={['image/png', 'image/jpeg', 'image/jpg']}
        onDrop={(files) => handleDropzoneOnDrop(files)}
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
        maxSize={3 * 1024 ** 2}
        styles={{
          root: {
            background: 'none',
            border: 'none',
            borderRadius: 1000,
          },
        }}
      >
        {(status) => dropzoneChildren(status)}
      </Dropzone>
    );
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <HeaderLogo />
      <form encType='multipart/form-data'>
        <Box
          sx={{
            position: 'fixed',
            top: '36px',
            right: '36px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box onClick={() => router.push('/dashboard')}>
            <RoundCloseButton />
          </Box>
        </Box>
        <Transition
          mounted={!fetching}
          transition='fade'
          duration={250}
          timingFunction='ease-in-out'
        >
          {(styles) => (
            <>
              {edit && !fetching ? (
                // Form Section
                <Container sx={{ ...styles }}>
                  <Center style={{ height: '75vh' }}>
                    <Grid>
                      <Grid.Col span={4}>
                        <Card
                          style={{
                            color: 'white',
                            maxWidth: '412px',
                            textAlign: 'center',
                            borderRadius: '25px',
                            backgroundColor: '#006C52',
                            padding: '64px 64px 128px 64px',
                          }}
                        >
                          <Center>
                            <Grid>
                              <Grid.Col style={{ padding: '0' }} span={12}>
                                <Center>
                                  <AvatarContainer />
                                </Center>
                              </Grid.Col>
                              <Grid.Col
                                span={12}
                                style={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  width: '256px',
                                  padding: '0',
                                }}
                              >
                                <TextInput
                                  styles={{
                                    filledVariant: {
                                      backgroundColor: '#006c52',
                                    },
                                    input: {
                                      color: 'white',
                                      fontSize: 20,
                                      borderBottom: '1px white solid',
                                      textAlign: 'center',
                                    },
                                  }}
                                  sx={{
                                    fontSize: 20,
                                    width: '100%',
                                    margin: 'auto',
                                    marginTop: 6,
                                  }}
                                  variant='filled'
                                  placeholder='Username'
                                  {...form.getInputProps('username')}
                                />
                              </Grid.Col>
                              <Grid.Col
                                span={12}
                                style={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  width: '256px',
                                  padding: '0',
                                  textAlign: 'center',
                                }}
                              >
                                <TextInput
                                  styles={{
                                    filledVariant: {
                                      backgroundColor: '#006c52',
                                    },
                                    input: {
                                      color: 'white',
                                      fontSize: 14,
                                      borderBottom: '1px white solid',
                                      textAlign: 'center',
                                    },
                                  }}
                                  sx={{
                                    fontSize: 14,
                                    width: '100%',
                                    margin: 'auto',
                                    marginTop: 6,
                                  }}
                                  variant='filled'
                                  placeholder='Email'
                                  {...form.getInputProps('email')}
                                />
                              </Grid.Col>
                            </Grid>
                          </Center>
                        </Card>
                      </Grid.Col>
                      <Grid.Col
                        span={8}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Grid style={{ padding: '0px 32px' }}>
                          {error && <ErrorMessage />}
                          <Grid.Col span={12}>
                            <Text style={{ color: '#7A8394' }}>Name</Text>
                            <TextInput
                              rightSection={<Edit color='white' />}
                              sx={{
                                fontSize: 32,
                                width: '100%',
                              }}
                              autoFocus
                              {...form.getInputProps('name')}
                            />
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Text style={{ color: '#7A8394' }}>Gender</Text>
                            <Select
                              sx={{ width: '50%' }}
                              data={[
                                { value: '1', label: 'Male' },
                                { value: '2', label: 'Female' },
                              ]}
                              {...form.getInputProps('gender')}
                            />
                          </Grid.Col>

                          <Grid.Col span={2}>
                            <NumberInput
                              hideControls
                              placeholder='Height'
                              label='Height'
                              {...form.getInputProps('height')}
                            />
                          </Grid.Col>

                          <Grid.Col span={8}>
                            <Select
                              sx={{ width: '50%' }}
                              data={[
                                { value: 'cm', label: 'Centimeters (cm)' },
                                { value: 'in', label: 'Inches (in)' },
                              ]}
                              label='Preferred unit system'
                              {...form.getInputProps('height_unit')}
                            />
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Text
                              style={{ color: '#7A8394', marginTop: '5px' }}
                            >
                              Calorie Goal (kcal)
                            </Text>
                            <NumberInput
                              styles={{
                                input: {
                                  width: '50%',
                                },
                              }}
                              placeholder='Calorie Goal'
                              {...form.getInputProps('calorie_goal')}
                              hideControls
                            />
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Text style={{ color: '#7A8394' }}>
                              Goal(weight, nutrition goals)
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={5}>
                            <NumberInput
                              label='Weight'
                              {...form.getInputProps('goal_weight')}
                              hideControls
                            />
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Select
                              data={[
                                { value: 'kg', label: 'Kilogram (kg)' },
                                { value: 'lbs', label: 'Pounds (lbs)' },
                              ]}
                              label='Preferred unit system'
                              {...form.getInputProps('weight_unit')}
                            />
                          </Grid.Col>
                          <Grid.Col
                            span={12}
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '256px',
                              paddingBottom: 0,
                            }}
                          >
                            <Text
                              style={{ color: '#7A8394', marginTop: '5px' }}
                            >
                              Password Setting
                            </Text>
                            <Button
                              sx={{
                                border: 'green 1px solid',
                                marginTop: 6,
                                marginBottom: 6,
                              }}
                              variant='outline'
                              onClick={() => setEditPassword(!editPassword)}
                            >
                              Change Password
                            </Button>
                          </Grid.Col>
                          <Grid.Col
                            span={12}
                            sx={{
                              padding: `${editPassword ? '8' : '0'}px 8px`,
                            }}
                          >
                            <Transition
                              mounted={editPassword}
                              transition='scale'
                            >
                              {(passwordStyles) => (
                                <Container
                                  sx={{
                                    ...passwordStyles,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignContent: 'start',
                                    padding: 0,
                                  }}
                                >
                                  <Box
                                    style={{
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      width: '256px',
                                      padding: '0',
                                    }}
                                  >
                                    <PasswordInput
                                      rightSection={
                                        <Edit
                                          color='white'
                                          width={14}
                                          height={14}
                                        />
                                      }
                                      styles={{
                                        filledVariant: {
                                          backgroundColor: '#006c52',
                                        },
                                        innerInput: {
                                          color: 'white',
                                          fontSize: 14,
                                        },
                                      }}
                                      sx={{
                                        fontSize: 14,
                                      }}
                                      placeholder='Current Password'
                                      {...form.getInputProps('password')}
                                    />
                                  </Box>
                                  <Box
                                    style={{
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      width: '256px',
                                      padding: '0',
                                    }}
                                  >
                                    <PasswordInput
                                      rightSection={
                                        <Edit
                                          color='white'
                                          width={14}
                                          height={14}
                                        />
                                      }
                                      styles={{
                                        filledVariant: {
                                          backgroundColor: '#006c52',
                                        },
                                        error: {
                                          whiteSpace: 'pre-wrap',
                                        },
                                        innerInput: {
                                          color: 'white',
                                          fontSize: 14,
                                        },
                                      }}
                                      sx={{
                                        fontSize: 14,
                                        margin: 'auto',
                                        marginTop: 6,
                                      }}
                                      placeholder='New Password'
                                      {...form.getInputProps('new_password')}
                                    />
                                  </Box>
                                  <Box
                                    style={{
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      width: '256px',
                                      padding: '0',
                                    }}
                                  >
                                    <PasswordInput
                                      rightSection={
                                        <Edit
                                          color='white'
                                          width={14}
                                          height={14}
                                        />
                                      }
                                      styles={{
                                        filledVariant: {
                                          backgroundColor: '#006c52',
                                        },
                                        innerInput: {
                                          color: 'white',
                                          fontSize: 14,
                                        },
                                      }}
                                      sx={{
                                        fontSize: 14,
                                        margin: 'auto',
                                        marginTop: 6,
                                      }}
                                      placeholder='Confirm Password'
                                      {...form.getInputProps(
                                        'confirm_password'
                                      )}
                                    />
                                  </Box>
                                </Container>
                              )}
                            </Transition>
                          </Grid.Col>
                          <Grid.Col
                            span={8}
                            sx={{
                              padding: '0px 8px',
                              marginTop: '30px',
                            }}
                          >
                            <Button
                              sx={{
                                ...styles,
                                // margin: 'auto',
                                color: `${!edit ? 'black' : 'white'}`,
                                transition: 'all 0.25s ease-in-out 0.5s',
                                width: '35%',
                              }}
                              onClick={form.onSubmit(handleUpdate)}
                            >
                              Save
                            </Button>
                            <Button
                              sx={{
                                ...styles,
                                marginLeft: '10px',
                                color: 'white',
                                transition: 'all 0.25s ease-in-out 0.5s',
                                width: '35%',
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                setEdit(!edit);
                              }}
                            >
                              Cancel
                            </Button>

                            {/* <Edit
                                width={28}
                                height={28}
                                color={`${!edit ? '#7A8394' : 'white'}`}
                              /> */}
                          </Grid.Col>
                        </Grid>
                      </Grid.Col>
                    </Grid>
                  </Center>
                </Container> // Form Section
              ) : (
                <ProfileCard styles={styles} />
              )}
            </>
          )}
        </Transition>
      </form>
    </Main>
  );
};

export default Index;

DisplayField.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  span: PropTypes.number,
};

DisplayField.defaultProps = {
  field: '-',
  value: '-',
  span: 0,
};
