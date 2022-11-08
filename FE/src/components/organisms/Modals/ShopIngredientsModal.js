import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { Grid, Group, Stack, Title, Button, Box, Text } from '@mantine/core';
import { IngredientItem } from '../CustomRecipe/components';
import { useForm } from '@mantine/form';
import FoodImage from '@/components/molecules/FoodImage';
import Printer from '@/icons/Printer';
import Mail from '@/icons/Mail';
import Carrot from '@/icons/Carrot';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

const Index = ({ title, cartList, onClose, onEmail, onPrint, onCheckout }) => {
  const ingrLen = [];

  const buildInitValues = (cartList) => {
    let init = {};

    cartList.map((cart, i) => {
      if (cart.scheduled_plan.planable_type === 'App\\Models\\Recipe') {
        const ingrs = JSON.parse(cart.scheduled_plan.planable.ingredients);
        const isNinety10 = cart.scheduled_plan.planable.is_ninety_ten;

        ingrs.map((ingr, j) => {
          const keyVal = {
            [`name${i}${j}`]: isNinety10 ? ingr.name : ingr.itemized.ingredient,
            [`measurement${i}${j}`]: isNinety10
              ? `1 ${ingr.unit || ''}`
              : ingr.itemized.unit
              ? `1 ${ingr.itemized.unit || ''}`
              : '1 tbsp',
            [`amount${i}${j}`]: isNinety10
              ? parseFloat(ingr.amount || 0)
              : ingr.itemized.quantity
              ? parseFloat(ingr.itemized.quantity)
              : 1,
            [`checkbox${i}${j}`]: true,
          };
          init = { ...init, ...keyVal };
        });
      } else {
        const content = JSON.parse(cart.scheduled_plan.planable.content);
        init = {
          ...init,
          [`measurement${i}${[0]}`]: content.serving || '',
          [`amount${i}${[0]}`]: parseInt(content.quantity),
          [`name${i}${[0]}`]: content.title,
          [`checkbox${i}${0}`]: true,
        };
      }
    });

    return init;
  };
  const form = useForm({
    initialValues: buildInitValues(cartList),
  });

  cartList.map((cart) => {
    const len =
      cart.scheduled_plan.planable_type === 'App\\Models\\Recipe'
        ? JSON.parse(cart.scheduled_plan.planable.ingredients).length
        : 1;
    ingrLen.push(len);
  });

  const buildForm = (ingrLen) => {
    const values = form.values;
    const food = [];
    let errors = {};
    ingrLen.map((val, i) => {
      const ingredients = [];
      [...Array(val)].map((_, j) => {
        if (values[`checkbox${i}${j}`]) {
          const quantity = values[`amount${i}${j}`] || '';
          const unit = values[`measurement${i}${j}`] || '';
          const ingredient = values[`name${i}${j}`];

          const build = {
            ingr: `${quantity} ${unit.substring(2)} ${ingredient}`,
            itemized: {
              unit,
              quantity,
              ingredient,
            },
          };
          ingredients.push(build);

          //remove validation since input and select fields are hidden
          // if (!quantity) {
          //   errors = { ...errors, [`amount${i}${j}`]: 'Required' };
          // }
          // if (!unit) {
          //   errors = { ...errors, [`measurement${i}${j}`]: 'Pick one' };
          // }
        }
      });

      food.push({ ingredients });
    });

    return { food, errors };
  };

  const cleanData = (food) => {
    const data = [];
    food.forEach((values, i) => {
      if (values.ingredients.length) {
        data.push({
          ...values,
          title: cartList[i].scheduled_plan.planable.title,
          image: cartList[i].scheduled_plan.planable.image,
        });
      }
    });

    return data;
  };

  const handleEmail = () => {
    const { food, errors } = buildForm(ingrLen);

    if (!isEmpty(errors)) {
      form.setErrors(errors);
    } else {
      onEmail(cleanData(food));
    }
  };

  const handlePrint = () => {
    const { food, errors } = buildForm(ingrLen);

    if (!isEmpty(errors)) {
      form.setErrors(errors);
    } else {
      onPrint(cleanData(food));
    }
  };

  const handleCheckout = () => {
    const { food, errors } = buildForm(ingrLen);

    if (!isEmpty(errors)) {
      form.setErrors(errors);
    } else {
      onCheckout(cleanData(food));
    }
  };

  return (
    <ModalContainer
      subTitle='you can select some ingredients of selected foods to add into cart.'
      title={title}
      onClose={onClose}
      width={703}
      overflow='inside'
    >
      <Box sx={{ position: 'relative' }}>
        {cartList.length > 0 ? (
          <Stack pb={70}>
            {cartList.map((cart, i) => (
              <Stack spacing={0} key={i}>
                <Grid>
                  <Grid.Col span={5}>
                    <Group align='start'>
                      <FoodImage
                        title={cart.scheduled_plan.planable.title}
                        src={cart.scheduled_plan.planable.image}
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
                        {cart.scheduled_plan.planable.title}
                      </Title>
                    </Group>
                  </Grid.Col>
                </Grid>
                {/* {cart.scheduled_plan.planable_type === 'App\\Models\\Recipe' ? (
                  JSON.parse(cart.scheduled_plan.planable.ingredients).map(
                    (ingredient, j) => (
                      <IngredientItem
                        key={j}
                        name={
                          cart.scheduled_plan.planable.is_ninety_ten
                            ? ingredient.name
                            : ingredient.itemized.ingredient
                        }
                        parentId={i}
                        idx={j}
                        form={form}
                      />
                    )
                  )
                ) : (
                  <IngredientItem
                    name={
                      JSON.parse(cart.scheduled_plan.planable.ingredients)[0]
                        .ingr
                    }
                    parentId={i}
                    idx={0}
                    form={form}
                  />
                )} */}
                {JSON.parse(cart.scheduled_plan.planable.ingredients).map(
                  (ingredient, j) => (
                    <IngredientItem
                      key={j}
                      name={
                        cart.scheduled_plan.planable.is_ninety_ten
                          ? `${ingredient.amount ?? ''} ${
                              ingredient.unit ?? ''
                            } ${ingredient.name}`
                          : ingredient.ingr
                      }
                      parentId={i}
                      idx={j}
                      form={form}
                      isForm={false}
                    />
                  )
                )}
              </Stack>
            ))}
          </Stack>
        ) : (
          <Text pb={70} align='center' color='#828282' size='sm' my={30}>
            No items in the cart
          </Text>
        )}

        <Group
          py={30}
          sx={{
            position: 'fixed',
            background: '#fff',
            zIndex: 5,
            bottom: 0,
            width: '93%',
          }}
          position='apart'
          pr={20}
        >
          <Button
            size='md'
            variant='outline'
            leftIcon={<Carrot />}
            sx={{ fontSize: 14 }}
            onClick={handleCheckout}
          >
            Checkout with Instacart
          </Button>
          <Group>
            <Button
              size='md'
              leftIcon={<Mail />}
              sx={{ fontSize: 14 }}
              onClick={handleEmail}
            >
              Send to my email
            </Button>
            <Button
              size='md'
              leftIcon={<Printer />}
              sx={{ fontSize: 14 }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Group>
        </Group>
      </Box>
    </ModalContainer>
  );
};

Index.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onEmail: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  cartList: PropTypes.array,
};

Index.defaultProps = {
  cartList: [],
};

export default Index;
