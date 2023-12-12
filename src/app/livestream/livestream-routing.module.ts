import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingChangesGuard_sub } from './can.deactivate.guard';
import { WatchliveComponent } from './watchlive/watchlive.component';

const routes: Routes = [
  { path: "", component: WatchliveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivestreamRoutingModule { }
