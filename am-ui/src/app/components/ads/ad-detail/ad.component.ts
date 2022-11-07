/* eslint-disable */
import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Topic} from '../../../data/models/Topic';
import {ActivatedRoute, Router} from '@angular/router';
import {AdsService} from "../ads.service";
import {Subscription} from "rxjs";
import "node_modules/bootstrap/js/src/modal";

@Component({
    selector: 'mp-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.scss'],
  })
export class AdComponent {
    @Input() ad: Topic;
    @Output() deleteTopicEvent: EventEmitter<Topic> = new EventEmitter();


    constructor(private router: Router, private adsService: AdsService, private route: ActivatedRoute) { }

    getThumbnailFromProps() {
        const thumbnail = this.ad.topic_images.find((e) => e.thumbnail);
        return thumbnail ?  `data:image/jpeg;base64,${thumbnail.value}` :
          'https://media.istockphoto.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?k=20&m=1182454657&s=612x612&w=0&h=1xEsm7BqeicA8jYk9KlerUtGsAgzzo530l5Ak1HJdnc=';
    }

    getValueByKey(key: string) {
        return this.ad.topic_values.find((e) => e.field_description === key)?.value;
    }

    navigateTeDetailView() {
        this.router.navigate(['search-result-details/' + this.ad.topic_id]);
    }

    deleteTopic() {
      this.deleteTopicEvent.emit(this.ad);
    }
}
