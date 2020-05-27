import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorldSummary } from '../models/world-summary.model';
import { Geocode } from '../models/geocode.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private static GOOGLE_API_KEY = 'AIzaSyCMYKryMaEdlWk6khVbYUI2NnBaeh28v8E';

  private static POSITION_API_ENDPOINT =
  'https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={key}';

  constructor(private httpClient: HttpClient) { }

  public getClientPosition(latitude: string, longitude: string) {
    const url = PositionService.POSITION_API_ENDPOINT
    .replace('{latitude}', latitude)
    .replace('{longitude}', longitude)
    .replace('{key}', PositionService.GOOGLE_API_KEY);

    return this.httpClient.get<Geocode>(url);
  }
}



