import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Subscription, timer } from 'rxjs';
import { AgorastreamingService_sub } from '../agorastreaming.service';
import { Livestreanservice } from '../livestream.service';
import { SocketioService } from '../socketio.service';
import { SubscriberserveService } from '../subscriberserve.service';
declare let $: any;
@Component({
  selector: 'app-small-viewcomponent',
  templateUrl: './small-viewcomponent.component.html',
  styleUrls: ['./small-viewcomponent.component.css']
})
export class SmallViewcomponentComponent implements OnInit {


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
  mute_video: any = true;
  mute_audio: any = true;
  chatCount: any = 0;
  cartCount: any = 0;
  livecode: any;
  ngOnInit(): void {
    this.web.productView.next(null)
    this.stream.mute_audio.subscribe((res: any) => {
      this.mute_audio = res;
      // console.log(res, 'video--11')

    })
    this.web.cartCount.subscribe((res: any) => {
      this.cartCount = res;
    });
    this.stream.mute_video.subscribe((res: any) => {
      this.mute_video = res;
      // console.log(res, 'Audio--11')
    })
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    this.route.queryParamMap.subscribe((params: any) => {
      this.id = params.params.id;
      this.web.live_check_current(this.id).subscribe((res: any) => {
        if (res.code != this.livecode) {
          window.location.href = "/dashboard"
        }
      })
      if (this.livecode == null) {
        this.stream.currentLive.subscribe((res: any) => {
          if (res != null) {
            if (this.id == res.stream) {
              this.livecode = res.code;
            }
            else {
              this.livecode = Math.floor(100000 + Math.random() * 900000);
              this.stream.currentLive.next({ code: this.livecode, stream: this.id })
            }
          }
          else {
            this.livecode = Math.floor(100000 + Math.random() * 900000);
            this.stream.currentLive.next({ code: this.livecode, stream: this.id })
          }
        })
      }
      this.get_token_details();
    });
    this.web.productView.subscribe((res: any) => {
      // console.log(res)
      this.open_product_view = res;
    })
    this.audio = AgoraRTC.getDevices();
    this.videos = AgoraRTC.getCameras();
    this.videos = this.videos.__zone_symbol__value;
    this.audio = this.audio.__zone_symbol__value;
    this.audio.forEach((element: any) => { });
    if ((this, this.stream.exprierd)) {
    }
    this.chat.viewcontant.subscribe((res: any) => {
      console.log(res,657456)
      this.view_chat_now = res;
      this.api.get_token_details_sub(this.id).subscribe((res: any) => {
        this.targetTime = res.demotoken.expirationTimestamp
        this.token_details = res;
      });
      // this.get_token_details();
    })

    this.stream.updateUserInfo.subscribe((res: any) => {

      if (this.token_details != null) {
        let index = this.token_details.temptokens_sub.findIndex((a: any) => a.Uid == res);

        if (index == -1) {
          this.api.get_token_details_sub(this.id).subscribe((res: any) => {
            this.token_details.temptokens_sub = res.temptokens_sub;
          })
        }

      }
      // this.screen_view()

    })
    this.stream.unpublished.subscribe((res: any) => {
      // this.screen_view()
    })
  }
  back_button() {
    window.history.back();
    // alert("z")
  }

  // media_controls(res: any) {
  //   console.log(res, 2315234872)
  //   this.web.stream_view_change_controls(res.chennel).subscribe((res: any) => {
  //     let i = 0;
  //     this.token_details.temptokens_sub.forEach((element: any) => {
  //       if (res.req.uid != element.Uid) {
  //         this.token_details.temptokens_sub[i].bigSize = false;
  //       }
  //       else {
  //         this.token_details.temptokens_sub[i].bigSize = res.req.bigSize
  //       };
  //       i++;
  //     })
  //     this.screen_view();
  //   })

  // }
  // screen_view() {
  //   let bissize: any = false;
  //   let biguser: any = null;
  //   this.token_details.temptokens_sub.forEach((element: any) => {
  //     if (element.bigSize) {
  //       let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == element.Uid);
  //       console.log(element, 2222222, index)
  //       if (index != -1) {
  //         bissize = true;
  //         biguser = element.Uid;
  //       }
  //     }
  //   });
  //   if (bissize) {
  //     console.log('sdaakjhsjdhjhasjda')
  //     let userId = this.stream.remoteUsers.findIndex((e: any) => e.uid == biguser);
  //     if (userId != -1) {
  //       let i = 1;
  //       this.token_details.temptokens_sub.forEach((element: any) => {
  //         let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == element.Uid);
  //         if (index != -1) {
  //           if (biguser != element.Uid) {
  //             this.stream.remoteUsers[index].class = 'small-screen' + i;
  //             i++;
  //           }
  //           else {
  //             this.stream.remoteUsers[index].class = 'big-screen';
  //           }
  //         }
  //       });
  //     }
  //     else {
  //       this.stream.remoteUsers.map((a: any) => {
  //         return a.class = 'medium';
  //       })
  //     }
  //   }
  //   else {
  //     this.stream.remoteUsers.map((a: any) => {
  //       return a.class = 'medium';
  //     })
  //   }
  // }

