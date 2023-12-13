import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestreamRoutingModule } from './livestream-routing.module';
import { FormatTimePipe, FormatTimePipeMinutes, WatchliveComponent } from './watchlive/watchlive.component';
import { ChatcomponentComponent } from './chatcomponent/chatcomponent.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { LargeViewcomponentComponent } from './large-viewcomponent/large-viewcomponent.component';
import { MediumViewcomponentComponent } from './medium-viewcomponent/medium-viewcomponent.component';
import { SmallViewcomponentComponent } from './small-viewcomponent/small-viewcomponent.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WithoutCartProductsComponent } from './without-cart-products/without-cart-products.component';
import { ProductdetailviewComponent } from './productdetailview/productdetailview.component';
import { ListproductComponentMobile } from './listproduct-mobile/listproduct.component';


@NgModule({
  declarations: [
    WatchliveComponent,
    ChatcomponentComponent,
    FormatTimePipe,
    FormatTimePipeMinutes,
    ListproductComponent,
    LargeViewcomponentComponent,
    MediumViewcomponentComponent,
    SmallViewcomponentComponent,
    WithoutCartProductsComponent,
    ProductdetailviewComponent,
    ListproductComponentMobile

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LivestreamRoutingModule,
  ],
})
export class LivestreamModule { }
