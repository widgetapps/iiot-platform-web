import { Injectable } from '@angular/core';
import * as fromDevices from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../store';

@Injectable()
export class DevicesStoreFacade {

  devices$ = this.store.pipe(
    select(fromDevices.selectAllDevices)
  );

  constructor(private store: Store<fromRoot.State>) { }

  /*
  loadContact(id: number) {
    this.store.dispatch(load({id}));
  }

  createContact(contact: Contact) {
    this.store.dispatch(create({contact}));
  }

  updateContact(contact: Contact) {
    this.store.dispatch(update({contact}));
  }

  deleteContact(id: number) {
    this.store.dispatch(remove({id}));
  }

  getContactById(id: string) {
    return this.store.pipe(
      select(fromDevices.getDeviceById(id))
    )
  }
   */
}
