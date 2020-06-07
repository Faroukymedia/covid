import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WorldSummary, Country } from 'app/home/models/world-summary.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidState } from 'app/home/store/covid.state';
import { Select } from '@ngxs/store';
import { StorageService } from '@shared/services/plugins/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PositionService } from 'app/home/services/position.service';
import { COUNTRY_PAGE } from 'app/constants';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss'],
})
export class CountryPageComponent implements OnInit {

  @Select(CovidState.worldSummary)
  public worldSummary$!: Observable<WorldSummary>;

  public worldSummary?: WorldSummary;
  public worldSummarySubscription!: Subscription;
  public countrySummary?: Country;
  public countries?: Country[];
  public countryCode?: string | null;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private geolocation: Geolocation,
    private positionService: PositionService,
    private router: Router
  ) {
    if (this.route.snapshot.paramMap.get('countryCode')) {
      this.countryCode = this.route.snapshot.paramMap.get('countryCode');
      this.getSubscription();
    } else {
      const promise = this.getCountryFromStorage().then((resolve) => {
        this.getSubscription();
      });
    }
  }

  public ngOnInit() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if (data.coords && !this.countryCode) {
      this.positionService.getClientPosition((data.coords.latitude).toString(),
        (data.coords.longitude).toString())
        .subscribe((position) => {
          this.countryCode = position.results[position.results.length - 1].address_components[0].short_name;
          this.storageService.setItem('countryCode', this.countryCode);
          this.getSubscription();
        });
      }
    });
  }

  public async getCountryFromStorage() {
    const result = await this.storageService.getItem('countryCode');
    if (result) {
      this.countryCode = result;
    }
  }

  public getSubscription() {
    this.worldSummarySubscription = this.worldSummary$.subscribe((data) => {
      this.worldSummary = data;
      this.countries = data.Countries;
      this.countrySummary = this.countryCode ? this.getCountry(this.worldSummary) : undefined;
    });
  }

  public getCountry(summary: WorldSummary) {
    let c: Country = {} as Country;
    if (summary && summary.Countries && summary.Countries.length) {
      console.log(this.countryCode);
      summary.Countries.forEach(country => {
        if (country.CountryCode === this.countryCode) {
          c = country;
        }
      });
    }
    return c;
  }

  public refresh() {
    this.router.navigate([COUNTRY_PAGE]);
  }

}
