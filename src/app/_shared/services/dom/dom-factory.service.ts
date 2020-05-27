import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomFactoryService {
  public createFileReader() {
    return new FileReader();
  }

  public createImage() {
    return new Image();
  }
}
