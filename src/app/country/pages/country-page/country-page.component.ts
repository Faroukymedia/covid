import { Component, OnInit } from '@angular/core';
import { StatusBarService } from '@shared/services/plugins/status-bar.service';
import { Observable, Subscription } from 'rxjs';
import { WorldSummary, Country } from 'app/home/models/world-summary.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CovidState } from 'app/home/store/covid.state';
import { Select } from '@ngxs/store';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DeviceService } from '@shared/services/plugins/device.service';
import { Geocode } from 'app/home/models/geocode.model';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss'],
})
export class CountryPageComponent implements OnInit {

  @Select(CovidState.worldSummary)
  public worldSummary$!: Observable<WorldSummary>;

  @Select(CovidState.clientPosition)
  public clientPosition$!: Observable<Geocode>;

  public worldSummary?: WorldSummary;
  public worldSummarySubscription!: Subscription;
  public countrySummary?: Country;
  public countries?: Country[];
  public countryCode?: string | null;

  constructor(
    private route: ActivatedRoute,
  ) {
    if (this.route.snapshot.paramMap.get('countryCode')) {
      this.countryCode = this.route.snapshot.paramMap.get('countryCode');
    } else {
      this.clientPosition$.subscribe((data) => {
        if (data && data.results) {
          console.log(data);
          this.countryCode = data.results[data.results.length - 1].address_components[0].short_name;
          console.log(this.countryCode);
          this.getSubscription();
        }
      }, error => {
        console.log(error);
        this.countryCode = 'MA';
        this.getSubscription();
      });
    }
  }

  public ngOnInit() { }

  public getSubscription() {
    this.worldSummarySubscription = this.worldSummary$.subscribe((data) => {
      this.worldSummary = data;
      this.countries = data.Countries;
      this.countrySummary = this.getCountry(this.worldSummary);
    });
  }

  public getCountry(summary: WorldSummary) {
    let c: Country = {} as Country;
    if (summary && summary.Countries && summary.Countries.length) {
      console.log(this.countryCode);
      summary.Countries.forEach(country => {
        if (country.CountryCode === this.countryCode ) {
          c = country;
        }
      });
    }
    return c;
  }

  public getMACountry(summary: WorldSummary) {
    let c: Country = {} as Country;
    if (summary && summary.Countries && summary.Countries.length) {
      console.log(this.countryCode);
      summary.Countries.forEach(country => {
        if (country.CountryCode === 'MA' ) {
          c = country;
        }
      });
    }
    return c;
  }

}
