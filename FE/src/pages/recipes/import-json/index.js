import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { JsonInput, Box, Container, Button, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import API from '@/api/BaseApi';
import parse from 'parse-ingredients';


const Index = () => {
  const [json, setJson] = useState('');
  const [message, setMessage] = useState('');

  const form = useForm({
    initialValues: {
      json: ''
    },
    validate: {
      json: (value) => {
        if (value === '') {
          return 'JSON is required';
        }
      }
    }
  });

  const handleSubmit = (values) => {
    let json = JSON.parse(values.json);
    json = json.map((recipe) => {
      let ingredients = recipe.ingredients_flat.map((ingredient) => {
        let parsedIngr = parse(`${ingredient.amount ?? ''} ${ingredient.unit ?? ''} ${ingredient.name}`);

        return `${parsedIngr.quantity ?? ''} ${parsedIngr.unit ?? ''} ${parsedIngr.ingredient}`
      })

      return {...recipe, ingredients };
    });

    values.json = JSON.stringify(json);

    const options = {
      method: 'POST',
      url: '/recipes/import-json',
      data: { ...values },
    };

    API.request(options).then(({ data }) => {
      if (data) {
        setMessage(data);
        setJson('');
        form.reset();
      }
    }).catch(({ response }) => {
      setMessage(response);
      console.error(response);
    })
  }

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Container>
        <Box sx={{ padding: '58px' }}>
          {message}
          <Space h={32} />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <JsonInput
              label="Recipes JSON"
              placeholder="Textarea will autosize to fit the content"
              validationError="Invalid JSON"
              formatOnBlur
              autosize
              minrows={4}
              name="json"
              styles={{
                input: {
                  maxHeight: '500px',
                  overflowY: 'scroll'
                }
              }}
              value={json}
              onChange={setJson}
              {...form.getInputProps('json')}
            />
            <Button type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Main>
  );
};

export default Index;
