import React, { useRef } from 'react';
import Meta from '@/layout/Meta';
import Logo from '@/icons/Logo';
import MFP from '@/icons/MFP';
import Main from '@/templates/Main';
import FoodImage from '@/components/molecules/FoodImage';
import {
  Box,
  Group,
  Text,
  Stack,
  Grid,
  Title,
  Container,
  Button,
  Center,
  Space,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { NextLink } from '@mantine/next';
import PropTypes from 'prop-types';

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER_API}/api/print-recipe`
  );
  const items = await res.json();

  const paths = items.map((item) => ({
    params: { code: item.code },
  }));

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER_API}/api/print-recipe/${params.code}`
  );
  const data = await res.json();

  let recipes = [];
  JSON.parse(data?.content).map((items) => {
    items.ingredients.map((ing) => recipes.push(ing.ingr));
  });

  return {
    // Passed to the page component as props
    props: { data, recipes },
    revalidate: 1,
  };
}

const Index = ({ data, recipes }) => {
  const componentRef = useRef();
  const router = useRouter();
  const { code } = router.query;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const proceedToCheckout = () => {
    const recipeUrl = encodeURI(
      `${process.env.NEXT_PUBLIC_FE_URL}/shop/print/${code}`
    );
    console.log(recipeUrl);
    window.open(
      `https://www.instacart.com/store/partner_recipes?recipeSourceUrl=${recipeUrl}&utm_source=instacart_growth_partnerships&utm_medium=partner_recipe_recipemaker&recipeSourceOrigin=recipemaker`
    );
  };

  // if (data?.is_print) {
  //   handlePrint();
  // }

  return (
    <Main
      meta={
        <Meta
          title='[Print]My Food Plan It'
          description='[Print]Lorem Ipsum'
          recipe={recipes}
        />
      }
    >
      <Container size='xs' py={50} ref={componentRef}>
        <NextLink href='/' passHref>
          <Center>
            <Logo />
            <Space w={8} />
            <MFP />
          </Center>
        </NextLink>
        <Space h={25} />
        <Box>
          {!!data &&
            JSON.parse(data.content).map((food, i) => (
              <Stack spacing={0} key={i} pt={10}>
                <Grid>
                  <Grid.Col span={5}>
                    <Group align='start'>
                      <FoodImage
                        title={food.title}
                        src={food.image}
                        radius='md'
                        width={80}
                        height={60}
                        textSize={30}
                      />
                      <Title
                        order={6}
                        sx={{
                          background: '#fff',
                          color: '#000000',
                          flex: 1,
                        }}
                      >
                        {food.title}
                      </Title>
                    </Group>
                  </Grid.Col>
                </Grid>
                {food.ingredients.map((ingredient) => (
                  <Box key={i} sx={{ borderBottom: '1px solid #E6E6E6' }}>
                    <Group
                      py={20}
                      position='apart'
                      sx={{
                        position: 'relative',
                      }}
                    >
                      <Text sx={{ fontSize: 14, flex: 1 }} weight={400}>
                        {ingredient.ingr}
                      </Text>
                    </Group>
                  </Box>
                ))}
              </Stack>
            ))}
        </Box>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {data?.is_checkout ? (
          <Button
            mt={20}
            size='md'
            sx={{ fontSize: 14 }}
            onClick={() => proceedToCheckout()}
          >
            Proceed to Checkout
          </Button>
        ) : (
          ''
        )}

        {data?.is_print ? (
          <Button
            mt={20}
            size='md'
            sx={{ fontSize: 14 }}
            onClick={() => handlePrint()}
          >
            Print
          </Button>
        ) : (
          ''
        )}
      </div>
      {/* </Main> */}
    </Main>
  );
};

Index.propTypes = {
  data: PropTypes.object,
  recipes: PropTypes.any,
};

export default Index;
