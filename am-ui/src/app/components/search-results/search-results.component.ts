import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mp-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  public results: String[] = [];
  constructor() {}

  ngOnInit(): void {
    this.results = history.state.topics;
    // TODO: If results is null, redirect to home
  }
}
