
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: 'reg-user-mobile',
  templateUrl: './reg-user-mobile.component.html',
  styleUrls: ['./reg-user-mobile.component.css']
})
export class RegUserMobileComponent implements OnInit {

  id:any;
  submitted=false
   constructor(private arouter:ActivatedRoute,
    private router:Router,private service:AuthserviceService){
    this.arouter.params.subscribe(params=>{
      this.id = params['id']
    })
    console.log(this.id)
    if(this.id){
      localStorage.setItem('streamId',this.id)
    }
   }
   form = new FormGroup({
    phoneNumber:new FormControl ('',[Validators.required,Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.minLength(10),Validators.maxLength(10)]),
    name:new FormControl('',Validators.required)
   })
  ngOnInit(): void {
 
  }
  submit(){
    this.submitted=true
    if(this.form.valid){
      console.log(this.form.value)
      this.service.create_user(this.form.value,this.id).subscribe((res:any)=>{
        localStorage.setItem('buyerVerfiyId',res._id)
        this.router.navigateByUrl('property')
        this.submitted=false
      })
    }
  }
}
