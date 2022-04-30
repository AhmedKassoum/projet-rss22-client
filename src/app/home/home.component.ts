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

  constructor(private formbuilder: FormBuilder, private route: Router) {}

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

    

    let apiBaseUrl:string=this.fg.value.host;

    if(apiBaseUrl){
      environment.apiBaseUrl=apiBaseUrl;
      AppService.host=apiBaseUrl;
      this.route.navigateByUrl("/get")
    }

    
    
  }
}
