import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'mp-custom-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modalTitleI18n: string;
  @Input() modalBodyI18n?: string;
  @Input() modalPrimaryButtonI18n: string;
  @Input() modalSubmitButtonI18n: string = 'submit';
  @Input() modalCloseButtonI18n: string = 'ad.close-modal';
  @Input() isModalVisible: boolean;

  @Output() modalCloseEvent: EventEmitter<void> = new EventEmitter();
  @Output() modalSubmitEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}
}
