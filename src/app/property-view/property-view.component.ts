import { Component, HostListener, OnInit } from '@angular/core';
import { ResizeService } from '../service/resize.service';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css']
})
export class PropertyViewComponent implements OnInit {
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
