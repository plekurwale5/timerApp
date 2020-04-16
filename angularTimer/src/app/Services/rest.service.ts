import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl: string = "http://127.0.0.1:4001/";

  user: string = this.baseUrl + "user/";
  timer: string = this.baseUrl + "timer/";

  public apis = {
    register: { url: this.user+'register', method: "put", type: "application/json; charset=UTF-8" },
    login: { url: this.user+'login', method: "put", type: "application/json; charset=UTF-8" },
    addtimer: { url: this.timer, method: "put", type: "application/json; charset=UTF-8" },
    updatetimer: { url: this.timer+'', method: "post", type: "application/json; charset=UTF-8" },
    timerlist: { url: this.timer+'list', method: "put", type: "application/json; charset=UTF-8" },
    deletetimer: { url: this.timer+'delete', method: "post", type: "application/json; charset=UTF-8" },
  }
  constructor(private httpClient: HttpClient) { }
  
  returnApi(call: string, data: any): any {
    var api={
      payload:"",
      httpHeaders:new HttpHeaders({
        "Content-Type": "",
      }),
      type:""};
    try {
      api = JSON.parse(JSON.stringify(this.apis[call]));
    } catch (err) {
      console.log(call + "\t is not defined yet in the service register");
    }
    api.payload = data;
    api.httpHeaders = new HttpHeaders({
      "Content-Type": api.type,
    });
    return api;
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
  public put(call: string, data: any) {
    var api = this.returnApi(call, data);
    console.log(api)
    return this.httpClient
      .put(api.url, api.payload, { headers: api.httpHeaders })
    }
  public post(call: string, data: any) {
    var api = this.returnApi(call, data);
    return this.httpClient
      .post(api.url, api.payload, { headers: api.httpHeaders })
    }
}
