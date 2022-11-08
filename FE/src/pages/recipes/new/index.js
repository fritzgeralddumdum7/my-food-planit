import { useEffect, useState } from 'react';
import parse from 'parse-ingredients';
import { useRouter } from 'next/router';
import API from '@/api/BaseApi';
import DashboardWrapper from '@/templates/DashboardWrapper';
import { styles } from '@/components/organisms/Recipe/Import/styles';
import Main from '@/templates/Main';
import TagInput from '@/components/molecules/TagInput';
import CloseCircle from '@/icons/CloseCircle';
import ChevronDown from '@/icons/Chevrondown';
import Info from '@/icons/info';
import {
  parseIngredients,
  calculateNutritionPerServing,
} from '@/helpers/ingredientsHelper';
import Breadcrumb from '@/components/organisms/Breadcrumb';
import { serving_select_data } from '@/consts/select_choices';
import { importRecipe } from '@/consts/infoMessage';

import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import FullPageSpinner from '@/components/molecules/FullPageSpinner';
import { showNotification } from '@mantine/notifications';
import {
  Box,
  Group,
  Button,
  Space,
  Title,
  InputWrapper,
  TextInput,
  Select,
  Textarea,
  Stack,
  Text,
  Checkbox,
  Divider,
} from '@mantine/core';

