import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorldSummary } from '../models/world-summary.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private static mock = 'http://localhost:4100/assets/json/mock.json';

  private static COVID19_API_ENDPOINT = 'https://api.covid19api.com/summary';

  constructor(private httpClient: HttpClient) { }

  public getWorldSummary() {
    const url = CovidService.COVID19_API_ENDPOINT;
    // const url = CovidService.mock;

    return this.httpClient.get<WorldSummary>(url);
  }
}
