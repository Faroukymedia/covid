import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geocode } from '../models/geocode.model';
import { StorageService } from '@shared/services/plugins/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private static GOOGLE_API_KEY = 'AIzaSyCMYKryMaEdlWk6khVbYUI2NnBaeh28v8E';

  private static POSITION_API_ENDPOINT =
  'https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={key}';

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  public getClientPosition(latitude: string, longitude: string) {
    const url = PositionService.POSITION_API_ENDPOINT
    .replace('{latitude}', latitude)
    .replace('{longitude}', longitude)
    .replace('{key}', PositionService.GOOGLE_API_KEY);

    return this.httpClient.get<Geocode>(url);
  }

  public setPosition(data: any) {
    if (data.coords) {
      this.getClientPosition((data.coords.latitude).toString(),
        (data.coords.longitude).toString())
        .subscribe((position) => {
          const countryCode = position.results[position.results.length - 1].address_components[0].short_name;
          this.storageService.setItem('countryCode', countryCode);
        });
    }
  }
}
