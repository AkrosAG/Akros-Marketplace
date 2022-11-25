import {AccountInfo} from '@azure/msal-browser';

export type LocalAccountType = AccountInfo & {
  token?: string;
  id?: string;
};
