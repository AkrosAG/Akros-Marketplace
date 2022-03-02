import {BrownbagVueComponent} from './components/brownbag/vue/vue.component';
import {BrownbagReactComponent} from './components/brownbag/react/react.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrownbagComponent} from './components/brownbag/brownbag.component';

const routes: Routes = [
  {path: '', component: BrownbagComponent},
  {path: 'brownbag-demo', component: BrownbagComponent},
  {path: 'brownbag-demo/react', component: BrownbagReactComponent},
  {path: 'brownbag-demo/vue', component: BrownbagVueComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
