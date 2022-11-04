/* eslint-disable prettier/prettier */
import {AccountInfo} from '@azure/msal-browser';
// import { SocialUser } from "angularx-social-login";

export type LocalAccountType = AccountInfo & {
  token?: string;
  id?: string;
};

// export type LocalAccountType = AccountInfo & SocialUser & {
//     token?: string
// };
