export type OAuthUserInfo = {
  email: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  phone_number?: string;
  sub: string;
  // picture: string;
};
