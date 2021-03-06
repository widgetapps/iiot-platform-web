import { Action, createReducer, on } from '@ngrx/store';
import {authSuccess, login, logout, reloadAuth} from './actions';
import { UserModel } from '../../../../shared/models';
import * as authHelper from '../../../../shared/helpers/auth.helper';

export interface State {
  user: UserModel;
  loggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}

export const initialState: State = {
  user: null,
  loggedIn: false,
  isLoading: false,
  errorMessage: '',
  hasError: false
};

export const featureKey = 'user';

const loginReducer = createReducer(initialState,
  on(login, state => ({ ...state, user: state.user })),
  on(authSuccess, (state, { response }) => handleLoginResponse(response, state)),
  on(reloadAuth, (state, { response }) => handleLoginResponse(response, state)),
  on(logout, state => handleLogout(state))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}

function handleLoginResponse(response, state) {
  authHelper.processJwt(response.token);
  authHelper.savePubicKey(response.publicKey);
  return ({ ...state, user: authHelper.getUser(), loggedIn: true, hasError: false, isLoading: false });
}

function handleLogout(state) {
  authHelper.logout();
  return ({...state, user: null, loggedIn: false});
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getClientId = (state: State) => state.user.client;
export const getApiKey = (state: State) => state.user.apiKey;
export const errorMessage = (state: State) => state.errorMessage;
export const hasError = (state: State) => state.hasError;
export const isLoading = (state: State) => state.isLoading;
