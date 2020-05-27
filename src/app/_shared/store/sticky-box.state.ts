import { State, Selector, StateContext, Action } from '@ngxs/store';
import { StickyBoxOptions } from '@shared/models/sticky-box.model';
import { ShowStickyBox, ChangeHiddenPropertyStickyBox } from './sticky-box.action';

const defaultStickyBoxOptions: StickyBoxOptions = {
  bottom: '',
  closeIcon: true,
  green: false,
  icon: 'close-circle-sharp',
  padding: true,
  timer: 10000,
  timerOn: true,
  top: '24px',
};

export interface StickyBoxStateModel {
  stickyBoxOptions: StickyBoxOptions;
  hidden: boolean;
  message: { text: string; options?: any };
}

@State<StickyBoxStateModel>({
  name: 'stickyBox',
  defaults: {
    stickyBoxOptions: defaultStickyBoxOptions,
    hidden: true,
    message: { text: '' },
  },
})
export class StickyBoxState {
  @Selector()
  public static stickyBox(state: StickyBoxStateModel) {
    return state.stickyBoxOptions;
  }

  @Selector()
  public static isHidden(state: StickyBoxStateModel) {
    return state.hidden;
  }

  @Selector()
  public static message(state: StickyBoxStateModel) {
    return state.message;
  }

  @Action(ShowStickyBox)
  public showStickyBox(context: StateContext<StickyBoxStateModel>, action: ShowStickyBox) {
    context.patchState({
      stickyBoxOptions: { ...defaultStickyBoxOptions, ...action.stickyBoxOptions },
      hidden: false,
      message: action.message,
    });
  }

  @Action(ChangeHiddenPropertyStickyBox)
  public changeHiddenPropertyStickyBox(
    context: StateContext<StickyBoxStateModel>,
    action: ChangeHiddenPropertyStickyBox
  ) {
    const state = context.getState();
    context.patchState({
      ...state,
      hidden: action.hidden,
    });
  }
}
