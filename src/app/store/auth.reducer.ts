import { Action, createReducer, on } from '@ngrx/store';
import { login, authSuccess, loginError } from '../core/auth/login/store/actions';
import { Auth } from '../shared/models';

export interface State {
  auth: Auth;
  loggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}

export const initialState: State = {
  auth: null,
  loggedIn: false,
  isLoading: false,
  errorMessage: '',
  hasError: false
};

export const featureKey = 'auth';

const authReducer = createReducer(initialState,
  on(login, state => ({ ...state, auth: state.auth, isLoading: true })),
  on(authSuccess, (state, { response }) => ({ ...state, auth: response, loggedIn: true, hasError: false, isLoading: false })),
  on(loginError, state => ({ ...state, auth: state.auth, hasError: true }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

export const getToken = (state: State) => state.auth.token;