import {Routes} from '@angular/router';
import {HeroesPage} from './features/heroes/pages/heroes-page/heroes-page';
import {NotFoundPage} from './features/heroes/pages/not-found-page/not-found-page';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'heroes'},
  {
    path: 'heroes',
    component: HeroesPage,
  },
  {path: '**', component: NotFoundPage}
];
