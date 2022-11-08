import useApi from '@/hooks/useApi';
import moment from 'moment';
import {
  Button,
  Text,
  Space,
  Grid,
  Box,
  Center,
  Divider,
  NumberInput,
  Textarea,
  Loader,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import API from '@/api/BaseApi';

const measurements = ['BP', 'A1C', 'Neck', 'Waist', 'Hips'];
const columns = ['bp', 'a1c', 'neck', 'waist', 'hips'];
const placeholders = ['110/80', '5.7%', '120cm', '100cm', '90cm'];

const HealthVitals = () => {
  const [updated, setUpdated] = useState(false);
  const [healthVital, fetching] = useApi(
    {
      method: 'GET',
      url: '/vitals',
    },
    [updated]
  );

  const form = useForm({
    initialValues: {
      bp: '',
      a1c: '',
      neck: '',
      waist: '',
      hips: '',
      notes: '',
      weight: '',
    },
    validate: {
      bp: (value) => {
        if (value === '') {
          return 'BP is required';
        }
        return null;
      },
      a1c: (value) => {
        if (value === '') {
          return 'A1C is required';
        }
        return null;
      },
      neck: (value) => {
        if (value === '') {
          return 'Neck is required';
        }
        return null;
      },
      waist: (value) => {
        if (value === '') {
          return 'Waist is required';
        }
        return null;
      },
      hips: (value) => {
        if (value === '') {
          return 'Hips is required';
        }
        return null;
      },
      notes: (value) => {
        if (value === '') {
          return 'Notes is required';
        }
        return null;
      },
      weight: (value) => {
        if (value === '') {
          return 'Weight is required';
        }
        return null;
      },
    },
  });

  const handleSubmit = (values) => {
    const options = {
      method: 'POST',
      url: '/vitals',
      data: { ...values },
    };
    API.request(options)
      .then(({ data }) => {
        if (data) {
          form.reset();
          setUpdated(!updated);
        }
      })
      .catch(({ response }) => {
        form.setErrors({
          bp: true,
          a1c: true,
          neck: true,
          waist: true,
          hips: true,
          notes: true,
          weight: true,
        });
      });
  };

  return (
    <Box>
      {fetching && (
        <Center>
          <Loader />
        </Center>
      )}
      {!fetching && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text sx={{ fontSize: 24, fontWeight: 700 }}>
            Update and track health vitals
          </Text>
          <Space h={32} />
          <Grid>
            <Grid.Col span={6}>
              <NumberInput
                label='Enter today’s weight'
                size='lg'
                rightSectionWidth={70}
                styles={{
                  error: { fontSize: '12px' },
                  label: { fontSize: '16px' },
                }}
                style={{ width: '168px' }}
                hideControls
                rightSection={
                  <Box sx={{ display: 'flex' }}>
                    <Divider
                      sx={{ height: '34px', marginRight: 13 }}
                      orientation='vertical'
                    />
                    <Center>
                      <Text sx={{ fontSize: 14 }}>lbs</Text>
                    </Center>
                  </Box>
                }
                {...form.getInputProps('weight')}
                precision={2}
                placeholder={'165.00'}
              />
              <Space h={16} />
              <Text sx={{ color: '#6E7385', fontSize: 14 }}>
                Last recorded weight:{' '}
                {healthVital ? (
                  <>
                    {healthVital.weight} lbs on{' '}
                    {moment(healthVital.created_at).format('D MMM YYYY')}
                  </>
                ) : (
                  <>No Record Yet</>
                )}
              </Text>
              <Space h={32} />
              <Textarea
                placeholder='Your comment'
                label='Your comment'
                minRows={5}
                styles={{
                  label: { fontSize: '16px' },
                  input: { width: '500px' },
                }}
                {...form.getInputProps('notes')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Box>
                <Grid>
                  <Grid.Col span={5} sx={{ padding: 0 }}>
                    <Box sx={{ padding: '20px 16px' }}>
                      <Text sx={{ fontSize: '16px' }}>Other Measurements</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={4} sx={{ padding: 0 }}>
                    <Box sx={{ padding: '20px 16px' }}>
                      <Text sx={{ fontSize: '16px' }}>Last Entry</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={3} sx={{ padding: 0 }}>
                    <Box sx={{ padding: '20px 16px' }}>
                      <Text sx={{ fontSize: '16px' }}>Today's Entry</Text>
                    </Box>
                  </Grid.Col>
                </Grid>
                <Divider my='sm' />
                <Grid>
                  {measurements.map((measurement, id) => (
                    <Grid.Col span={12} key={id}>
                      <Box
                        sx={{
                          height: 68,
                          backgroundColor: id % 2 != 0 && '#F8F9FD',
                        }}
                      >
                        <Grid>
                          <Grid.Col span={5} sx={{ padding: 0 }}>
                            <Box sx={{ padding: '25px 21px' }}>
                              <Text sx={{ fontSize: '16px' }}>
                                {measurement}
                              </Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={4} sx={{ padding: 0 }}>
                            <Box sx={{ padding: '25px 21px' }}>
                              <Text sx={{ fontSize: '16px' }}>
                                {healthVital ? (
                                  <>
                                    {healthVital[columns[id]]} on{' '}
                                    {moment(healthVital.created_at).format(
                                      'D MMM YYYY'
                                    )}
                                  </>
                                ) : (
                                  <>No Record Yet</>
                                )}
                              </Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col
                            span={3}
                            sx={{
                              paddingLeft: 20,
                              paddingBottom: 16,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ width: '100%' }}>
                              {columns[id] == 'bp' || columns[id] == 'a1c' ? (
                                <TextInput
                                  size='md'
                                  styles={{
                                    root: {
                                      display: 'flex',
                                    },
                                    wrapper: {
                                      maxWidth: '84px',
                                      marginRight: '8px',
                                      display: 'flex',
                                      alignItems: 'center',
                                    },
                                  }}
                                  hideControls
                                  {...form.getInputProps(columns[id])}
                                  placeholder={placeholders[id]}
                                />
                              ) : (
                                <NumberInput
                                  size='md'
                                  styles={{
                                    root: {
                                      display: 'flex',
                                    },
                                    wrapper: {
                                      maxWidth: '84px',
                                      marginRight: '8px',
                                      display: 'flex',
                                      alignItems: 'center',
                                    },
                                  }}
                                  hideControls
                                  {...form.getInputProps(columns[id])}
                                  precision={2}
                                  placeholder={placeholders[id]}
                                />
                              )}
                            </Box>
                          </Grid.Col>
                        </Grid>
                      </Box>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            </Grid.Col>
          </Grid>
          <Space h={32} />
          <Center>
            <Button size='md' type='submit'>
              <Text>Save Changes</Text>
            </Button>
          </Center>
        </form>
      )}
    </Box>
  );
};

export default HealthVitals;
