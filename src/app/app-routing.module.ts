import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SideMenuGuard } from '@shared/guards/side-menu.guard';
import { HOME_PAGE, COUNTRY_PAGE } from './constants';
import { PageContainerComponent } from './page-container/page-container.component';

const routes: Routes = [
  {
    path: '',
    component: PageContainerComponent,
    children: [
      {
        path: '',
        redirectTo: HOME_PAGE,
        pathMatch: 'full',
      },
      {
        path: HOME_PAGE,
        canActivateChild: [SideMenuGuard],
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: COUNTRY_PAGE,
        canActivateChild: [SideMenuGuard],
        loadChildren: () => import('./country/country.module').then((m) => m.CountryPageModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then( m => m.CountryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
