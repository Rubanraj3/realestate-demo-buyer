import { Component, Input, OnInit } from '@angular/core';
import HLS from 'hls.js';

@Component({
  selector: 'app-video-hls',
  templateUrl: './video-hls.component.html',
  styleUrls: ['./video-hls.component.css']
})
export class VideoHlsComponent implements OnInit {

  @Input('url') url: any;
  @Input('urlDate') urlDate: any

  constructor() {
  }
  Src: any;
  length: any = 0;
  ngOnInit(): void {
    if (this.urlDate) {
      if (this.urlDate.length != 0) {
        // setTimeout(() => {
          this.next();
        // }, 3000)
      }
    }
  }
  vidEnded() {
    let length = this.urlDate.length;
    console.log(length - 1 > this.length, length - 1, this.length)
    if (length - 1 > this.length) {
      this.length = this.length + 1;
    }
    else {
      this.length = 0;
    }
    this.next();

  }
  next() {
    this.Src = this.awsS3 + this.urlDate[this.length].videoLink;
    console.log(this.Src,2231)
    var x: any = document.getElementById("video-player");
    console.log(x,13212312)
    if (this.hls) {
      this.hls.destroy();
    }
    this.hls = new HLS({
      startLevel: 2,
      capLevelToPlayerSize: true,
    });
    if (HLS.isSupported()) {
      this.hls.loadSource(this.Src);
      this.hls.attachMedia(x);
      this.hls.on(HLS.Events.MANIFEST_PARSED, () => {
        x.play();
      });
    }
  }
  awsS3 = "https://streamingupload.s3.ap-south-1.amazonaws.com/"

  private hls: any;

}
