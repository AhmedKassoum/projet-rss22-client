import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit{

  private apiServiceUrl:(string|null);

  ngOnInit(): void {
    
  }

  setApiBaseUrl(url:string){
    this.apiServiceUrl=url;
  }
  

  constructor(private http:HttpClient) {
    if(localStorage.getItem("api")){
      this.apiServiceUrl=localStorage.getItem("api");
    }
    else{
      localStorage.setItem("api","http://localhost:8100")
      this.apiServiceUrl="http://localhost:8100"
    }
   }

  public getItems ():Observable<any>{
    console.log(this.apiServiceUrl)
    return this.http.get(`${this.apiServiceUrl}/rss22/resume/xml`,{responseType:'text'});
  }

  public addItem (item:string,typeDate:string,typeCreat:string):Observable<string>{
    const config = new HttpHeaders().set('Content-Type', 'text/xml').set('Accept', 'text/xml')
    item=item.split('typeDate').join(typeDate)
    item=item.split('typeCreat').join(typeCreat)
    return this.http.post(`${this.apiServiceUrl}/rss22/insert`,item,{headers:config,responseType:'text'});
  }

  public deleteItem (guid:string):Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/rss22/delete/${guid}`);
  }

  public getItemByGuid(guid:string){
    return this.http.get(`${this.apiServiceUrl}/rss22/resume/xml/${guid}`,{responseType:'text'});
  }

}
