import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  formGroup: FormGroup /*= new FormGroup({
    titre: new FormControl(''),
    categorie: new FormControl(''),
    datePub: new FormControl(''),
    typeDate: new FormControl(''),
    hrefImg: new FormControl(''),
    typeImg: new FormControl(''),
    tailleImg: new FormControl(0),
    altImg: new FormControl(''),
    urlCont: new FormControl(''),
    typeCont: new FormControl(''),
    valCont: new FormControl(''),
    nomAuth: new FormControl(''),
    mailAuth: new FormControl(''),
    typeCreat: new FormControl(''),
    uriAuth: new FormControl(''),
  })*/;

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private router: Router
  ) {}

  /*get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }*/

  get title(){
    return this.formGroup.get('titre');
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      titre: this.fb.control(null,Validators.required), /*['', Validators.required],*/
      categorie: ['', Validators.required],
      datePub: ['', Validators.required],
      typeDate: ['published', Validators.required],
      hrefImg: [''],
      typeImg: ['jpg', Validators.required],
      tailleImg: [0],
      altImg: [''],
      urlCont: [''],
      typeCont: ['text'],
      valCont: ['', Validators.required],
      nomAuth: ['', Validators.required],
      mailAuth: [''],
      typeCreat: ['author'],
      uriAuth: [''],
    });
  }

  onSubmit() {
    this.submitted=true;
    console.log(this.formGroup);
    if(this.formGroup.invalid){
      return ;
    }
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

    var xml = {
      item: {
        '#': {
          guid: Guid.newGuid(),
          title: item.title,
          category: {
            '@': {
              term: item.category,
            },
          },
          typeDate: item.date,
          image: {
            '@': {
              alt: image.alt,
              href: image.href,
              length: image.lenght,
              type: image.type,
            },
          },
          content: {
            '@': {
              href: contenu.href,
              type: contenu.type,
            },
            '#': contenu.content,
          },
          typeCreat: {
            '#': {
              name: auteur.name,
              uri: auteur.uri,
              email: auteur.mail,
            },
          },
        },
      },
    };

    console.log("ok")

    this.service
      .addItem(String(o2x(xml)), item.typeDate, item.typeCreat)
      .subscribe((rep) => this.router.navigateByUrl('/'));
    //console.log(JSON.stringify(item));
  }
}
