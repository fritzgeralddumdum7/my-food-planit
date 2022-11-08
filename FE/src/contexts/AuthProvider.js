import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Center, Loader } from '@mantine/core';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { GuestRoutes } from '@/consts/routes';
import API from '@/api/BaseApi';
import { Exempted } from '../consts/routes';

const initialState = {};
export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { push, pathname, asPath } = router;
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(null);
  const [isStep8, setIsStep8] = useState(false);

  const handleLogin = async (data) => {
    const token = data.data ? data.data.token : data.token;
    const isAdmin = data.user.is_admin;

    setAuthenticated(true);
    Cookies.set('token', token);
    API.defaults.headers.Authorization = `Bearer ${token}`;

    if (isAdmin) {
      Cookies.set('admin', 1);
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    Cookies.remove('token');
    Cookies.remove('admin');
    setAuthenticated(false);
  };

  const checkLogin = async () => {
    const TOKEN = Cookies.get('token');
    const admin = Cookies.get('admin');

    if (TOKEN) {
      const options = {
        method: 'GET',
        url: '/check-login',
      };

      API.request(options)
        .then(({ data }) => {
          const { isloggedIn } = data;
          if (isloggedIn) {
            setAuthenticated(true);
            admin === '1' ? setIsAdmin(true) : setIsAdmin(false);
          } else {
            setAuthenticated(false);
          }
        })
        .catch(({ response }) => {
          if (response?.status === 401) {
            //Unauthorized
            setAuthenticated(false);
          }
        });
    } else {
      setAuthenticated(false);
    }
  };

  function delQueryParams(asPath) {
    return asPath.split('?')[0];
  }

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (authenticated === null) {
      console.log('here 1');
      return;
    }
    console.log({ pathname });
    // if user tries to access Authenticated routes but is authenticated it will redirect to /login
    if (
      authenticated === false &&
      !GuestRoutes.includes(pathname) &&
      !GuestRoutes.includes(delQueryParams(asPath)) &&
      !Exempted.includes(pathname) //
    ) {
      console.log('here 2');
      handleLogout();
      return push('/login');
    }

    // if user tries to access Guest routes but is authenticated it will redirect to /dashboard
    if (
      authenticated === true &&
      (GuestRoutes.includes(pathname) ||
        GuestRoutes.includes(delQueryParams(asPath))) &&
      !isStep8
    ) {
      console.log('here 3');
      return isAdmin ? push('/meal-plan-store') : push('/dashboard');
    }

    setLoading(false);
  }, [router.isReady, authenticated, pathname, asPath, isAdmin]);

  const [recipes, setRecipes] = useState([]);

  const stateValues = {
    authenticated,
    handleLogin,
    handleLogout,
    checkLogin,
    isAdmin,
    setIsStep8,
    setRecipes,
    loading,
  };

  // return loading ? (
  //   <Main
  //     meta={
  //       <Meta
  //         title='[Print]My Food Plan It'
  //         description='[Print]Lorem Ipsum'
  //         recipe={recipes}
  //       />
  //     }
  //   >
  //     <Center style={{ height: '100vh' }}>
  //       <Loader />
  //     </Center>
  //   </Main>
  // ) : (
  //   <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  // );
  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
