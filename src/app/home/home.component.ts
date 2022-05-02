import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  fg: FormGroup;
  submitted: boolean = false;

  public myHost:string;

  constructor(private formbuilder: FormBuilder, private route: Router, private http:HttpClient) {}

  get host(){
    return this.fg.get('host');
  }

  ngOnInit(): void {
    this.fg = this.formbuilder.group({
      host: this.formbuilder.control(null, Validators.required),
    });

  }

  onSubmit() {
    this.submitted = true;
    if(this.fg.invalid){
      return;
    }
  
    let apiBaseUrl=this.fg.value.host;

    if(apiBaseUrl){
      environment.apiBaseUrl=apiBaseUrl;
      /*console.log("dans home "+apiBaseUrl)
      console.log(environment.apiBaseUrl)*/
      /*this.http.get(`${apiBaseUrl}/rss22/resume/xml`, {
        responseType: 'text',
      })*/
      this.route.navigateByUrl("/get")
    }

    
    
  }
}
