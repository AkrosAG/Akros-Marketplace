import {Observable} from 'rxjs';
import {MarketplaceState} from './../../data/store/marketplace.state';
import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {FormFieldsBuilderService} from 'src/app/data/services/form-fields-builder.service';
import {CategoryDto} from 'src/app/api/models';

import * as storeSelector from './../../data/store/marketplace.selector';
import * as storeActions from './../../data/store/marketplace.actions';
@Component({
  selector: 'mp-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public categories$: Observable<CategoryDto[]>;
  constructor(
    private store: Store<MarketplaceState>,
    private formFieldsBuilderService: FormFieldsBuilderService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select(storeSelector.getCategories);
  }
}
