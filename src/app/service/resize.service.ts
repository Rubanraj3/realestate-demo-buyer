import { EventEmitter, HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  onResize$ = new EventEmitter<any>(); 

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log(window.innerWidth)
    const isGreaterThan600 = window.innerWidth > 600;
    console.log(isGreaterThan600,window.innerWidth , 600)
    this.onResize$.emit(isGreaterThan600);
  }
  constructor() { }
}
