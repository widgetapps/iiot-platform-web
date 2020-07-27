import { Component, OnInit } from '@angular/core';
import * as authHelper from './shared/helpers/auth.helper';
import { Auth } from "./shared/models";
import { Store } from "@ngrx/store";
import {authSuccess} from "./core/auth/login/store/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DAPAGEE IIoT Platform';

  constructor(
    private store: Store<{ }>
  ) { }

  ngOnInit() {
    // If the user refreshes the browser, put the User & Auth stuff back into the store,
    const jwt: string = authHelper.getJwt();
    if (jwt) {
      const publicKey: string = authHelper.getPublicKey();
      const authResponse: Auth = {
        message: 'Created on app init.',
        token: jwt,
        publicKey: publicKey
      }

      this.store.dispatch(authSuccess({response: authResponse}));

    }
  }
}
