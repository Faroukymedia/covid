import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentRefService {
  public document: Document;

  constructor() {
    this.document = document;
  }
}
