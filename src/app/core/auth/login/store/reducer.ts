import {Action, createReducer, on} from '@ngrx/store';
import {authSuccess, login} from './actions';
import { User } from '../../../../shared/models/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

export interface State {
  user: User;
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

export const loginFeatureKey = 'user';

const loginReducer = createReducer(initialState,
  on(login, state => ({ ...state, user: state.user })),
  on(authSuccess, (state, { response }) => decodeResponse(response, state)),
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}

function decodeResponse(response, state) {
  const decodedUser: User = jwtHelper.decodeToken((response.token));
  console.log('User State:' + JSON.stringify(state));
  return ({ ...state, user: decodedUser, loggedIn: true, hasError: false, isLoading: false });
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const errorMessage = (state: State) => state.errorMessage;
export const hasError = (state: State) => state.hasError;
export const isLoading = (state: State) => state.isLoading;
