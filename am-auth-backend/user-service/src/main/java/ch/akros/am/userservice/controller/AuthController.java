package ch.akros.am.userservice.controller;

import ch.akros.am.userservice.dto.ApiResponse;
import ch.akros.am.userservice.dto.SignUpSocialUserRequest;
import ch.akros.am.userservice.exception.UserAlreadyExistAuthenticationException;
import ch.akros.am.userservice.exception.UserAlreadyExistOnDifferentProviderAuthenticationException;
import ch.akros.am.userservice.model.User;
import ch.akros.am.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerSocialUser(@Valid @RequestBody SignUpSocialUserRequest signUpRequest) {
        log.info(signUpRequest.toString());
        User user = null;
        try {
            user = userService.registerNewUser(signUpRequest);
        } catch (UserAlreadyExistAuthenticationException e) {
            user = userService.findUserByEmail(signUpRequest.getEmail());
            return ResponseEntity.status(HttpStatus.FOUND).body(new ApiResponse(true, "User with this email already present in the system", user));
        }
        catch (UserAlreadyExistOnDifferentProviderAuthenticationException e) {
            log.error("Exception Ocurred", e);
            return new ResponseEntity<>(new ApiResponse(true, "User with this email already present in the system!", user), HttpStatus.FOUND);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully", user));
    }
}
