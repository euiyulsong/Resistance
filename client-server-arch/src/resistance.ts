import {Movement} from './movement';
import {Protest} from './protest';
import {Member} from './member';
import {Location} from './location';

export class ResistanceManager {
  private members:Member[];
  private protests:Protest[];
  private movements:Movement[];

  constructor() {
    this.members = [];
    this.protests = [];
    this.movements = [];
  }

  private static isName(name:string, query:string):boolean {
    return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  }

  public addMember(name:string, email:string, zip:string):void {
    this.members.push(new Member(name, email, zip));
  }

  public addProtest(name:string, zip:string, date:string):string {
    this.protests.push(new Protest(name, zip, date));
    return name;
  }

  public addMovement(name:string):string {
    this.movements.push(new Movement(name));
    return name;
  }

  public addMemberToProtest(memberName:string, protestName:string):void {
    this.protests.forEach(protest => {
      if (protest.getName() === protestName) {
        this.members.forEach(member => {
          if (member.getName() === memberName) {
            protest.addMember(memberName);
          }
        });
      }
    });
  }

  public addProtestToMovement(protestName:string, movementName:string):void {
    this.movements.forEach(movement => {
      if (movement.getName() === movementName) {
        this.protests.forEach(protest => {
          if (protest.getName() === protestName) {
            movement.addProtest(protestName);
          }
        });
      }
    });
  }

  public getMemberNames():string[] {
    let names:string[] = [];
    this.members.forEach(member => {
      names.push(member.getName());
    });
    return names;
  }

  public getProtestNames():string[] {
    let names:string[] = [];
    this.protests.forEach(protest => {
      names.push(protest.getName());
    });
    return names;
  }

  public getMovementNames():string[] {
    let names:string[] = [];
    this.movements.forEach(movement => {
      names.push(movement.getName());
    });
    return names;
  }

  public findMemberNames(query:string):string[] {
    let names = this.getMemberNames();
    return names.filter(name => {
      return ResistanceManager.isName(name, query);
    });
  }

  public findProtestNames(query:string):string[] {
    let names = this.getProtestNames();
    return names.filter(name => {
      return ResistanceManager.isName(name, query);
    });
  }

  public findMovementNames(query:string):string[] {
    let names = this.getMovementNames();
    return names.filter(name => {
      return ResistanceManager.isName(name, query);
    });
  }

  public modifyProtest(protestName:string, newName?:string, newTime?:string):void {
    this.protests.forEach(protest => {
      if (protest.getName() === protestName) {
        if (newName) {
          protest.setName(newName);
        }
        if (newTime) {
          protest.setTime(newTime);
        }
      }
    });
  }

  public getProtesters(protestName:string):string[] {
    let protesters = [];
    this.protests.forEach(protest => {
      if (protest.getName() === protestName) {
        protesters = protest.getMembers();
      }
    });
    return protesters;
  }

  public getUsersNearProtest(protestName:string, distance:number):string[] {
    let membersNearby:Member[] = [];
    this.protests.forEach(protest => {
      if (protest.getName() === protestName) {
        membersNearby = this.members.filter(member => {
          return Location.isClose(member.getLocation(), protest.getLocation(), distance);
        });
      }
    });

    let memberNames:string[] = membersNearby.map(member => {
      return member.getName() + " - " + member.getEmail();
    });

    return memberNames;
  }

  public getNearbyProtests(zip:string, distance:number):string[] {
    let protestsNearby:Protest[] = this.protests.filter(protest => {
      return Location.isClose(protest.getLocation(), new Location(zip), distance);
    });

    let protestNames:string[] = protestsNearby.map(protest => {
      let info:string = "";
      info += protest.getName();
      this.movements.forEach(movement => {
        movement.getProtests().forEach(protestInMovement => {
          if (protestInMovement === protest.getName()) {
            info += " (" + movement.getName() + ")";
          }
        });
      });
      return info;
    });

    return protestNames;
  }

}