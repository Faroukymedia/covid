import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  public sessionStorage: Storage;

  constructor() {
    this.sessionStorage = sessionStorage;
  }
}
