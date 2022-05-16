import {Directive, HostListener} from '@angular/core';
import {NavigationService} from './navigation.service';

@Directive({
  selector: '[mpBackButton]',
})
export class BackButtonDirective {
  constructor(private navigation: NavigationService) {}
  @HostListener('click')
  onClick(): void {
    this.navigation.back();
  }
}
