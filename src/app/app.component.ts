import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { accessTokenResponce, DeleteAccessTokenResponce, requestTokenResponce } from './authModels';
let request_token :string | undefined;
  let access_token : string ;
  let account_id : string;
  
  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 export class AppComponent implements OnInit  {

  private RequestTokenUrl = 'auth/request_token';
  private accessTokenUrl =  'auth/access_token' ;
  
  private baseUrl = 'https://api.themoviedb.org/4';  // URL to web api

  

  request_tocken1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjI4ODA1MzYsInNjb3BlcyI6WyJwZW5kaW5nX3JlcXVlc3RfdG9rZW4iXSwiZXhwIjoxNjE1MjIzMjYyLCJyZWRpcmVjdF90byI6Imh0dHA6Ly93d3cudGhlbW92aWVkYi5vcmcvIiwidmVyc2lvbiI6MSwibmJmIjoxNjE1MjIyMzYyLCJhdWQiOiJhZTA2NDJjZmE5ZjlmM2U3NGFjZWMyNTNiYzRiZjVjYiJ9.mwc8yPlptgUBJr2QmI-GX-VFoiWKwcRV3cp0OTOcTMI"
  access_token1 =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODgwNTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInN1YiI6IjYwNDYzMDRmMTc2YTk0MDA0NTE5ZWIzZiIsInZlcnNpb24iOjEsIm5iZiI6MTYxNTIyMjYyNSwiYXVkIjoiYWUwNjQyY2ZhOWY5ZjNlNzRhY2VjMjUzYmM0YmY1Y2IifQ.mIgIdQvOuVGcYwnn5jy8BZFKOqAFEW-P1vbHfPdYrcA"
  account_id1 = "6046304f176a94004519eb3f"
  app_key ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTA2NDJjZmE5ZjlmM2U3NGFjZWMyNTNiYzRiZjVjYiIsInN1YiI6IjYwNDYzMDRmMTc2YTk0MDA0NTE5ZWIzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eCjl_VM3qJNCmXY_JioAKLL9mauTIdqsZCXwZY5JP7w"
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer  ${this.app_key}` 
    })
  };
  

  constructor(private http: HttpClient  ){}
  ngOnInit(): void {
    
  }
  aproveRequestToken(){
    localStorage.setItem('currentUser', JSON.stringify({ token: request_token }));
    window.location.href = `https://www.themoviedb.org/auth/access?request_token=${request_token}`
  }
  getRequestToken() {
    this.http.post<requestTokenResponce>(`${this.baseUrl}/${this.RequestTokenUrl}`,{
      "redirect_to": "http://localhost:4200/",
      
    },this.httpOptions).subscribe((res)=>{
        request_token = res.request_token;
        console.log(res)
    })
      
  }

  getAccessToken(){
    if(request_token === undefined) request_token = JSON.parse(localStorage.getItem('currentUser')).token ,
    console.log(request_token);
    this.http.post<accessTokenResponce>(`${this.baseUrl}/${this.accessTokenUrl}`,{
      "request_token": request_token,
      
    },this.httpOptions).subscribe((res)=>{
      access_token = res.access_token;
      account_id = res.account_id;
      localStorage.setItem('currentUser', JSON.stringify({res}));
      console.log(" access " +res.status_message +" is it success" +res.success)
    })
  }
  deleteAccessToken(){
    console.log(this.deleteOptions)
    this.http.delete<any>(`${this.baseUrl}/auth/access_token `,this.deleteOptions,).subscribe((res)=>{
      
      console.log(res)
    })

  }
  deleteOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer  ${this.app_key}` 
    }),
    body: {
      access_token : access_token
    },
  }
  title = 'test';
}
