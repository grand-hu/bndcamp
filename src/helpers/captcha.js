import dotenv from 'dotenv';
import Captcha from "2captcha";
import config from '../config.js';

dotenv.config();

export const solveRecaptcha = async () => {
  console.log('Attempting to solve reCAPTCHA');
  const solver = new Captcha.Solver(process.env.CAPTCHA_API_KEY);
  try {
    console.log('Waiting for 2Captcha\'s response');
    const resp = await solver.recaptcha(config.recaptchaPublicKey, config.loginPageUrl);
    console.log('reCAPTCHA solved');
    return resp.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to solve the reCAPTCHA.');
  }
};
