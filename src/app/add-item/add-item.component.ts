import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Auteur } from './auteur.dto';
import { Contenu } from './content.dto';
import { Guid } from './generate.guid';
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
      typeDate:['published',Validators.required],
      hrefImg: ['', Validators.required],
      typeImg: ['jpg', Validators.required],
      tailleImg: [0],
      altImg: [''],
      urlCont: [''],
      typeCont: ['text'],
      valCont: ['', Validators.required],
      nomAuth: ['', Validators.required],
      mailAuth: ['', Validators.email],
      typeCreat:['author'],
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
      this.formGroup.value.datePub,
      this.formGroup.value.typeDate,
      this.formGroup.value.typeCreat
      /*image,
      contenu,
      auteur*/
    );

    var o2x = require('object-to-xml');
   
    var xml={
      item:{
        '#':{
          guid:Guid.newGuid(),
          title:item.title,
          category:{
            '@':{
              term:item.category
            }
          },
          typeDate:item.date,
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
          typeCreat : {
            '#' : {
              name:auteur.name,
              uri:auteur.uri,
              email:auteur.mail
            }
          }
        }
      }
    }

    this.service.addItem(String(o2x(xml)),item.typeDate,item.typeCreat).subscribe(rep=>this.router.navigateByUrl("/"))
    //console.log(JSON.stringify(item));
  }
}
