import { Env } from 'src/app/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Livestreanservice } from '../livestream.service';
import { ExpirationService } from '../../homepage/expirationservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currentlivestreams',
  templateUrl: './currentlivestreams.component.html',
  styleUrls: ['./currentlivestreams.component.css']
})
export class CurrentlivestreamsComponent implements OnInit {
  id: any;
  baseUrl: any = Env.baseAPi;
  private timer!: Subscription;

  ngOnInit(): void {
    this.timer = this.expirationService.getExpirationObservable().subscribe((res: any) => {
      console.log(res, 12312)
      this.currentTime = res;
    })
    this.route.queryParamMap.subscribe((params: any) => {
      this.id = params.params.id;
      this.get_current_live()
    });
  }

  constructor(private api: Livestreanservice, private route: ActivatedRoute, private expirationService: ExpirationService, private router: Router) {

  }
  livestreams: any;
  get_current_live() {
    this.api.get_current_lives(this.id).subscribe((res: any) => {
      this.livestreams = res;
    })
  }

  registerNow(item: any) {
    console.log(item)
    let index = this.livestreams.findIndex((a: any) => a._id == item._id)
    if (index != -1) {
      this.api.registerNow({ streamId: item._id }).subscribe((res: any) => {
        this.livestreams[index].registerStatus = res.findresult.status
        this.livestreams[index].eligible = res.findresult.eligible
        this.livestreams[index].viewstatus = res.findresult.viewstatus
      })
    }
  }
  unregisterNow(item: any) {
    console.log(item)
    let index = this.livestreams.findIndex((a: any) => a._id == item._id)
    if (index != -1) {
      this.api.unregisterNow({ streamId: item._id }).subscribe((res: any) => {
        this.livestreams[index].registerStatus = res.status
        this.livestreams[index].eligible = res.findresult.eligible
        this.livestreams[index].viewstatus = res.findresult.viewstatus
      })
    }
  }
  currentTime: any = new Date().getTime()
  watch_live(item: any) {
    // console.log(item)
    this.api.get_sub_token(item._id).subscribe((res: any) => {
      console.log(res, 123123123121, 2312)
      // this.router.navigateByUrl('/dashboard/livestream?id=' + res.user._id)
      window.location.href = '/dashboard/livestream?id=' + res.user._id
    }, (error: any) => {
      this.get_current_live()
    })

  }
}
