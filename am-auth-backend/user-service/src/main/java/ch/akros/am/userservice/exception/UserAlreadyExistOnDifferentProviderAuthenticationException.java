package ch.akros.am.userservice.exception;

import org.springframework.security.core.AuthenticationException;

public class UserAlreadyExistOnDifferentProviderAuthenticationException extends AuthenticationException {

	private static final long serialVersionUID = 5570981880007077317L;

	public UserAlreadyExistOnDifferentProviderAuthenticationException(final String msg) {
        super(msg);
    }

}
