import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { SocketioService } from 'src/app/livestream/socketio.service';
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: 'app-property-view-mobile',
  templateUrl: './property-view-mobile.component.html',
  styleUrls: ['./property-view-mobile.component.css']
})
export class PropertyViewMobileComponent {
  id:any
  streamid:any
  verfiyid:any
  data:any=[]
  coundonw: any;
  now_time: any = new Date().getTime();
   constructor(private arouter:ActivatedRoute,
     private router:Router,private service:AuthserviceService ,private socket: SocketioService){
     this.arouter.params.subscribe(params=>{
       this.id = params['id']
     })
     console.log(this.id)
     this.streamid= localStorage.getItem('streamId')
     this.verfiyid= localStorage.getItem('buyerVerfiyId')
     this.coundonw = timer(0, 1000).subscribe((res: any) => {
      this.now_time = new Date().getTime();
    })
    }
    ngOnInit(): void {
     this.get_prop()
   }
   stream: any=[]
   streamhis: any;

    get_prop(){
      let data = {
        streamID: this.streamid,
        verify: this.verfiyid
      }
      this.socket.stream_on_going(this.streamid).subscribe((res: any) => {
        console.log(res)
        if (this.data != null) {
          this.data.status = res.status;
        }
      })
      this.service.get_prop(data).subscribe((res: any) => {
        this.data = res.post;
        console.log(res)
        this.stream = res.token;
        this.streamhis = res.stream;

      })
    }
    go_live() {
      this.service.join_live(this.verfiyid).subscribe((res: any) => {
        console.log(res)
        this.router.navigateByUrl("/stream?id=" + res._id)
      })
    }
}
