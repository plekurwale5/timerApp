import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  message:string;
  constructor(private service:UserService,private route:Router) { }
  ngOnInit(): void {
  }
  login(){
    console.log("email")
    console.log(this.email)
    console.log(this.password)
    this.service.login({email:this.email,password:this.password}).subscribe((data)=>{
      console.log("data")
      if(data.data.length>0)
      {
        localStorage.setItem("user_id", data.data[0].user_id);
        this.route.navigate(['/home'])
      }
      else{
        this.message="login Failed"
      }
    });
  }
}
