package ch.akros.marketplace.service.controller;

import ch.akros.marketplace.service.constants.BaseConstants;
import ch.akros.marketplace.service.model.UserDto;
import ch.akros.marketplace.service.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

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
    public ResponseEntity deleteUser(@PathVariable UUID id) {
        log.debug("UserController.deleteUser() with id " + id + " called");

        try {
            String userId = id.toString();
            boolean isUserAuthorized = isCurrentUserAuthorized(userId);
            if (!isUserAuthorized) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable UUID id, @Valid @RequestBody UserDto user) {
        log.debug("UserController.deleteUser() with id " + id + " called");

        try {
            String userId = id.toString();
            boolean isUserAuthorized = isCurrentUserAuthorized(userId);
            if (!isUserAuthorized) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            userService.updateUser(userId, user);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private boolean isCurrentUserAuthorized(String userIdToBeUpdated) {
        KeycloakAuthenticationToken authentication = (KeycloakAuthenticationToken) SecurityContextHolder.getContext()
                .getAuthentication();
        Principal principal = (Principal) authentication.getPrincipal();

        if (principal instanceof KeycloakPrincipal) {
            KeycloakPrincipal<KeycloakSecurityContext> kPrincipal = (KeycloakPrincipal<KeycloakSecurityContext>) principal;
            String userIdByToken = kPrincipal.getKeycloakSecurityContext().getToken().getSubject();

            if (userIdByToken.equals(userIdToBeUpdated)) {
                return true;
            }
        }

        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(grantedAuthority -> {
            String authorityName = grantedAuthority.getAuthority();
            return authorityName.equals(BaseConstants.USER_ROLE_ADMIN);
        });
        return isAdmin;
    }
}
