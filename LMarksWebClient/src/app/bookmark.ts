export class Bookmark{
    key : string;
    user : string;
    link : string;
    description : string;
    date : Date;
    visible : number;

    constructor(user:string, link:string, description:string){
        this.user = user;
        this.link = link;
        this.description = description;
  }
}