import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';
import { WindowRefServiceModule } from 'src/app/window-ref-service/window-ref-service.module';

@Injectable({
  providedIn: 'root'
})
export class Gatwayserive {

  baseurl = Env.baseAPi;
  constructor(public http: HttpClient) {

  }



  razorpay_paynow(amount: any) {
    return this.http.post(this.baseurl + "/v1/paymentgatway/create/razorpay/orderid", { amount: amount });
  }


}
