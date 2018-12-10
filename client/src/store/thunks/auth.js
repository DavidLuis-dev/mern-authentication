import { push } from "connected-react-router";

import {
  postRegister,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword
} from "../../api/index";
import { login, logout } from "../actions/user";

import { dispatchError } from "../../utils/api";

export const attemptLogin = user => dispatch =>
  postLogin(user)
    .then(res => {
      console.log(res);
      dispatch(login(res.data.user));
      dispatch(push("/home"));
      return res.data;
    })
    .catch(dispatchError(dispatch));

export const attemptSendResetPasswordLink = email => dispatch =>
  sendResetPasswordLink(email).catch(dispatch(push("/login/forgot")));

export const attemptResetPassword = (password, token) => dispatch =>
  resetPassword(password, token)
    .then(() => {
      dispatch(push("/login"));
    })
    .catch(dispatch(push(`/login/reset/${token}`)));

export const attemptLogout = () => dispatch =>
  postLogout()
    .then(res => {
      dispatch(logout());
      dispatch(push("/login"));
      return res.data;
    })
    .catch(dispatchError(dispatch));

export const attemptRegister = newUser => dispatch =>
  postRegister(newUser).catch(dispatch(push("/register")));

export const attemptGetConfirmation = token => dispatch =>
  getConfirmation(token)
    .then(() => {
      return dispatch(push("/login"));
    })
    .catch(dispatchError(dispatch));

export const attemptResendConfirmation = email => dispatch =>
  resendConfirmation(email).catch(dispatch(push("/register")));

export const attemptResetRegister = email => dispatch =>
  resetRegister(email).catch(dispatchError(dispatch));
