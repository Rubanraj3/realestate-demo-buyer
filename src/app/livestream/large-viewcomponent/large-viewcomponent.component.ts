import { Env } from 'src/app/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Subscription, timer } from 'rxjs';
import { AgorastreamingService_sub } from '../agorastreaming.service';
import { Livestreanservice } from '../livestream.service';
import { SocketioService } from '../socketio.service';
import { SubscriberserveService } from '../subscriberserve.service';
declare let $: any;
@Component({
  selector: 'app-large-viewcomponent',
  templateUrl: './large-viewcomponent.component.html',
  styleUrls: ['./large-viewcomponent.component.css']
})
export class LargeViewcomponentComponent implements OnInit {

  baseUrl: any = Env.baseAPi;
  currentTime: any = new Date().getTime();
  constructor(
    public route: ActivatedRoute,
    public api: Livestreanservice,
    public stream: AgorastreamingService_sub,
    public router: Router,
    public chat: SubscriberserveService,
    public web: SocketioService,

  ) { }
  id: any;
  audio: any;
  videos: any;
  innerWidth: any;
  view_chat_now_cart: any = 'product';
  mute_video: any = true;
  mute_audio: any = true;
  chatCount: any = 0;
  cartCount: any = 0;
  open_product_view: any;
  livecode: any;

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
    this.route.queryParamMap.subscribe((params: any) => {
      this.id = params.params.id;

      // this.web.live_check_current(this.id).subscribe((res: any) => {
      //   if (res.code != this.livecode) {
      //     window.location.href = "/dashboard"
      //   }
      // })
      // if (this.livecode == null) {
      //   this.stream.currentLive.subscribe((res: any) => {
      //     if (res != null) {
      //       if (this.id == res.stream) {
      //         this.livecode = res.code;
      //       }
      //       else {
      //         this.livecode = Math.floor(100000 + Math.random() * 900000);
      //         this.stream.currentLive.next({ code: this.livecode, stream: this.id })
      //       }
      //     }
      //     else {
      //       this.livecode = Math.floor(100000 + Math.random() * 900000);
      //       this.stream.currentLive.next({ code: this.livecode, stream: this.id })
      //     }
      //   })
      // }
      this.get_token_details();
      // this.get_other_stream_list();
    });

