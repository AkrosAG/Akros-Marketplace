import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CourseComponent} from './course/course.component';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'viewcourse',
    component: CourseComponent
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'books',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
