import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {TopicImage} from '../../data/models/TopicImage';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'mp-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperComponent implements OnInit {
  @Input() images: TopicImage[] = [];
  isFullscreen: boolean = false;

  pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  createImageFromTopicImage(image): string {
    return `data:image/jpeg;base64,${image.value}`;
  }

  ngOnInit(): void {
    this.images.sort((a, b) => Number(b.thumbnail) - Number(a.thumbnail));
  }
}