    this.web.cartCount.subscribe((res: any) => {
      this.cartCount = res;
    });
    this.web.productView.subscribe((res: any) => {
      // console.log(res)
      this.open_product_view = res;
      if (res != null) {
        this.view_chat_now_cart = 'productview';
      }
      else {
        this.view_chat_now_cart = 'product';
      }
    })
    this.audio = AgoraRTC.getDevices();
    this.videos = AgoraRTC.getCameras();
    this.videos = this.videos.__zone_symbol__value;
    this.audio = this.audio.__zone_symbol__value;
    this.audio.forEach((element: any) => { });
    if ((this, this.stream.exprierd)) {
    }
    this.chat.viewcontant_large.subscribe((res: any) => {
      this.view_chat_now_cart = res;
      this.api.get_token_details_sub(this.id).subscribe((res: any) => {
        this.targetTime = res.demotoken.expirationTimestamp
        this.token_details = res;
      });
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
      this.screen_view()

    })
    this.stream.unpublished.subscribe((res: any) => {
      this.screen_view()
    })
  }
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

      this.web.livejoined(this.id);
      this.stream.update_AppID(res.appID.appID)
      this.mute_audio = res.stream.audio;
      this.mute_video = res.stream.video;
      this.targetTime = res.demotoken.expirationTimestamp
      this.tickTock();
      this.get_controls(res.stream._id)
      this.token_details = res;
      this.web.main_host_end_strem(res.demotoken.channel).subscribe((res: any) => {
        this.countDown?.unsubscribe()
        this.logout();
        this.router.navigateByUrl("/");
      })
      this.web.getMessage_new_chat(this.token_details.chennel).subscribe((res: any) => {
        if (this.view_chat_now != true) {
          this.chatCount++;
        }
      })
      if (!this.expiered) {
        this.joinCall(res.demotoken);
      }
      this.web.getMessage_userCount(this.token_details.chennel).subscribe(msg => {
      });
    });
  }

  media_controls(res: any) {
    console.log(res, 2315234872)
    this.web.stream_view_change_controls(res.chennel).subscribe((res: any) => {
      let i = 0;
      this.token_details.temptokens_sub.forEach((element: any) => {
        if (res.req.uid != element.Uid) {
          this.token_details.temptokens_sub[i].bigSize = false;
        }
        else {
          this.token_details.temptokens_sub[i].bigSize = res.req.bigSize
        };
        i++;
      })
      this.screen_view();
    })

  }
  screen_view() {
    let bissize: any = false;
    let biguser: any = null;
    if (this.token_details != null) {
      this.token_details.temptokens_sub.forEach((element: any) => {
        if (element.bigSize) {
          let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == element.Uid);
          // console.log(element, 2222222, index)
          if (index != -1) {
            bissize = true;
            biguser = element.Uid;
          }
        }
      });
      if (bissize) {
        // console.log('sdaakjhsjdhjhasjda')
        let userId = this.stream.remoteUsers.findIndex((e: any) => e.uid == biguser);
        if (userId != -1) {
          let i = 1;
          this.token_details.temptokens_sub.forEach((element: any) => {
            let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == element.Uid);
            if (index != -1) {
              if (biguser != element.Uid) {
                this.stream.remoteUsers[index].class = 'small-screen' + i;
                i++;
              }
              else {
                this.stream.remoteUsers[index].class = 'big-screen';
              }
            }
          });
        }
        else {
          this.stream.remoteUsers.map((a: any) => {
            return a.class = 'medium';
          })
        }
      }
      else {
        this.stream.remoteUsers.map((a: any) => {
          return a.class = 'medium';
        })
      }
    }
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
  raice_your_hand() {

  }
  ngOnDestroy(): void {
    this.web.liveleave(this.id);
    this.countDown?.unsubscribe()
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
    // let ex = new Date(res.expDate_host).getTime() - new Date().getTime();
    // setTimeout(() => {
    //   this.expiered = true;
    //   this.logout();
    // }, ex);
  }

  targetTime: any;
  tickTock() {
    var startDate = new Date();
    var endDate = new Date(this.targetTime);
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    // console.log(seconds, 2222222, endDate, startDate)
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
  view_chat_now: any = false;
  view_chat() {
    this.view_chat_now = !this.view_chat_now;
    $(".chat_box").toggleClass('view-chat-template');
    $(".chat-view").slideToggle(400);
    $(".view-videos").slideToggle(400);
    this.chatCount = 0;
  }

  videoented() {
    this.addend = true;
  }
  addend: any = false;

  stream_list: any;
  get_other_stream_list() {
    this.api.get_other_stream_details(this.id).subscribe((res: any) => {
      this.stream_list = res;
      // console.log(res)
    })
  }
  registerNow(item: any, type: any) {
    let index = type.findIndex((a: any) => a._id == item._id)
    this.api.registerNow({ streamId: item._id }).subscribe((res: any) => {
      type[index].registerStatus = res.findresult.status
      type[index].eligible = res.findresult.eligible
      type[index].viewstatus = res.findresult.viewstatus
    })

  }
  unregisterNow(item: any, type: any) {
    let index = type.findIndex((a: any) => a._id == item._id)
    this.api.unregisterNow({ streamId: item._id }).subscribe((res: any) => {
      // console.log(res, type[index])
      type[index].registerStatus = res.status
      type[index].eligible = false
      type[index].viewstatus = ''

    })
  }

  watch_live(item: any) {
    // console.log(item)
    this.api.get_sub_token(item._id).subscribe((res: any) => {
      // console.log(res)
      window.location.href = '/dashboard/livestream?id=' + res.user._id
    }, (error: any) => {
      this.get_other_stream_list();

    })

  }
  add_to_cart_view(item: any) {
    this.web.addToCart.next(item)
  }
  back_to_product_view() {
    this.web.productView.next(null)
  }
}
