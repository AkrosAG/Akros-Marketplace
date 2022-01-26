package ch.akros.am.authservice.service;

import java.util.Optional;

import ch.akros.am.authservice.dto.SignUpSocialUserRequest;
import ch.akros.am.authservice.exception.UserAlreadyExistAuthenticationException;
import ch.akros.am.authservice.model.Userdata;

public interface UserService {

	Userdata registerNewUser(final SignUpSocialUserRequest signUpRequest) throws UserAlreadyExistAuthenticationException;

	Userdata findUserByEmail(String email);

	Optional<Userdata> findUserById(Long id);
}
