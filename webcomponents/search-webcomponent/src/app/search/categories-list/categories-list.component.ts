import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/data/models/Category';

@Component({
  selector: 'mp-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  @Input() public categoriesList: Category[];
  @Output() public categoryWasSelected = new EventEmitter();
  public categorySelected: boolean[] = [];
  public currentSelected: number = -1;

  ngOnInit(): void {
    this.categoriesList.forEach(() => {
      this.categorySelected.push(false);
    });
  }

  public categorySelect(val: number) {
    this.categorySelected[this.currentSelected] = false;
    this.currentSelected = val;
    this.categorySelected[val] = true;
    this.categoryWasSelected.emit(this.categoriesList[val].categoryId);
  }
}
