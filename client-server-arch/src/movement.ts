export class Movement {
  private name:string;
  private protests:string[];

  constructor(name:string) {
    this.name = name;
    this.protests = [];
  }

  public addProtest(protestName:string):void {
    if (this.protests.indexOf(protestName) === -1) {
      this.protests.push(protestName);
    }
  }

  public getName():string {
    return this.name;
  }

  public getProtests():string[] {
    return this.protests;
  }
}