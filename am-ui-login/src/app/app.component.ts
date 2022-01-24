import {Component, OnInit} from '@angular/core';
import { AuthStore } from './_services/auth.services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

    constructor(public auth: AuthStore) {

    }

    ngOnInit() {
 
    }

  logout() {
    this.auth.logout();
  }

}
