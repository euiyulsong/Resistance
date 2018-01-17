import geolib = require('geolib');
const locations = require('../data/zipcode-locations');

export class Location {
  private zip:string;

  public static isClose(locationA:Location, locationB:Location, distance:number):boolean {
    let locationDistance = geolib.getDistance(
      { latitude: locationA.getLatitude(), longitude: locationA.getLongitude() },
      { latitude: locationB.getLatitude(), longitude: locationB.getLongitude() }
    );

    locationDistance = geolib.convertUnit("mi", locationDistance);

    return locationDistance <= distance;
  }

  constructor(zip:string) {
    this.zip = zip;
  }

  public getZip():string {
    return this.zip;
  }

  public getLatitude():number {
    return locations[this.zip][0];
  }

  public getLongitude():number {
    return locations[this.zip][1];
  }
}