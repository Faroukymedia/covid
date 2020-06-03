import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CovidState } from 'app/home/store/covid.state';
import { Observable } from 'rxjs';
import { WorldSummary, Country } from 'app/home/models/world-summary.model';
import { CollapseHelper } from '@shared/helpers/collapse.helper';
import { ShowLoader, HideLoader } from '@shared/store/loader.action';
import { LoaderState } from '@shared/store/loader.state';

const ARROW_DOWN = 'ios-arrow-down';
const ARROW_UP = 'ios-arrow-up';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss'],
})
export class CountriesPageComponent implements OnInit {

  @Select(CovidState.worldSummary)
  public worldSummary$!: Observable<WorldSummary>;

  @Select(LoaderState.isVisible)
  public isLoading!: Observable<boolean>;

  public listArrows: string[] = [];
  public countries: Country[] = [];
  constructor(private store: Store) {
    this.listArrows = [];
    this.worldSummary$.subscribe((data) => {
      this.countries = data.Countries;
      if (data) {
        this.initArrows(data.Countries);
      }
    }
    );
  }

  public ngOnInit() {}

  public initArrows(countries: Country[]) {
    if (countries && countries.length) {
      this.countries.forEach((element) => {
        this.listArrows.push(ARROW_DOWN);
      });
    }
  }

  public toggleInfo(elementId: string, index: number) {
    console.log(elementId, index, this.listArrows[index]);
    
    this.listArrows[index] = this.listArrows[index] === ARROW_DOWN ? ARROW_UP : ARROW_DOWN;
    CollapseHelper.toggle(elementId);
  }

  public getDate(date: string) {
    if (date) {
      const diff = new Date().getTime() - new Date(date).getTime();
      const days = Math.floor(diff / (60 * 60 * 24 * 1000));
      const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
      const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
      const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
      return { day: days, hour: hours, minute: minutes, second: seconds };
    }
  }
}
