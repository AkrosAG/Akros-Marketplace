package ch.akros.marketplace.service.controller;

import ch.akros.marketplace.api.model.UserDTO;
import ch.akros.marketplace.api.model.UserResponseDTO;
import ch.akros.marketplace.service.constants.BaseConstants;
import ch.akros.marketplace.service.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable String id) {
        log.debug("UserController.deleteUser() with id " + id + " called");

        UUID userId = UUID.fromString(id);
        boolean isUserAuthorized = isCurrentUserAuthorized(userId);
        if (!isUserAuthorized) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable String id, @Valid @RequestBody UserDTO user) {
        log.debug("UserController.updateUser() with id " + id + " called");

        UUID userId = UUID.fromString(id);
        boolean isUserAuthorized = isCurrentUserAuthorized(userId);
        if (!isUserAuthorized) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UserResponseDTO userResponseDTO = userService.updateUser(userId, user);
        return ResponseEntity.ok(userResponseDTO);
    }

    public boolean isCurrentUserAuthorized(UUID userIdToBeUpdated) {
        KeycloakAuthenticationToken authentication = (KeycloakAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Principal principal = (Principal) authentication.getPrincipal();

        if (principal instanceof KeycloakPrincipal) {
            KeycloakPrincipal<KeycloakSecurityContext> kPrincipal = (KeycloakPrincipal<KeycloakSecurityContext>) principal;
            String userIdByToken = kPrincipal.getKeycloakSecurityContext().getToken().getSubject();

            if (userIdByToken.equals(userIdToBeUpdated.toString())) {
                log.debug("UserController.isCurrentUserAuthorized() user with id: " + userIdByToken + " updating own profile");
                return true;
            }
            log.debug("UserController.isCurrentUserAuthorized() user with id: " + userIdByToken + " want to change " +
                    "user with id: " + userIdToBeUpdated);
        }

        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(grantedAuthority -> {
            String authorityName = grantedAuthority.getAuthority();
            return authorityName.equals(BaseConstants.USER_ROLE_ADMIN);
        });
        log.debug("UserController.isCurrentUserAuthorized() user with id is admin: " + isAdmin);

        return isAdmin;
    }

    @ExceptionHandler({WebClientResponseException.class, IllegalArgumentException.class})
    public ResponseEntity handleException(Exception ex) {
        log.debug("Exception handler: ", ex);
        if (ex instanceof WebClientResponseException) {
            HttpStatus statusCode = ((WebClientResponseException) ex).getStatusCode();
            switch (statusCode) {
                case FORBIDDEN:
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                case NOT_FOUND:
                    return ResponseEntity.notFound().build();
                case BAD_REQUEST:
                    return ResponseEntity.badRequest().build();
                case UNAUTHORIZED:
                case SERVICE_UNAVAILABLE:
                case INTERNAL_SERVER_ERROR:
                    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
            }
        } else if (ex instanceof IllegalArgumentException) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.internalServerError().build();
    }
}
