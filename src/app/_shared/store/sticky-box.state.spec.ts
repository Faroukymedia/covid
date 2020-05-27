import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { StickyBoxState } from './sticky-box.state';
import { ShowStickyBox, ChangeHiddenPropertyStickyBox } from './sticky-box.action';
import { StickyBoxOptions } from '@shared/models/sticky-box.model';

describe('StickyBoxState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([StickyBoxState])],
    });

    store = TestBed.get(Store);
    store.reset(StickyBoxState);
  });

  it('should change the state hidden to false and set the message when action ShowStickyBox is dispatched', () => {
    store.dispatch(new ShowStickyBox({ text: 'fake message' }));

    const hidden = store.selectSnapshot(StickyBoxState.isHidden);
    expect(hidden).toBe(false);
    const message = store.selectSnapshot(StickyBoxState.message);
    expect(message).toMatchObject({ text: 'fake message' });
  });

  it('should set option when action ShowStickyBox is called with specific options', () => {
    store.dispatch(new ShowStickyBox({ text: 'fake message' }, { green: true, top: 'fakeTop' } as StickyBoxOptions));
    const stickyBoxOptions = store.selectSnapshot(StickyBoxState.stickyBox);
    expect(stickyBoxOptions.green).toBe(true);
    expect(stickyBoxOptions.top).toBe('fakeTop');
  });

  it('should set set the hidden state to false when action ChangeHiddenPropertyStickyBox is called', () => {
    store.dispatch(new ChangeHiddenPropertyStickyBox(false));
    const isHidden = store.selectSnapshot(StickyBoxState.isHidden);
    expect(isHidden).toBe(false);
  });
});
