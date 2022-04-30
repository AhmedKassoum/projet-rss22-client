import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as xml2js from 'xml2js';
import { AppService } from '../app.service';
import { IItem } from './item.entity';
import { IAuteur } from './auteur.entity';
import { IImage } from './image.entity';
import { IContenu } from './content.entity';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css'],
})
export class DetailsItemComponent implements OnInit {
  guid: string;
  item: IItem;

  constructor(private service: AppService, private route: ActivatedRoute) {
    this.guid = route.snapshot.params.guid;
  }

  ngOnInit(): void {
    this.service.getItemByGuid(this.guid).subscribe((data) => {
      this.item = this.parseXML(data);
    });
  }

  parseXML(data: any): IItem {
    //return new Promise((resolve) => {

    var parser = new xml2js.Parser({
      trim: true,
      explicitArray: true,
    });

    var author: IAuteur;
    var image: IImage;
    var content: IContenu;
    var itemByGuid: IItem = {
      guid: '',
      title: '',
      category: '',
    };

    parser.parseString(data, function (err: any, result: any) {
      var obj = result.item;

      itemByGuid = {
        guid: obj.guid?obj.guid[0]:undefined,
        title: obj.title ? obj.title[0] : undefined,
        updated: obj.updated ? obj.updated[0] : undefined,
        published: obj.published ? obj.published[0] : undefined,
        category: obj.category[0].$.term,
        content: obj.content[0]._,
        href: obj.image ? obj.image[0].$.href : undefined,
        alt: obj.image ? obj.image[0].$.alt : undefined,
        auteur: obj.author? obj.author[0].name[0] : undefined,
      };

      /*if (obj.author) {
        author = {
          name: obj.author[0].name ? obj.author[0].name[0] : undefined,
          mail: obj.author[0].email ? obj.author[0].email[0] : undefined,
          uri: obj.author[0].uri ? obj.author[0].uri : undefined,
        };
        //itemByGuid.author = author;
      }

      if (obj.image) {
        image = {
          href: obj.image[0].$.href,
          alt: obj.image[0].$.alt,
          lenght: obj.image[0].$.lenght,
          type: obj.image[0].$.type,
        };
        //itemByGuid.image = image;
      }

      if (obj.content) {
        content = {
          href: obj.content[0].$.href,
          content: obj.content[0]._,
          type: obj.content[0].$.type,
        };
        //itemByGuid.content = content;
      }*/
      //resolve(itemByGuid);
      //});
    });
    return itemByGuid;
  }
}
