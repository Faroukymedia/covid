import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page.component';
import { CovidState } from './store/covid.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule,
    SharedModule,
    NgxsModule.forFeature([CovidState])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
