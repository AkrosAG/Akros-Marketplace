export type OAuthUserInfo = {
  email: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  name: string;
  phone_number?: string;
  sub: string;
  email_verified: boolean;
  realm_access: {roles: string[]};
};
