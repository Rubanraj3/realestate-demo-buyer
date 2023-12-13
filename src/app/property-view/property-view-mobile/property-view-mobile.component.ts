import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
   constructor(private arouter:ActivatedRoute,
     private router:Router,private service:AuthserviceService){
     this.arouter.params.subscribe(params=>{
       this.id = params['id']
     })
     console.log(this.id)
     this.streamid= localStorage.getItem('streamId')
     this.verfiyid= localStorage.getItem('buyerVerfiyId')
    
    }
    ngOnInit(): void {
     this.get_prop()
   }
    get_prop(){
     let data={
       streamID:this.streamid,
       verify:this.verfiyid
     }
     this.service.get_prop(data).subscribe((res:any)=>{
       this.data=res
       console.log(res)
     })
    }
}
