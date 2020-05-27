import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoaderState } from '@shared/store/loader.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mwh-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnDestroy, AfterViewInit {

  @ViewChild('loader')
  public loaderElement!: ElementRef;
  @Select(LoaderState.text)
  public loaderText$!: Observable<string>;

  private subscription$!: Subscription;

  constructor(private store: Store) {}

  public ngAfterViewInit() {
    this.subscription$ = this.store.select(LoaderState.isVisible).subscribe(isLoaderVisible => {
        isLoaderVisible
          ? this.loaderElement.nativeElement.create()
          : this.loaderElement.nativeElement.dismiss();
    });
  }

  public ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
