import { useCallback } from 'react';
import {
  Divider,
  Grid,
  Stack,
  Title,
  Text,
  Box,
  Button,
  Group,
} from '@mantine/core';
import moment from 'moment';
import Item from './Item';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mantine/hooks';
import CloseCircle from '@/icons/CloseCircle';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import isEmpty from 'lodash/isEmpty';
import FoodImage from '@/components/molecules/FoodImage';
import API from '@/api/BaseApi';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

const Index = ({
  shopList,
  addToCartHandler,
  cartList,
  removeItemFromCart,
}) => {
  const router = useRouter();
  const matches = useMediaQuery('(max-width: 1370px)');
  const modalDispatch = useModalDispatch();
  const showShopIngredientsModal = useCallback(
    ({ title, cartList }) =>
      modalDispatch({
        type: 'showShopIngredientsModal',
        payload: {
          title,
          cartList,
          onPrint: (val) => {
            if (!val.length) {
              return showNotification({
                color: 'red',
                message: "You haven't selected any ingredients yet.",
              });
            }
            modalDispatch({
              type: 'hideShopIngredientsModal',
            });

            API.post('/print-recipe/', {
              is_print: 1,
              is_checkout: false,
              content: JSON.stringify(val),
            })
              .then(({ data }) => {
                window.open(`/shop/print/${data.code}`);
              })
              .catch(() =>
                showNotification({
                  color: 'red',
                  message: "Something wen't wrong",
                })
              );
          },
          onEmail: (val) => {
            if (!val.length) {
              return showNotification({
                color: 'red',
                message: "You haven't selected any ingredients yet.",
              });
            }
            modalDispatch({
              type: 'hideShopIngredientsModal',
            });
            modalDispatch({
              type: 'showSpinner',
            });
            API.post('/print-recipe/email', {
              is_print: false,
              content: JSON.stringify(val),
            })
              .then(() =>
                showNotification({
                  color: 'green',
                  message: 'Mail sent successfully',
                })
              )
              .catch(() =>
                showNotification({
                  color: 'red',
                  message: 'Something went wrong',
                })
              )
              .finally(() =>
                modalDispatch({
                  type: 'hideSpinner',
                })
              );
          },
          onCheckout: (val) => {
            if (!val.length) {
              return showNotification({
                color: 'red',
                message: "You haven't selected any ingredients yet.",
              });
            }
            modalDispatch({
              type: 'hideShopIngredientsModal',
            });

            API.post('/print-recipe/', {
              is_print: false,
              is_checkout: true,
              content: JSON.stringify(val),
            })
              .then(({ data }) => {
                window.open(`/shop/print/${data.code}`);
                // window.open(
                //   `https://www.instacart.com/store/partner_recipes?recipeSourceUrl=${process.env.NEXT_PUBLIC_FE_URL}/shop/print/${data.code}&utm_source=instacart_growth_partnerships&utm_medium=partner_recipe_recipemaker&recipeSourceOrigin=recipemaker`
                // );
              })
              .catch(() =>
                showNotification({
                  color: 'red',
                  message: "Something wen't wrong",
                })
              );
          },
        },
      }),
    []
  );

  return (
    <Grid
      grow
      columns={18}
      gutter={30}
      sx={{ flexDirection: matches && 'column-reverse' }}
    >
      <Grid.Col span={12}>
        <Stack>
          {!isEmpty(shopList) &&
            Object.entries(shopList).map((shop, i) => (
              <Stack pt={40} key={i}>
                <Divider
                  label={
                    <Title
                      color='#1F1F23'
                      order={5}
                      pr='lg'
                      sx={{
                        position: 'absolute',
                        background: '#fff',
                        color: '#1F1F23',
                      }}
                    >
                      {moment(shop[0]).format('MMM DD')}
                    </Title>
                  }
                  mb='xs'
                />
                <Grid gutter={30}>
                  {shop[1].map((recipe, j) => (
                    <Grid.Col span={3} key={j}>
                      <Item
                        target={{
                          parentKey: shop[0],
                          childKey: j,
                        }}
                        food={recipe}
                        addToCartHandler={addToCartHandler}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack
          sx={{ background: '#F7F8FB', borderRadius: 15 }}
          p={35}
          mt={!matches ? -55 : 20}
        >
          <Box>
            <Title order={4}>Cart</Title>
            <Text weight='bold' color='#828282' size='sm' mt={4}>
              My shopping cart list
            </Text>
          </Box>
          <Stack
            py='lg'
            spacing={30}
            sx={{ maxHeight: !matches ? '50vh' : '25vh', overflow: 'auto' }}
          >
            {cartList ? (
              cartList.map((cart, i) => (
                <Group key={i}>
                  <Button
                    onClick={() =>
                      removeItemFromCart(cart.id, cart.scheduled_plan.id)
                    }
                    p={0}
                    variant='outline'
                    size={18}
                    color='#C8362E'
                    sx={{
                      borderColor: '#C8362E',
                    }}
                  >
                    <CloseCircle
                      withCircle={false}
                      height={18}
                      width={18}
                      color='#C8362E'
                    />
                  </Button>
                  <Group align='start' sx={{ flex: 1 }}>
                    <FoodImage
                      title={cart.scheduled_plan?.planable?.title}
                      src={cart.scheduled_plan?.planable?.image}
                      radius='md'
                      width={80}
                      height={60}
                      textSize={30}
                    />
                    <Title order={6} pr='lg' sx={{ flex: 1 }}>
                      {cart.scheduled_plan?.planable?.title}
                    </Title>
                  </Group>
                </Group>
              ))
            ) : (
              <Text align='center' color='#828282' size='sm' my={30}>
                No items in the cart
              </Text>
            )}
          </Stack>
          <Button
            onClick={() =>
              showShopIngredientsModal({
                title: 'Select the ingredients',
                cartList,
              })
            }
            size='md'
          >
            Continue to select the ingredients
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

Index.propTypes = {
  shopList: PropTypes.object,
  cartList: PropTypes.array,
  addToCartHandler: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
};

Index.defaultProps = {
  shopList: {},
  cartList: [],
};

export default Index;
