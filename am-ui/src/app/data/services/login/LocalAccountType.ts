import {AccountInfo} from '@azure/msal-browser';
// import { SocialUser } from "angularx-social-login";

export type LocalAccountType = AccountInfo & {
  token?: string;
};

// export type LocalAccountType = AccountInfo & SocialUser & {
//     token?: string
// };
