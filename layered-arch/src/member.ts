import {Location} from './location';

export class Member {
  private name:string;
  private email:string;
  private location:Location;

  constructor(name:string, email:string, zip:string) {
    this.name = name;
    this.email = email;
    this.location = new Location(zip);
  }

  public getName():string {
    return this.name;
  }

  public getEmail():string {
    return this.email;
  }

  public getZip():string {
    return this.location.getZip();
  }

  public getLocation():Location {
    return this.location;
  }
}