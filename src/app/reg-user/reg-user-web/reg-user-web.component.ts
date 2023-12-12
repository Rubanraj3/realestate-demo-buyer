import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: 'reg-user-web',
  templateUrl: './reg-user-web.component.html',
  styleUrls: ['./reg-user-web.component.css']
})
export class RegUserWebComponent implements OnInit {
  id:any;
  submitted=false
   constructor(private arouter:ActivatedRoute,private service:AuthserviceService){
    this.arouter.params.subscribe(params=>{
      this.id = params['id']
    })
    console.log(this.id)
    if(this.id){
      localStorage.setItem('streamId',this.id)
    }
   }
   form = new FormGroup({
    phoneNumber:new FormControl ('',[Validators.required,Validators.pattern('/^[6]\d{9}$/'),Validators.minLength(10),Validators.maxLength(10)]),
    name:new FormControl('',Validators.required)
   })
  ngOnInit(): void {
   
  }
  submit(){
    if(this.form.valid){
      console.log(this.form.value)
      // this.service.create_user(this.form.value,this.id).subscribe((res:any)=>{
      //   localStorage.setItem('buyerVerfiyId',res._id)
      // })
    }
  }

}
