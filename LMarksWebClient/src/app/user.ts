export class User {
    key: string;
    login :string;
    email : string;
    passwordHash : string;
    securityStamp : string;

    constructor(login:string, email:string, pass:string){
        this.login = login;
        this.email = email;
        this.passwordHash = pass;
  }
}