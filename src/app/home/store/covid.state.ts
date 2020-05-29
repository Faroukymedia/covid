import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { HideLoader, ShowLoader } from '@shared/store/loader.action';
import { WorldSummary } from '../models/world-summary.model';
import { CovidService } from '../services/covid.service';
import { HomePageGetWorldSummary, HomePageGetPosition } from './covid.actions';
import { Geocode } from '../models/geocode.model';
import { PositionService } from '../services/position.service';

export interface CovidStateModel {
  worldSummary: WorldSummary;
  position: Geocode;
}

@State<CovidStateModel>({
  name: 'covid',
  defaults: {
    worldSummary: {} as WorldSummary,
    position: {} as Geocode
  },
})
@Injectable()
export class CovidState {
  constructor(private covidService: CovidService, private positionService: PositionService) { }

  @Selector()
  public static worldSummary(state: CovidStateModel) {
    return state.worldSummary;
  }

  @Selector()
  public static clientPosition(state: CovidStateModel) {
    return state.position;
  }

  @Action(HomePageGetWorldSummary)
  public getWorldSummary(context: StateContext<CovidStateModel>, action: HomePageGetWorldSummary) {
    if ( (Object.keys(context.getState().worldSummary).length === 0
     && context.getState().worldSummary.constructor === Object)) {
      context.dispatch(new ShowLoader());
      this.covidService.getWorldSummary().subscribe((worldSummary) => {
        context.patchState({ worldSummary });
        context.dispatch(new HideLoader());
      }, error => {
        console.log(error);
        context.dispatch(new HideLoader());
      });
    }
  }

  @Action(HomePageGetPosition)
  public getPosition(context: StateContext<CovidStateModel>, action: HomePageGetPosition) {
    if ( (Object.keys(context.getState().position).length === 0
     && context.getState().position.constructor === Object)) {
      context.dispatch(new ShowLoader());
      this.positionService.getClientPosition(action.latitude, action.longitude).subscribe((position) => {
        context.patchState({ position });
        context.dispatch(new HideLoader());
      });
    }
  }
}
