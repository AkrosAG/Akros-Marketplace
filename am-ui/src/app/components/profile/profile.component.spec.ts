/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UserDataModel,
  UserService,
} from './../../data/services/login/user.service';
import {ProfileComponent} from './profile.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthStore} from '../../data/services/login/auth.service';
import {OAuthUserInfo} from '../../shared/types/oauthuserinfo.type';

import {
  TranslatePipe,
  TranslateFakeLoader,
  TranslateService,
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

class MockUserService {
  public user: unknown = {
    id: '7f265b74-c0fd-4087-a089-79646b36eff6',
    createdTimestamp: 1656058610699,
    username: 'admin1',
    enabled: true,
    totp: false,
    emailVerified: false,
    firstName: 'Admin',
    lastName: 'Test',
    email: 'admin1@test.com',
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: 0,
    access: {
      manageGroupMembership: true,
      view: true,
      mapRoles: true,
      impersonate: false,
      manage: true,
    },
  };

  changeUserData(id: string, userData: UserDataModel) {}

  getFullUserData(id: string) {
    return this.user;
  }
}

class MockStore {
  get userValue() {
    return {
      id: '7f265b74-c0fd-4087-a089-79646b36eff6',
      createdTimestamp: 1656058610699,
      username: 'admin1',
      enabled: true,
      totp: false,
      emailVerified: false,
      firstName: 'Admin',
      lastName: 'Test',
      email: 'admin1@test.com',
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: false,
        manage: true,
      },
    };
  }

  get accessToken() {
    return 'abc';
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        ReactiveFormsModule,
      ],
      providers: [
        TranslatePipe,
        TranslateService,
        FormBuilder,
        {provide: UserService, useClass: MockUserService},
        {provide: AuthStore, useClass: MockStore},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
