import {TestBed} from '@angular/core/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import {MpSearchComponent} from './mp-search.component';

describe('MpSearchComponent', () => {
  beforeEach(async () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: TranslateFakeLoader,
            },
          }),
        ],
        declarations: [MpSearchComponent],
        providers: [TranslateService],
      }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'search-webcomponent'`, () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('search-webcomponent');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'search-webcomponent app is running!'
    );
  });
});
