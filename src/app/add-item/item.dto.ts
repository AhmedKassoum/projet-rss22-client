import { Auteur } from "./auteur.dto";
import { Contenu } from "./content.dto";
import { Image } from "./image.dto";

export class Item{
    public title:string;
    public category:string;
    public published:Date;
    /*public image:Image;
    public content:Contenu;
    public author:Auteur;*/
    constructor(titre:string,categorie:string,dateP:Date/*,image:Image,content:Contenu,auteur:Auteur*/){
        this.title=titre;
        this.category=categorie;
        this.published=dateP;
        /*this.image=image;
        this.author=auteur;
        this.content=content;*/
    }
}