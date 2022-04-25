export class Image {
  public href: string;
  public type: string;
  public lenght: number;
  public alt: string;
  constructor(href: string, type: string, lenght: number, alt: string) {
    this.href = href;
    this.type = type;
    //this.alt = alt;
    this.alt=alt;
    this.lenght = lenght;
  }
}
