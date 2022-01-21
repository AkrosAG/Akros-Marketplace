package ch.akros.am.userservice.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class SignUpSocialUserRequest {

	private Long userID;

	@NotEmpty
	private String id;

	@NotEmpty
	private String name;

	@NotEmpty
	private String email;

	private SocialProvider socialProvider;

	public SignUpSocialUserRequest(String id, String name, String email, SocialProvider socialProvider) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.socialProvider = socialProvider;
	}

	public static Builder getBuilder() {
		return new Builder();
	}

	public static class Builder {
		private String id;
		private String name;
		private String email;
		private String password;
		private SocialProvider socialProvider;

		public Builder addProviderUserID(final String id) {
			this.id = id;
			return this;
		}

		public Builder addName(final String name) {
			this.name = name;
			return this;
		}

		public Builder addEmail(final String email) {
			this.email = email;
			return this;
		}

		public Builder addSocialProvider(final SocialProvider socialProvider) {
			this.socialProvider = socialProvider;
			return this;
		}

		public SignUpSocialUserRequest build() {
			return new SignUpSocialUserRequest(id, name, email, socialProvider);
		}
	}
}
