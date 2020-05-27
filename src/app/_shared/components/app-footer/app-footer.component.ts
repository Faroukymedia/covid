import { Component } from '@angular/core';
import { DeviceService } from '@shared/services/plugins/device.service';

@Component({
  selector: 'mwh-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent {
  constructor(public deviceService: DeviceService) {}
}
