import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  private results = null;
  constructor() {}

  ngOnInit(): void {
    this.results = history.state.topics;
    console.log(this.results);
    // TODO: If results is null, redirect to home
  }
}
