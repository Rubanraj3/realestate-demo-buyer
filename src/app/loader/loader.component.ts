import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  showLoader: any = false;
  constructor(
    private loaderService: LoaderService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loaderService.isloadingnow.subscribe((e: any) => {
      this.showLoader = e;
      // this.cdref.detectChanges();
      // console.log(e);
      // alert(e);
    });
  }
}
