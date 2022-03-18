import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {CreateAddWebcomponentState} from './data/store/create-add-webcomponent.state';
import {LocalizationService} from './data/services/localization.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import {CategoryDto} from './api/models';
import * as storeSelector from './data/store/create-add-webcomponent.selector';
import * as storeActions from './data/store/create-add-webcomponent.actions';

@Component({
  selector: 'mp-create-add',
  templateUrl: './mp-create-add.component.html',
  styleUrls: ['./mp-create-add.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MpCreateAddComponent implements OnInit, OnChanges {
  public categories$: Observable<CategoryDto[]>;

  title = 'create-add-webcomponent';
  public appLoaded: boolean = true;
  public appLanguage: string;
  @Input() language: string;

  constructor(
    private store: Store<CreateAddWebcomponentState>,
    private localization: LocalizationService
  ) {}
  /* istanbul ignore next */
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.language) {
      this.appLanguage = changes.language.currentValue;
      this.localization.use(this.appLanguage);
    }
  }
  /* istanbul ignore next */
  async ngOnInit() {
    this.appLanguage = this.language;
    this.localization.use(this.appLanguage);
    this.categories$ = this.store.select(storeSelector.getCategories);

    this.store.dispatch(storeActions.loadCategories());
  }

}