const Index = () => {
  let recipe;
  const router = useRouter();
  const {
    query: { type, id },
  } = router;
  const [tags, setTags] = useState([]);
  const [steps, setSteps] = useState([]);
  const [hasLink, toggle] = useToggle(false, [true, false]);
  const [instruction, setInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: null,
    ingredients: null,
    instruction: null,
    serving: null,
    url: null,
  });
  const [scraped, setScraped] = useState();

  function validURL(str) {
    let res = str.match(
      /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  const form = useForm({
    initialValues: {
      title: data.title,
      ingredients: data.ingredients,
      instruction: data.instruction,
      serving: data.serving,
      url: data.url,
    },

    validate: {
      title: (value) => {
        if (!value) {
          return 'Recipe name is required';
        } else if (value.length < 10) {
          return 'Recipe name must be atleast 10 characters';
        } else {
          return null;
        }
      },
      ingredients: (value) => (!value ? 'Ingredients is required' : null),
      serving: (value) => (!value ? 'Servings is required' : null),
      instruction: () =>
        !steps.length ? 'Please ENTER your instruction' : null,
      url: (value) =>
        value && !validURL(value) ? 'Please input valid link' : null,
    },
  });

  const setDirectionHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (instruction) {
        setSteps([...steps, instruction]);
        setInstruction('');
        form.setFieldValue('instruction', '');
      }
    }
  };

  const removeStep = (index) => {
    setSteps(steps.filter((step, i) => i !== index));
  };

  const fetchScrapedRecipe = (id) => {
    API.request({
      method: 'GET',
      url: `/scraper/show/${id}`,
    })
      .then(({ data }) => {
        if (!data.is_job_done) {
          return setTimeout(() => {
            return fetchScrapedRecipe(id);
          }, 2000);
        }

        if (data.error) {
          showNotification({
            color: 'red',
            message: 'Something went wrong.',
          });
          return setLoading(false);
        }

        const ingredients = parseIngredients(JSON.parse(data.nutritions));

        const buildrecipe = {
          ...recipe,
          ingredients: ingredients.match,
          ingrWithNutr: ingredients,
          nutritions: calculateNutritionPerServing(
            ingredients.match,
            recipe.serving
          ),
        };

        recipe = buildrecipe;
        localStorage.setItem('matchedRecipe', JSON.stringify(buildrecipe));

        router.push(`/recipes/import?id=${id ?? ''}&type=${type ?? ''}`);
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
        showNotification({ color: 'red', message: response?.data.message });
      });
  };

  const handleMatchIngredients = (values) => {
    setLoading(true);
    const serializedIngredients = values.ingredients
      .split('\n')
      .filter((it) => it)
      .map((ingr) => {
        try {
          const parsed = parse(ingr);
          return `${parsed.quantity ?? ''} ${parsed.unit ?? ''} ${
            parsed.ingredient
          }`;
        } catch (error) {
          return ingr;
        }
      });
    const buildRecipe = {
      ...values,
      directions: steps,
      ingredients: serializedIngredients,
      tags,
      image: type === 'manual' ? null : scraped?.image,
    };

    recipe = buildRecipe;
    localStorage.setItem(
      'scrapedRecipe',
      JSON.stringify({
        ...scraped,
        ingredients: serializedIngredients,
        name: values.title,
        serving: values.serving,
        url: values.url,
        instructions: steps,
        tags,
      })
    );

    console.table(buildRecipe.ingredients);

    API.request({
      method: 'GET',
      url: `/scraper/match-ingredient`,
      params: {
        id,
        ingrs: buildRecipe.ingredients,
      },
    }).then(({ data }) => {
      fetchScrapedRecipe(data.id);
    });
  };

  useEffect(() => {
    const errors = document.querySelectorAll(
      '.mantine-Select-error, .mantine-TextInput-error, .mantine-Textarea-error'
    );
    if (errors.length) {
      errors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [form.errors]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (type !== 'manual') {
      const scrapedRaw = JSON.parse(localStorage.getItem('scrapedRecipe'));
      setScraped(scrapedRaw);
      const scrapedValues = {
        title: scrapedRaw?.name,
        ingredients: scrapedRaw?.ingredients?.join('\n'),
        instruction: null,
        serving: scrapedRaw?.yield?.replace(/[^0-9]/g, '')[0] ?? null,
        url: scrapedRaw?.url,
      };

      setData(scrapedValues);
      form.setValues(scrapedValues);

      scraped?.tags && setTags(scrapedRaw.tags);
      // scraped?.instructions && setSteps(scraped.instructions); //remove population of instructions or directions
    }
  }, [router.isReady, type]);

  // if (!router.isReady) {
  //   return <>Loading...</>;
  // }

  return (
    <Main>
      {loading && <FullPageSpinner label='Matching Ingredients...' />}
      <form
        onSubmit={form.onSubmit(handleMatchIngredients)}
        style={{ paddingBottom: 70 }}
      >
        <DashboardWrapper label='Recipes'>
          <Breadcrumb
            items={[
              { title: 'My Recipes', href: '/recipes', color: '#006C52' },
              { title: 'Add a recipe manually', href: '#', color: '#7E8CA0' },
            ]}
          />
          <Divider my='sm' />
          <Box sx={{ width: 582 }}>
            <Box>
              <Box>
                <Space h={30} />
                <Title order={3} sx={{ fontSize: 24 }}>
                  Recipe Importer
                </Title>
                <Space h={32} />
                <Box spacing={32}>
                  <Group
                    sx={{ justifyContent: 'space-between', marginBottom: 24 }}
                  >
                    <Group>
                      <InputWrapper
                        label='Recipe Name'
                        sx={{ width: 480 }}
                        styles={() => ({
                          label: styles.label,
                        })}
                        pb={form.errors.serving && !form.errors.title ? 26 : 0}
                      >
                        <TextInput
                          {...form.getInputProps('title')}
                          styles={() => ({
                            input: {
                              ...styles.input,
                              background: '#F3F6F9',
                              border: '1px solid #E5ECF2',
                            },
                          })}
                        />
                      </InputWrapper>
                      <Select
                        {...form.getInputProps('serving')}
                        label='Servings'
                        data={serving_select_data}
                        rightSection={<ChevronDown width={40} height={40} />}
                        maxDropdownHeight={400}
                        nothingFound='Nobody here'
                        pb={!form.errors.serving && form.errors.title ? 26 : 0}
                        sx={{ width: 77 }}
                        styles={() => ({
                          label: styles.label,
                          input: {
                            ...styles.disabled,
                            ...styles.input,
                          },
                          root: {
                            whiteSpace: 'nowrap',
                          },
                          rightSection: { pointerEvents: 'none' },
                        })}
                      />
                    </Group>
                  </Group>
                </Box>
              </Box>
              <Box>
                <Textarea
                  {...form.getInputProps('ingredients')}
                  label='Ingredients'
                  autosize
                  minRows={9}
                  styles={() => ({
                    label: styles.label,
                    defaultVariant: {
                      background: '#F3F6F9',
                      border: '1px solid #E5ECF2',
                    },
                  })}
                />
              </Box>
              <Box>
                <Space h={24} />
                <Text weight='bold'>Tags</Text>
                <Space h={6} />
                <TagInput tags={tags} setTags={setTags} />
              </Box>
              <Box>
                <Space h={24} />
                <Text weight='bold'>Directions</Text>
                <Space h={6} />
                {steps.length > 0 && (
                  <Stack sx={styles.direction.container}>
                    <Stack
                      spacing={30}
                      sx={{
                        height: 'auto',
                        background: 'inherit',
                        borderRadius: 3,
                      }}
                    >
                      {steps.map((step, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                          <Textarea
                            placeholder='Your direction'
                            autosize
                            minRows={1}
                            styles={() => ({
                              defaultVariant: {
                                background: '#fff',
                                border: '1px solid #E5ECF2',
                                paddingTop: '15px !important',
                              },
                            })}
                            onChange={(e) =>
                              setSteps(
                                steps.map((step, idx) =>
                                  idx === index ? e.target.value : step
                                )
                              )
                            }
                            value={step}
                          />

                          <Text
                            weight='bold'
                            size='xs'
                            pt={4}
                            sx={{
                              position: 'absolute',
                              top: -10,
                              left: 15,
                              padding: '0 10px',
                              background: '#fff',
                              borderRadius: 10,
                            }}
                          >
                            Step {index + 1}
                          </Text>
                          <Box
                            onClick={() => removeStep(index)}
                            sx={{
                              position: 'absolute',
                              cursor: 'pointer',
                              top: -9,
                              right: -9,
                            }}
                          >
                            <CloseCircle
                              withCircle={true}
                              width={20}
                              height={20}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}
                <Textarea
                  {...form.getInputProps('instruction')}
                  placeholder='Enter steps here...'
                  minRows={3}
                  styles={() => ({
                    defaultVariant: {
                      background: '#F3F6F9',
                      borderColor: '#E5ECF2',
                    },
                  })}
                  onKeyDown={setDirectionHandler}
                  onChange={(e) => setInstruction(e.target.value)}
                  value={instruction}
                />
                {/* <Text size='sm' color='#b5b5b5'>
                  <Info />
                  {importRecipe.direction_info}
                </Text> */}

                <Checkbox
                  label='Attach original link'
                  onChange={() => toggle()}
                  pt={12}
                  styles={() => ({
                    input: {
                      cursor: 'pointer',
                    },
                    label: {
                      fontSize: 16,
                    },
                  })}
                />
                {hasLink && (
                  <TextInput
                    pt={12}
                    placeholder='Link here'
                    {...form.getInputProps('url')}
                  />
                )}
                <Space h={50} />
              </Box>
            </Box>
          </Box>
        </DashboardWrapper>
        <Group
          sx={{
            justifyContent: 'flex-end',
            background: '#fff',
            paddingRight: 70,
            borderTop: '1px solid #E5ECF2',
            marginTop: -75,
            position: 'fixed',
            bottom: 0,
            width: '100%',
          }}
          py={45}
        >
          <Button type='submit' sx={{ width: 175 }}>
            Match Ingredients
          </Button>
        </Group>
      </form>
    </Main>
  );
};

export default Index;
