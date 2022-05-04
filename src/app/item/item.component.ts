import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as xml2js from 'xml2js';
import { AppService } from '../app.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items: any = null;
  gui: string;

  constructor(
    private service: AppService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getItems();
  }

  parseXML(data: any) {
    return new Promise((resolve) => {
      var k: string | number,
        arr: any = [];
      var parser = new xml2js.Parser({
        trim: true,
        explicitArray: true,
      });
      parser.parseString(data, function (err: any, result: any) {
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

  public getItems(): void {
    let alertify = require('alertifyjs');
    this.service.getItems().subscribe(
      (resp) => {
        this.parseXML(resp).then((data) => {
          this.items = data;
        });
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  public onDeleteItem(guid: string) {
    let alertify = require('alertifyjs');

    this.service.deleteItem(guid).subscribe(
      (resp) => {
        alertify.success('Suppression effectuez avec succés');
        this.getItems();
      },
      (err: HttpErrorResponse) => {
        alertify.error(err.message);
      }
    );
  }

  public onDetailsItem(guid: string) {
    this.router.navigateByUrl('/details/' + guid);
  }
}
