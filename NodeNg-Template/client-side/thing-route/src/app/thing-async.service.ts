import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// IMPORTANT - this code is not ready yet ... 
// TODO: copy relevat Async methods when done (Async Impl. on orig my-route project)
export class DataService {

  private msgMovieSource = new BehaviorSubject('no movies'); // default message
  currMovieMsg = this.msgMovieSource.asObservable();

  constructor() { }

  changeMovieMessage(message: string) {
    this.msgMovieSource.next(message)
  }
}

export class ThingAsyncService {

  things = [{id:1, name:"avraham",age:"40",phone:"05468977",gender: 1,smoking:false},
    {id:2, name:"moshe",age:"30",phone:"053311226",gender: 1,smoking:true},
    {id:3, name:"yaakov",age:"50",phone:"059966773",gender: 1,smoking:false},
    {id:4, name:"lea",age:"49",phone:"059988776",gender: 2,smoking:false}]     

  movies_data: [];

  constructor() { }  
  updateThingData(thing_data) {    
    for (let idx = 0 ; idx < this.things.length ;idx++) {
        if (thing_data.id == this.things[idx].id) {
            this.things[idx] = thing_data;                    
            break;
        }
    }
    // console.log("updateThingData was updated with thing id: " + thing_data.id);
  }

  delThingData(uid) {    
    for (let idx = 0 ; idx < this.things.length ;idx++) {
        if (uid == this.things[idx].id) {
            this.things.splice(idx,1);           
            break;
        }
    }   
  }

  getAllThings(){
    return this.things;
  }
  
  addThingData(new_thing) {            
    this.things.push(new_thing);        
    console.log("addThingData added thing with id: " + new_thing.id);
  }           

  getThingByID(uid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.things.length; idx++) {
      if (uid == this.things[idx].id) {
        to_update = this.things[idx];
        return to_update;
      }
    }
    return null;
  }

  searchMovieByText(title_search) {
    
    fetch("http://www.omdbapi.com/?s=" + title_search + "&apikey=21af947d")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        this.movies_data = res.Search;
        // console.log(this.movies_data);       
    }, (error) => {
        console.log("searchMovieByText - Error:", error);
    })
  }


  getMoviesData(){
    return this.movies_data;
  }
}
