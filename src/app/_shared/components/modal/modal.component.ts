import { Component, Input } from '@angular/core';

@Component({
  selector: 'mwh-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input()
  public isFullWidthOnMobile = false;

  public isShown = false;

  public show() {
    this.isShown = true;
  }

  public dismiss() {
    this.isShown = false;
  }
}
