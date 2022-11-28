import {Component, Input} from '@angular/core';

@Component({
  selector: 'mp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() active: boolean;
  constructor() {}
}
