import PropTypes from 'prop-types';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Cookies from 'js-cookie';

import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { showNotification } from '@mantine/notifications';
import { Box, Text, Center } from '@mantine/core';

const Index = ({
  title,
  id,
  total_recipes,
  price,
  total_days,
  onClick,
  onClose,
  onSuccess,
}) => {
  const TOKEN = Cookies.get('token');
  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_MODE === 'live'
      ? process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID
      : process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID;

  return (
    <ModalContainer
      title={price ? 'Purchase' : 'Confirm'}
      onClose={onClose}
      onClick={onClick}
      withSaveBtn={price ? false : true}
      saveBtnText='Buy'
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px 26px 17px 14px',
        }}
      >
        <Box>
          <Text weight='bold'>{title}</Text>
          <Text color='#9D9FA6'>
            {total_recipes} {total_recipes >= 2 ? 'Recipes' : 'Recipe'}
            <span
              style={{
                color: 'gray',
                fontSize: '20px',
                top: 10,
                marginTop: '5px',
              }}
            >
              &nbsp;&bull;&nbsp;
            </span>
            {total_days ?? '-'} days
          </Text>
        </Box>
        <Center>
          <Text weight='bold' sx={{ fontSize: 30 }}>
            ${price}
          </Text>
        </Center>
      </Box>

      {price ? (
        <PayPalScriptProvider
          options={{
            'client-id': clientId,
          }}
        >
          {/* backend auth, dont remove yet */}
          {/* <PayPalButtons
            createOrder={() => {
              return fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_SERVER_API}/api/paypal/order/create`,
                {
                  headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                  },
                  method: 'post',
                  body: JSON.stringify({
                    id,
                  }),
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((orderData) => {
                  return orderData.id;
                })
                .catch(() => {
                  showNotification({
                    color: 'red',
                    message: "Something wen't wrong",
                  });
                });
            }}
            onApprove={(data) => {
              return fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_SERVER_API}/api/paypal/order/capture`,
                {
                  headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    id: 1,
                    orderId: data.orderID,
                  }),
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((orderData) => {
                  onClose();
                  onSuccess();
                  return orderData.id;
                })
                .catch(() => {
                  showNotification({
                    color: 'red',
                    message: "Something wen't wrong",
                  });
                });
            }}
          /> */}
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: price,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((data) => {
                if (data.status === 'COMPLETED') {
                  fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER_API}/api/paypal/order/${id}/capture-order`,
                    {
                      headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                      },
                      method: 'post',
                      body: JSON.stringify(data),
                    }
                  )
                    .then(() => {
                      onSuccess();
                      onClose();
                    })
                    .catch(() => {
                      showNotification({
                        color: 'red',
                        message: "Something wen't wrong",
                      });
                    });
                } else {
                  showNotification({
                    color: 'red',
                    message: "Something wen't wrong",
                  });
                }
              });
            }}
          />
        </PayPalScriptProvider>
      ) : null}
    </ModalContainer>
  );
};

export default Index;

Index.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  total_recipes: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  total_days: PropTypes.string.isRequired,
};
