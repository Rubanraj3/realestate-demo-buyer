import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reg-user-mobile',
  templateUrl: './reg-user-mobile.component.html',
  styleUrls: ['./reg-user-mobile.component.css']
})
export class RegUserMobileComponent implements OnInit {


  ngOnInit(): void {

  }
  id: any;
  constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe((res: any) => {
      this.id = res.params.id;
      this.get_user_info();
    })
  }
  get_user_info() {

  }
}
