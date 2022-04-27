import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getItems ():Observable<any>{
    return this.http.get(`${this.apiServiceUrl}/rss22/resume/xml`,{responseType:'text'});
  }

  public addItem (item:string):Observable<string>{
    const config = new HttpHeaders().set('Content-Type', 'text/xml')
                                .set('Accept', 'text/xml')
    return this.http.post(`${this.apiServiceUrl}/rss22/insert`,item,{headers:config,responseType:'text'});
  }

  public deleteItem (guid:string):Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/rss22/delete/${guid}`);
  }

  public getItemByGuid(guid:string){
    return this.http.get(`${this.apiServiceUrl}/rss22/resume/xml/${guid}`,{responseType:'text'});
  }

}
