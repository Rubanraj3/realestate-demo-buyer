import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegUserComponent } from './reg-user/reg-user.component';
import { PropertyViewComponent } from './property-view/property-view.component';

const routes: Routes = [
  { path: 'b/:id', component: RegUserComponent },
  { path: 'property', component: PropertyViewComponent },
  { path: 'stream', loadChildren: (() => import("./livestream/livestream.module").then((a: any) => a.LivestreamModule)) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
