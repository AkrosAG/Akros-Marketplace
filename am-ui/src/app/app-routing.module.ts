import {AddsComponent} from './components/adds/adds.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CreateComponent} from './components/create/create.component';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SearchResultDetailsComponent} from './components/search-result-details/search-result-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'myadds', component: AddsComponent},
  {path: 'create', component: CreateComponent},
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'search-result-details/:id', component: SearchResultDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
