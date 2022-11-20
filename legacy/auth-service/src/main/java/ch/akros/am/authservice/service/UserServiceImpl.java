package ch.akros.am.authservice.service;

import ch.akros.am.authservice.dto.SignUpSocialUserRequest;
import ch.akros.am.authservice.exception.UserAlreadyExistAuthenticationException;
import ch.akros.am.authservice.model.Role;
import ch.akros.am.authservice.model.Userdata;
import ch.akros.am.authservice.repo.RoleRepository;
import ch.akros.am.authservice.repo.UserRepository;
//import ch.akros.am.userservice.security.oauth2.user.OAuth2UserInfo;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	@Transactional(value = "transactionManager")
	public Userdata registerNewUser(final SignUpSocialUserRequest signUpRequest) throws UserAlreadyExistAuthenticationException {
		if (signUpRequest.getUserID() != null && userRepository.existsById(signUpRequest.getUserID())) {
			throw new UserAlreadyExistAuthenticationException("User with User id " + signUpRequest.getUserID() + " already exist");
		} else if (userRepository.existsByEmail(signUpRequest.getEmail())) {

			val userFound = userRepository.findByEmail(signUpRequest.getEmail());
			if(!userFound.getProvider().equalsIgnoreCase(signUpRequest.getSocialProvider().getProviderType()))
				throw new UserAlreadyExistAuthenticationException("User with email  " + signUpRequest.getEmail() + " already exist on different provider");
			throw new UserAlreadyExistAuthenticationException("User with email id " + signUpRequest.getEmail() + " already exist");
		}
		Userdata user = buildUser(signUpRequest);
		Date now = Calendar.getInstance().getTime();
		user.setCreatedDate(now);
		user.setModifiedDate(now);
		user = userRepository.save(user);
		userRepository.flush();
		return user;
	}

	private Userdata buildUser(final SignUpSocialUserRequest formDTO) {
		Userdata user = new Userdata();
		user.setDisplayName(formDTO.getName());
		user.setEmail(formDTO.getEmail());
		final HashSet<Role> roles = new HashSet<>();
		roles.add(roleRepository.findByName(Role.ROLE_USER));
		user.setRoles(roles);
		user.setProvider(formDTO.getSocialProvider().getProviderType());
		user.setEnabled(true);
		user.setProviderUserId(formDTO.getId());
		return user;
	}

   @Override
	public Userdata findUserByEmail(final String email) {
		return userRepository.findByEmail(email);
	}


//	private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
//		existingUser.setDisplayName(oAuth2UserInfo.getName());
//		return userRepository.save(existingUser);
//	}

//	private SignUpRequest toUserRegistrationObject(String registrationId, OAuth2UserInfo oAuth2UserInfo) {
//		return SignUpRequest.getBuilder().addProviderUserID(oAuth2UserInfo.getId()).addDisplayName(oAuth2UserInfo.getName()).addEmail(oAuth2UserInfo.getEmail())
//				.addSocialProvider(GeneralUtils.toSocialProvider(registrationId)).addPassword("changeit").build();
//	}

	@Override
	public Optional<Userdata> findUserById(Long id) {
		return userRepository.findById(id);
	}
}
