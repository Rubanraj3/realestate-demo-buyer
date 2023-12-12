import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { BehaviorSubject, Subject } from 'rxjs';
import { Env } from 'src/app/environment';
import { IUser } from './models';

@Injectable({
  providedIn: 'root',
})
export class AgorastreamingService_sub {
  constructor(public http: HttpClient) { }
  baseURL = Env.baseAPi;
  exprierd: any = false;
  rtc: any = {
    // For the local client.
    client: AgoraRTC.createClient({ mode: 'live', codec: 'vp8',role: "audience"  }),
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };
  options: any;
  // = {
  //   appId: '89d14c182a7047f9a80bb3d4f26c42f4',
  //   channel: 'test',

  // };

  update_AppID(key: any) {
    this.options = {
      appId: key.replace(/\s/g, ''),
      channel: 'test',

    };
  }


  remoteUsers: IUser[] = [];
  updateUserInfo = new BehaviorSubject<any>(null);
  liveUsersList: any = [];
  public mute_video = new Subject<boolean>();
  public mute_audio = new Subject<boolean>();
  public mute: any = new Subject<boolean>();
  unpublished = new BehaviorSubject<any>(null);
  public currentLive: any = new BehaviorSubject<any>(null);

  userCoubnt: any;

  agoraServerEvents(rtc: any) {

    rtc.client.on("user-published", async (user: any, mediaType: any) => {
      console.log(user, mediaType, 'user-published');
      let id = user.uid;
      let index = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index != -1) {
      }
      else {
        this.remoteUsers.push({ class: "medium", 'uid': +id, audio: user._audio_muted_, video: user._video_muted_ });
        this.updateUserInfo.next(id);
        this.userCoubnt = this.userCoubnt == null ? 1 : this.userCoubnt + 1;

      }
      await rtc.client.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        setTimeout(() => {
          remoteVideoTrack.play('remote-playerlist' + user.uid);
        }, 500);
      }
      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
      // alert(mediaType)
      let index_new = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index_new != -1) {
        if (this.remoteUsers[index] != null) {
          this.remoteUsers[index].audio = user._audio_muted_;
          this.remoteUsers[index].video = user._video_muted_;
        }
      }
    });
    rtc.client.on("user-left", (user: any) => {
      let index = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index != -1) {
        this.remoteUsers.splice(index, 1)
        this.userCoubnt = this.userCoubnt - 1;
      }
      this.unpublished.next(user.uid)

    });
    rtc.client.on("user-info-updated", (uid: any, msg: any) => {
      let index = this.remoteUsers.findIndex((a: any) => a.uid == uid)
      if (index != -1) {
        if (msg == 'mute-audio') {
          this.remoteUsers[index].audio = true;
        }
        if (msg == 'mute-video') {
          this.remoteUsers[index].video = true;
        }
        if (msg == 'unmute-audio') {
          this.remoteUsers[index].audio = false;
        }
        if (msg == 'unmute-video') {
          this.remoteUsers[index].video = false;
        }
      }
    });
    rtc.client.on("user-joined", (user: any) => {

      console.log("user-joined", user, this.remoteUsers, 'event1');
    });
    setTimeout(() => {
      if (this.userCoubnt == null) {
        this.userCoubnt = 0;
      }
    }, 1000)

  }
  async localUser(token: any, uuid: any, type: any, channel: any) {
    await this.rtc.client.setClientRole('audience');
    await this.rtc.client.join(
      this.options.appId,
      channel,
      token,
      uuid
    );
  }

  async leaveCall(useId: any) {
    // this.rtc.localAudioTrack.close();
    // this.rtc.localVideoTrack.close();
    this.rtc.client.remoteUsers.forEach((user: any) => {
      const playerContainer = document.getElementById('remote-playerlist' + user.uid.toString());
      playerContainer && playerContainer.remove();
    });
    await this.rtc.client.leave();
    this.remoteUsers = [];
  }

  async play() {
    await this.rtc.client.play()
  }
  async pause() {
    await this.rtc.client.pause()
  }
}
