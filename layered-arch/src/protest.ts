import {Location} from './location';

export class Protest {
  private name:string;
  private location:Location;
  private date:Date;
  private members:string[];

  constructor(name:string, zip:string, date:string) {
    this.name = name;
    this.location = new Location(zip);
    this.date = new Date(date);
    this.members = [];
  }

  public addMember(memberName:string):void {
    if (this.members.indexOf(memberName) === -1) {
      this.members.push(memberName);
    }
  }

  public getName():string {
    return this.name;
  }

  public getZip():string {
    return this.location.getZip();
  }

  public getLocation():Location {
    return this.location;
  }

  public getDate():string {
    return this.date.toString();
  }

  public getMembers():string[] {
    return this.members;
  }

  public setName(newName:string):void {
    this.name = newName;
  }

  public setTime(newTime:string):void {
    this.date = new Date(newTime);
  }
}