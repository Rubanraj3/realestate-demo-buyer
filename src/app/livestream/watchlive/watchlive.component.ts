import { SocketioService } from './../socketio.service';
import { Component, HostListener, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgorastreamingService_sub } from '../agorastreaming.service';
import { SubscriberserveService } from '../subscriberserve.service';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Livestreanservice } from '../livestream.service';
import { Subscription, timer } from 'rxjs';

declare let $: any;
@Component({
  selector: 'app-watchlive',
  templateUrl: './watchlive.component.html',
  styleUrls: ['./watchlive.component.css']
})
export class WatchliveComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public api: Livestreanservice,
    public stream: AgorastreamingService_sub,
    public router: Router,
    public chat: SubscriberserveService,
    public web: SocketioService
  ) { }
  id: any;
  audio: any;
  videos: any;
  innerWidth: any;
  mute_audio: any = false;
  mute_video: any = false;
  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    // this.route.queryParamMap.subscribe((params: any) => {
    //   this.id = params.params.id;
    //   console.log(this.id,23687812)
    // });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    // if (event.target.innerWidth < 1200) {
    // window.location.href = 'http://localhost:59164'
    console.log(2312)
    if (event.target.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (event.target.innerWidth > 600 && event.target.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    // }

  }

}




@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  constructor(public router: Router,) {

  }
  transform(value: number): string {
    // console.log(value)
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    if (value > 0) {
      return (
        ("00" + hours).slice(-2) +
        ":" +
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
    else {
      // this.router.navigateByUrl('livestream')
      window.history.back();
      return (
        ("00") +
        ":" +
        ("00") +
        ":" +
        ("00")
      );
    }
  }
}


@Pipe({
  name: "formatTimeMinutes"
})
export class FormatTimePipeMinutes implements PipeTransform {
  constructor(public router: Router,) {

  }
  transform(value: number): string {
    // console.log(value)
    const minutes: number = Math.floor((value % 3600) / 60);
    if (value > 0) {
      return (
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
    else {
      // this.router.navigateByUrl('livestream')
      return (
        ("00") +
        ":" +
        ("00")
      );
    }
  }
}
