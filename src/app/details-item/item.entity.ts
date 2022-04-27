import { IAuteur } from "./auteur.entity";
import { IContenu } from "./content.entity";
import { IImage } from "./image.entity";

export interface IItem{
     guid:string;
     title:string;
     category:string;
     published?:Date;
     updated?:Date;
     href?:string;
     alt?:string;
     //image?:IImage;
     //content?:IContenu;
     content?:string;
     auteur?:string;
     //author?:IAuteur;
   
}