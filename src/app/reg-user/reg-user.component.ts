import { Component, HostListener, OnInit } from '@angular/core';
import { ResizeService } from '../service/resize.service';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css'],
})
export class RegUserComponent implements OnInit {
  show!: boolean;
  constructor(private service: ResizeService) {}
  ngOnInit(): void {
   this.onResize()
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log(window.innerWidth)
   this.show = window.innerWidth > 800;
  
  }
 
}
