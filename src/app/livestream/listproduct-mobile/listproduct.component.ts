import { SocketioService } from '../socketio.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SubscriberserveService } from '../subscriberserve.service';
import { Env } from 'src/app/environment.dev';
import { Livestreanservice } from '../livestream.service';

@Component({
  selector: 'app-listproduct-mobile',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponentMobile implements OnInit {
  @Input("data") streamDetails: any;
  baseURL = Env.baseAPi
  constructor(public Socket: SocketioService, private api: Livestreanservice) { }
  primaryHost: any = false;
  streamProduct: any;
  ngOnInit(): void {

  }

  interest() {
    let verfiyid = localStorage.getItem('buyerVerfiyId')
    this.api.interst_now(verfiyid).subscribe((res: any) => {
      this.streamDetails.intrested = res.intrested;
    })

  }
}

