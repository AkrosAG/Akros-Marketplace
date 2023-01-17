package ch.akros.marketplace.service.converters;

import ch.akros.marketplace.api.model.UserDTO;
import ch.akros.marketplace.api.model.UserResponseDTO;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UserConverter {

    private final static String KEYCLOAK_USER_FIRSTNAME = "firstName";
    private final static String KEYCLOAK_USER_LASTNAME = "lastName";
    private final static String KEYCLOAK_USER_EMAIL = "email";
    private final static String KEYCLOAK_USER_ATTRIBUTES = "attributes";
    private final static String KEYCLOAK_USER_PHONE_NUMBER = "phoneNumber";

    public JSONObject convertUserDtoToKeycloakUser(UserDTO userDto) {
        JSONObject keycloakUser = new JSONObject();
        keycloakUser.put(KEYCLOAK_USER_FIRSTNAME, userDto.getFirstName());
        keycloakUser.put(KEYCLOAK_USER_LASTNAME, userDto.getLastName());
        keycloakUser.put(KEYCLOAK_USER_EMAIL, userDto.getEmail());

        JSONObject attributesObject = new JSONObject();
        keycloakUser.put(KEYCLOAK_USER_ATTRIBUTES, attributesObject);
        attributesObject.put(KEYCLOAK_USER_PHONE_NUMBER, userDto.getPhoneNumber());

        return keycloakUser;
    }

    public UserResponseDTO convertUserDtoToUserResponseDto(UserDTO userDto, UUID uuuid) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setId(uuuid);
        userResponseDTO.setFirstName(userDto.getFirstName());
        userResponseDTO.setLastName(userDto.getLastName());
        userResponseDTO.setEmail(userDto.getLastName());
        userResponseDTO.setPhoneNumber(userDto.getPhoneNumber());

        System.out.println();
        return userResponseDTO;
    }
}
