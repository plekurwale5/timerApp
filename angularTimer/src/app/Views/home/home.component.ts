import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/Services/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public seconds:number=0;
  public tens:number=0;
  public description="";
  private Interval ;
  public timer1:any;
  public list:any[];
  private user_id;
  public searchtext;
  public listcopy;
  public message;
  public current_t_id;
  public current_duration=0;
  public listduration;
  public listdescription;
  constructor(private service:TimerService) { 
    this.user_id=localStorage.getItem('user_id');
    this.reset();
    this.getList();
  }

  ngOnInit(): void {
    
  }
  startButton(){
    
    this.service.save({description:this.description,user_id:this.user_id}).subscribe((data)=>{
      if(data.data.length>0)
      {
        this.message="added successfully";
        this.current_t_id=data.data[0].t_id;
      }
      else{
        this.message="something wrong";
      }
      this.getList();
      clearInterval(this.Interval); 
    })
    this.Interval = setInterval(()=> {
      this.startTimer1(); 
    }, 10);
 
  }
  stopButton(){
  
    this.service.update({description:this.description,duration:this.current_duration,t_id:this.current_t_id}).subscribe((data)=>{
      if(data.data.length>0)
      {
        this.message="added successfully";
      }
      else{
        this.message="something wrong";
      }
      this.getList();
      this.reset();
      clearInterval(this.Interval);
    })
  }
  reset(){
    this.timer1={
      seconds:0,
      tens:0
    }
    this.description="";
  }
  startTimer1(){
    this.current_duration++;
    this.timer1.tens++;
    if (this.timer1.tens > 99) {
      console.log("seconds");
      this.timer1.seconds++;
      this.timer1.tens = 0;
    }
  }
  getList(){
    this.service.getList({user_id:this.user_id}).subscribe((data)=>{
      this.list=data.data;
      this.listcopy=JSON.parse(JSON.stringify(this.list));
      this.getchartList();
    })
  }
   getchartList(){
     for(var i=0;i<this.listcopy.length;i++)
     {
      this.listduration=this.listcopy[i].duration;
      this.listdescription=this.listcopy[i].description;

     }
  }
  search(event){
      this.list= this.listcopy.filter(function(str) {
      console.log(str)
      return str.description!=null&&str['description'].includes(event);
      
    });
  }
  delete(index){
    var t_id=this.list[index]['t_id'];
    this.service.delete({t_id:t_id,user_id:this.user_id}).subscribe((data)=>{
      this.getList();
    });
  }
}
