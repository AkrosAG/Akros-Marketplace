package ch.akros.am.userservice.service;

import java.util.Optional;

import ch.akros.am.userservice.dto.SignUpSocialUserRequest;
import ch.akros.am.userservice.exception.UserAlreadyExistAuthenticationException;
import ch.akros.am.userservice.model.User;

public interface UserService {

	User registerNewUser(final SignUpSocialUserRequest signUpRequest) throws UserAlreadyExistAuthenticationException;

	User findUserByEmail(String email);

	Optional<User> findUserById(Long id);
}
