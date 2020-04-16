import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user:{
    firstname:"",
    lastname:"",
    email:"",
    password:"",
  };
  message:string;
  constructor(private service:UserService,private route:Router) {
    this.user={
      firstname:"",
      lastname:"",
      email:"",
      password:"",
    };
   }

  ngOnInit(): void {
  }
  register(){
    this.service.resgister(this.user).subscribe((data)=>{
      console.log(data);
      if(data.data.length>0)
      {
        this.route.navigate(['/login'])
      }
      else{
        this.message="registeration failed"
      }
      //once login redirect ot login page 
    })
  }

}
