import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CovidState } from 'app/home/store/covid.state';
import { Observable } from 'rxjs';
import { WorldSummary, Country } from 'app/home/models/world-summary.model';
import { CollapseHelper } from '@shared/helpers/collapse.helper';
import { ShowLoader, HideLoader } from '@shared/store/loader.action';
import { LoaderState } from '@shared/store/loader.state';
import { IonInfiniteScroll } from '@ionic/angular';

const ARROW_DOWN = 'ios-arrow-down';
const ARROW_UP = 'ios-arrow-up';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss'],
})
export class CountriesPageComponent implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public infiniteScroll!: IonInfiniteScroll;

  @Select(CovidState.worldSummary)
  public worldSummary$!: Observable<WorldSummary>;

  @Select(LoaderState.isVisible)
  public isLoading!: Observable<boolean>;

  public listArrows: string[] = [];
  public countries: Country[] = [];
  public timeArray: { title: string; selected: boolean; }[];
  constructor(private store: Store) {
    this.timeArray = [
      {
        title: 'A-Z',
        selected: true
      },
      {
        title: 'Actifs',
        selected: false
      },
      {
        title: 'Décès',
        selected: false
      }
    ];
  }

  public ngOnInit() {
    this.store.dispatch(new ShowLoader());
    this.listArrows = [];
    this.worldSummary$.subscribe((data) => {
      this.countries = data.Countries;
      this.apphabeticSort(this.countries);
      if (data) {
        this.initArrows(data.Countries);
        this.store.dispatch(new HideLoader());
      }
    });
  }

  public apphabeticSort(array: Country[]) {
    if (array && array.length) {
     return array.sort((a, b) => {
        if (a.Country < b.Country) {
          return -1;
        }
        if (a.Country > b.Country) {
          return 1;
        }
        return 0;
      });
    }
  }

  public getTopConfirmed(countries: Country[]) {
    if (countries && countries.length) {
      return countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    }
  }

  public getTopRecovered(countries: Country[]) {
    if (countries && countries.length) {
      return countries.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
    }
  }

  public getTopDeath(countries: Country[]) {
    if (countries && countries.length) {
      return countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
    }
  }

  public initArrows(countries: Country[]) {
    if (countries && countries.length) {
      this.countries.forEach((element) => {
        this.listArrows.push(ARROW_DOWN);
      });
    }
  }

  public toggleInfo(elementId: string, index: number) {
    console.log(elementId, index, this.listArrows[index]);
    this.listArrows[index] =
      this.listArrows[index] === ARROW_DOWN ? ARROW_UP : ARROW_DOWN;
    CollapseHelper.toggle(elementId);
  }

  public getDate(date: string) {
    if (date) {
      const diff = new Date().getTime() - new Date(date).getTime();
      const days = Math.floor(diff / (60 * 60 * 24 * 1000));
      const hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
      const minutes =
        Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
      const seconds =
        Math.floor(diff / 1000) -
        (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
      return { day: days, hour: hours, minute: minutes, second: seconds };
    }
  }

  public checkEvent(event: any) {
    switch (event.detail) {
      case 'A-Z':
        this.apphabeticSort(this.countries);
        break;
      case 'Actifs':
        this.getTopConfirmed(this.countries);
        break;
      case 'Décès':
        this.getTopDeath(this.countries);
        break;
      default:
        this.apphabeticSort(this.countries);
        break;
    }
  }
}
