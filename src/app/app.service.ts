import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auteur } from './add-item/auteur.dto';
import { Item } from './add-item/item.dto';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getItems ():Observable<any>{
    //{ headers: headers, responseType: text/xml }
    return this.http.get(`${this.apiServiceUrl}/rss22/resume/xml`,{responseType:'text'});
  }

  public addItem (item:string):Observable<string>{
    const config = new HttpHeaders().set('Content-Type', 'text/xml')
                                .set('Accept', 'text/xml')
    return this.http.post(`${this.apiServiceUrl}/rss22/insert`,item,{headers:config,responseType:'text'});
  }
  public addAuteur (auteur:Auteur):Observable<Auteur>{
    const config = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
    return this.http.post<Auteur>(`${this.apiServiceUrl}/rss/add`,JSON.stringify(auteur),{headers:config});
  }



  public deleteItem (guid:string):Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/rss22/delete/${guid}`);
  }
}
