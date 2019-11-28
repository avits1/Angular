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

export class ShareUserService {

  users2 = [{id:1, name:"avraham",age:"40",phone:"05468977",gender: 1,smoking:false},
    {id:2, name:"moshe",age:"30",phone:"053311226",gender: 1,smoking:true},
    {id:3, name:"yaakov",age:"50",phone:"059966773",gender: 1,smoking:false},
    {id:4, name:"lea",age:"49",phone:"059988776",gender: 2,smoking:false}]     

  // movies_data: [];

  constructor() { }  
  updateUserData(user_data) {    
    for (let idx = 0 ; idx < this.users2.length ;idx++) {
        if (user_data.id == this.users2[idx].id) {
            this.users2[idx] = user_data;                    
            break;
        }
    }
    // console.log("updateUserData was updated with user id: " + user_data.id);
  }

  delUserData(uid) {    
    for (let idx = 0 ; idx < this.users2.length ;idx++) {
        if (uid == this.users2[idx].id) {
            this.users2.splice(idx,1);           
            break;
        }
    }   
  }

  getAllUsers(){
    return this.users2;
  }
  
  addUserData(new_user) {            
    this.users2.push(new_user);        
    console.log("addUserData added user with id: " + new_user.id);
  }           

  getUserByID(uid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.users2.length; idx++) {
      if (uid == this.users2[idx].id) {
        to_update = this.users2[idx];
        return to_update;
      }
    }
    return null;
  }

  // searchMovieByText(title_search) {
    
  //   fetch("http://www.omdbapi.com/?s=" + title_search + "&apikey=21af947d")
  //   .then((res) => res.json())
  //   .then((res) => {
  //       console.log(res);
  //       this.movies_data = res.Search;
  //       // console.log(this.movies_data);       
  //   }, (error) => {
  //       console.log("searchMovieByText - Error:", error);
  //   })
  // }

  
  // getMoviesData(){
  //   return this.movies_data;
  // }
}
