import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private rest:RestService) { }
  login(data):Observable<any>
  {
    return this.rest.put('login',data);
  }
  resgister(data):Observable<any>
  {
    return this.rest.put('register',data);
  }
}

