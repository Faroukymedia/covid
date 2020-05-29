import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';

const routes: Routes = [
  {
    path: '',
    component: CountryPageComponent,
    data: {
      isSideMenuPresent: true,
    },
  },
  {
    path: 'all',
    component: CountriesPageComponent,
    data: {
      isSideMenuPresent: true,
    },
  },
  {
    path: ':countryCode',
    component: CountryPageComponent,
    data: {
      isSideMenuPresent: true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryPageRoutingModule {}
