import {Component, Input, ViewEncapsulation} from "@angular/core";
import SwiperCore, {
  Navigation,
  Pagination,
} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'mp-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperComponent {
  @Input() images: []

  pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
}
