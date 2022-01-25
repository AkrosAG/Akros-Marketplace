import {Component} from '@angular/core';

@Component({
  selector: 'mp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  /* istanbul ignore next */
  public navigateHome(): void {
    console.log('GO HOME');
  }

  /* istanbul ignore next */
  public userMenu(): void {
    console.log('SHOW USER MENU');
  }
}
