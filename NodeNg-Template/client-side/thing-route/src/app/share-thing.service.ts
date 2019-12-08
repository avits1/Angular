import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


// export class DataService {

//   private msgMovieSource = new BehaviorSubject('no movies'); // default message
//   currMovieMsg = this.msgMovieSource.asObservable();

//   constructor() { }

//   changeMovieMessage(message: string) {
//     this.msgMovieSource.next(message)
//   }
// }

export class ShareThingService {

  things2 = [{id:1, name:"avraham",age:"40",phone:"05468977",gender: 1,smoking:false},
    {id:2, name:"moshe",age:"30",phone:"053311226",gender: 1,smoking:true},
    {id:3, name:"yaakov",age:"50",phone:"059966773",gender: 1,smoking:false},
    {id:4, name:"lea",age:"49",phone:"059988776",gender: 2,smoking:false}]     

  constructor() { }  
  updateThingData(thing_data) {    
    for (let idx = 0 ; idx < this.things2.length ;idx++) {
        if (thing_data.id == this.things2[idx].id) {
            this.things2[idx] = thing_data;                    
            break;
        }
    }
    // console.log("updateThingData was updated with thing id: " + thing_data.id);
  }

  delThingData(uid) {    
    for (let idx = 0 ; idx < this.things2.length ;idx++) {
        if (uid == this.things2[idx].id) {
            this.things2.splice(idx,1);           
            break;
        }
    }   
  }

  getAllThings(){
    return this.things2;
  }
  
  addThingData(new_thing) {            
    this.things2.push(new_thing);        
    // console.log("addThingData added thing with id: " + new_thing.id);
  }           

  getThingByID(uid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.things2.length; idx++) {
      if (uid == this.things2[idx].id) {
        to_update = this.things2[idx];
        return to_update;
      }
    }
    return null;
  }

}
