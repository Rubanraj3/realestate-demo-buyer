import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment.dev';

@Injectable({
  providedIn: 'root'
})
export class Livestreanservice {
  baseurl = Env.baseAPi;

  constructor(public http: HttpClient) { }

  getall_streams(filter: any) {
    const queryString = new URLSearchParams(filter).toString();
    return this.http.get(this.baseurl + "/v1/ecomplan/getAll/shop/live/stream?" + queryString)
  }

  get_sub_token(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/getsub/token/single?id=" + id,)
  }
  get_host_users() {
    return this.http.get(this.baseurl + '/v2/generateRTC/getHostTokens');
  }

  generate_token(uid: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/getToken", { uid: uid, type: "host", isPublisher: true })
  }
  generate_token_sub(uid: any, res: any, channel: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/getToken", { channel: channel, uid: uid, hostId: res._id, type: "sub", isPublisher: false })
  }

  generateUid() {
    const length = 5;
    const randomNo = (Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)));
    return randomNo;
  }


  get_token_details(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/gettoken/byId?id=" + id)
  }
  get_token_details_sub(id: any) {
    return this.http.get(this.baseurl + "/v2/demostream/buyer/stream/details?id=" + id);
  }
  get_token_details_host(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/gettoken/host/byId?id=" + id)
  }

  participents_limit(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/getparticipents/limit?id=" + id)
  }
  participents_leave(id: any) {
    return this.http.put(this.baseurl + "/v2/generateRTC/leave/participents/limit?id=" + id, { active: false })
  }

  leave_host(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/leave/host?id=" + id)
  }
  join_host(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/join/host/admin?id=" + id)
  }

  // user Registration
  register_toggle(id: any) {
    return this.http.post(this.baseurl + "/ecomplan/stream/pre/register/live", { streamId: id })
  }
  unregister_toggle(id: any) {
    return this.http.post(this.baseurl + "/ecomplan/stream/pre/unregister/live", { streamId: id })
  }

  get_completed_stream(id: any) {
    return this.http.get(this.baseurl + "/ecomplan/get/buyer/completed/stream/byid?id=" + id)
  }

  get_current_lives(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/get/current/live/stream?stream=" + id)
  }

  registerNow(body: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/stream/pre/register/live", body)
  }
  unregisterNow(body: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/stream/pre/unregister/live", body)
  }

  get_post_view(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/stream/post/view?id=" + id)
  }


  // 


  get_other_stream_details(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/on/going/stream?id=" + id)
  }

  interst_now(id: any) {
    return this.http.post(this.baseurl + "/v2/demostream/buyer/interest/now", { id })

  }
}
