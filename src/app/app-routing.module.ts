import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesTableComponent } from './movies-table/movies-table.component';
import { MoviesRankingsComponent } from './movies-rankings/movies-rankings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies-table',
    pathMatch: 'full'
},
{
    path: 'movies-table',
    component: MoviesTableComponent
},
{
    path: 'movies-rankings',
    component: MoviesRankingsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
