import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as xml2js from 'xml2js';
import { AppService } from '../app.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items:any=null;

  constructor(/*private client:HttpClient*/ private service:AppService,private router:Router){}
  ngOnInit(): void {
    this.getEmployees();
  }

  parseXML(data:any) {  
    return new Promise(resolve => {  
      var k: string | number,  
        arr:any = []
        var parser =new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err:any, result:any) {  
        var obj = result.items;  
        for (k in obj.item) {  
          var item = obj.item[k];  
          arr.push({  
            guid: item.guid[0],  
            title: item.title[0],  
            date: item.date[0],  
          });  
        }  
        resolve(arr);  
      });  
    });  
  }  

  public getEmployees():void{

    /*this.client.get('http://localhost:8100/rss22/resume/xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  ,  
        responseType: 'text'  
      })  
      .subscribe((data) => {  
        var obj=new window.DOMParser().parseFromString(data, "text/xml");
        this.parseXML(data).then((data)=>{this.items=data})
      },
      (err:HttpErrorResponse)=>{
        console.log(err)
      }); */
    
    this.service.getItems().subscribe((resp)=>{
      this.parseXML(resp).then((data)=>{this.items=data})
    },
    (err:HttpErrorResponse)=>{
      console.log(err)
    })
  }

  public onDeleteItem(guid:string){
    this.service.deleteItem(guid).subscribe((resp)=>{
      alert("C'EST FAIT")
      this.router.navigateByUrl("/")
    },
    (err:HttpErrorResponse)=>{
      alert(err.message);
    })
  }

}
