import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriberserveService {

  constructor(public http: HttpClient) { }
  baseURL = Env.baseAPi

  get_old_chats(channel: any) {
    return this.http.get(this.baseURL + "/v2/chat/getoldchats?channel=" + channel)

  }
  add_to_internet(data: any) {
    return this.http.post(this.baseURL + "/v2/demostream/add-to-cart", data, { headers: { loader: 'false' } })
  }
  get_cart(id: any) {
    return this.http.get(this.baseURL + "/v2/demostream/get/get_add_to_cart?streamId=" + id)
  }
  public viewcontant = new Subject<any>();
  change_view(val: any) {
    this.viewcontant.next(val);
  }

  public viewcontant_large = new Subject<any>();
  change_view_large(val: any) {
    this.viewcontant_large.next(val);
  }

  topView = new BehaviorSubject<any>('current');
  refreshcart = new BehaviorSubject<any>("load");


  //  create order

  create_stream_order(data: any) {
    return this.http.post(this.baseURL + "/v2/demostream/razorpay/success/confirmorder", data)
    return this.http.post("http://localhost:3000/v2/checkout/razorpay/success/confirmorder", data)
  }
  create_stream_order_cod(data: any) {
    return this.http.post(this.baseURL + "/v2/demostream/success/confirmorder", data)
    // return this.http.post("http://localhost:3000/v2/checkout/success/confirmorder", data, this.header)
  }


  get_booking_slab() {
    return this.http.get(Env.baseAPi + "/v1/ecomplan/slab/getall")
    // return this.http.post("http://localhost:3000/v2/checkout/success/confirmorder", data, this.header)
  }


  proceed_to_pay_start(id: any) {
    return this.http.put(this.baseURL + "/v2/checkout/proceed/to/pay/start?id=" + id, {})
  }
  proceed_to_pay_stop(id: any) {
    return this.http.put(this.baseURL + "/v2/checkout/proceed/to/pay/stop?id=" + id, {})
  }
  save_product(body: any) {
    return this.http.post(this.baseURL + "/v2/demostream/visitor/saved", body)
  }
  interested_product(body:any){
    return this.http.post(this.baseURL + "/v2/ecomplan/visitor/interested", body)
  }

  get_save_product(join: any, stream: any) {
    return this.http.get(this.baseURL + "/v2/ecomplan/visitor/saved?stream=" + stream + "&join=" + join)
  }

  get_interested_product(join: any, stream: any) {
    return this.http.get(this.baseURL + "/v2/ecomplan/visitor/interested?stream=" + stream + "&join=" + join)
  }
}
