import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Auteur } from './auteur.dto';
import { Contenu } from './content.dto';
import { Image } from './image.dto';
import { Item } from './item.dto';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  formGroup: FormGroup;
  submitted:boolean=false;

  constructor(private fb: FormBuilder, private service: AppService, private router:Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      titre: ['', Validators.required],
      categorie: ['', Validators.required],
      datePub: ['', Validators.required],
      hrefImg: ['', Validators.required],
      typeImg: ['', Validators.required],
      tailleImg: [0],
      altImg: [''],
      urlCont: [''],
      typeCont: [''],
      valCont: ['', Validators.required],
      nomAuth: ['', Validators.required],
      mailAuth: ['', Validators.required],
      uriAuth: [''],
    });
  }

  get f() { return this.formGroup.controls; }

  onSubmit() {
    let image: Image = new Image(
      this.formGroup.value.hrefImg,
      this.formGroup.value.typeImg,
      this.formGroup.value.tailleImg,
      this.formGroup.value.altImg
    );
    let contenu: Contenu = new Contenu(
      this.formGroup.value.urlCont,
      this.formGroup.value.typeCont,
      this.formGroup.value.valCont
    );
    let auteur: Auteur = new Auteur(
      this.formGroup.value.nomAuth,
      this.formGroup.value.mailAuth,
      this.formGroup.value.uriAuth
    );
    let item: Item = new Item(
      this.formGroup.value.titre,
      this.formGroup.value.categorie,
      this.formGroup.value.datePub
      /*image,
      contenu,
      auteur*/
    );

    var o2x = require('object-to-xml');
   
    var xml={
      item:{
        '#':{
          guid:'d7f9e71a-5286-4921-b61d-f389007be6dc',
          title:item.title,
          category:{
            '@':{
              term:item.category
            }
          },
          published:item.published,
          image:{
            '@':{
              alt:image.alt,
              href:image.href,
              length:image.lenght,
              type:image.type
            }
          },
          content : {
            '@' : {
              href : contenu.href,
              type : contenu.type
            },
            '#' : contenu.content
          },
          author : {
            '#' : {
              name:auteur.name,
              uri:auteur.uri,
              email:auteur.mail
            }
          }
        }
      }
    }

    this.service.addItem(String(o2x(xml))).subscribe(rep=>this.router.navigateByUrl("/"))
    //console.log(JSON.stringify(item));
  }
}
