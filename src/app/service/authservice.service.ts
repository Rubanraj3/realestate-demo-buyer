import { Injectable, OnInit } from '@angular/core';
import { Env } from '../environment.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  baseApi = Env.baseAPi
  constructor(private http: HttpClient) { }

  create_user(data: any, id: any) {
    return this.http.post(this.baseApi + '/v2/demostream/buyer/join/stream?id=' + id, data)
  }
  get_prop(data: any) {
    return this.http.post(this.baseApi + '/v2/demostream/buyer/get/property', data)
  }

  join_live(id: any) {
    return this.http.get(this.baseApi + '/v2/demostream/buyer/go/live?id=' + id)
  }

}
