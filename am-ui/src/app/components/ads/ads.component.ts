/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Topic} from '../../data/models/Topic';
import {AuthStore} from '../../data/services/login/auth.service';
import {AdsService} from './ads.service';

@Component({
  selector: 'mp-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnDestroy {
  private userId: string | undefined;
  public ads: Topic[] = [];
  public sortedAds: Topic[] = [];
  private adsResultSubscription: Subscription;

  public sortTypes = [
    {value: '', label: ''},
    {value: 'byPriceLowToHigh', label: 'ad.byPriceLowToHigh'},
    {value: 'byPriceHighToLow', label: 'ad.byPriceHighToLow'},
    {value: 'byDateNewToOld', label: 'ad.byDateNewToOld'},
    {value: 'byDateOldToNew', label: 'ad.byDateOldToNew'},
  ];

  constructor(private auth: AuthStore, private adsService: AdsService) {
    this.userId = this.auth.userValue.id;
    this.getAdsFromUser();
  }

  getAdsFromUser(): void {
    if (this.userId) {
      this.adsService.getAdsByUserId(this.userId).subscribe(res => {
        this.ads = res;
        this.sortedAds = res;
      });
    }
  }

  async deleteTopic(topic: Topic) {
    await this.adsService.deleteTopic(topic.topic_id);
    this.getAdsFromUser();
  }

  onChangeSortOrder(event: Event) {
    const result = (event.target as HTMLInputElement).value;
    switch (result) {
      case 'byPriceLowToHigh':
        this.sortedAds.sort((a: any, b: any) => (
          a.topic_values.find(x => x.field_description === 'price').value -
          b.topic_values.find(x => x.field_description === 'price').value
        ));
        break;
      case 'byPriceHighToLow':
        this.sortedAds.sort((a: any, b: any) => (
          b.topic_values.find(x => x.field_description === 'price').value -
          a.topic_values.find(x => x.field_description === 'price').value
        ));
        break;
      case 'byDateOldToNew':
        this.sortedAds.sort((a: any, b: any) =>
          (b.topic_values.find(x => x.field_description === 'date').value <
            a.topic_values.find(x => x.field_description === 'date').value) ? -1 :
            (b.topic_values.find(x => x.field_description === 'date').value >
            a.topic_values.find(x => x.field_description === 'date').value ? 1 : 0));
        break;
      case 'byDateNewToOld':
        this.sortedAds.sort((a: any, b: any) =>
          (a.topic_values.find(x => x.field_description === 'date').value <
            b.topic_values.find(x => x.field_description === 'date').value) ? -1 :
            (a.topic_values.find(x => x.field_description === 'date').value >
            b.topic_values.find(x => x.field_description === 'date').value ? 1 : 0));
        break;
      default:
        this.sortedAds = this.ads;
    }
  }

  ngOnDestroy(): void {
    if (this.adsResultSubscription) {
      this.adsResultSubscription.unsubscribe();
    }
  }
}
