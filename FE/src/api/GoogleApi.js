import API from './BaseApi.js';
import Cookies from 'js-cookie';

export const login = ({ email, googleId, isAdmin }) => {
  const payload = { email, googleId };
  const path = isAdmin ? 'admin/oauth/google/login' : 'oauth/google/login';
  return API.post(path, payload);
};

export const register = ({ email, googleId }) => {
  let onBoardingData = JSON.parse(Cookies.get('onboarding'));
  onBoardingData = {...onBoardingData, email};
  let referralCode = Cookies.get('code');
  Cookies.remove('code');
  const payload = { email, googleId, onBoardingData, referralCode };
  return API.post('oauth/google/register', payload);
};
