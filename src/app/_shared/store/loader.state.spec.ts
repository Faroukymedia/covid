import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ShowLoader, HideLoader } from './loader.action';
import { LoaderState } from './loader.state';

describe('LoaderState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([LoaderState])]
    });

    store = TestBed.get(Store);
  });

  it('should change state isVisible to true when showing loader', () => {
    store.dispatch(new ShowLoader());

    const loader = store.selectSnapshot(LoaderState);
    expect(loader.isVisible).toBe(true);
    expect(loader.count).toBe(1);
  });

  it('should change state isVisible to false when hiding loader', () => {
    store.dispatch(new ShowLoader());
    store.dispatch(new HideLoader());

    const loader = store.selectSnapshot(LoaderState);
    expect(loader.isVisible).toBe(false);
    expect(loader.count).toBe(0);
  });
});
