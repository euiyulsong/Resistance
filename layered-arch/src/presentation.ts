import {Business} from './business';
import readlineSync = require('readline-sync'); //for easier repeated prompts


export class Presentation{
    constructor() {}

    start() {
        this.showMainMenu(new Business());
    }
    /**
     * The main menu. Will show until the user exits
     */
    showMainMenu(rm:Business):void {
    while(true){ //run until we exit
        console.log(`Welcome to the Resistance! Pick an option:
    1. Register a new member
    2. Register a new protest
    3. Register a new movement
    4. Add a member to a protest
    5. Modify a protest
    6. Add a protest to a movement
    7. List protest members
    8. List members near a protest
    9. List protests near a location
    10. Exit`);

        let response = readlineSync.question('> ')
        if(response === '10' || response.slice(0,2).toLowerCase() === ':q'){
        break; //stop looping, thus leaving method
        }

        switch(response) { //handle each response
        case '1': this.showNewMemberMenu(rm); break;
        case '2': this.showNewProtestMenu(rm); break;
        case '3': this.showNewMovementMenu(rm); break;
        case '4': this.showAddToProtestMenu(rm); break;
        case '5': this.showModifyProtestMenu(rm); break;
        case '6': this.showAddToMovementMenu(rm); break;
        case '7': this.showListProtestersMenu(rm); break;
        case '8': this.showListNearbyMembersMenu(rm); break;
        case '9': this.showListNearbyProtestsMenu(rm); break;
        //case 10 handled above
        default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
    }

    /**
     * Show menu to add a new member
     */
    showNewMemberMenu(rm:Business) {
        console.log('Add a new member.');
        let name:string = readlineSync.question('  Name: ');
        let email:string = readlineSync.question('  Email: ');
        let zip:string = readlineSync.question('  Zip Code: ');

        rm.addMember(name, email, zip);
        console.log('User added!');
    }

    /** 
     * Show menu to add a new protest. Will then show menu to add members to the protest
     */
    showNewProtestMenu(rm:Business) {
        console.log('Add a new protest.');
        let newProtestName:string = readlineSync.question('  Title of protest: ');
        let zipcode:string = readlineSync.question('  Location (zip code): ');
        let date:string = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');

        let protestName:string = rm.addProtest(newProtestName, zipcode, date);

        this.showAddToProtestMenu(rm, protestName); //add users to new protest
    }

    /**
     * Show menu to add a new movement. Will then show menu to add protests to the movement
     */
    showNewMovementMenu(rm:Business) {
        console.log('Add a new movement.');
        let newMovementName:string = readlineSync.question('  Title of movement: ');

        let movementName:string = rm.addMovement(newMovementName);
        let adding = readlineSync.question('Add protests to movement? (y/n): ');
        while(adding.toLowerCase().startsWith('y')){ //while adding members    
            this.showAddToMovementMenu(rm, movementName); //add protests to new movement
            adding = readlineSync.question('Add another protest? (y/n): ');
        }
    }

    /**
     * Show menu to add a member to a protest. Will repeat to add multiple members. Will show menu to search for a protest if none is provided.
     */
    showAddToProtestMenu(rm:Business, protestName?:string) {
        if(!protestName){
            protestName = this.showSearchProtestsMenu(rm);
            if(!protestName){ return }//if didn't select a protest
        }
        let adding = readlineSync.question('Add a member to protest? (y/n): ');
        while(adding.toLowerCase().startsWith('y')){ //while adding members    
            let memberName = this.showSearchMembersMenu(rm); //find a member
            if(memberName){ //if selected someone
            rm.addMemberToProtest(memberName, protestName);
            } else {
            console.log('No member selected.')
            }
            adding = readlineSync.question('Add another member? (y/n): ');
        }
    }

    /**
     * Show menu to look up a member. Will return undefined if no member selected.
     */
    showSearchMembersMenu(rm:Business) : string|undefined {
        return this._searchListMenu('member', (q) => rm.findMemberNames(q));
    }

    /**
     * Show menu to look up a protest. Will return undefined if no protest selected.
     */
    showSearchProtestsMenu(rm:Business) : string|undefined {
        return this._searchListMenu('protest', (q) => rm.findProtestNames(q));
    }

    /**
     * Show menu to look up a movement. Will return undefined if no movement selected.
     */
    showSearchMovementsMenu(rm:Business) : string|undefined {
        return this._searchListMenu('movement', (q) => rm.findMovementNames(q));
    }

    /**
     * Helper function that shows a menu to search a list of items and choose a result.
     * Will return undefiend if no item is selected
     */
    _searchListMenu(type:string, searchCallback:(query:string) => string[]) : string|undefined {
        console.log(`Searching for a ${type}.`)
        let query:string = readlineSync.question('Search query: ');
        let results:string[] = searchCallback(query);

        if(results.length > 0) {
            console.log('Results found: ');
            let resultsDisplay = '  '+(results.map((item:string, idx:number) => `${idx+1}. ${item}`).join('\n  '));
            console.log(resultsDisplay);
            
            let choiceIdx = parseInt(readlineSync.question(`Choose a ${type} (1-${results.length}): `)); //will covert to number or NaN

            return results[choiceIdx-1]; //will return undefined if invalid index
        } else {
            console.log('No results found.')
            return undefined;
        }
    }

    /**
     * Show menu to modify protest (title, time, or movement). Will show menu to search for a protest if none is provided.
     */
    showModifyProtestMenu(rm:Business, protestName?:string) {
        if(!protestName){
            protestName = this.showSearchProtestsMenu(rm);
            if(!protestName){ return }//if didn't select a protest
        }

        while(true){ //run until we exit
            console.log(`Edit protest '${protestName}'.
        1. Change title
        2. Change time
        3. Add to movement
        4. Return to previous menu`);

            let response:number = parseInt(readlineSync.question('> '));
            if(response == 1){
            let newTitle = readlineSync.question('  New title: ');
            rm.modifyProtest(protestName, newTitle);
            }
            else if(response == 2){
            let newTime = readlineSync.question('  New date and time (ex: Jan 21 2017 13:00 PST): ');
            rm.modifyProtest(protestName, undefined, newTime); //no name to change
            }
            else if(response == 3){
            this.showAddToMovementMenu(rm, undefined, protestName);
            }
            else if(response == 4){ break; //exit from loop to return
            } else {
            console.log('Invalid option!');
            }
        }
    }

    /**
     * Show menu to add a protest to a movement. Will show menus to search for a protest and a movement if either is not provided.
     */
    showAddToMovementMenu(rm:Business, movementName?:string, protestName?:string, ) {
        if(!protestName){ //if protest not yet specified
            protestName = this.showSearchProtestsMenu(rm);
            if(!protestName){ return }//if didn't select a protest
        }

        if(!movementName){ //if movement not yet specified
            movementName = this.showSearchMovementsMenu(rm);
            if(!movementName){ return }//if didn't select a movement
        }

        //add the protest to the movement
        rm.addProtestToMovement(protestName, movementName);
    }

    /**
     * Show a list of members participating in a protest. Will show menu to search for a protest. Should include outputting member's email addresses.
     */
    showListProtestersMenu(rm:Business) {
        let protestName = this.showSearchProtestsMenu(rm);

        let members = rm.getProtesters(protestName);

        console.log('Members participating in this action:')
        console.log('  '+members.join('\n  ')+'\n');

        readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
    }

    /**
     * Show a list of members geographically near to a protest. Will show menu to search for a protest. Should include outputting member's email addresses.
     */
    showListNearbyMembersMenu(rm:Business) {
        let protestName = this.showSearchProtestsMenu(rm);

        const DEFAULT_DISTANCE = 20;
        let distance = parseInt(readlineSync.question(`Distance in miles from protest (default: ${DEFAULT_DISTANCE}): `)) | DEFAULT_DISTANCE; //use default if undefined

        let members = rm.getUsersNearProtest(protestName, distance);

        console.log('Members participating in this action:')
        console.log('  '+members.join('\n  ')+'\n');

        readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
    }

    /**
     * Show a list of protests geographically near the given zip code. Displayed protests should list any movements they are a part of.
     */
    showListNearbyProtestsMenu(rm:Business) {
        let zip:string = readlineSync.question('Zip code to search near: ');

        const DEFAULT_DISTANCE = 50;
        let distance = parseInt(readlineSync.question(`Distance in miles from protest (default: ${DEFAULT_DISTANCE}): `)) | DEFAULT_DISTANCE; //use default if undefined

        let protests = rm.getNearbyProtests(zip, distance);

        console.log('Nearby protests:')
        console.log('  '+protests.join('\n  ')+'\n');

        readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
    }
}
