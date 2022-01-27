package ch.akros.am.authservice.dto;

public enum SocialProvider {

    FACEBOOK("facebook"),
    TWITTER("twitter"),
    LINKEDIN("linkedin"),
    GOOGLE("google"),
    GITHUB("github"),
    LOCAL("local"),
    AKROSAD("akrosad");

    private final String providerType;

    public String getProviderType() {
        return providerType;
    }

    SocialProvider(final String providerType) {
        this.providerType = providerType;
    }

}
