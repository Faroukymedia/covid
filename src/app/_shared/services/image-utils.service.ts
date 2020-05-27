import { Injectable } from '@angular/core';
import { DocumentRefService } from './dom/document-ref.service';
import { DomFactoryService } from './dom/dom-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilsService {
  public readonly resizedWith = 800;

  constructor(private documentRefService: DocumentRefService, private domFactoryService: DomFactoryService) {}

  public async resizeImage(file: File): Promise<File> {
    const originalBase64Image = await this.readImageAsDataURL(file);

    return new Promise((resolve, reject) => {
      const image = this.domFactoryService.createImage();

      image.onload = () => {
        const elem = this.documentRefService.document.createElement('canvas');
        const scaleFactor = this.resizedWith / image.width;
        elem.width = this.resizedWith;
        elem.height = image.height * scaleFactor;

        const canvasContext = elem.getContext('2d') as CanvasRenderingContext2D;
        canvasContext.drawImage(image, 0, 0, elem.width, elem.height);
        canvasContext.canvas.toBlob(
          blob => {
            if (blob) {
              const resizedImage = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
              resolve(resizedImage);
            } else {
              reject('[ImageUtilsService] ResizeImage error final blob is null');
            }
          },
          'image/jpeg',
          1
        );
      };
      image.onerror = error => reject(error);
      image.src = originalBase64Image;
    });
  }

  public async readImageAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = this.domFactoryService.createFileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
