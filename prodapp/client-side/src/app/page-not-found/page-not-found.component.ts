import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  counter = 5;
  constructor(private router: Router) { }

  
  ngOnInit() {
    setTimeout(() => {
      // move to home page...
      this.router.navigateByUrl('/');
    }, 5000);
    this.showCounter();
  }

  showCounter(){
    setTimeout(() => {
        this.counter--;
        this.showCounter()
    }, 1000);
  }

}
