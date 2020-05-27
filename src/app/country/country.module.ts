import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryPageRoutingModule } from './country-routing.module';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CovidState } from 'app/home/store/covid.state';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryPageRoutingModule,
    SharedModule,
    NgxsModule.forFeature([CovidState])
  ],
  declarations: [CountryPageComponent],
  providers: [Geolocation],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CountryPageModule {}
