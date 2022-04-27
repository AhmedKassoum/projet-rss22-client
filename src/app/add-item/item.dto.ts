import { Auteur } from "./auteur.dto";
import { Contenu } from "./content.dto";
import { Image } from "./image.dto";

export class Item{
    public title:string;
    public category:string;
    public date:Date;
    public typeDate:string;
    public typeCreat:string;
    /*public image:Image;
    public content:Contenu;
    public author:Auteur;*/
    constructor(titre:string,categorie:string,dateP:Date,typeDate:string,typeCreat:string/*,image:Image,content:Contenu,auteur:Auteur*/){
        this.title=titre;
        this.category=categorie;
        this.date=dateP;
        this.typeDate=typeDate;
        this.typeCreat=typeCreat;
        /*this.image=image;
        this.author=auteur;
        this.content=content;*/
    }
}