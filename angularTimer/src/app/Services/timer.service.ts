import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private rest:RestService) { }
  getList(data):Observable<any>{
    return this.rest.put('timerlist',data);
  }
  save(data):Observable<any>{
    return this.rest.put('addtimer',data);
  }
  update(data):Observable<any>{
    return this.rest.post('updatetimer',data);
  }
  delete(data):Observable<any>{
    return this.rest.post('deletetimer',data);
  }
}