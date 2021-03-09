import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { accessTokenResponce, DeleteAccessTokenResponce, requestTokenResponce } from './authModels';
import { MatGridList } from '@angular/material/grid-list';
let request_token :string | undefined;
  
  let account_id : string;
  
  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 export class AppComponent implements OnInit  {

  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  }
  constructor(private observableMedia: MediaObserver ,private http: HttpClient) {}

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change) => {
      console.log(change)
      //this.grid.cols = this.gridByBreakpoint[change.];
    });
  }
  private RequestTokenUrl = 'auth/request_token';
  private accessTokenUrl =  'auth/access_token' ;
  
  private baseUrl = 'https://api.themoviedb.org/4';  // URL to web api
  private SessionId ;
  private access_token : string ="";

  request_tocken1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjI4ODA1MzYsInNjb3BlcyI6WyJwZW5kaW5nX3JlcXVlc3RfdG9rZW4iXSwiZXhwIjoxNjE1MjIzMjYyLCJyZWRpcmVjdF90byI6Imh0dHA6Ly93d3cudGhlbW92aWVkYi5vcmcvIiwidmVyc2lvbiI6MSwibmJmIjoxNjE1MjIyMzYyLCJhdWQiOiJhZTA2NDJjZmE5ZjlmM2U3NGFjZWMyNTNiYzRiZjVjYiJ9.mwc8yPlptgUBJr2QmI-GX-VFoiWKwcRV3cp0OTOcTMI"
  access_token1 =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODgwNTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInN1YiI6IjYwNDYzMDRmMTc2YTk0MDA0NTE5ZWIzZiIsInZlcnNpb24iOjEsIm5iZiI6MTYxNTIyMjYyNSwiYXVkIjoiYWUwNjQyY2ZhOWY5ZjNlNzRhY2VjMjUzYmM0YmY1Y2IifQ.mIgIdQvOuVGcYwnn5jy8BZFKOqAFEW-P1vbHfPdYrcA"
  account_id1 = "6046304f176a94004519eb3f"
  app_key ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTA2NDJjZmE5ZjlmM2U3NGFjZWMyNTNiYzRiZjVjYiIsInN1YiI6IjYwNDYzMDRmMTc2YTk0MDA0NTE5ZWIzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eCjl_VM3qJNCmXY_JioAKLL9mauTIdqsZCXwZY5JP7w"
  private v3ApiKey = "ae0642cfa9f9f3e74acec253bc4bf5cb";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer  ${this.app_key}` 
    })
  };
  
  

  
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
      this.access_token = res.access_token;
      account_id = res.account_id;

      localStorage.setItem('User', JSON.stringify({res}));
      console.log(" access " +res.status_message +" is it success" +this.access_token)
    })
  }
  deleteSession(){
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Authorization': `Bearer  ${this.app_key}` 
      }),
      body: {
        "session_id": this.SessionId,
      },
    }
    console.log(deleteOptions)
    this.http.delete<any>(`https://api.themoviedb.org/3/authentication/session `,deleteOptions,).subscribe((res)=>{
      
      console.log(res)
    })

  }
  

  createSession(){
    console.log(this.access_token);
    this.http.post<any>(`https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${this.v3ApiKey}`, {
      "access_token" : `${this.access_token}`
    },this.httpOptions).subscribe((res)=>{
      this.SessionId = res.session_id
      console.log(res)
    })
  }


  title = 'test';
}