  userId: any;
  get_controls(channel: any) {
    this.web.get_controls_details(channel).subscribe(msg => {
      this.mute_video = msg.video;
      this.mute_audio = msg.audio;
    });
  }
  get_token_details() {
    this.api.get_token_details_sub(this.id).subscribe((res: any) => {
      if (res.stream.status == 'Completed') {
        window.close();
        this.router.navigateByUrl("/")
      }
      // console.log(res)
      // console.log(res)
      this.web.livejoined(this.id);
      this.stream.update_AppID(res.appID.appID)
      this.mute_audio = res.stream.audio;
      this.mute_video = res.stream.video;
      // console.log(res.stream.video, 899778)
      // this.media_controls(res);
      this.get_controls(res.stream._id)
      // this.expiered_message(res);
      this.targetTime = res.demotoken.expirationTimestamp
      // console.log(res, 231983781, this.targetTime)
      this.tickTock();
      this.token_details = res;

      this.web.main_host_end_strem(res.demotoken.channel).subscribe((res: any) => {
        this.countDown?.unsubscribe()
        this.logout();
        this.router.navigateByUrl("");
        // this.web.liveleave(this.id)
      })
      this.web.getMessage_new_chat(this.token_details.stream._id).subscribe((res: any) => {
        // console.log(res, this.view_chat_now, 7777777777)
        if (this.view_chat_now != 'chat') {
          this.chatCount++;
        }
      })
      if (!this.expiered) {
        // console.log(res, 21312312)
        this.joinCall(res.demotoken);
      }
      // console.log(this.token_details.chennel, 876781761261)
      this.web.getMessage_userCount(this.token_details.stream.channel).subscribe(msg => {
        // console.log(msg, 'asasasdassdas')
      });
    });
  }

  token_details: any;
  joinCall(res: any) {
    this.stream.agoraServerEvents(this.stream.rtc);
    // console.log(res, "sadasd")
    // console.log(res.token, res.uid, '', res.channel, 'asas')
    this.stream.localUser(res.token, res.uid, '', res.channel);
    // });id
    // console.log(this.id, this.token_details, "123123123123123")

  }
  ngOnDestroy(): void {
    this.web.liveleave(this.id)
    this.countDown?.unsubscribe();
    this.logout();
  }
  async logout() {
    await this.stream.leaveCall(this.userId);
    this.api
      .participents_leave(this.token_details._id)
      .subscribe((res: any) => {
      });
  }

  value_change(event: any) {
    alert('uptated');
  }
  expiered: any = false;

  expiered_message(res: any) {
    let ex = new Date(res.expDate_host).getTime() - new Date().getTime();
    setTimeout(() => {
      this.expiered = true;
      this.logout();
    }, ex);
  }

  targetTime: any;
  tickTock() {
    var startDate = new Date();
    var endDate = new Date(this.targetTime);
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    // console.log(seconds, 2222222)
    this.counter = Math.floor(seconds) + 2;
    this.countDown = timer(0, 1000).subscribe(() => --this.counter);

  }
  countDown: Subscription | undefined;
  counter: any;

  play() {
    this.stream.play()

  }
  pause() {
    this.stream.pause()

  }
  view_chat_now: any = 'product';
  view_chat() {
    $(".chat_box").toggleClass('view-chat-template');
    $(".chat-view").slideToggle(400);
    $(".view-videos").slideToggle(400);
    this.api.get_token_details_sub(this.id).subscribe((res: any) => {
      this.targetTime = res.demotoken.expirationTimestamp
      this.token_details = res;
    });
  }
  view_change(type: any) {
    if (this.view_chat_now == type) {
      this.view_chat_now = 'product';
    }
    else {
      this.view_chat_now = type;
    }
    if (type == 'chat') {
      this.chatCount = 0;
    }

    this.api.get_token_details_sub(this.id).subscribe((res: any) => {
      this.targetTime = res.demotoken.expirationTimestamp
      this.token_details = res;
    });
  }
  videoented() {
    this.addend = true;
  }
  addend: any = false;

  open_product_view: any;
  close_product_view() {
    this.open_product_view = null;
  }
  add_to_cart_view(item: any) {
    this.web.addToCart.next(item)
  }
}

