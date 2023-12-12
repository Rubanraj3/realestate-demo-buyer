import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'realestate-demo';
  // @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   console.log(window.innerWidth,window.innerHeight)
   
  // }
}
