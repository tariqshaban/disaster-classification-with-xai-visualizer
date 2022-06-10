import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTitle: string = '';

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  resetPage() {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/']);
  }
}
