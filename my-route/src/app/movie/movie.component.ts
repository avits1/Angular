import { Component, OnInit } from '@angular/core';
import { ShareUserService } from '../share-user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private userService: ShareUserService) { }

  state = {
      search: "",
      msgServ: "",
      movies: []
  }

  ngOnInit() {
    // this.state.movies = this.userService.getMoviesData();
    // this.userService.currMovieMsg.subscribe(message => this.message = message)
  }

//   ngOnInit() {
//     this.data.currentMessage.subscribe(message => this.message = message)
//   }
//   constructor(private data: DataService) { }

  searchMovie() {
    console.log("searchMovie - searching movie by title:" + this.state.search);
    // this.userService.searchMovieByText(this.state.search);
  }

}
