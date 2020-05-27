import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HideLoader, ShowLoader } from './loader.action';

const LOADER_DEFAULT_TEXT = 'loader.default.text';

export interface LoaderStateModel {
  isVisible: boolean;
  text: string;
  count: number;
}

@State<LoaderStateModel>({
  name: 'loader',
  defaults: {
    isVisible: false,
    text: LOADER_DEFAULT_TEXT,
    count: 0,
  },
})
@Injectable()
export class LoaderState {
  @Selector()
  public static isVisible(state: LoaderStateModel): boolean {
    return state.isVisible;
  }

  @Selector()
  public static text(state: LoaderStateModel): string {
    return state.text;
  }

  @Action(ShowLoader)
  public showLoader(ctx: StateContext<LoaderStateModel>, action: ShowLoader) {
    const state = ctx.getState();
    ctx.patchState({
      isVisible: true,
      text: action.text,
      count: ++state.count,
    });
  }

  @Action(HideLoader)
  public hideLoader(ctx: StateContext<LoaderStateModel>) {
    const state = ctx.getState();
    if (state.count === 1) {
      ctx.patchState({
        isVisible: false,
        text: LOADER_DEFAULT_TEXT,
        count: --state.count,
      });
    } else {
      ctx.patchState({
        count: --state.count,
      });
    }
  }
}
