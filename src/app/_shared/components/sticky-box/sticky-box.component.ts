import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StickyBoxOptions } from '@shared/models/sticky-box.model';
import { ChangeHiddenPropertyStickyBox } from '@shared/store/sticky-box.action';
import { StickyBoxState } from '@shared/store/sticky-box.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'mwh-sticky-box',
  templateUrl: './sticky-box.component.html',
  styleUrls: ['./sticky-box.component.scss'],
})
export class StickyBoxComponent implements AfterViewInit {
  @Select(StickyBoxState.stickyBox)
  public stickyBoxOptions$!: Observable<StickyBoxOptions>;

  @Select(StickyBoxState.isHidden)
  public isHidden$!: Observable<boolean>;

  @ViewChild('stickyBox', { static: false })
  public stickyBox!: ElementRef;

  constructor(private store: Store) {}

  public ngAfterViewInit() {
    this.store.select(StickyBoxState.isHidden).subscribe((isHidden) => {
      const message = this.store.selectSnapshot(StickyBoxState.message);
      if (!isHidden && message) {
        this.stickyBox.nativeElement.present(message.text, message.options);
      }
    });
  }

  public onHideEvent() {
    this.store.dispatch(new ChangeHiddenPropertyStickyBox(true));
  }
}
