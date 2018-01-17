import {Protest} from './protest';
import {Member} from './member';
import {Data} from './data';
import {Movement} from './movement';
import {Location} from './location';

export class Business {
    private model:Data;

  constructor() {
      this.model = new Data();
  }

  isName(name:string, query:string):boolean {
    return this.model.isName(name, query);
  }

  addMember(name:string, email:string, zip:string):void {
    this.model.addMember(name, email, zip);
  }

  addProtest(name:string, zip:string, date:string):string {
    return this.model.addProtest(name, zip, date);
  }

  addMovement(name:string):string {
    return this.model.addMovement(name);
  }

  addMemberToProtest(memberName:string, protestName:string):void {
    this.model.addMemberToProtest(memberName, protestName);
  }

  addProtestToMovement(protestName:string, movementName:string):void {
    this.model.addProtestToMovement(protestName, movementName);
  }

  getMemberNames():string[] {
    return this.model.getMemberNames();
  }

  getProtestNames():string[] {
    return this.model.getProtestNames();
  }

  getMovementNames():string[] {
    return this.model.getMovementNames();
  }

  findMemberNames(query:string):string[] {
    return this.model.findMemberNames(query);
  }

  findProtestNames(query:string):string[] {
    return this.model.findProtestNames(query);
  }

  findMovementNames(query:string):string[] {
    return this.model.findMovementNames(query);
  }

  modifyProtest(protestName:string, newName?:string, newTime?:string):void {
    return this.model.modifyProtest(protestName, newName, newTime);
  }

  getProtesters(protestName:string):string[] {
    return this.model.getProtesters(protestName);
  }

  getUsersNearProtest(protestName:string, distance:number):string[] {
    return this.model.getUsersNearProtest(protestName, distance);
  }

  getNearbyProtests(zip:string, distance:number):string[] {
    return this.model.getNearbyProtests(zip, distance);
  }

}