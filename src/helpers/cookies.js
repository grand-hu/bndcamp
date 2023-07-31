import axios from 'axios';
import config from '../config.js';
import { solveRecaptcha } from './captcha.js';

const regex = /(client_id|BACKENDID3|identity)=([^;]+)/g;

export const getLoginCookies = async (user, password) => {
  const cookies = {};
  let recaptcha;

  console.log('Fetching login page for cookies');
  const response = await axios.get(config.loginPageUrl, {
    headers: config.loginPageHeaders,
  });

  const setCookieHeaders = response.headers['set-cookie'];
  if (setCookieHeaders) {
    let match;
    while ((match = regex.exec(setCookieHeaders)) !== null) {
      const keyName = match[1].toLowerCase();
      const value = match[2];
      cookies[keyName] = value;
      console.log(`${keyName} cookie grabbed`);
    }
  }

  recaptcha = await solveRecaptcha();

  console.log('Logging in for additional cookie');
  const loginResponse = await axios.post(
    config.loginUrl,
    {
      'user.name': user,
      'login.password': password,
      'login.twofactor': '',
      'login.twofactor_remember': '',
      'login.from': '',
      'login.captcha_response': recaptcha,
    },
    {
      headers: {
        ...config.loginHeaders,
        'Cookie': `client_id=${cookies.client_id}; BACKENDID3=${cookies.backendid3}`,
      },
    }
  );

  const identity = loginResponse.headers['set-cookie'];
  if (identity) {
    let match;
    while ((match = regex.exec(identity)) !== null) {
      const keyName = match[1].toLowerCase();
      const value = match[2];
      cookies[keyName] = value;
      console.log(`${keyName} cookie grabbed`);
    }
  }

  const resp = await axios.get(config.userIdUrl, {
    headers: {
      ...config.userIdHeaders,
      'cookie': `client_id=${cookies.client_id}; BACKENDID3=${cookies.backendid3}; identity=${cookies.identity}; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D`,
    }
  });

  if (resp) {
    cookies['fan_id'] = resp.data.fan_id;
  }
  return cookies;
};
