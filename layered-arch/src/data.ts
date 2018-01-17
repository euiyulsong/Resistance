import {Protest} from './protest';
import {Member} from './member';
import {Movement} from './movement';
import {Location} from './location';

/**
 * The layered model
 */
export class Data {
  private members:Member[];
  private protests:Protest[];
  private movements:Movement[];

  constructor() {
    this.members = [];
    this.protests = [];
    this.movements = [];
  }

  isName(name:string, query:string):boolean {
    return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  }

  addMember(name:string, email:string, zip:string):void {
    this.members.push(new Member(name, email, zip));
  }

  addProtest(name:string, zip:string, date:string):string {
    this.protests.push(new Protest(name, zip, date));
    return name;
  }

  addMovement(name:string):string {
    this.movements.push(new Movement(name));
    return name;
  }

  addMemberToProtest(memberName:string, protestName:string):void {
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

  addProtestToMovement(protestName:string, movementName:string):void {
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

  getMemberNames():string[] {
    let names:string[] = [];
    this.members.forEach(member => {
      names.push(member.getName());
    });
    return names;
  }

  getProtestNames():string[] {
    let names:string[] = [];
    this.protests.forEach(protest => {
      names.push(protest.getName());
    });
    return names;
  }

  getMovementNames():string[] {
    let names:string[] = [];
    this.movements.forEach(movement => {
      names.push(movement.getName());
    });
    return names;
  }

  findMemberNames(query:string):string[] {
    let names = this.getMemberNames();
    return names.filter(name => {
      return this.isName(name, query);
    });
  }

  findProtestNames(query:string):string[] {
    let names = this.getProtestNames();
    return names.filter(name => {
      return this.isName(name, query);
    });
  }

  findMovementNames(query:string):string[] {
    let names = this.getMovementNames();
    return names.filter(name => {
      return this.isName(name, query);
    });
  }

  modifyProtest(protestName:string, newName?:string, newTime?:string):void {
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

  getProtesters(protestName:string):string[] {
    let protesters = [];
    this.protests.forEach(protest => {
      if (protest.getName() === protestName) {
        protesters = protest.getMembers();
      }
    });
    return protesters;
  }

  getUsersNearProtest(protestName:string, distance:number):string[] {
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

  getNearbyProtests(zip:string, distance:number):string[] {
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