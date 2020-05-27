import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
        data: {
          isSideMenuPresent: true,
        },
      }
    ]),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
