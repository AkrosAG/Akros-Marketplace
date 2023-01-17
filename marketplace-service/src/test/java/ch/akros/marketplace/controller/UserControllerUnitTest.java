package ch.akros.marketplace.controller;

import ch.akros.marketplace.api.model.UserDTO;
import ch.akros.marketplace.api.model.UserResponseDTO;
import ch.akros.marketplace.service.controller.UserController;
import ch.akros.marketplace.service.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerUnitTest {

    private UserService userService;
    private UserController userController;
    private Validator validator;


    @BeforeEach
    void setUp() {
        userService = mock(UserService.class);
        userController = new UserController(userService);
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testDeleteUser_whenUserIsAuthorized_shouldReturnNoContent() {
        UserController spyUserController = spy(userController);
        String userId = UUID.randomUUID().toString();

        doReturn(true).when(spyUserController).isCurrentUserAuthorized(UUID.fromString(userId));
        ResponseEntity<Void> result = spyUserController.deleteUser(userId);
        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
    }

    @Test
    void testDeleteUser_whenUserIsNotAuthorized_shouldReturnForbidden() {
        UserController spyUserController = spy(userController);
        String userId = UUID.randomUUID().toString();

        doReturn(false).when(spyUserController).isCurrentUserAuthorized(UUID.fromString(userId));
        ResponseEntity<Void> result = spyUserController.deleteUser(userId);
        assertEquals(HttpStatus.FORBIDDEN, result.getStatusCode());
    }

    @Test
    void testDeleteUser_whenUserIdIsNotUUID_shouldReturnBadRequest() {
        String userId = "1";

        try {
            userController.deleteUser(userId);
        } catch (IllegalArgumentException ex) {
            ResponseEntity result = userController.handleException(ex);
            assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        }
    }

    @Test
    void testUpdateUser_whenUserIdIsNotUUID_shouldReturnBadRequest() {
        String userId = "1";
        UserDTO user = new UserDTO();

        try {
            userController.updateUser(userId, user);
        } catch (IllegalArgumentException ex) {
            ResponseEntity result = userController.handleException(ex);
            assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        }
    }

    @Test
    void testUserDTO_invalidUser() {
        UserDTO user = new UserDTO();

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(user);
        assertFalse(violations.isEmpty());
    }

    @Test
    void testUserDTO_invalidUser_firstName() {
        UserDTO user = new UserDTO();
        user.setFirstName(" ");
        user.setLastName("test");
        user.setEmail("test@test.ch");

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(user);
        assertFalse(violations.isEmpty());
    }

    @Test
    void testUserDTO_invalidUser_lastName() {
        UserDTO user = new UserDTO();
        user.setFirstName("test");
        user.setLastName(" ");
        user.setEmail("test@test.ch");

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(user);
        assertFalse(violations.isEmpty());
    }

    @Test
    void testUserDTO_invalidUser_email() {
        UserDTO user = new UserDTO();
        user.setFirstName("test");
        user.setLastName("test");
        user.setEmail("test");

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(user);
        assertFalse(violations.isEmpty());
    }

    @Test
    void testUserDTO_validUser() {
        UserDTO user = new UserDTO();
        user.setFirstName("test");
        user.setLastName("test");
        user.setEmail("test@test.ch");

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(user);
        assertTrue(violations.isEmpty());
    }

    @Test
    void updateDeleteUser_whenUserIsNotAuthorized_shouldReturnForbidden() {
        UserController spyUserController = spy(userController);
        String userId = UUID.randomUUID().toString();
        UserDTO user = new UserDTO();
        user.setFirstName("test");
        user.setLastName("test");
        user.setEmail("test@test.ch");

        doReturn(false).when(spyUserController).isCurrentUserAuthorized(UUID.fromString(userId));
        ResponseEntity<UserResponseDTO> result = spyUserController.updateUser(userId, user);
        assertEquals(HttpStatus.FORBIDDEN, result.getStatusCode());
    }

    @Test
    void updateDeleteUser_whenUserIsAuthorized_shouldReturnOk() {
        UserController spyUserController = spy(userController);
        String userId = UUID.randomUUID().toString();
        UserDTO user = new UserDTO();

        String userFirstName = "test";
        String userLastName = "test";
        String userEmail = "test@test.ch";

        user.setFirstName(userFirstName);
        user.setLastName(userLastName);
        user.setEmail(userEmail);

        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(UUID.fromString(userId));
        userResponseDTO.setFirstName(userFirstName);
        userResponseDTO.setLastName(userLastName);
        userResponseDTO.setEmail(userEmail);

        doReturn(true).when(spyUserController).isCurrentUserAuthorized(UUID.fromString(userId));
        when(userService.updateUser(UUID.fromString(userId), user)).thenReturn(userResponseDTO);
        ResponseEntity<UserResponseDTO> result = spyUserController.updateUser(userId, user);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        assertEquals(userResponseDTO.getId(), result.getBody().getId());
        assertEquals(userResponseDTO.getFirstName(), result.getBody().getFirstName());
        assertEquals(userResponseDTO.getLastName(), result.getBody().getLastName());
        assertEquals(userResponseDTO.getEmail(), result.getBody().getEmail());
        assertEquals(userResponseDTO.getPhoneNumber(), result.getBody().getPhoneNumber());
    }
}
