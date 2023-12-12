import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import HLS from 'hls.js';

@Directive({
  selector: '[appVideoHls]'
})
export class VideoHlsDirective implements OnInit {

  @Input('scr') scr: any;

  private hls: any;
  private element: HTMLVideoElement;

  constructor(videoPlayer: ElementRef) {
    this.element = videoPlayer.nativeElement;
    this.element.muted = true;
    this.element.autoplay = true;

  }

  ngOnInit(): void {
    this.establishHlsStream();
  }
  establishHlsStream(): void {
    if (this.hls) {
      this.hls.destroy();
    }
    this.hls = new HLS({
      startLevel: 2,
      capLevelToPlayerSize: true,
    });

    if (HLS.isSupported()) {
      this.hls.loadSource(this.scr);
      this.hls.attachMedia(this.element);
      this.hls.on(HLS.Events.MANIFEST_PARSED, () => {
        this.element.play();
      });
    }
  }

}
